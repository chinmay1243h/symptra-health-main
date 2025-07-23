
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symptoms, patientInfo } = await req.json();
    
    // Basic validation
    if (!symptoms || symptoms.trim().length < 5) {
      console.log("Validation failed: Symptoms description too short or empty");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Symptoms description is too short or empty' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Analyzing symptoms (${symptoms.length} chars) with DeepSeek API...`);
    console.log("Patient info:", patientInfo);
    
    if (!deepseekApiKey) {
      console.error("Missing DeepSeek API key in environment variables");
      return new Response(
        JSON.stringify({
          success: false,
          error: 'DeepSeek API key is not configured on the server'
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Construct the prompt for DeepSeek API
    let prompt = `I need a medical assessment based on the following symptoms: ${symptoms}`;
    
    if (patientInfo) {
      if (patientInfo.age) {
        prompt += `\nPatient age: ${patientInfo.age}`;
      }
      if (patientInfo.gender) {
        prompt += `\nPatient gender: ${patientInfo.gender}`;
      }
      if (patientInfo.medicalHistory) {
        prompt += `\nMedical history: ${patientInfo.medicalHistory}`;
      }
    }
    
    prompt += "\n\nPlease provide: 1) A preliminary assessment, 2) A list of possible conditions, 3) Recommendations for the patient, and 4) A confidence score between 0 and 1 indicating how certain you are about this assessment.";
    
    // Use DeepSeek API to analyze the symptoms
    console.log("Sending request to DeepSeek API with prompt:", prompt.substring(0, 200) + "...");
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${deepseekApiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `You are a highly specialized medical AI assistant. You are helping to provide preliminary assessments of medical symptoms. 
            IMPORTANT: Always include the following disclaimer: "This is not a medical diagnosis. Please consult with a healthcare professional for proper evaluation and treatment."
            Format your response as a JSON object with the following structure:
            {
              "diagnosis": "Your preliminary assessment here",
              "possibleConditions": ["Condition 1", "Condition 2", "Condition 3"],
              "recommendations": "Your recommendations here",
              "confidence": 0.85 // A number between 0 and 1 representing your confidence level
            }`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3, // More deterministic responses for medical content
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error?.message || 'DeepSeek API request failed';
      
      console.error('DeepSeek API error:', errorMessage, errorData);
      
      // Handle specific error scenarios
      if (errorMessage.includes("quota") || errorMessage.includes("exceeded") || errorMessage.includes("limit") || errorMessage.includes("Insufficient")) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'DeepSeek API quota exceeded or insufficient balance. Please try again later or contact support.'
          }),
          { 
            status: 429, // Too Many Requests
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      return new Response(
        JSON.stringify({
          success: false,
          error: `DeepSeek API Error: ${errorMessage}`,
          details: errorData
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    console.log("DeepSeek API response received successfully");
    
    // Parse the content as JSON
    let diagnosisData;
    try {
      // The response might include text before or after the JSON
      const content = data.choices[0].message.content;
      
      // Try to extract JSON from the content
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        diagnosisData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not extract JSON from the response');
      }
    } catch (err) {
      console.error('Error parsing JSON from response:', err);
      console.log('Raw response content:', data.choices[0].message.content);
      
      // Fallback to manual parsing or provide default structure
      const content = data.choices[0].message.content;
      
      // Try to extract sections
      const diagnosisMatch = content.match(/assessment:?\s*(.*?)(?=possible conditions|\n\n)/is);
      const conditionsMatch = content.match(/possible conditions:?\s*(.*?)(?=recommendations|\n\n)/is);
      const recommendationsMatch = content.match(/recommendations:?\s*(.*?)(?=confidence|\n\n)/is);
      const confidenceMatch = content.match(/confidence:?\s*(0\.\d+)/i);
      
      diagnosisData = {
        diagnosis: diagnosisMatch ? diagnosisMatch[1].trim() : 'Could not determine a diagnosis',
        possibleConditions: conditionsMatch ? 
          conditionsMatch[1].split(/(?:,|\n)/).map(c => c.trim()).filter(c => c) : 
          ['Could not determine possible conditions'],
        recommendations: recommendationsMatch ? recommendationsMatch[1].trim() : 
          'Please consult with a healthcare professional for proper evaluation and treatment',
        confidence: confidenceMatch ? parseFloat(confidenceMatch[1]) : 0.5
      };
    }
    
    // Ensure the diagnosis data conforms to the expected structure
    const validatedResponse = {
      diagnosis: diagnosisData.diagnosis || 'No diagnosis provided',
      possibleConditions: Array.isArray(diagnosisData.possibleConditions) ? 
        diagnosisData.possibleConditions : 
        ['Could not determine possible conditions'],
      recommendations: diagnosisData.recommendations || 'Please consult with a healthcare professional',
      confidence: typeof diagnosisData.confidence === 'number' ? 
        Math.max(0, Math.min(1, diagnosisData.confidence)) : 0.5 // Clamp between 0 and 1
    };
    
    return new Response(
      JSON.stringify({
        success: true,
        ...validatedResponse
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Disease diagnosis error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to analyze symptoms',
        stack: error.stack // Include stack trace for debugging
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

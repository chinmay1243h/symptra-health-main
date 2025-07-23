
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
    const { content } = await req.json();
    
    // Basic validation
    if (!content || content.trim().length < 10) {
      console.log("Validation failed: Content too short or empty");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Report content is too short or empty' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Analyzing medical report content (${content.length} chars) with DeepSeek API...`);
    
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
    
    // Use DeepSeek API to analyze the medical report
    console.log("Sending request to DeepSeek API...");
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${deepseekApiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',  // Using DeepSeek chat model
        messages: [
          {
            role: 'system',
            content: `You are a highly specialized medical AI assistant. Analyze the provided medical report and provide:
            1. A summary of the findings
            2. Key health indicators and their meanings
            3. Potential concerns that should be discussed with a healthcare provider
            4. Recommended follow-up steps
            
            Structure your response clearly with headings and bullet points where appropriate.
            Include a disclaimer that this analysis is not a medical diagnosis and should not replace professional medical advice.`
          },
          {
            role: 'user',
            content: content
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
      
      // For development/debugging purposes, provide more detailed error information
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
    
    return new Response(
      JSON.stringify({
        success: true,
        analysis: data.choices[0].message.content
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('DeepSeek analysis error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to analyze medical report',
        stack: error.stack // Include stack trace for debugging
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

const pdf = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Assuming you have this library or will install it
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Use GEMINI_API_KEY from .env
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});

// @desc    Analyze medical report from uploaded file
// @route   POST /api/analysis/report
// @access  Private (Authenticated User)
exports.analyzeReportFromFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    let reportText = '';

    // Handle PDF files
    if (req.file.mimetype === 'application/pdf') {
      const dataBuffer = req.file.buffer;
      const data = await pdf(dataBuffer);
      reportText = data.text;
    } 
    // You can add logic for image files here using OCR libraries like Tesseract.js (requires more setup)
    // else if (req.file.mimetype.startsWith('image/')) {
    //   // For images, you'd need an OCR library like Tesseract.js
    //   // Example (conceptual): reportText = await tesseract.recognize(req.file.buffer);
    //   return res.status(400).json({ success: false, message: 'Image file analysis not yet supported. Please extract text or use a text file.' });
    // } 
    else if (req.file.mimetype === 'text/plain') {
      reportText = req.file.buffer.toString('utf8');
    }
    else {
      return res.status(400).json({ success: false, message: 'Unsupported file type. Only PDF and plain text files are directly supported for now.' });
    }

    if (reportText.trim().length === 0) {
        return res.status(400).json({ success: false, message: 'Could not extract text from the uploaded file or file is empty.' });
    }

    // Construct the prompt for Gemini API
    const userPrompt = `As a medical report analyzer, summarize the key findings, potential implications, and suggest any necessary follow-up actions based on the following medical report text. Emphasize that this is not a medical diagnosis and should not replace professional medical advice.

Medical Report: "${reportText}"

Summary of Findings:
Potential Implications:
Suggested Follow-up:`;

    const chat = model.startChat({
        history: [], // Start a new chat for each analysis
        generationConfig: {
            maxOutputTokens: 1000, // Limit output length
        },
    });

    const result = await chat.sendMessage(userPrompt);
    const response = await result.response;
    const aiAnalysisText = response.text();

    res.status(200).json({
      success: true,
      data: {
        reportText: reportText.substring(0, 500) + (reportText.length > 500 ? '...' : ''), // Send truncated original text
        analysis: aiAnalysisText,
        timestamp: new Date().toLocaleString(),
      },
    });

  } catch (error) {
    console.error('Error analyzing report from file:', error);
    next(error);
  }
};
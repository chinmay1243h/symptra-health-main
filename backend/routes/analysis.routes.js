const express = require('express');
const multer = require('multer'); // Import multer
const { analyzeReportFromFile } = require('../controllers/analysis.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// Configure multer for file uploads (store in memory as buffer)
const upload = multer({ storage: multer.memoryStorage() });

// Route to analyze medical report from an uploaded file
// Use 'single' middleware for a single file upload, with 'reportFile' as the field name
router.post('/report', authenticate, upload.single('reportFile'), analyzeReportFromFile);

module.exports = router;

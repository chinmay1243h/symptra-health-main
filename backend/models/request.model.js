const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  type: {
    type: String,
    // ADDED 'free_consultation' here
    enum: ['article_approval', 'product_approval', 'user_registration', 'appointment_booking', 'free_consultation'], 
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // Flexible field for various request data
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // Make submittedBy optional for public requests (like free consultation if not logged in)
    // If required: true, then only logged-in users can submit this form.
    // If you want public users to submit, make it not required.
    // For now, let's keep it required, as your backend controller expects req.user.id
    required: true, // Keep required: true if you want only logged-in users to book free consultations
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reviewNotes: {
    type: String,
  },
}, { timestamps: true });

// Check if the model already exists before compiling it
const Request = mongoose.models.Request || mongoose.model('Request', requestSchema);

module.exports = Request;
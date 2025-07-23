
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate, isAdmin } = require('../middleware/auth.middleware');

// Get all users (admin only)
router.get('/', authenticate, isAdmin, userController.getAllUsers);

// Get user profile
router.get('/profile', authenticate, userController.getUserProfile);

// Delete user (admin only)
router.delete('/:id', authenticate, isAdmin, userController.deleteUser);

module.exports = router;

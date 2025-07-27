const User = require('../models/user.model');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res, next) => {
  try {
    // req.user is set by the authenticate middleware
    const user = await User.findById(req.user.id).select('-password'); // Exclude password

    if (user) {
      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone, // Include phone
          address: user.address, // Include address
        },
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      // user.email = req.body.email || user.email; // Email changes usually require re-verification, keep read-only for now
      user.phone = req.body.phone || user.phone; // Update phone
      user.address = req.body.address || user.address; // Update address

      const updatedUser = await user.save();

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          phone: updatedUser.phone,
          address: updatedUser.address,
        },
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    next(error);
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private (Admin)
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password'); // Exclude passwords
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    console.error('Error getting all users:', error);
    next(error);
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private (Admin)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await user.deleteOne(); // Use deleteOne() for Mongoose 5.x/6.x
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    next(error);
  }
};


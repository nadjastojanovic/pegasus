const User = require('../models/User');

// Create a user
async function createUser({ username, password, phoneNumber, dob }) {
  const user = new User({ username, password, phoneNumber, dob });
  return await user.save();
}

// Fetch a user
async function getUserById(id) {
  return await User.findById(id);
}

// Update phone number
async function updatePhoneNumber(id, phoneNumber) {
  return await User.findByIdAndUpdate(id, { phoneNumber }, { new: true });
}

// Delete user
async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

module.exports = {
  createUser,
  getUserById,
  updatePhoneNumber,
  deleteUser
};

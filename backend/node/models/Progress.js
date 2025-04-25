const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  level: { type: Number, enum: [1, 2], required: true },
  timestamp: { type: Date, default: Date.now }, // when they started
  timeTaken: { type: Number, required: true }, // seconds -- should be updated by arduino
});

module.exports = mongoose.model('Progress', ProgressSchema);

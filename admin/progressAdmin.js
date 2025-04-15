const Progress = require('../models/Progress');

// Save progress data
async function saveProgress({ userId, level, timeTaken, pattern }) {
  const progress = new Progress({ userId, level, timeTaken, pattern });
  return await progress.save();
}

// Get all progress for a user
async function getProgressByUser(userId) {
  return await Progress.find({ userId }).sort({ timestamp: -1 });
}

// Get shortest time for each level for a user
async function getBestTimesByLevel(userId) {
  const levels = [1, 2];
  const bestTimes = {};

  for (const level of levels) {
    const best = await Progress.find({ userId, level }).sort({ timeTaken: 1 }).limit(1);
    bestTimes[`level${level}`] = best.length ? best[0].timeTaken : null;
  }

  return bestTimes;
}

module.exports = {
  saveProgress,
  getProgressByUser,
  getBestTimesByLevel
};

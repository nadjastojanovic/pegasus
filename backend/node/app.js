const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const axios = require('axios');
const connectDB = require('./db');
const User = require('./models/User');
const Progress = require('./models/Progress');

// Connect to database
connectDB();

// Simple function to generate user id (sequential ids)
let nextId = 1;
function generateSequentialId() {
  return String(nextId++).padStart(4, '0');
}

const levelPatterns = {
  1:[1, 2, 3, 4, 5, 6],
  2:[3, 2,1,6, 5,4],
  3:[1,5,3,2,4,6],
  4:[6,1, 3,4, 2,5],
};

// Placeholder for Arduino URL
const ARDUINO_URL = 'http://123.com';

/* ROUTES FOR COMMUNICATION BETWEEN ARDUINO AND NODE.JS BACKEND */

// Sends an array of pins to the Arduino backend depending on the level selected
app.post('/setLevel', async (req, res) => {
  const { level } = req.body;
  try {
    const pattern = levelPatterns[level];
    if (!pattern) {
      return res.status(400).json({ error: "Invalid level" });
    } 
    await axios.post(ARDUINO_URL, { pattern });
    res.json({ message: "Pattern sent to Arduino.", pattern });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route used by Arduino to send the backend progress data based on the level/peg insertion
app.post('/user/:id/progress', async (req, res) => {
  try {
    const { id } = req.params;
    const { level, pattern, timeTaken } = req.body;

    if (!level || !pattern || !timeTaken) {
      return res.status(400).json({ error: 'Missing one or more progress data.' });
    }

    const progress = new Progress({ userId: id, level, timeTaken });
    await progress.save();

    res.status(200).json({ message: 'Progress saved', progress });
  } catch (err) {
    console.error('Error saving progress:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* BASIC ROUTES FOR USER COMMUNICATION WITHIN THE APP */

// Register a new user
app.post('/user', async (req, res) => {
  try {
    const { username, password, phoneNumber, dob } = req.body;
    if (!username || !password || !phoneNumber || !dob) {
      return res.status(400).json({ error: 'Missing one or more required fields: username, password, phone number, date of birth (dob)' });
    }

    const newUser = new User({ username, password, phoneNumber, dob });
    await newUser.save();

    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user information (phone number only)
app.put('/user/:id', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { phoneNumber }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'Phone number updated', user });
  } catch (err) {
    console.error('Error updating user information:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user information
app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ user });
  } catch (err) {
    console.error('Error retrieving user information:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user
app.delete('/user/:id', async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Log in a user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    // Look up the user in the database and compare 
   /*  placeholder for the backend logic, return 401 error if it does not match the database record. 
     */
    res.status(200).json({ message: 'Login successful'});
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });


const express = require('express');
const cors    = require('cors');
const app = express();

app.use(cors());    
app.use(express.json());

const port = process.env.PORT || 3000;

const axios = require('axios');
const connectDB = require('./db');
const User = require('./models/User');
const Progress = require('./models/Progress');

/* ARDUINO SETUP SERIAL PORT */
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const ARDUINO_PORT = '/dev/tty.usbserial-110';
const BAUD_RATE = 9600;

const arduino = new SerialPort({ path: ARDUINO_PORT, baudRate: BAUD_RATE });
const parser  = arduino.pipe(new ReadlineParser({ delimiter: '\n' }));

let lastLevel   = null;
let lastPattern = null;

// listen for when arduino prints DURATION:X
parser.on('data', line => {
  line = line.trim();
  if (!line.startsWith('DURATION:')) return;
  const timeTaken = parseFloat(line.split(':')[1]);
  if (lastLevel == null || lastPattern == null) {
    console.warn('No level/pattern in memory - skipping POST');
    return;
  }
  // update user progress USING ID = 1 FOR TESTING
  axios.post(`http://localhost:3000/user/680d0f0a8854e427154cdef1/progress`, {
    level:     lastLevel,
    pattern:   lastPattern,
    timeTaken,
  })
  .then(r => console.log('Progress saved:', timeTaken))
  .catch(err => console.error('Error saving progress:', err.message));
});

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

/* ARDUINO BACKEND COMMUNICATION */
// sends pattern (as a list of 6 numbers) to the Arduino once the user selects level and clicks Start 
app.post('/setLevel', async (req, res) => {
  const { level } = req.body;
  try {
    const pattern = levelPatterns[level];

    if (!pattern) {
      return res.status(400).json({ error: "Invalid level" });
    } 

    // remember for later when arduino reports back
    lastLevel   = level;
    lastPattern = pattern;

    // send comma-separated pattern + newline to Arduino
    const msg = pattern.join(',') + '\n';
    arduino.write(msg, err => {
      if (err) console.error('Error writing to Arduino:', err);
      else console.log('Sent to Arduino:', msg.trim());
    });

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


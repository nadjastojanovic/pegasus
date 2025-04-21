const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const axios = require('axios');
import { generatePattern } from './pattern.js';

// Simple function to genereate user id (sequential ids)
let nextId = 1; // Start from 1

function generateSequentialId() {
  return String(nextId++).padStart(4, '0');
}

/* ROUTES FOR COMMUNICATION BETWEEN ARDUINO AND NODE.JS BACKEND */

// placeholder for arduino url to post the pattern there. 
const ARDUINO_URL = 'http://123.com';

// sends an array of pins to the arduino backend depending on the level selected. 
app.post('/setLevel', async (req, res) => {
    const { level } = req.body;
    if (!level) {
      return res.status(400).json({ error: "Level is required in the request body" });
    }
    try {
      // Generate the pattern using the function from pattern.js
      const pattern = generatePattern(level);
      
      // Post the pattern to the Arduino
      await axios.post(ARDUINO_URL, { level, pattern });
      
      res.json({ message: "Pattern generated and sent to Arduino.", level, pattern });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Route used by arduino to send the backend progress data based on the level/peg insertion
  app.post('/user/:id/progress', async (req, res) => {
    try {
      const { id } = req.params;
      const { level, pattern, timeTaken } = req.body;
  
      if (!level || !pattern || !timeTaken) {
        return res.status(400).json({ error: 'Missing one or more progress data.' });
      }

  
      // set the data in the database and responds to user.
      res.status(200).json({ message: 'Progress saved'});
    } catch (err) {
      console.error('Error saving progress:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


/* BASIC ROUTES FOR USER COMMUNICATION WITHIN THE APP */
  
// register a new user to the system
  app.post('/user', async(req,res) => {
    try {
      const {name, phoneNumber, dob} = req.body;
      if (!dob || !name || !phoneNumber) {
        return res.status(400).json({ error: 'Missing one or more required fields: name, phone number, date of birth(dob)'});
      }
      const id = generateSequentialId();
      const newPatient = {id,name,phoneNumber,dob}; // all other fields null?? Make it optional on database? 
      // set the data in the database.
      //res.status(201).json({ message: 'User registered', user: patients.get(id) }); // sends status back
    } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// Update user information (phone number only) 
  app.put('/user/:id', async(req,res) => {
    try {
      const { id } = req.params;
      const {phoneNumber} = req.body;
      if (!phoneNumber) {
        return res.status(400).json({ error: 'Missing phone number.'});
      }
      // set the data in the database.
      //res.status(200).json({ message: 'Phone Number updated for', user: patients.get(id) }); // sends status back
    } catch (err) {
      console.error('Error updating user information:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// get user information 
app.get('/user/:id', async(req,res) => {
  try {
    const { id } = req.params;
    // set the data in the database.
    //res.status(200).json({ user }); // sends status back
  } catch (err) {
    console.error('Error retrieving user information:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// delete user information 
app.delete('/user/:id', async(req,res) => {
  try {
    const { id } = req.params;
    // delete the data in the database.
    //res.status(200).json({ user }); // sends status back
  } catch (err) {
    console.error('Error retrieving user information:', err);
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
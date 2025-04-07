const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const axios = require('axios');
import { generatePattern } from './pattern.js';

// placeholder for arduino url to post the pattern there. 
const ARDUINO_URL = 'http://123.com';

app.post('/api/setLevel', async (req, res) => {
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
  

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
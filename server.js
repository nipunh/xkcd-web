const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Keeping in memory count || can lso be done using DB
let viewCounts = {};

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// CORS setup for local dev
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
app.get('/api/latest', async (req, res) => {
  try {
    const response = await axios.get('https://xkcd.com/info.0.json');
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching latest comic' });
  }
});

app.get('/api/comic/:id', async (req, res) => {
  try {
    const comicId = req.params.id;
    const response = await axios.get(`https://xkcd.com/${comicId}/info.0.json`);
    viewCounts[comicId] = (viewCounts[comicId] || 0) + 1;
    res.json({...response.data, viewCount: viewCounts[comicId]}); 
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comic' });
  }
});

// Serve React app
app.get('*', (req, res) => { 
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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

app.get('/api/comic/:id?', async (req, res) => {
    try {
        const comicId = req.params.id;
        let response = null;
        if(comicId === 'latest' || comicId === undefined || comicId === null){
            response = await axios.get('https://xkcd.com/info.0.json');
        }else{
            response = await axios.get(`https://xkcd.com/${comicId}/info.0.json`); 
        }
        // Initialize view count to 0 if it doesn't exist, then increment
        if (!viewCounts[response.data.num]) {
            viewCounts[response.data.num] = 0;
        }
        viewCounts[response.data.num] += 1;
        res.json({ ...response.data, viewCount: viewCounts[response.data.num] });
        
    } catch (err) {
        res.status(500).json({ message: 'Error fetching comic' + err.message });
    }
});

// Serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

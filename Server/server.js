// server/server.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint: /hello/amjad
app.get('/hello/amjad', (req, res) => {
    res.send('Hello, Amjad.');
});

// Endpoint to handle Professional Profile submission (POST)
app.post('/api/profiles', (req, res) => {
    const { Name, Title, TargetedKeywords, Education, Certification, Contact } = req.body;

    // Validate required fields
    if (!Name || !Title || !TargetedKeywords || !Education || !Certification || !Contact) {
        return res.status(400).json({ error: 'All fields are required: Name, Title, Targeted Keywords, Education, Certification, Contact' });
    }

    // Read existing profiles
    fs.readFile('profiles.json', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Could not read profiles file' });
        }

        let profiles = [];
        if (data.length) {
            profiles = JSON.parse(data);
        }

        // Append new profile
        profiles.push(req.body);

        // Save to profiles.json
        fs.writeFile('profiles.json', JSON.stringify(profiles, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Could not save profile' });
            }
            res.status(201).json({ message: 'Profile saved successfully!' });
        });
    });
});

// Endpoint to retrieve profiles (GET)
app.get('/api/profiles', (req, res) => {
    fs.readFile('profiles.json', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Could not read profiles file' });
        }
        const profiles = data.length ? JSON.parse(data) : [];
        res.json(profiles);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

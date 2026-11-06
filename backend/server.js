const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

let unsafeZones = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.post('/add-location', (req, res) => {
    unsafeZones.push(req.body);
    res.send('Location added');
});

app.get('/locations', (req, res) => {
    res.json(unsafeZones);
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', unsafeZones: unsafeZones.length });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
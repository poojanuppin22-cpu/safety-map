const express = require('express');
const app = express();
app.use(express.json());

let unsafeZones = [];

app.post('/add-location', (req, res) => {
    unsafeZones.push(req.body);
    res.send("Location added");
});

app.get('/locations', (req, res) => {
    res.json(unsafeZones);
});

app.listen(3000, () => console.log("Server running"));
navigator.geolocation.watchPosition(position => {
    let userLat = position.coords.latitude;
    let userLng = position.coords.longitude;

    fetch('http://localhost:3000/locations')
    .then(res => res.json())
    .then(data => {
        data.forEach(loc => {
            let dist = Math.sqrt(
                Math.pow(userLat - loc.lat, 2) +
                Math.pow(userLng - loc.lng, 2)
            );

            if(dist < 0.01){
                alert("⚠️ You are entering an unsafe area!");
            }
        });
    });
});
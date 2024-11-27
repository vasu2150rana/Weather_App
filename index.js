const express = require('express');
const axios = require('axios');
require('dotenv').config();
const path = require('path'); // For serving static files

const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to fetch weather data for a given city
app.get('/weather/:city', async (req, res) => {
    const city = req.params.city; // Get city from URL params
    const apiKey = process.env.API_KEY; // Fetch the API key from .env
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Construct the API URL

    try {
        const response = await axios.get(apiUrl); // Fetch weather data from OpenWeatherMap API
        const { temp, humidity } = response.data.main; // Extract temperature and humidity
        const { description } = response.data.weather[0]; // Extract weather condition

        // Send the weather data as a JSON response
        res.json({
            city,
            temperature: `${temp} °C`,
            humidity: `${humidity} %`,
            condition: description,
        });
    } catch (error) {
        // Error handling
        res.status(404).send('City not found or an error occurred.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Weather app is running at http://localhost:${port}`);
});
const express = require('express'); 
const axios = require('axios'); 
require('dotenv').config(); 
const path = require('path'); // For serving static files

const app = express(); 
const port = 3000;

// Serve static files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to get weather data and Unsplash background image
app.get('/weather/:city', async (req, res) => {
  const city = req.params.city; // Get the city name from the URL
  const apiKey = process.env.API_KEY; // Load weather API key from .env
  const unsplashApiKey = process.env.UNSPLASH_API_KEY; // Load Unsplash API key from .env
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Weather API URL

  try {
    const response = await axios.get(apiUrl); // Fetch data from OpenWeatherMap API
    const { temp, humidity } = response.data.main; // Extract temperature and humidity
    const { description } = response.data.weather[0]; // Extract weather condition

    // Fetch a background image from Unsplash based on the weather condition
    const imageUrl = await getUnsplashImage(description, unsplashApiKey);

    // Send JSON response with weather data and image URL
    res.json({
      city,
      temperature: `${temp} °C`,
      humidity: `${humidity} %`,
      condition: description,
      imageUrl: imageUrl
    });
  } catch (error) {
    console.error('Error:', error); // Log the error
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
});

// Function to fetch an image from Unsplash based on weather condition
async function getUnsplashImage(weatherCondition, apiKey) {
  const unsplashUrl = `https://api.unsplash.com/photos/random?query=${weatherCondition}&client_id=${apiKey}&count=1`;

  try {
    const response = await axios.get(unsplashUrl);
    return response.data[0]?.urls?.regular || ''; // Return the image URL
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    return ''; // Return empty string if error occurs
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Weather app is running at http://localhost:${port}`);
});
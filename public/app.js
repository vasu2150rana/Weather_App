document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('cityInput').value; // Get city input
    if (!city) return;

    try {
        const response = await fetch(`/weather/${city}`);
        const data = await response.json();

        if (response.ok) {
            // Update the UI with the weather data
            document.getElementById('cityName').innerText = `Weather in ${data.city}`;
            document.getElementById('temperature').innerText = `Temperature: ${data.temperature}`;
            document.getElementById('humidity').innerText = `Humidity: ${data.humidity}`;
            document.getElementById('condition').innerText = `Condition: ${data.condition}`;
            
            // Show the weather data and hide the error message
            document.getElementById('weatherData').style.display = 'block';
            document.getElementById('error').style.display = 'none';

            // Change background based on weather condition (example for sunny weather)
            setWeatherBackground(data.condition);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        // Handle errors
        document.getElementById('weatherData').style.display = 'none';
        document.getElementById('error').style.display = 'block';
    }
}

// Function to change the background based on weather condition
function setWeatherBackground(condition) {
    let bgImageUrl;

    switch (condition.toLowerCase()) {
        case 'clear sky':
            bgImageUrl = 'https://source.unsplash.com/1600x900/?clear-sky';
            break;
        case 'few clouds':
            bgImageUrl = 'https://source.unsplash.com/1600x900/?clouds';
            break;
        case 'scattered clouds':
            bgImageUrl = 'https://source.unsplash.com/1600x900/?cloudy';
            break;
        case 'rain':
            bgImageUrl = 'https://source.unsplash.com/1600x900/?rainy';
            break;
        case 'snow':
            bgImageUrl = 'https://source.unsplash.com/1600x900/?snow';
            break;
        case 'thunderstorm':
            bgImageUrl = 'https://source.unsplash.com/1600x900/?thunderstorm';
            break;
        default:
            bgImageUrl = 'https://source.unsplash.com/1600x900/?weather';
            break;
    }

    // Change the background image of the body
    document.body.style.backgroundImage = `url(${bgImageUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.transition = 'background 1s ease-in-out';
}
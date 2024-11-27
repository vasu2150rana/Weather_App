const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weatherInfo');

getWeatherBtn.addEventListener('click', async function () {
    const city = cityInput.value.trim();
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    try {
        const response = await fetch(`/weather/${city}`); 
        const data = await response.json();

        if (response.ok) {
            weatherInfo.innerHTML = `
                <h2>Weather in ${data.city}</h2>
                <p>Temperature: ${data.temperature}</p>
                <p>Humidity: ${data.humidity}</p>
                <p>Condition: ${data.condition}</p>
            `;


            document.body.style.backgroundImage = `url('${data.imageUrl}')`;
        } else {
            weatherInfo.innerHTML = `<p style="color: red;">${data.error}</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = `<p style="color: red;">Error fetching weather data. Please try again later.</p>`;
    }
});
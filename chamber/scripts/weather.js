const apiKey = '1950f37f5c909f89ae0dfa204e803a63'; 
const city = 'Uyo'; 

// Fetch Current Weather Data
async function fetchCurrentWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Failed to fetch current weather data');
        }
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error('Error fetching current weather:', error);
    }
}

// Display Current Weather
function displayCurrentWeather(data) {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('weather-description').textContent = description;
    document.getElementById('weather-icon').innerHTML = `<img src="${iconUrl}" alt="${description}">`;
}

// Fetch 3-Day Weather Forecast
async function fetchWeatherForecast() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Failed to fetch forecast data');
        }
        const data = await response.json();
        displayWeatherForecast(data);
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

// Display 3-Day Weather Forecast
function displayWeatherForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';

    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt_txt);
        const temperature = forecast.main.temp;
        const description = forecast.weather[0].description;
        const iconCode = forecast.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-item');
        forecastElement.innerHTML = `
            <h6>${date.toDateString()}</h6>
            <img src="${iconUrl}" alt="${description}">
            <p>${temperature}°C - ${description}</p>
        `;
        forecastContainer.appendChild(forecastElement);
    });
}

// Run when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchCurrentWeather();
    fetchWeatherForecast();
});

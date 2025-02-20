const apiKey = "YOUR_API_KEY_HERE";  // Replace with a real API key
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const searchHistoryList = document.getElementById("searchHistory");
const hourlyWeather = document.getElementById("hourlyWeather");
const weeklyWeather = document.getElementById("weeklyWeather");
const weatherTip = document.getElementById("weatherTip");

let searchHistory = [];

// Function to fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        updateUI(data);
        fetchHourlyForecast(city);
        fetchWeeklyForecast(city);
    } catch (error) {
        alert(error.message);
    }
}

// Function to update UI
function updateUI(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    // Update search history
    updateSearchHistory(data.name);

    // Change weather tips
    changeWeatherTip(data.main.temp);
}

// Function to fetch hourly forecast
async function fetchHourlyForecast(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    hourlyWeather.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        const forecast = data.list[i];
        hourlyWeather.innerHTML += `<p>${forecast.dt_txt.split(" ")[1]} - ${forecast.main.temp}°C</p>`;
    }
}

// Function to fetch weekly forecast
async function fetchWeeklyForecast(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    weeklyWeather.innerHTML = "";
    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        weeklyWeather.innerHTML += `<p>${forecast.dt_txt.split(" ")[0]} - ${forecast.main.temp}°C</p>`;
    }
}

// Function to change weather tips
function changeWeatherTip(temp) {
    weatherTip.textContent = temp > 30 ? "Stay hydrated!" : "Wear a jacket!";
}

// Event Listeners
searchBtn.addEventListener("click", () => fetchWeather(cityInput.value));

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// DOM Elements

const form = document.getElementById("search-form");

const cityInput = document.getElementById("city-input");

const loading = document.getElementById("loading");

const error = document.getElementById("error");

const weatherDisplay = document.getElementById("weather-display");

// Elements to update

const cityName = document.getElementById("city-name");

const weatherIcon = document.getElementById("weather-icon");

const temperature = document.getElementById("temperature");

const description = document.getElementById("description");

const feelsLike = document.getElementById("feels-like");

const humidity = document.getElementById("humidity");

const wind = document.getElementById("wind");

const pressure = document.getElementById("pressure");

const searchHistory = document.getElementById("search-history");

// State

let recentSearches = JSON.parse(localStorage.getItem("recent")) || [];

async function getWeather(city) {

  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

 

  try {

    showLoading();

    hideError();

   

    const response = await fetch(url);

   

    if (!response.ok) {

      if (response.status === 404) throw new Error("City not found");

      if (response.status === 401) throw new Error("API key not valid yet — new keys can take an hour to activate");

      throw new Error("Failed to fetch weather data");

    }

   

    const data = await response.json();

    displayWeather(data);

    saveToHistory(city);

  } catch (err) {

    // fetch itself rejects (TypeError) only when there is no network at all

    showError(err.name === "TypeError" ? "Network error — check your connection" : err.message);

  } finally {

    hideLoading();

  }

}

function displayWeather(data) {

  cityName.textContent = `${data.name}, ${data.sys.country}`;

  temperature.textContent = `${Math.round(data.main.temp)}°C`;

  description.textContent = data.weather[0].description;

  feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

  humidity.textContent = `${data.main.humidity}%`;

  wind.textContent = `${data.wind.speed} m/s`;

  pressure.textContent = `${data.main.pressure} hPa`;

 

  // Get the icon from OpenWeatherMap

  const iconCode = data.weather[0].icon;

  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

 

  weatherDisplay.classList.remove("hidden");

}

function showLoading() {

  loading.classList.remove("hidden");

  weatherDisplay.classList.add("hidden");

}

function hideLoading() {

  loading.classList.add("hidden");

}

function showError(message) {

  error.textContent = message;

  error.classList.remove("hidden");

}

function hideError() {

  error.classList.add("hidden");

}

function saveToHistory(city) {

  // Remove if it already exists to avoid duplicates

  recentSearches = recentSearches.filter(c => c.toLowerCase() !== city.toLowerCase());

 

  // Add to the beginning of the array

  recentSearches.unshift(city);

 

  // Keep only the last 5

  if (recentSearches.length > 5) {

    recentSearches.pop();

  }

 

  // Save to localStorage

  localStorage.setItem("recent", JSON.stringify(recentSearches));

  loadHistory();

}

function loadHistory() {

  searchHistory.innerHTML = "";

  recentSearches.forEach(city => {

    const li = document.createElement("li");

    li.textContent = city;

    li.style.cursor = "pointer";

    li.addEventListener("click", () => getWeather(city));

    searchHistory.appendChild(li);

  });

}

// Event Listeners

form.addEventListener("submit", (e) => {

  e.preventDefault();

  const city = cityInput.value.trim();

  if (city) {

    getWeather(city);

    cityInput.value = ""; // Clear input after search

  }

});

// Initialize

loadHistory();
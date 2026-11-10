# Week 6: Asynchronous JavaScript & APIs

## Author

**Name:** Benny Njuguna

**GitHub:** [@SketchAlien](https://github.com/SketchAlien)

**Date:** November 11, 2026

## Project Description

A Weather Dashboard application built with vanilla JavaScript. It fetches live weather data from the OpenWeatherMap API, handles loading/error states, and uses localStorage for recent searches. It also includes practice exercises for Promises, Async/Await, and the Fetch API.

## Technologies Used

- HTML5

- CSS3

- JavaScript (ES6+, Promises, Async/Await, Fetch API)

- OpenWeatherMap API

## Features

- Search for weather by city name

- Display temperature, humidity, wind, and pressure

- Dynamic weather icons

- Loading and error states (e.g., "City not found")

- Recent searches saved to localStorage

- Secure API key handling using `config.js` and `.gitignore`

## How to Run

1. Clone this repository.

2. Rename `config.example.js` to `config.js`.

3. Add your own OpenWeatherMap API key inside `config.js`.

4. Open `index.html` with Live Server.

## Lessons Learned

I learned how JavaScript handles asynchronous operations using Promises and `async/await`. I also learned how to use the Fetch API to get real JSON data from a server and display it dynamically in the DOM.

## Challenges Faced

Understanding how to keep my API key out of GitHub was tricky, but I learned how to use `.gitignore` and `config.js`. I also had to learn how to handle network errors gracefully so the app doesn't break.

## Live Demo
[View Live Site] (https://sketchalien.github.io/iyf-s12-week-06-SketchAlien/)
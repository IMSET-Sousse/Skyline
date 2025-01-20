import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState("Paris");
  const [darkMode, setDarkMode] = useState(false);

      // Fetch current weather and forecast data
  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/weather?city=${city}`);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    const getForecast = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/forecast?city=${city}`);
        setForecastData(response.data.forecast); // Store forecast data
      } catch (error) {
        console.error("Error fetching forecast:", error);
      }
    };

    getWeather();
    getForecast();
  }, [city]);

  // Dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <h1>Weather App</h1>
      
      {/* Input for changing city */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={() => setCity(city)}>Get Weather</button>
      
      {/* Weather Details */}
      <h2>Weather in {city}</h2>
      {
  weatherData ? (
    <div>
      <h2>Current Weather</h2>
      <img 
        src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`} 
        alt="weather icon" 
      />
      <p>Temperature: {weatherData.temperature}°C</p>
      <p>Humidity: {weatherData.humidity}%</p>
      <p>Condition: {weatherData.description}</p>
      <p>Wind Speed: {weatherData.wind_speed} m/s</p>
      <p>Local Time: {weatherData.local_time}</p>
    </div>
  ) : (
    <p>Loading current weather...</p>
  )
}

      {/* Weather Forecast */}
      <h2>Weather Forecast</h2>
      <div className="forecast-container">
        {forecastData.length > 0 ? (
          forecastData.map((day, index) => (
            <div key={index} className="forecast-card">
              <p>{moment.unix(day.datetime).format('dddd, MMM Do')}</p>
              <img 
                src={`http://openweathermap.org/img/wn/${day.icon}.png`} 
                alt="weather icon" 
              />
              <p>Temperature: {day.temperature}°C</p>
              <p>Condition: {day.description}</p>
            </div>
          ))
        ) : (
          <p>Loading forecast...</p>
        )}
      </div>

      {/* Wind and Precipitation Visualization */}
      <WindVisualization />

      {/* Dark Mode Toggle Button */}
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </div>
  );
};

// Wind Visualization Component
const WindVisualization = () => {
  const data = [
    { time: '08:00', windSpeed: 10 },
    { time: '10:00', windSpeed: 15 },
    { time: '11:00', windSpeed: 12 },
    { time: '12:00', windSpeed: 12 },
    { time: '13:00', windSpeed: 12 },
    { time: '14:00', windSpeed: 14 },
    { time: '15:00', windSpeed: 14 },
    { time: '16:00', windSpeed: 12 },
  ];

  return (
    <LineChart width={600} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="windSpeed" stroke="#8884d8" />
    </LineChart>
  );
};

export default App;

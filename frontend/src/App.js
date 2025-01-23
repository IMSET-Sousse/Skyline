import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './components/Map';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import WindVisualization from './components/WindVisualization'; // Import WindVisualization
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (city) {
      // Fetch latitude and longitude for the city
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cefb9d99cecdefb55752d197c9a8a54b`)
        .then((response) => {
          const { lat, lon } = response.data.coord;
          setLatitude(lat);
          setLongitude(lon);
        })
        .catch((err) => {
          console.error(err);
          setError('City not found or server error.');
        });

      // Fetch weather and forecast data
      axios
        .get(`http://127.0.0.1:5000/weather?city=${city}`)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((err) => {
          console.error(err);
          setError('Error fetching weather data');
        });

      axios
        .get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=cefb9d99cecdefb55752d197c9a8a54b&units=metric`)
        .then((response) => {
          setForecastData(response.data);
        })
        .catch((err) => {
          console.error(err);
          setError('Error fetching forecast data');
        });
    }
  }, [city]);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
      <div className="image-banner">
        <img src="/image/weather.png" alt="Weather Banner" />
      </div>

      <div className="container">
        <div className='weather-wind'>
        <SearchBar setCity={setCity} city={city} />
        {error && <p className="error">{error}</p>}
        {weatherData && <WeatherCard weatherData={weatherData}  />}
       
        
        {/* Wind Visualization Card */}
        {forecastData && (
          <div className="card">
            <h3>Wind Speed Visualization</h3>
            <WindVisualization forecastData={forecastData} />
          </div>
        )}
        </div>
   {forecastData && <Forecast forecastData={forecastData} />}
        {/* Integrate the MapComponent */}
        {latitude && longitude && (
          <MapComponent city={city} latitude={latitude} longitude={longitude} />
        )}
      </div>

      <footer className="footer">
        <p>Skyline@ All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

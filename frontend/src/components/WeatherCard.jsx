import React from "react";
import WindVisualization from "./WindVisualization"; // Import the WindVisualization component

const WeatherCard = ({ weatherData, forecastData }) => {
  const hasForecastData = forecastData && forecastData.list;

  return (
    <div className="weather-card-container">
      <div className="row">
        {/* Current Weather Card */}
        <div className="current-weather-card card">
          <h3>{weatherData.city_name}</h3>
          <h2>{weatherData.current.temp}°C</h2>
          <div className="current-weather-content">
            <div className="weather-data-column">
              <p>🌡️ <strong>Temperature:</strong> {weatherData.current.temp}°C</p>
              <p>💧 <strong>Humidity:</strong> {weatherData.current.humidity}%</p>
              <p>☁️ <strong>Condition:</strong> {weatherData.current.condition}</p>
              <p>⏰ <strong>Local Time:</strong> {weatherData.current.local_time}</p>
              <p>🌬️ <strong>Wind Speed:</strong> {weatherData.current.wind_speed.toFixed(1)} km/h</p>
            </div>
            <div className="wind-visualization">
              <p>wind speed arrow rotate</p>
              <div
                className="wind-direction"
                style={{
                  transform: `rotate(${weatherData.current.wind_direction}deg)`,
                }}
              >
                ➤
              </div>
              <p className="wind-speed">
                {weatherData.current.wind_speed.toFixed(1)} km/h
              </p>
            </div>
          </div>
        </div>

        {/* Wind Speed Visualization Card */}
        {hasForecastData && (
          <div className="card wind-visualization-card">
            <h4>Wind Speed Visualization</h4>
            <WindVisualization forecastData={forecastData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;

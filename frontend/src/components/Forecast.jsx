function Forecast({ forecastData }) {
    return (
      <div className="forecast">
        <h3>5-Day Forecast</h3>
        <div className="forecast-container row">
          {forecastData.list
            .filter((item, index) => index % 8 === 0) // Get one forecast per day
            .map((forecast, index) => (
              <div key={index} className="forecast-card card column">
                <h4>{new Date(forecast.dt_txt).toLocaleDateString()}</h4>
                <p>🌡️ Temp: {forecast.main.temp}°C</p>
                <p>💧 Humidity: {forecast.main.humidity}%</p>
                <p>☁️ Condition: {forecast.weather[0].description}</p>
                <p>🌬️ Wind Speed: {forecast.wind.speed} m/s</p>
                <div className="wind-visualization">
                  <div
                    className="wind-direction"
                    style={{
                      transform: `rotate(${forecast.wind.deg}deg)`,
                    }}
                  >
                    ➤
                  </div>
                  <p className="wind-speed">{forecast.wind.speed} m/s</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
  
  export default Forecast;
  
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const WindVisualization = ({ forecastData }) => {
  // Check if forecastData is available and if it contains a list property
  if (!forecastData || !forecastData.list) {
    return <div>No forecast data available</div>;
  }

  // Extract wind speed and time for the graph
  const windSpeedData = forecastData.list.map(forecast => ({
    time: forecast.dt_txt.split(' ')[1], // Extract the time (HH:MM:SS) from dt_txt
    windSpeed: forecast.wind.speed, // Wind speed (in km/h)
  }));

  return (
    <div className="wind-speed-graph-column">
      
      <LineChart width={800} height={200} data={windSpeedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="windSpeed" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default WindVisualization;

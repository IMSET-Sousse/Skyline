from flask import Flask, request, jsonify
import requests
from datetime import datetime, timedelta
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

WEATHER_API_KEY = 'cefb9d99cecdefb55752d197c9a8a54b'
WEATHER_API_URL = "http://api.openweathermap.org/data/2.5/weather"
FORECAST_API_URL = "http://api.openweathermap.org/data/2.5/forecast"

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city', '')
    if not city:
        return jsonify({'error': 'City parameter is required'}), 400

    try:
        weather_response = requests.get(
            WEATHER_API_URL,
            params={'q': city, 'appid': WEATHER_API_KEY, 'units': 'metric'}
        )
        weather_response.raise_for_status()
        weather_data = weather_response.json()

        city_name = weather_data['name']
        temp = weather_data['main']['temp']
        humidity = weather_data['main']['humidity']
        wind_speed = weather_data['wind']['speed']
        condition = weather_data['weather'][0]['description']
        city_timezone_offset = weather_data['timezone']
        utc_time = datetime.utcnow()
        local_time = utc_time + timedelta(seconds=city_timezone_offset)
        formatted_local_time = local_time.strftime('%Y-%m-%d %H:%M:%S')
        wind_degree = weather_data['wind'].get('deg', 0)  # Default to 0 if missing

        return jsonify({
            'city_name': city_name,
            'current': {
                'temp': temp,
                'humidity': humidity,
                'condition': condition,
                'local_time': formatted_local_time,
                'wind_speed': wind_speed * 3.6,
                'wind_degree': wind_degree 
            }
        })
    except requests.exceptions.RequestException as e:
        app.logger.error(f"Error fetching weather data: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/forecast', methods=['GET'])
def get_forecast():
    city = request.args.get('city', '')
    if not city:
        return jsonify({'error': 'City parameter is required'}), 400

    try:
        forecast_response = requests.get(
            FORECAST_API_URL,
            params={'q': city, 'appid': WEATHER_API_KEY, 'units': 'metric'}
        )
        forecast_response.raise_for_status()
        forecast_data = forecast_response.json()

        forecast = [
            {
                'date': datetime.utcfromtimestamp(item['dt']).strftime('%Y-%m-%d'),
                'temp': item['main']['temp'],
                'humidity': item['main']['humidity'],
                'condition': item['weather'][0]['description'],
                'wind_speed': item['wind']['speed'] * 3.6,
                'wind_degree': item['wind'].get('deg', 0) 
            }
            for item in forecast_data['list'][::8]
        ]

        return jsonify({'forecast': forecast})
    except requests.exceptions.RequestException as e:
        app.logger.error(f"Error fetching forecast data: {e}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)

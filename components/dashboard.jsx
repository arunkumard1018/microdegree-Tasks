import { useState, useEffect } from 'react';
import WeatherCard from '../components/weatherCard';

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // To Fetch The Data By Accessing Users Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error fetching geolocation:', error);
          // Default Values
          setLatitude(35.7796);
          setLongitude(-78.6382);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Default Values
      setLatitude(35.7796);
      setLongitude(-78.6382);
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      fetch(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=YOUR_API_KEY`)
        .then((res) => res.json())
        .then((data) => setWeatherData(data))
        .catch((error) => console.error('Error fetching weather data:', error));
    }
  }, [latitude, longitude]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Weather Dashboard</h1>
      <div className="mb-6">
        {weatherData ? <WeatherCard weatherData={weatherData} /> : <p>Loading...</p>}
      </div>
    </div>
  );l̥
}

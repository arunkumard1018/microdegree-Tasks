"use client"
import React, { useEffect, useState } from 'react';


const WeatherCard = ({ weatherData }: { weatherData: any }) => {
    if (!weatherData || !weatherData.data || !weatherData.data[0]) {
        return <p className="text-white text-lg">Loading...</p>;
    }
    const data = weatherData.data[0];
    const weather = data.weather;
    return (
        <div>
            <div className='flex items-center justify-center flex-col space-y-3 '>
                <div className='flex items-center justify-center'>
                    <h2 className="text-5xl  text-white font-thin">{data.city_name}</h2>
                    <img
                        src={`https://www.weatherbit.io/static/img/icons/${weather.icon}.png`}
                        alt="Weather icon"
                        className="w-12 h-12"
                    />
                </div>
                <p className="text-lg text-white">Weather : <span className="font-semibold">{weather.description}</span></p>
                <img
                    src={`cloud.png`}
                    alt="Weather icon"
                    className="w-12 h-12"
                />
                <p className="font-bold text-2xl">Temperature: <span className="font-semibold">{data.temp}°C</span></p>

            </div>
            <div className='grid grid-cols-2 gap-20 mt-10'>
                
                <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6 transform transition duration-500 hover:scale-105">
                    <div className="space-y-2">
                        <p className="text-gray-700 text-lg">Feels Like: <span className="font-semibold">{data.app_temp}°C</span></p>
                        <p className="text-gray-700 text-lg">Weather: <span className="font-semibold">{weather.description}</span></p>
                        <p className="text-gray-700 text-lg">Wind Speed: <span className="font-semibold">{data.wind_spd} m/s</span></p>
                        <p className="text-gray-700 text-lg">Humidity: <span className="font-semibold">{data.rh}%</span></p>
                        <p className="text-gray-700 text-lg">Pressure: <span className="font-semibold">{data.pres} hPa</span></p>
                        <p className="text-gray-700 text-lg">Visibility: <span className="font-semibold">{data.vis} km</span></p>
                        <div className="flex justify-between text-gray-700 text-lg">
                            <p>Sunrise: <span className="font-semibold">{data.sunrise}</span></p>
                            <p>Sunset: <span className="font-semibold">{data.sunset}</span></p>
                        </div>
                    </div>
                </div>
                <AirQualityCard city={data.city_name} />
            </div>
        </div>
    );
};

export default WeatherCard;


const AirQualityCard = ({ city = "banglore"}:{city?:string}) => {
    const [airQualityData, setAirQualityData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&country=india&key=API_KEY`)
            .then((res) => res.json())
            .then((data) => {
                setAirQualityData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
                setError('Failed to fetch data.');
                setLoading(false);
            });
    }, [city]);

    if (loading) {
        return <p className="text-white text-lg">Loading...</p>;
    }
    if (error) {
        return <p className="text-red-500 text-lg">{error}</p>;
    }
    const data = airQualityData.data[0];
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6 transform transition duration-500 hover:scale-105">
            <div className="space-y-2">
                <p className="text-gray-700 text-lg">Air Quality Index (AQI): <span className="font-semibold">{data.aqi}</span></p>
                <p className="text-gray-700 text-lg">SO2 (Sulfur Dioxide): <span className="font-semibold">{data.so2} µg/m³</span></p>
                <p className="text-gray-700 text-lg">NO2 (Nitrogen Dioxide): <span className="font-semibold">{data.no2} µg/m³</span></p>
                <p className="text-gray-700 text-lg">O3 (Ozone): <span className="font-semibold">{data.o3} µg/m³</span></p>
                <p className="text-gray-700 text-lg">PM2.5 (Fine Particulate Matter): <span className="font-semibold">{data.pm25} µg/m³</span></p>
                <p className="text-gray-700 text-lg">PM10 (Coarse Particulate Matter): <span className="font-semibold">{data.pm10} µg/m³</span></p>
            </div>
        </div>
    );
};



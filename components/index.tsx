"use client"
import WeatherCard from '@/components/WeatherCard';
import { useState, useEffect } from 'react';

export default function Home() {
    const [weatherData, setWeatherData] = useState<any>();
    const [latitude, setLatitude] = useState<any>();
    const [longitude, setLongitude] = useState<any>();
    const [city, setcity] = useState('')

    function handleInput() {
        console.log(city);
        fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&country=india&key=9b8390cacfa94992ac34a38ea0a60cf6`)
            .then((res) => res.json())
            .then((data) => setWeatherData(data))
            .catch((error) => console.error('Error fetching weather data:', error));
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error('Error fetching geolocation:', error);
                    // Default coordinates if location access is denied
                    setLatitude(35.7721);
                    setLongitude(-78.63861);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            // Set default coordinates
            setLatitude(35.7721);
            setLongitude(-78.63861);
        }
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            // fetch(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=YOUR_API_KEY`)
            fetch(`https://api.weatherbit.io/v2.0/current?city=${"Banglore"}&country=india&key=9b8390cacfa94992ac34a38ea0a60cf6`)
                .then((res) => res.json())
                .then((data) => setWeatherData(data))
                .catch((error) => console.error('Error fetching weather data:', error));
        }
    }, [latitude, longitude,]);

    return (
        <div className='bg-[#153357] '>
            <nav className='h-16 flex items-center justify-between mx-44 space-x-2  pt-8'>
                <h1 className="text-4xl font-bold text-white">WEATHER APP</h1>
                <div className='flex'>
                    <div className='border rounded-md  border-white'>
                        <input type="text" value={city} onChange={(e) => setcity(e.target.value)}
                            className='px-3 rounded-md bg-[#264974] border-white py-1 ' placeholder='Search City' /></div>
                    <div onClick={handleInput} className=' p-1 px-2 rounded-md bg-slate-300 text-black hover:cursor-pointer hover:bg-slate-500'>Search</div>
                </div>
            </nav>
            <div className="min-h-screen bg-[#153357] flex flex-col items-center pt-10">
                <div className='flex items-center justify-center'>
                </div>
                {weatherData && <WeatherCard weatherData={weatherData} />}
            </div>
        </div>
    );
}

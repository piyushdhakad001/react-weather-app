import { useEffect, useState } from "react";
import "./App.css"
function App() {
  const [userCity, setUserCity] = useState('london');
  const [weatherData, setWeatherData] = useState(null);
  
  

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

 const getweather = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(userCity.trim())}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }

    setWeatherData(data);
    localStorage.setItem("data", JSON.stringify(data));
  } catch (error) {
    alert("Something went wrong. Check your connection.");
  }
};

  const handleClick = () => {
    getweather();
  }

  useEffect(() => {
  try {
    const savedWeather = JSON.parse(localStorage.getItem("data"));

    if (savedWeather?.weather?.[0] && savedWeather?.main) {
      setWeatherData(savedWeather);
      setUserCity(savedWeather.name);
      return;
    }
  } catch (error) {
    localStorage.removeItem("data");
  }

  getweather();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  return (
    <div className="container">
      <div className="search-container">
        <input className="input"
          type="text"
          placeholder="Enter your city"
          value={userCity}
          onChange={(e) => setUserCity(e.target.value)}
           onKeyDown={(e) => {
    if (e.key === "Enter") getweather();
  }}
        />
        <button className="search" onClick={handleClick}>Search</button>
      </div>

      <div className="loading"></div>

     {weatherData && (
  <div className="details">
    <p className="weather">{weatherData.weather[0].main}</p>
    <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
    <p className="city">{weatherData.name}</p>
    <p className="humidity">{weatherData.main.humidity}% Humidity</p>
    <p className="wind">{Math.round(weatherData.wind.speed * 3.6)} km/h Wind Speed</p>
  </div>
)}
    </div>
  )
}
export default App;
import { useEffect, useState } from "react";
import "./App.css"
function App() {
  const [userCity, setUserCity] = useState('london');
  const [weatherData, setWeatherData] = useState(null);
  
  

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const getweather = async () => {
    try{
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${API_KEY}`,
    )
    const data = await response.json();
    setWeatherData(data)
    localStorage.setItem("data", JSON.stringify(data));
  } catch(error) {
     console.log(error)
  }
}

  const handleClick = () => {
    getweather();
  }

  useEffect(() => {
    const savedWeather = localStorage.getItem("data")

    if(savedWeather){
      setWeatherData(JSON.parse(savedWeather));
    } else {
      getweather();
    }    
  }, [])


  return (
    <div className="container">
      <div className="search-container">
        <input className="input"
          type="text"
          placeholder="Enter your city"
          value={userCity}
          onChange={(e) => setUserCity(e.target.value)}
        />
        <button className="search" onClick={handleClick}>Search</button>
      </div>

      <div className="loading"></div>

      <div className="details">
        <p className="weather">{weatherData?.weather?.[0].main}</p>
        <p className="temp">{Math.round(weatherData?.main.temp - 273.15)}°C</p>
        <p className="city">{weatherData?.name}</p>

        <p className="humidity">{weatherData?.main.humidity}% Humidity</p>

        <p className="wind">{weatherData?.wind.speed} km/hr Wind-Speed</p>
      </div>
    </div>
  )
}
export default App;
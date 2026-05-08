import './Weather.css'
import {useRef, useState} from "react";

function App() {
  const API_KEY = 'd496c449c2698f63c261202cd8904dc1';

  const cityInputRef = useRef(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

const fetchWeather = async (e) => {
  e.preventDefault();
  //Через DOM дістаємо назву міста
  const city = cityInputRef.current.value.trim();
  if(!city) return;
  setLoading(true);
  setError(null);
  setWeather(null);
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=uk`);
    if(!response.ok){
      throw new Error('Місто не знайдено');
    }
    const data = await response.json();
    setWeather(data);
  }catch(err){
    setError(err.message);
  }finally{
    setLoading(false);
  }
}

  return (
    <div className="weather-container">
      <h2>Прогноз погоди</h2>

      <form onSubmit={fetchWeather} className="search-form">
        <input
          type="text"
          placeholder="Введіть назву міста"
          ref={cityInputRef} //Прив'язка ref
        />
        <button type={"submit"}>Пошук</button>
      </form>
      {loading && <div className="loader">Завантаження...</div>}
      {error && <div className="error">{error}</div>}
      { weather &&
        <div className="weather-info">
          <h3>{weather.name}, {weather.sys.country}</h3>
          <div className="temp">{Math.round(weather.main.temp)} °C</div>
          <p className="description">{weather.weather[0].description}</p>
          <div className="details">
            <span>Вологість: {weather.main.humidity} %</span>
            <span>Вітер: {weather.wind.speed} м/с</span>
          </div>
        </div>
      }
    </div>
  )
}

export default App

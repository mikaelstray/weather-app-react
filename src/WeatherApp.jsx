// eslint-disable-next-line no-unused-vars
    import React, {useState} from 'react';
    import axios from 'axios';

    const App = () => {
        const [city, setCity] = useState('');
        const [unit, setUnit] = useState('metric');
        const [weatherData, setWeatherData] = useState(null);
        const [error, setError] = useState(false);

        const fetchWeather = async () => {
            try {
                const apiKey = 'a5878ad5ca6c15e431d4356300e2c71f';
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`);
                if (response) {
                    setWeatherData(response.data);
                    setError(false);
                    console.log("ok")
                } else {
                    console.log("fetch ok but http fail")
                }
            } catch (error) {
                console.log("promise failed")
                setError(true);
                setWeatherData(null);
            }
        };


        return (
            <div>
                <h1>Weather App</h1>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={fetchWeather}>Get Weather</button>
                {error && <p className="error">{"No city was found"}</p>}
                {weatherData && (
                    <div className="weather-data">
                        <h2>{weatherData.name}</h2>
                        <p>Temperature: {weatherData.main.temp} {unit === 'metric' ? '°C' : '°F'}</p>
                        <p>Humidity: {weatherData.main["humidity"]}</p>
                        <span className={"unit-chooser"}>
                            <select value={unit} onClick={fetchWeather} onChange={(e) => setUnit(e.target.value)}>
                                <option value="metric">Celsius</option>
                                <option value="imperial">Fahrenheit</option>
                            </select>
                        </span>
                    </div>
                )}
            </div>
        );
    };

    export default App;

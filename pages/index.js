import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { Search } from "../components/Search";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";
import * as config from '../config.json'
export const App = () => {
  const [cityInput, setCityInput] = useState("Riga");
  const [triggerFetch, setTriggerFetch] = useState(true);
  const [weatherData, setWeatherData] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");

  function transformJson(currentJson) {
    

    const latitude = currentJson.latitude;
    const longitude = currentJson.longitude;
    const currentTime = currentJson.current.time;
    const temperature = currentJson.current.temperature_2m;
    const feelsLike = currentJson.current.apparent_temperature;
    const humidity = currentJson.current.relative_humidity_2m;
    const windSpeed = currentJson.current.wind_speed_10m;
    const windDirection = currentJson.current.wind_direction_10m;
    const maxTemp = currentJson.daily.temperature_2m_max[0];
    const minTemp = currentJson.daily.temperature_2m_min[0];
    const sunrise = currentJson.daily.sunrise[0];
    const sunset = currentJson.daily.sunset[0];
    const cloud = currentJson.current.cloud_cover;
    


    const referenceJson = {
        "coord": {
            "lon": longitude,
            "lat": latitude
        },
        "weather": [
            {
                "id": 802,
                "main": "Clouds",
                
                "icon": "03d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": temperature,
            "feels_like": feelsLike,
            "temp_min": minTemp,
            "temp_max": maxTemp,
            "humidity": humidity,
        },
        "visibility": 10000, 
        "wind": {
            "speed": windSpeed,
            "deg": windDirection
        },
        "clouds": {
            "all": cloud  
        },
        "dt": currentTime,
        "sys": {
            "type": 2,
            "id": 2075320, 
            "country": config.country, 
            "sunrise": sunrise,  
            "sunset": sunset  
        },
        "timezone": 0, 
        "id": 456173, 
        "name": config.cityName, 

    };

    return referenceJson;
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cityInput }),
      });
      const data = await res.json();
      const t = transformJson(data);
      setWeatherData({ ...t });
      setCityInput("");
    };
    getData();
  }, [triggerFetch]);

  const changeSystem = () =>
    unitSystem == "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

  return weatherData && !weatherData.message ? (
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData.name}
        country={weatherData.sys.country}
        description={weatherData.weather[0].description}
        iconName={weatherData.weather[0].icon}
        unitSystem={unitSystem}
        weatherData={weatherData}

      />
      <ContentBox>
        <Header>
         
          {/* <Search
            placeHolder="Search a city..."
            value={cityInput}
            onFocus={(e) => {
              e.target.value = "";
              e.target.placeholder = "";
            }}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={(e) => {
              e.keyCode === 13 && setTriggerFetch(!triggerFetch);
              e.target.placeholder = "Search a city...";
            }}
          /> */}
        </Header>
        
        {/* <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} /> */}
      </ContentBox>
    </div>
  ) : weatherData && weatherData.message ? (
    <ErrorScreen errorMessage="City not found, try again!">
      <Search
        onFocus={(e) => (e.target.value = "")}
        onChange={(e) => setCityInput(e.target.value)}
        onKeyDown={(e) => e.keyCode === 13 && setTriggerFetch(!triggerFetch)}
      />
    </ErrorScreen>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;

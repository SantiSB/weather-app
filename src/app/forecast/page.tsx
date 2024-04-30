'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  fetchLocationByCity,
  fetchLocationByZip,
  Location,
} from "@/services/fetch";
import { fetchWeatherByCoordinates, WeatherData } from "@/services/fetch";
import styles from "./page.module.scss";

interface WeatherDay {
  dt: number; // Unix timestamp
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number; // Probability of precipitation
}

const Forecast: React.FC = () => {
  const searchParams = useSearchParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [fiveDayForecast, setFiveDayForecast] = useState<WeatherDay[]>([]);

  const city = searchParams.get("city");
  const zip = searchParams.get("zip");
  const country = searchParams.get("country");

  useEffect(() => {
    // Fetch location based on input parameters
    const fetchLocation = async () => {
      try {
        if (city) {
          const locations = await fetchLocationByCity(
            city,
            "",
            country ? country : ""
          );
          if (locations.length > 0) {
            setLocation(locations[0]);
          }
        } else if (zip && country) {
          const data = await fetchLocationByZip(zip, country);
          setLocation(data);
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };
    fetchLocation();
  }, [city, zip, country]);

  useEffect(() => {
    if (location) {
      const fetchWeather = async () => {
        try {
          const weatherData = await fetchWeatherByCoordinates(
            location.lat,
            location.lon
          );
          setWeather(weatherData);
          if (weatherData && weatherData.list) {
            const forecastMap = new Map();
            // Assuming each timestamp is separated by 3 hours
            weatherData.list.forEach((item) => {
              const date = new Date(item.dt * 1000).toDateString();
              if (!forecastMap.has(date) && forecastMap.size < 5) {
                forecastMap.set(date, item);
              }
            });
            setFiveDayForecast(Array.from(forecastMap.values()));
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
      fetchWeather();
    }
  }, [location]);

  if (!location || !weather || fiveDayForecast.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Clima en {location.name}</h1>
      <div className={styles.locationContainer}>
        <p>Busqueda realizada por: {city ? "Ciudad" : "Código Postal"}</p>
        {zip && <p>Código de país: {location.country}</p>}
        {fiveDayForecast.map((day, index) => (
          <div key={index}>
            <p>
              Día {index + 1}: {new Date(day.dt * 1000).toDateString()} - Temp:{" "}
              {(day.main.temp - 273.15).toFixed(1)}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;

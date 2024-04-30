"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.scss";
import {
  fetchLocationByCity,
  fetchLocationByZip,
  fetchWeatherByCoordinates,
} from "@/services/fetch";
import { Location } from "@/types/location";
import { WeatherData, WeatherDay } from "@/types/weather";

const Forecast: React.FC = () => {
  const searchParams = useSearchParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [fiveDayForecast, setFiveDayForecast] = useState<WeatherDay[]>([]);

  const city = searchParams.get("city");
  const zip = searchParams.get("zip");
  const country = searchParams.get("country");

  useEffect(() => {
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
            weatherData.list.forEach((item) => {
              const date = new Date(item.dt * 1000).toDateString();
              if (!forecastMap.has(date) && forecastMap.size < 6) {
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
          <div
            key={index}
            className={
              index === 0 ? styles.currentDayForecast : styles.dayForecast
            }
          >
            <h3>
              {index === 0 ? "Hoy" : `Día ${index}:`}{" "}
              {new Date(day.dt * 1000).toLocaleDateString()}
            </h3>
            <p>
              Temperatura: {(day.main.temp - 273.15).toFixed(1)}°C (Min:{" "}
              {(day.main.temp_min - 273.15).toFixed(1)}°C, Max:{" "}
              {(day.main.temp_max - 273.15).toFixed(1)}°C)
            </p>
            <p>
              Sensación térmica: {(day.main.feels_like - 273.15).toFixed(1)}°C
            </p>
            <p>
              Presión: {day.main.pressure} hPa, Humedad: {day.main.humidity}%
            </p>
            <p>Visibilidad: {day.visibility / 1000} km</p>
            <p>
              Velocidad del viento: {day.wind.speed} m/s, Dirección:{" "}
              {day.wind.deg}°
            </p>
            {day.rain && <p>Lluvia: {day.rain["3h"]} mm</p>}
            {day.snow && <p>Nieve: {day.snow["3h"]} mm</p>}
            <p>Nubosidad: {day.clouds.all}%</p>
            <p>Probabilidad de precipitación: {(day.pop * 100).toFixed(0)}%</p>
            {day.weather.map((w, wi) => (
              <div key={wi}>
                <p>
                  {w.main}: {w.description}
                </p>
                <Image
                  src={`http://openweathermap.org/img/wn/${w.icon}.png`}
                  alt="Weather icon"
                  width={50}
                  height={50}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;

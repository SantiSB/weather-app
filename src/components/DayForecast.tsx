import React from "react";
import Image from "next/image";
import styles from "./DayForecast.module.scss";
import { DayForecastProps } from "@/types/dayForecast";

const DayForecast: React.FC<DayForecastProps> = ({ day, index }) => {
  return (
    <div key={index} className={styles.dayForecast}>
      <h3>
        Día {index + 1}: {new Date(day.dt * 1000).toLocaleDateString()}
      </h3>
      <p>
        Temperatura: {(day.main.temp - 273.15).toFixed(1)}°C (Min:{" "}
        {(day.main.temp_min - 273.15).toFixed(1)}°C, Max:{" "}
        {(day.main.temp_max - 273.15).toFixed(1)}°C)
      </p>
      <p>Sensación térmica: {(day.main.feels_like - 273.15).toFixed(1)}°C</p>
      <p>
        Presión: {day.main.pressure} hPa, Humedad: {day.main.humidity}%
      </p>
      <p>Visibilidad: {day.visibility / 1000} km</p>
      <p>
        Velocidad del viento: {day.wind.speed} m/s, Dirección: {day.wind.deg}°
      </p>
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
  );
};

export default DayForecast;

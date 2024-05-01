import React from "react";
import Image from "next/image";
import styles from "./DayForecast.module.scss";
import { DayForecastProps } from "@/types/dayForecast";

const DayForecast: React.FC<DayForecastProps> = ({ day, index }) => {
  return (
    <div key={index} className={styles.dayForecast}>
      {day.weather.map((w, wi) => (
        <div key={wi}>
          <Image
            src={`http://openweathermap.org/img/wn/${w.icon}.png`}
            alt={`${w.main}: ${w.description}`}
            width={50}
            height={50}
          />
        </div>
      ))}
      <h4>
        {new Date(day.dt * 1000).toLocaleDateString()}
      </h4>
      <p>
        Temperature: {(day.main.temp - 273.15).toFixed(1)}°C
      </p>
      <p>
        Min temperature: {(day.main.temp_min - 273.15).toFixed(1)}°C
      </p>
      <p>
        Max temperature: {(day.main.temp_max - 273.15).toFixed(1)}°C
      </p>
      <p>Feels like: {(day.main.feels_like - 273.15).toFixed(1)}°C</p>
      <p>Visibility: {day.visibility / 1000} km</p>
      <p>
        Wind speed: {day.wind.speed} m/s, {day.wind.deg}°
      </p>
      <p>Cloudiness: {day.clouds.all}%</p>
      <p>Precipitation probability: {(day.pop * 100).toFixed(0)}%</p>
    </div>
  );
};

export default DayForecast;

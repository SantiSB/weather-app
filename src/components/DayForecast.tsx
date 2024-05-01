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
      <h4>{new Date(day.dt * 1000).toLocaleDateString()}</h4>
      <p>
        <strong>Temperature:</strong> {(day.main.temp - 273.15).toFixed(1)}°C
      </p>
      <p>
        <strong>Min temperature:</strong>{" "}
        {(day.main.temp_min - 273.15).toFixed(1)}°C
      </p>
      <p>
        <strong>Max temperature:</strong>{" "}
        {(day.main.temp_max - 273.15).toFixed(1)}°C
      </p>
      <p>
        <strong>Feels like:</strong> {(day.main.feels_like - 273.15).toFixed(1)}
        °C
      </p>
      <p>
        <strong>Visibility:</strong> {day.visibility / 1000} km
      </p>
      <p>
        <strong>Wind speed:</strong> {day.wind.speed} m/s, {day.wind.deg}°
      </p>
      <p>
        <strong>Cloudiness:</strong> {day.clouds.all}%
      </p>
      <p>
        <strong>Precipitation probability:</strong> {(day.pop * 100).toFixed(0)}
        %
      </p>
    </div>
  );
};

export default DayForecast;

import Image from "next/image";
import styles from "./CurrentDay.module.scss";
import { CurrentDayForecastProps } from "@/types/currentDay";

export default function CurrentDay({
  currentDayForecast,
  hourlyTemperatures,
}: CurrentDayForecastProps) {
  return (
    <div className={styles.currentDayForecast}>
      <h3>
        Hoy: {new Date(currentDayForecast.dt * 1000).toLocaleDateString()}
      </h3>
      <div>
        {hourlyTemperatures.map((temp, index) => (
          <p key={index}>
            {new Date(temp.dt * 1000).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            - Temp: {(temp.main.temp - 273.15).toFixed(1)}°C
          </p>
        ))}
      </div>
      {currentDayForecast.weather.map((w, wi) => (
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
      <p>Temperatura: {(currentDayForecast.main.temp - 273.15).toFixed(1)}°C</p>
      <p>
        Sensación térmica:{" "}
        {(currentDayForecast.main.feels_like - 273.15).toFixed(1)}°C
      </p>
      <p>
        Presión: {currentDayForecast.main.pressure} hPa, Humedad:{" "}
        {currentDayForecast.main.humidity}%
      </p>
      <p>Visibilidad: {currentDayForecast.visibility / 1000} km</p>
      <p>
        Velocidad del viento: {currentDayForecast.wind.speed} m/s, Dirección:{" "}
        {currentDayForecast.wind.deg}°
      </p>
      <p>Nubosidad: {currentDayForecast.clouds.all}%</p>
      <p>
        Probabilidad de precipitación:{" "}
        {(currentDayForecast.pop * 100).toFixed(0)}%
      </p>
    </div>
  );
}

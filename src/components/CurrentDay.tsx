import Image from "next/image";
import styles from "./CurrentDay.module.scss";
import { CurrentDayForecastProps } from "@/types/currentDay";
import WeatherChart from "./WeatherChart";

export default function CurrentDay({
  currentDayForecast,
  hourlyTemperatures,
}: CurrentDayForecastProps) {
  return (
    <div className={styles.currentDayForecast}>
      <h3>
        Hoy: {new Date(currentDayForecast.dt * 1000).toLocaleDateString()}
      </h3>
      <div className={styles.content}>
        <div className={styles.chart}>
          <WeatherChart hourlyTemperatures={hourlyTemperatures} />
        </div>
        <div className={styles.details}>
          <div className={styles.cloudInfo}>
            {currentDayForecast.weather.map((weather, index) => (
              <div key={index} className={styles.weatherDetail}>
                <Image
                  src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                  alt="Weather icon"
                  width={50}
                  height={50}
                />
                <p>
                  {weather.main}: {weather.description}
                </p>
              </div>
            ))}
          </div>
          <div className={styles.additionalInfo}>
            <p>
              Temperatura: {(currentDayForecast.main.temp - 273.15).toFixed(1)}
              °C
            </p>
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
              Velocidad del viento: {currentDayForecast.wind.speed} m/s,
              Dirección: {currentDayForecast.wind.deg}°
            </p>
            <p>Nubosidad: {currentDayForecast.clouds.all}%</p>
            <p>
              Probabilidad de precipitación:{" "}
              {(currentDayForecast.pop * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

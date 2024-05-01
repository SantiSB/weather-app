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
                <p><strong>{weather.description.toLocaleUpperCase()}</strong></p>
              </div>
            ))}
          </div>
          <div className={styles.additionalInfo}>
            <p>
              <strong>Temperature:</strong>{" "}
              {(currentDayForecast.main.temp - 273.15).toFixed(1)}°C
            </p>
            <p>
              <strong>Feels like:</strong>{" "}
              {(currentDayForecast.main.feels_like - 273.15).toFixed(1)}°C
            </p>
            <p>
              <strong>Pressure:</strong> {currentDayForecast.main.pressure} hPa,{" "}
              <strong>Humidity:</strong> {currentDayForecast.main.humidity}%
            </p>
            <p>
              <strong>Visibility:</strong>{" "}
              {currentDayForecast.visibility / 1000} km
            </p>
            <p>
              <strong>Wind Speed:</strong> {currentDayForecast.wind.speed} m/s,{" "}
              <strong>Direction:</strong> {currentDayForecast.wind.deg}°
            </p>
            <p>
              <strong>Cloudiness:</strong> {currentDayForecast.clouds.all}%
            </p>
            <p>
              <strong>Probability of Precipitation:</strong>{" "}
              {(currentDayForecast.pop * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

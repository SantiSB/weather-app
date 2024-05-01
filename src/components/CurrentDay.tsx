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
        Today: {new Date(currentDayForecast.dt * 1000).toLocaleDateString()}
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
                  width={70}
                  height={70}
                />
                <p>
                  {weather.main}: {weather.description}
                </p>
              </div>
            ))}
          </div>
          <div className={styles.additionalInfo}>
            <p>
              Temperature: {(currentDayForecast.main.temp - 273.15).toFixed(1)}
              °C
            </p>
            <p>
              Feels like:{" "}
              {(currentDayForecast.main.feels_like - 273.15).toFixed(1)}°C
            </p>
            <p>
              Pressure: {currentDayForecast.main.pressure} hPa, Humidity:{" "}
              {currentDayForecast.main.humidity}%
            </p>
            <p>Visibility: {currentDayForecast.visibility / 1000} km</p>
            <p>
              Wind Speed: {currentDayForecast.wind.speed} m/s,
              Direction: {currentDayForecast.wind.deg}°
            </p>
            <p>Cloudiness: {currentDayForecast.clouds.all}%</p>
            <p>
              Probability of Precipitation:{" "}
              {(currentDayForecast.pop * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

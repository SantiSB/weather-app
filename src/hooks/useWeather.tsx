'use client'
import { useEffect, useState } from "react";
import { fetchWeatherByCoordinates } from "@/services/fetch";
import { Location } from "@/types/location";
import { WeatherData, WeatherDay } from "@/types/weather";

const useWeatherData = (location: Location | null) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [currentDayForecast, setCurrentDayForecast] =
    useState<WeatherDay | null>(null);
  const [fiveDayForecast, setFiveDayForecast] = useState<WeatherDay[]>([]);
  const [hourlyTemperatures, setHourlyTemperatures] = useState<WeatherDay[]>(
    []
  );

  useEffect(() => {
    const fetchWeather = async () => {
      if (location) {
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
              if (!forecastMap.has(date)) {
                forecastMap.set(date, []);
              }
              forecastMap.get(date).push(item);
            });
            const sortedDates = Array.from(forecastMap.keys()).sort(
              (a, b) => new Date(a).getTime() - new Date(b).getTime()
            );
            const today = sortedDates.shift();
            setCurrentDayForecast(forecastMap.get(today)[0]);
            setHourlyTemperatures(forecastMap.get(today));
            setFiveDayForecast(
              sortedDates.map((date) => forecastMap.get(date)[0])
            );
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };
    fetchWeather();
  }, [location]);

  return { weather, currentDayForecast, fiveDayForecast, hourlyTemperatures };
};

export default useWeatherData;

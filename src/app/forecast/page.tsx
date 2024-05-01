"use client";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.scss";
import Loading from "@/components/Loading";
import useWeatherData from "@/hooks/useWeather";
import useLocationFetch from "@/hooks/useLocation";
import Error from "@/components/Error";
import CurrentDay from "@/components/CurrentDay";
import DayForecast from "@/components/DayForecast";

const Forecast: React.FC = () => {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const zip = searchParams.get("zip");
  const country = searchParams.get("country");

  const { location, loading, error } = useLocationFetch({ city, zip, country });
  const { weather, currentDayForecast, fiveDayForecast, hourlyTemperatures } =
    useWeatherData(location);

  if (
    loading ||
    !location ||
    !weather ||
    !currentDayForecast ||
    fiveDayForecast.length === 0
  ) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <div className={styles.container}>
      <h1>Clima en {location.name}</h1>
      <div className={styles.currentDayContainer}>
        <CurrentDay
          currentDayForecast={currentDayForecast}
          hourlyTemperatures={hourlyTemperatures}
        />
      </div>
      <div className={styles.fiveDayContainer}>
        {fiveDayForecast.map((day, index) => (
          <DayForecast key={index} day={day} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Forecast;

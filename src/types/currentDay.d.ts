export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface HourlyWeather {
    dt: number;
    main: MainWeatherData;
}

export interface DayForecast {
    dt: number;
    main: MainWeatherData;
    weather: Weather[];
    wind: {
        speed: number;
        deg: number;
    };
    visibility: number;
    clouds: {
        all: number;
    };
    pop: number;
}


export interface CurrentDayForecastProps {
    currentDayForecast: DayForecast;
    hourlyTemperatures: HourlyWeather[];
}

export interface FiveDayForecastProps {
    fiveDayForecast: DayForecast[];
}

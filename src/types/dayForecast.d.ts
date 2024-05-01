export interface Weather {
    main: string;
    description: string;
    icon: string;
}

export interface MainInfo {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    pressure: number;
    humidity: number;
}

export interface Wind {
    speed: number;
    deg: number;
}

export interface Clouds {
    all: number;
}

export interface DayForecast {
    dt: number;
    main: MainInfo;
    weather: Weather[];
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    pop: number;
}

export interface DayForecastProps {
    day: DayForecast;
    index: number;
}

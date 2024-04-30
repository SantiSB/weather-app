import { Location } from "@/types/location";
import { WeatherData } from "@/types/weather";

const API_KEY = '211acb1d8857424de79d9a97ccaaeffd';

export const fetchLocationByCity = async (city: string, state: string, country: string): Promise<Location[]> => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export const fetchLocationByZip = async (zip: string, country: string): Promise<Location> => {
    const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export const fetchWeatherByCoordinates = async (lat: number, lon: number): Promise<WeatherData> => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data: WeatherData = await response.json();
    return data;
}

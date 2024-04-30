interface LocalNames {
    [key: string]: string;
}

export interface Location {
    name: string;
    local_names: LocalNames;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export interface WeatherData {
    current: any;
    hourly: any[];
    daily: any[];
    list: any[];
}

const API_KEY = '211acb1d8857424de79d9a97ccaaeffd';

export const fetchLocationByCity = async (city: string, state: string, country: string): Promise<Location[]> => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)},${encodeURIComponent(state)},${encodeURIComponent(country)}&limit=1&appid=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export const fetchLocationByZip = async (zip: string, country: string): Promise<Location> => {
    const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${encodeURIComponent(zip)},${encodeURIComponent(country)}&appid=${API_KEY}`;

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

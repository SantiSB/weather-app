export interface Location {
    name: string;
    localNames: { [key: string]: string };
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export interface Resort {
  id: string;
  name: string;
  country: string;
  altitude: number; // meters
  lat: number;
  lon: number;
  description: string;
}

export interface CurrentWeather {
  temperature: number; // °C
  weatherCode: number; // WMO weather code
  windSpeed: number; // km/h
  windDirection: number; // degrees
  snowDepth: number; // cm
  precipitation: number; // mm
  isDay: number; // 0 or 1
}

export interface HourlyForecast {
  time: string[];
  temperature: number[];
  weatherCode: number[];
  snowfall: number[]; // cm
  precipitation: number[];
}

export interface WeatherData {
  resort: Resort;
  current: CurrentWeather;
  hourly: HourlyForecast;
  fetchedAt: string;
}

export interface WeatherCondition {
  label: string;
  icon: string; // emoji
  bgClass: string; // tailwind class
}

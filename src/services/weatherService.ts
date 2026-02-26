import type { Resort, WeatherData, CurrentWeather, HourlyForecast } from '../types';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    precipitation: number;
    is_day: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    snowfall: number[];
    precipitation: number[];
  };
  daily: {
    snow_depth_mean: number[];
  };
}

export async function fetchWeather(resort: Resort): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: resort.lat.toString(),
    longitude: resort.lon.toString(),
    current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,precipitation,is_day',
    hourly: 'temperature_2m,weather_code,snowfall,precipitation',
    daily: 'snow_depth_mean',
    timezone: 'Europe/Zurich',
    forecast_days: '2',
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Erreur météo pour ${resort.name}: ${response.statusText}`);
  }

  const data: OpenMeteoResponse = await response.json() as OpenMeteoResponse;

  const current: CurrentWeather = {
    temperature: Math.round(data.current.temperature_2m),
    weatherCode: data.current.weather_code,
    windSpeed: Math.round(data.current.wind_speed_10m),
    windDirection: data.current.wind_direction_10m,
    snowDepth: Math.round((data.daily.snow_depth_mean[0] ?? 0) * 100),
    precipitation: data.current.precipitation,
    isDay: data.current.is_day,
  };

  // Only keep the next 24 hours from hourly data
  const hourly: HourlyForecast = {
    time: data.hourly.time.slice(0, 24),
    temperature: data.hourly.temperature_2m.slice(0, 24).map(Math.round),
    weatherCode: data.hourly.weather_code.slice(0, 24),
    snowfall: data.hourly.snowfall.slice(0, 24),
    precipitation: data.hourly.precipitation.slice(0, 24),
  };

  return {
    resort,
    current,
    hourly,
    fetchedAt: new Date().toISOString(),
  };
}

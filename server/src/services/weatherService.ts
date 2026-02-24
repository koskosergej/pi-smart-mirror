import axios from 'axios';
import config from '../config';
import { WeatherData } from '../types';

let cache: WeatherData | null = null;
let cacheTime = 0;
const CACHE_TTL = 10 * 60 * 1000;

function getMockWeather(): WeatherData {
  return {
    city: config.city,
    country: 'XX',
    temperature: 15,
    feelsLike: 13,
    humidity: 65,
    description: 'partly cloudy',
    conditionId: 802,
    conditionMain: 'Clouds',
    windSpeed: 12,
    windDeg: 180,
    mock: true,
  };
}

export async function getWeather(): Promise<WeatherData> {
  const now = Date.now();
  if (cache && now - cacheTime < CACHE_TTL) {
    return cache;
  }

  if (!config.openWeatherApiKey) {
    return getMockWeather();
  }

  try {
    const response = await axios.get<{
      name: string;
      sys: { country: string };
      main: { temp: number; feels_like: number; humidity: number };
      weather: Array<{ id: number; main: string; description: string }>;
      wind: { speed: number; deg: number };
    }>('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: config.city,
        appid: config.openWeatherApiKey,
        units: 'metric',
      },
    });

    const data = response.data;
    cache = {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      conditionId: data.weather[0].id,
      conditionMain: data.weather[0].main,
      windSpeed: Math.round(data.wind.speed * 3.6),
      windDeg: data.wind.deg,
      mock: false,
    };
    cacheTime = now;
    return cache;
  } catch (err) {
    console.error('[WeatherService] API error:', (err as Error).message);
    if (cache) return cache;
    return getMockWeather();
  }
}

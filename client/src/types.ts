export interface SensorReading {
  available: boolean;
  temperature?: number;
  humidity?: number;
  timestamp?: string;
}

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  description: string;
  conditionId: number;
  conditionMain: string;
  windSpeed: number;
  windDeg: number;
  mock: boolean;
}

export interface ClothingData {
  outfit: string[];
  note: string;
  icon: string;
  sensor: SensorReading | null;
  weather: WeatherData;
}

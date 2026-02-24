export interface SensorReading {
  temperature: number;
  humidity: number;
  timestamp: string;
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

export interface ClothingRecommendation {
  outfit: string[];
  note: string;
  icon: string;
}

export interface ClothingResponse extends ClothingRecommendation {
  sensor: SensorReading | null;
  weather: WeatherData;
}

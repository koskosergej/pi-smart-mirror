import { SensorReading, WeatherData, ClothingRecommendation } from '../types';

export function getRecommendation(
  sensorData: SensorReading | null,
  weatherData: WeatherData
): ClothingRecommendation {
  const effectiveTemp = sensorData
    ? (sensorData.temperature + weatherData.feelsLike) / 2
    : weatherData.feelsLike;
  const humidity = sensorData
    ? Math.max(sensorData.humidity, weatherData.humidity)
    : weatherData.humidity;
  const windSpeed = weatherData.windSpeed;
  const condition = weatherData.conditionMain?.toLowerCase() ?? '';
  const conditionId = weatherData.conditionId ?? 800;

  const isRain = condition === 'rain' || condition === 'drizzle' || (conditionId >= 200 && conditionId < 600);
  const isSnow = condition === 'snow' || (conditionId >= 600 && conditionId < 700);
  const isWind = windSpeed > 20;
  const isHighHumidity = humidity > 80;

  let outfit: string[];
  let baseNote: string;
  let icon: string;

  if (effectiveTemp < 0) {
    outfit = ['Heavy winter coat', 'Thermal base layer', 'Warm sweater', 'Winter boots', 'Hat', 'Gloves', 'Scarf'];
    baseNote = 'Freezing temperatures — layer up heavily.';
    icon = '🥶';
  } else if (effectiveTemp < 10) {
    outfit = ['Winter coat', 'Sweater', 'Warm trousers', 'Scarf', 'Gloves'];
    baseNote = 'Cold outside — dress warmly.';
    icon = '🧥';
  } else if (effectiveTemp < 15) {
    outfit = ['Warm jacket', 'Jumper or hoodie', 'Jeans or trousers'];
    baseNote = 'Cool weather — a warm jacket is a good idea.';
    icon = '🧤';
  } else if (effectiveTemp < 20) {
    outfit = ['Light jacket or cardigan', 'Jeans or trousers', 'T-shirt'];
    baseNote = 'Mild weather — bring a light layer.';
    icon = '🌤️';
  } else if (effectiveTemp < 25) {
    outfit = ['T-shirt', 'Light trousers or jeans'];
    baseNote = 'Comfortable temperature — dress casually.';
    icon = '👕';
  } else {
    outfit = ['Lightweight T-shirt', 'Shorts or light trousers', 'Sunglasses'];
    baseNote = 'Warm and sunny — dress light and stay cool.';
    icon = '☀️';
  }

  if (isRain) {
    outfit.push('Waterproof jacket or raincoat', 'Umbrella');
    baseNote += ' Rain expected.';
    icon = '🌧️';
  }

  if (isSnow) {
    outfit.push('Waterproof boots', 'Extra warm layer');
    baseNote += ' Snow forecast.';
    icon = '❄️';
  }

  if (isWind) {
    outfit.push('Windproof outer layer');
    baseNote += ` Strong winds (${windSpeed} km/h).`;
  }

  let note = baseNote;
  if (isHighHumidity) {
    note += ' High humidity — choose breathable, moisture-wicking fabrics.';
  }

  return { outfit, note: note.trim(), icon };
}

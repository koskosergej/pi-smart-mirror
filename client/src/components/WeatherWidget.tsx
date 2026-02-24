import React from 'react';
import { WeatherData } from '../types';
import './WeatherWidget.css';

function getWeatherEmoji(conditionId: number): string {
  if (conditionId >= 200 && conditionId < 300) return '⛈️';
  if (conditionId >= 300 && conditionId < 400) return '🌦️';
  if (conditionId >= 500 && conditionId < 600) return '🌧️';
  if (conditionId >= 600 && conditionId < 700) return '❄️';
  if (conditionId >= 700 && conditionId < 800) return '🌫️';
  if (conditionId === 800) return '☀️';
  if (conditionId === 801) return '🌤️';
  if (conditionId === 802) return '⛅';
  if (conditionId >= 803) return '☁️';
  return '🌡️';
}

function WindDirection({ deg }: { deg: number }): React.JSX.Element {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const dir = dirs[Math.round(deg / 45) % 8];
  return <span>{dir}</span>;
}

interface Props {
  data: WeatherData | null;
  loading: boolean;
}

export default function WeatherWidget({ data, loading }: Props): React.JSX.Element | null {
  if (loading && !data) {
    return (
      <div className="glass-card weather-card">
        <div className="label">Outdoor Weather</div>
        <div className="loading-pulse" style={{ fontSize: '3rem', marginTop: '0.5rem' }}>🌡️</div>
        <div className="loading-pulse" style={{ marginTop: '0.75rem', color: 'var(--text-secondary)' }}>Loading...</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="glass-card weather-card">
      <div className="label">
        Outdoor Weather
        {data.mock && <span className="mock-badge">Mock</span>}
      </div>

      <div className="weather-main">
        <span className="weather-icon">{getWeatherEmoji(data.conditionId)}</span>
        <div className="weather-temp-block">
          <span className="weather-temp">{data.temperature}°</span>
          <span className="weather-feels">Feels {data.feelsLike}°C</span>
        </div>
      </div>

      <div className="weather-location">{data.city}{data.country ? `, ${data.country}` : ''}</div>
      <div className="weather-desc">{data.description}</div>

      <div className="weather-meta">
        <div className="weather-meta-item">
          <span className="meta-icon">💧</span>
          <span>{data.humidity}%</span>
        </div>
        <div className="weather-meta-item">
          <span className="meta-icon">💨</span>
          <span>{data.windSpeed} km/h <WindDirection deg={data.windDeg} /></span>
        </div>
      </div>
    </div>
  );
}

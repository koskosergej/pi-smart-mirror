import React from 'react';
import { ClothingData } from '../types';
import './ClothingWidget.css';

interface Props {
  data: ClothingData | null;
  loading: boolean;
}

export default function ClothingWidget({ data, loading }: Props): React.JSX.Element | null {
  if (loading && !data) {
    return (
      <div className="glass-card clothing-card">
        <div className="label">What to Wear</div>
        <div className="loading-pulse" style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Analyzing conditions...</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="glass-card clothing-card">
      <div className="label">What to Wear</div>

      <div className="clothing-header">
        <span className="clothing-icon">{data.icon}</span>
        <p className="clothing-note">{data.note}</p>
      </div>

      {data.outfit.length > 0 && (
        <ul className="clothing-list">
          {data.outfit.map((item, i) => (
            <li key={i} className="clothing-item">
              <span className="clothing-dot" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {data.sensor && data.weather && (
        <div className="clothing-meta">
          <span>Room {data.sensor.temperature.toFixed(1)}°C</span>
          <span className="meta-divider">·</span>
          <span>Outside {data.weather.temperature}°C</span>
          <span className="meta-divider">·</span>
          <span>{data.weather.description}</span>
        </div>
      )}
    </div>
  );
}

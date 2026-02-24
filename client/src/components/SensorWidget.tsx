import React from 'react';
import { SensorReading } from '../types';
import './SensorWidget.css';

function TempBar({ value }: { value: number }): React.JSX.Element {
  const min = -10, max = 50;
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const color = value < 5 ? 'var(--accent-cool)' : value > 28 ? '#ef5350' : 'var(--accent)';
  return (
    <div className="temp-bar-track">
      <div className="temp-bar-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

function HumidityBar({ value }: { value: number }): React.JSX.Element {
  const color = value > 80 ? '#ef5350' : value < 30 ? '#ffb74d' : 'var(--accent-cool)';
  return (
    <div className="temp-bar-track">
      <div className="temp-bar-fill" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

interface Props {
  data: SensorReading | null;
  loading: boolean;
}

export default function SensorWidget({ data, loading }: Props): React.JSX.Element | null {
  if (loading && !data) {
    return (
      <div className="glass-card sensor-card">
        <div className="label">Room Sensor — DHT11</div>
        <div className="loading-pulse" style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Initializing sensor...</div>
      </div>
    );
  }

  if (!data) return null;

  if (!data.available) {
    return (
      <div className="glass-card sensor-card">
        <div className="label">Room Sensor — DHT11</div>
        <div className="sensor-unavailable">Data not available</div>
      </div>
    );
  }

  return (
    <div className="glass-card sensor-card">
      <div className="label">Room Sensor — DHT11</div>

      <div className="sensor-grid">
        <div className="sensor-item">
          <div className="sensor-value">
            <span className="sensor-icon">🌡️</span>
            <span className="sensor-number">{data.temperature!.toFixed(1)}</span>
            <span className="sensor-unit">°C</span>
          </div>
          <TempBar value={data.temperature!} />
          <div className="sensor-label">Temperature</div>
        </div>

        <div className="sensor-item">
          <div className="sensor-value">
            <span className="sensor-icon">💧</span>
            <span className="sensor-number">{data.humidity!.toFixed(1)}</span>
            <span className="sensor-unit">%</span>
          </div>
          <HumidityBar value={data.humidity!} />
          <div className="sensor-label">Humidity</div>
        </div>
      </div>

      {data.timestamp && (
        <div className="sensor-timestamp">
          Updated {new Date(data.timestamp).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}

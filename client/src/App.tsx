import React, { useState, useEffect, useCallback } from 'react';
import Clock from './components/Clock';
import WeatherWidget from './components/WeatherWidget';
import SensorWidget from './components/SensorWidget';
import ClothingWidget from './components/ClothingWidget';
import { SensorReading, WeatherData, ClothingData } from './types';
import './styles/App.css';

const POLL_INTERVAL = 30_000;

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export default function App(): React.JSX.Element {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [sensor, setSensor] = useState<SensorReading | null>(null);
  const [clothing, setClothing] = useState<ClothingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      const [w, s, c] = await Promise.all([
        fetchJSON<WeatherData>('/api/weather'),
        fetchJSON<SensorReading>('/api/sensor'),
        fetchJSON<ClothingData>('/api/clothing'),
      ]);
      setWeather(w);
      setSensor(s);
      setClothing(c);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAll();
    const id = setInterval(() => void fetchAll(), POLL_INTERVAL);
    return () => clearInterval(id);
  }, [fetchAll]);

  return (
    <div className="app">
      <div className="area-clock">
        <Clock />
      </div>
      <div className="area-weather">
        <WeatherWidget data={weather} loading={loading} />
      </div>
      <div className="area-sensor">
        <SensorWidget data={sensor} loading={loading} />
      </div>
      <div className="area-clothing">
        <ClothingWidget data={clothing} loading={loading} />
      </div>
      {error && (
        <div style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          background: 'rgba(255,82,82,0.15)',
          border: '1px solid rgba(255,82,82,0.3)',
          borderRadius: '8px',
          padding: '0.5rem 1rem',
          fontSize: '0.75rem',
          color: 'rgba(255,82,82,0.9)',
        }}>
          ⚠ {error}
        </div>
      )}
    </div>
  );
}

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
# Backend (Node.js Express, port 3001)
cd server && npm install && npm run dev

# Frontend (React + Vite, port 5173)
cd client && npm install && npm run dev
```

Run both simultaneously in separate terminals for full-stack development.

### Production Build

```bash
cd client && npm run build
# Built assets output to client/dist/ — served by Express in production
```

Start the server in production mode:
```bash
cd server && NODE_ENV=production node src/index.js
```

### Environment Setup

```bash
cp server/.env.example server/.env
# Edit server/.env and set OPENWEATHER_API_KEY and CITY
```

## Architecture

**Stack:** Node.js (Express) backend + React (Vite) frontend, deployed on Raspberry Pi 3.

### Backend (`server/`)
- `src/index.js` — Express entry point; serves API routes and React static build in production
- `src/config.js` — Environment config (reads from `.env`)
- `src/services/sensorService.js` — Polls DHT11 sensor every 30s via `node-dht-sensor`; falls back to mock data (temp: 22°C, humidity: 55%) when sensor is unavailable (dev mode logs "Running in mock sensor mode")
- `src/services/weatherService.js` — Fetches OpenWeather API, caches result for 10 minutes
- `src/services/clothingService.js` — Generates outfit recommendations from sensor temp + weather conditions (rain/snow/wind/humidity modifiers)
- `src/routes/` — REST endpoints: `GET /api/weather`, `GET /api/sensor`, `GET /api/clothing`

### Frontend (`client/`)
- `src/App.jsx` — Root component; polls all three API endpoints every 30s
- `src/components/Clock.jsx` — Digital clock updating every second
- `src/components/WeatherWidget.jsx` — Outdoor weather (city, temp, conditions, wind)
- `src/components/SensorWidget.jsx` — Room temperature + humidity from DHT11
- `src/components/ClothingWidget.jsx` — Outfit recommendations with reasoning

### Design
Dark glassmorphism theme (background `#080810`, glass cards with `backdrop-filter: blur`). Pure CSS — no UI library. All component styles are co-located (e.g., `Clock.css` next to `Clock.jsx`).

## Sensor Notes

`node-dht-sensor` requires native compilation with GPIO access on Raspberry Pi. On non-Pi hardware it fails gracefully and uses mock data. GPIO pin is configurable via `DHT_PIN` env var (default: 4).

To wire DHT11:
- VCC → 3.3V (Pin 1)
- DATA → GPIO4 (Pin 7) — or whichever pin matches DHT_PIN
- GND → GND (Pin 6)

## API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/weather` | OpenWeather data for configured city (10-min cache) |
| `GET /api/sensor` | Latest DHT11 reading (temp + humidity) |
| `GET /api/clothing` | Outfit recommendation combining sensor + weather data |

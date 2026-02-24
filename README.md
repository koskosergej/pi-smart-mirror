# Smart Mirror

A Raspberry Pi smart mirror display showing real-time weather, room temperature/humidity, and personalized clothing recommendations.

## Hardware

- Raspberry Pi 3
- DHT11 temperature & humidity sensor (Aosong)
- Monitor/display attached to Pi

## Features

- Live digital clock
- Outdoor weather via OpenWeather API
- Room sensor data (temperature + humidity) from DHT11
- Clothing recommendations based on local sensor + outdoor weather conditions

## Quick Start

### 1. Clone & configure

```bash
cd server && cp .env.example .env
```

Edit `server/.env`:

```env
OPENWEATHER_API_KEY=your_api_key_here
CITY=YourCity
DHT_PIN=4
PORT=3001
```

Get a free API key at [openweathermap.org](https://openweathermap.org/api).

### 2. Install & run (development)

```bash
# Terminal 1 - Backend
cd server && npm install && npm run dev

# Terminal 2 - Frontend
cd client && npm install && npm run dev
```

Open `http://localhost:5173` in your browser.

> **Non-Pi hardware (macOS/Linux):** `node-dht-sensor` requires Raspberry Pi GPIO to compile.
> Install with `--ignore-scripts` to skip native compilation — the server falls back to mock sensor data automatically.
> ```bash
> cd server && npm install --ignore-scripts && npm run dev
> ```

### 3. Run on Raspberry Pi (production)

```bash
# Build frontend
cd client && npm install && npm run build

# Compile and start server (serves both API + React build)
cd server && npm install && npm run build && NODE_ENV=production node dist/index.js
```

Open `http://localhost:3001` on the Pi's browser in kiosk mode.

## DHT11 Wiring

| DHT11 Pin | Raspberry Pi |
|---|---|
| VCC | 3.3V (Pin 1) |
| DATA | GPIO4 (Pin 7) |
| GND | GND (Pin 6) |

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `OPENWEATHER_API_KEY` | — | OpenWeather API key (required for live data) |
| `CITY` | `London` | City name for weather data |
| `DHT_PIN` | `4` | GPIO pin number for DHT11 DATA wire |
| `PORT` | `3001` | Server port |
| `NODE_ENV` | `development` | Set to `production` to serve built React app |

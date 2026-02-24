import config from '../config';
import { SensorReading } from '../types';

let dhtSensor: typeof import('node-dht-sensor') | null = null;
let isMock = false;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  dhtSensor = require('node-dht-sensor') as typeof import('node-dht-sensor');
  const result = dhtSensor!.read(11, config.dhtPin);
  if (!result || typeof result.temperature !== 'number') {
    throw new Error('Sensor read returned invalid data');
  }
  console.log('[SensorService] DHT11 sensor initialized on GPIO pin', config.dhtPin);
} catch (err) {
  isMock = true;
  console.log('[SensorService] Running in mock sensor mode:', (err as Error).message);
}

let latestReading: SensorReading = {
  temperature: 22,
  humidity: 55,
  timestamp: new Date().toISOString(),
  mock: true,
};

function readSensor(): void {
  if (isMock) {
    latestReading = {
      temperature: parseFloat((22 + (Math.random() - 0.5) * 2).toFixed(1)),
      humidity: parseFloat((55 + (Math.random() - 0.5) * 4).toFixed(1)),
      timestamp: new Date().toISOString(),
      mock: true,
    };
    return;
  }

  try {
    const result = dhtSensor!.read(11, config.dhtPin);
    if (result && typeof result.temperature === 'number') {
      latestReading = {
        temperature: parseFloat(result.temperature.toFixed(1)),
        humidity: parseFloat(result.humidity.toFixed(1)),
        timestamp: new Date().toISOString(),
        mock: false,
      };
    }
  } catch (err) {
    console.error('[SensorService] Read error:', (err as Error).message);
  }
}

readSensor();
setInterval(readSensor, 30000);

export function getLatestReading(): SensorReading {
  return latestReading;
}

export function isMockMode(): boolean {
  return isMock;
}

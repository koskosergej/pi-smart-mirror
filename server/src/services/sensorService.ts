import config from '../config';
import { SensorReading } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dhtSensor: any = null;
let available = false;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  dhtSensor = require('node-dht-sensor');
  const result = dhtSensor.read(11, config.dhtPin);
  if (!result || typeof result.temperature !== 'number') {
    throw new Error('Sensor read returned invalid data');
  }
  available = true;
  console.log('[SensorService] DHT11 sensor initialized on GPIO pin', config.dhtPin);
} catch (err) {
  console.log('[SensorService] Sensor unavailable:', (err as Error).message);
}

let latestReading: SensorReading | null = null;

function readSensor(): void {
  if (!available) return;

  try {
    const result = dhtSensor.read(11, config.dhtPin);
    if (result && typeof result.temperature === 'number') {
      latestReading = {
        temperature: parseFloat(result.temperature.toFixed(1)),
        humidity: parseFloat(result.humidity.toFixed(1)),
        timestamp: new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error('[SensorService] Read error:', (err as Error).message);
  }
}

readSensor();
setInterval(readSensor, 30000);

export function getLatestReading(): SensorReading | null {
  return latestReading;
}

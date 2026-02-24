import 'dotenv/config';

interface Config {
  port: number;
  nodeEnv: string;
  openWeatherApiKey: string;
  city: string;
  dhtPin: number;
}

const config: Config = {
  port: parseInt(process.env.PORT ?? '3001', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY ?? '',
  city: process.env.CITY ?? 'London',
  dhtPin: parseInt(process.env.DHT_PIN ?? '4', 10),
};

export default config;

import { Router, Request, Response } from 'express';
import { getLatestReading } from '../services/sensorService';
import { getWeather } from '../services/weatherService';
import { getRecommendation } from '../services/clothingService';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const [sensor, weather] = await Promise.all([
      Promise.resolve(getLatestReading()),
      getWeather(),
    ]);
    const recommendation = getRecommendation(sensor, weather);
    res.json({ ...recommendation, sensor, weather });
  } catch {
    res.status(500).json({ error: 'Failed to generate clothing recommendation' });
  }
});

export default router;

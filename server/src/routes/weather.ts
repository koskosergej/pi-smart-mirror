import { Router, Request, Response } from 'express';
import { getWeather } from '../services/weatherService';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const weather = await getWeather();
    res.json(weather);
  } catch {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

export default router;

import { Router, Request, Response } from 'express';
import { getLatestReading } from '../services/sensorService';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const reading = getLatestReading();
  if (!reading) {
    res.json({ available: false });
    return;
  }
  res.json({ available: true, ...reading });
});

export default router;

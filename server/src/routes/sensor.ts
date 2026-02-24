import { Router, Request, Response } from 'express';
import { getLatestReading } from '../services/sensorService';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json(getLatestReading());
});

export default router;

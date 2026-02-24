import express from 'express';
import cors from 'cors';
import path from 'path';
import config from './config';
import sensorRouter from './routes/sensor';
import weatherRouter from './routes/weather';
import clothingRouter from './routes/clothing';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/sensor', sensorRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/clothing', clothingRouter);

if (config.nodeEnv === 'production') {
  const publicPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(publicPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

app.listen(config.port, () => {
  console.log(`[Server] Smart Mirror running on http://localhost:${config.port}`);
  console.log(`[Server] City: ${config.city}`);
  console.log(`[Server] Environment: ${config.nodeEnv}`);
});

import { Router, Request, Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// ✅ GET: Fetch weather using query parameter
router.get('/', async (req: Request, res: Response) => {
  try {
    const city = typeof req.query.city === 'string' ? req.query.city : '';

    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const weatherData = await WeatherService.getWeatherForCity(city);
    await HistoryService.addCity(city);

    return res.json(weatherData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;





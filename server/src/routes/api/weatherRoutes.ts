import { Router } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// POST: Retrieve weather data and save city
router.post('/', async (req, res) => {
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    // Fetch weather data
    const weatherData = await WeatherService.getWeatherForCity(city);

    // Save city to history
    await HistoryService.addCity(city);

    return res.json(weatherData); // ✅ Ensure a response is always returned
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET: Retrieve search history
router.get('/history', async (_req, res) => {
  try {
    const history = await HistoryService.getCities();
    return res.json(history);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE: Remove a city from history
router.delete('/history/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const success = await HistoryService.removeCity(id);
    
    if (success) {
      return res.json({ message: 'City removed successfully' });
    } else {
      return res.status(404).json({ error: 'City not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

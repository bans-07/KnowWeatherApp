import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

interface Coordinates {
  lat: number;
  lon: number;
}

class WeatherService {
  private baseURL = process.env.API_BASE_URL;
  private apiKey = process.env.API_KEY;

  private async fetchLocationData(city: string): Promise<Coordinates | null> {
    try {
      const response = await axios.get(
        `${this.baseURL}/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`
      );
      if (response.data.length === 0) return null;
      
      return { lat: response.data[0].lat, lon: response.data[0].lon };
    } catch (error) {
      console.error('Error fetching location data:', error);
      return null;
    }
  }

  private async fetchWeatherData({ lat, lon }: Coordinates) {
    try {
      const response = await axios.get(
        `${this.baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }

  async getWeatherForCity(city: string) {
    const coordinates = await this.fetchLocationData(city);
    if (!coordinates) return null;

    const weatherData = await this.fetchWeatherData(coordinates);
    return weatherData;
  }
}

export default new WeatherService();

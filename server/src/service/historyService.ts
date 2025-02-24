import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

// ✅ Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Correct file path for searchHistory.json
const filePath = path.resolve(__dirname, '../../db/searchHistory.json');

class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
  }
}

class HistoryService {
  private async ensureFileExists(): Promise<void> {
    try {
      await fs.access(filePath);
    } catch (error) {
      await fs.writeFile(filePath, JSON.stringify([], null, 2));
    }
  }

  private async read(): Promise<City[]> {
    await this.ensureFileExists();
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as City[];
  }

  private async write(cities: City[]): Promise<void> {
    await fs.writeFile(filePath, JSON.stringify(cities, null, 2));
  }

  async getCities(): Promise<City[]> {
    return this.read();
  }

  async addCity(cityName: string): Promise<City> {
    const cities = await this.read();
    const city = new City(cityName);

    if (!cities.find((c) => c.name.toLowerCase() === cityName.toLowerCase())) {
      cities.push(city);
      await this.write(cities);
    }
    return city;
  }

  async removeCity(id: string): Promise<boolean> {
    const cities = await this.read();
    const filteredCities = cities.filter((c) => c.id !== id);

    if (cities.length !== filteredCities.length) {
      await this.write(filteredCities);
      return true;
    }
    return false;
  }
}

export default new HistoryService();

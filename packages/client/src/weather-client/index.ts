import { WeatherClient } from './WeatherClient';

const weatherClient = new WeatherClient({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export default weatherClient;

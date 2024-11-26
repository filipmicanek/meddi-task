import { ContentType, HttpClient } from '../httpClient';

const API_KEY = '91a8b0d4c5d50d9617d0cce89862204e';

export type CityData = {
  main: { temp: string };
  sys: { sunrise: number; sunset: number; country: string };
};

export class WeatherClient extends HttpClient {
  weather = {
    city: (name: string) =>
      this.request<CityData>({
        path: `/weather`,
        method: 'GET',
        query: { q: name, appid: API_KEY, units: 'metric' },
        type: ContentType.Json,
      }),
  };
}

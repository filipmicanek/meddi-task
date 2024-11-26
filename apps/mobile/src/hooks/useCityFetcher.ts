import { useState, useCallback, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Alert } from 'react-native';
import { weatherClient } from '@/client';
import { CityData } from '@/client/src/weather-client/WeatherClient';

const useCityFetcher = (defaultCity?: string) => {
  const [cityName, setCityName] = useState<string>('');
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (defaultCity) {
      fetchCity(defaultCity);
    }
  }, [defaultCity]);

  const fetchCity = useCallback(
    async (name: string): Promise<CityData | undefined> => {
      try {
        setIsLoading(true);
        const result = await weatherClient.weather.city(name);

        setCityData(result.data);
        setCityName(name);
        return result.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;

          if (axiosError.response) {
            const { status } = axiosError.response;

            if (status === 404) {
              Alert.alert(
                'Chyba',
                'Město nebylo nalezeno. Zkontrolujte název a zkuste to znovu.',
              );
            } else if (status === 500) {
              Alert.alert(
                'Chyba serveru',
                'Došlo k chybě na serveru. Zkuste to prosím později.',
              );
            } else {
              Alert.alert('Chyba', `Něco se pokazilo`);
            }
          } else if (axiosError.request) {
            Alert.alert(
              'Chyba připojení',
              'Nepodařilo se získat data o městě. Zkuste to znovu.',
            );
          } else {
            Alert.alert('Chyba', 'Při získávání dat došlo k chybě.');
          }
        } else {
          Alert.alert(
            'Neočekávaná chyba',
            'Došlo k neočekávané chybě. Zkuste to prosím znovu.',
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { cityName, data: cityData, isLoading, fetchCity };
};

export default useCityFetcher;

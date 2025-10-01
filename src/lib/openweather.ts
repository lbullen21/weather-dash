import { Weather } from '../types/weather';

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Get the API key once and validate it exists
function getApiKey(): string {
  const key = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!key) {
    throw new Error("Missing NEXT_PUBLIC_OPENWEATHER_API_KEY in environment variables");
  }
  return key;
}

const API_KEY = getApiKey();

interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    main: string;
  }>;
  sys: {
    sunrise: number;
    sunset: number;
  };
  dt: number;
}

/**
 * Main function to get weather for a city
 * @param cityQuery City name (can include state and country)
 * @returns Promise with formatted weather data
 */
export async function getWeatherByCoordinates(lat: number, lon: number): Promise<Weather> {
  try {
    const url = new URL(WEATHER_BASE_URL);
    url.searchParams.append('lat', lat.toString());
    url.searchParams.append('lon', lon.toString());
    url.searchParams.append('units', 'imperial');
    url.searchParams.append('appid', API_KEY);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Failed to get weather data: ${response.statusText}`);
    }

    const weatherData = await response.json() as WeatherResponse;

    const currentTime = weatherData.dt * 1000; // Convert to milliseconds
    const sunrise = weatherData.sys.sunrise * 1000;
    const sunset = weatherData.sys.sunset * 1000;
    const isDay = currentTime > sunrise && currentTime < sunset;

    return {
      city: weatherData.name,
      current: {
        tempC: Math.round((weatherData.main.temp - 32) * 5/9),
        tempF: Math.round(weatherData.main.temp),
        condition: weatherData.weather[0].main,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        isDay,
      },
      hourly: [],
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Weather lookup failed: ${error.message}`);
    }
    throw error;
  }
}

export async function getWeatherForCity(cityQuery: string): Promise<Weather> {
  try {
    // Validate city query
    const trimmedCity = cityQuery.trim();
    if (!trimmedCity) {
      throw new Error('Please enter a city name');
    }

    const url = new URL(WEATHER_BASE_URL);
    url.searchParams.append('q', trimmedCity);
    url.searchParams.append('units', 'imperial');
    url.searchParams.append('appid', API_KEY);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Failed to get weather data: ${response.statusText}`);
    }

    const weatherData = await response.json() as WeatherResponse;

    // Format the response
    const currentTime = weatherData.dt * 1000; // Convert to milliseconds
    const sunrise = weatherData.sys.sunrise * 1000;
    const sunset = weatherData.sys.sunset * 1000;
    const isDay = currentTime > sunrise && currentTime < sunset;

    return {
      city: weatherData.name,
      current: {
        tempC: Math.round((weatherData.main.temp - 32) * 5/9),
        tempF: Math.round(weatherData.main.temp),
        condition: weatherData.weather[0].main,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        isDay,
      },
      hourly: [], // Note: This basic endpoint doesn't provide hourly data
    };
  } catch (error) {
    // Enhance error message for user-friendly feedback
    if (error instanceof Error) {
      throw new Error(`Weather lookup failed: ${error.message}`);
    }
    throw error;
  }
}

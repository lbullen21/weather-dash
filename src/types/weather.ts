type Hour = { time: string; tempC: number };

export type Weather = {
  city: string;
  current: { 
    tempC: number; 
    tempF: number; 
    condition: string;
    humidity: number;
    windSpeed: number;
    isDay: boolean;
  };
  hourly: Hour[];
};

export type GeoLocation = {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

export type LocationQuery = {
  city: string;
  state?: string;
  country?: string;
};

export type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type OneCallResponse = {
  current: {
    dt: number;
    temp: number;
    weather: WeatherCondition[];
  };
  hourly?: Array<{
    dt: number;
    temp: number;
    weather: WeatherCondition[];
  }>;
};
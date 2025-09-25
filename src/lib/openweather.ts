type Hour = { time: string; tempC: number };
export type Weather = {
  city: string;
  current: { tempC: number; tempF: number; condition: string };
  hourly: Hour[];
};

type GeoLocation = {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

type LocationQuery = {
  city: string;
  state?: string;
  country?: string;
};

function parseLocationQuery(query: string): LocationQuery {
  // Split on commas and trim whitespace
  const parts = query.split(',').map(part => part.trim());
  
  return {
    city: parts[0],
    state: parts[1],
    country: parts[2],
  };
}

export async function getWeatherForCity(query: string): Promise<Weather> {
  const key = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!key) throw new Error("Missing NEXT_PUBLIC_OPENWEATHER_API_KEY");

  // Parse query into parts
  const { city, state, country } = parseLocationQuery(query);
  console.log({ city, state, country });
  
  // Build q parameter: "city,state,country" (omit undefined parts)
  const locationQuery = [
    city,
    state,
    country
  ].filter(Boolean).join(',');

  // Geocode with proper query structure
  const geoRes = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(locationQuery)}&limit=1&appid=${key}`
  );

  console.log({ geoRes });
  const geoJson = await geoRes.json() as GeoLocation[];
  
  
  const { lat, lon, name } = geoJson[0];

  type WeatherCondition = {
    id: number;
    main: string;
    description: string;
    icon: string;
  };

  type OneCallResponse = {
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

  // One Call
  const onecallRes = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${key}`
  );
  const onecallJson = await onecallRes.json() as OneCallResponse;

  const mapped: Weather = {
    city: name || query,
    current: {
      tempC: onecallJson.current?.temp ?? 0,
      tempF: Math.round((onecallJson.current?.temp ?? 0) * 9 / 5 + 32),
      condition: onecallJson.current?.weather?.[0]?.description || "",
    },
    hourly: (onecallJson.hourly || []).slice(0, 12).map(h => ({
      time: new Date(h.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      tempC: h.temp,
    })),
  };

  return mapped;
}

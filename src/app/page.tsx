"use client";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar.component";
import Temperature from "../components/Temperature.component";
import Humidity from "../components/Humidity.component";
import WindSpeed from "../components/WindSpeed.component";
import { Weather } from "../types/weather";  
import { getWeatherForCity, getWeatherByCoordinates } from "../lib/openweather";

export default function Page() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Get user's location and weather on component mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            setLoading(true);
            const startTime = Date.now();

            const weather = await getWeatherByCoordinates(
              position.coords.latitude,
              position.coords.longitude
            );
            setData(weather);

            // Ensure loading shows for at least 0.5 seconds
            const elapsed = Date.now() - startTime;
            if (elapsed < 700) {
              await new Promise(resolve => setTimeout(resolve, 700 - elapsed));
            }
          } catch (e) {
            const message = e instanceof Error ? e.message : String(e);
            setErr(message);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setErr("Could not get your location. Please search for a city instead.");
        }
      );
    }
  }, []);

  async function fetchWeatherForCity(query: string) {
    try {
      setErr(null);
      setLoading(true);
      const startTime = Date.now();
      
      const w = await getWeatherForCity(query);
      setData(w);

      // Ensure loading shows for at least 0.5 seconds
      const elapsed = Date.now() - startTime;
      if (elapsed < 500) {
        await new Promise(resolve => setTimeout(resolve, 500 - elapsed));
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setErr(message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className="flex flex-col mx-auto max-w-3xl rounded-2xl gap-8 p-10 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-700">
      <SearchBar
        value={city}
        onChange={(v) => setCity(v)}
        onSubmit={() => fetchWeatherForCity(city)}
      />
      <Temperature data={data} loading={loading} error={err} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Humidity data={data} loading={loading} error={err} />
        <WindSpeed data={data} loading={loading} error={err} />
      </div>
    </div>
  );
}

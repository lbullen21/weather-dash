"use client";
import { Weather } from "../types/weather";
import Image from "next/image";

type Props = {
  data: Weather | null;
  loading?: boolean;
  error?: string | null;
};

function getWeatherImage(condition: string): string {
  // Convert condition to lowercase for case-insensitive matching
  const lowerCondition = condition.toLowerCase();
  
  // Map conditions to image files
  if (lowerCondition.includes('thunderstorm')) return 'heavy-rain.png';
  if (lowerCondition.includes('drizzle')) return 'cloudy-showers.png';
  if (lowerCondition.includes('rain')) return 'heavy-rain.png';
  if (lowerCondition.includes('snow')) return 'snowflake.png';
  if (lowerCondition.includes('clear')) return 'sun.png';
  if (lowerCondition.includes('clouds')) return 'cloudy.png';
  
  // For other conditions (mist, smoke, haze, dust, fog, sand, ash, squall, tornado)
  // we can use cloudy as a fallback
  return 'cloudy.png';
}

export default function Temperature({ data }: Props) {
    const temperature = data?.current.tempF;
    const condition = data?.current.condition ?? 'clear';
    const weatherImage = getWeatherImage(condition);

    return (
        <div>
            <Image 
                src={`/images/${weatherImage}`}
                alt={`Weather condition: ${condition}`}
                width={200} 
                height={200} 
                className="mx-auto"
            />
            <div className="mt-6 text-center text-white">
                <div className="text-7xl">{temperature}°F</div>
                <h2 className="text-3xl">{data?.city}</h2>
            </div>
        </div>
    );
}

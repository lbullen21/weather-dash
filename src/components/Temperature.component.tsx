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

export default function Temperature({ data, loading }: Props) {
    const temperature = data?.current.tempF;
    const condition = data?.current.condition ?? 'clear';
    const weatherImage = getWeatherImage(condition);

    if (loading) {
        return (
            <div>
                {/* Skeleton for weather icon */}
                <div className="w-[100px] h-[100px] md:w-[200px] md:h-[200px] bg-gray-100 rounded-full mx-auto animate-pulse" />
                <div className="mt-6 text-center">
                    {/* Skeleton for temperature */}
                    <div className="w-32 h-16 bg-gray-100 rounded-lg mx-auto animate-pulse mb-2" />
                    {/* Skeleton for city name */}
                    <div className="w-48 h-8 bg-gray-100 rounded-lg mx-auto animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div>
            <Image 
                src={`/images/${weatherImage}`}
                alt={`Weather condition: ${condition}`}
                width={200}
                height={200}
                className="mx-auto h-[100px] w-[100px] sm:h-[200px] sm:w-[200px]"
            />
            <div className="mt-6 text-center text-white">
                <div className="text-3xl sm:text-7xl">{temperature}°F</div>
                <div className="text-xl sm:text-3xl font-semibold">{data?.city}</div>
            </div>
        </div>
    );
}

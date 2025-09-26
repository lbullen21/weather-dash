"use client";
import { Weather } from "../types/weather";
import Image from "next/image";

type Props = {
  data: Weather | null;
  loading?: boolean;
  error?: string | null;
};

export default function WindSpeed({ data, loading }: Props) {
    const windSpeed = data?.current.windSpeed ? Math.round(data.current.windSpeed) : null;

    if (loading) {
        return (
            <div>
                {/* Skeleton for wind icon */}
                <div className="w-[100px] h-[100px] bg-gray-100 rounded-full mx-auto animate-pulse" />
                <div className="mt-6 mx-auto text-center">
                    {/* Skeleton for wind speed value */}
                    <div className="w-24 h-8 bg-gray-100 rounded-lg mx-auto animate-pulse mb-2" />
                    {/* Skeleton for label */}
                    <div className="w-28 h-6 bg-gray-100 rounded-lg mx-auto animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div>
            <Image 
                src="/images/wind.png" 
                alt="Wind speed indicator" 
                width={100} 
                height={100} 
                className="mx-auto"
        />

        <div className="mt-6 mx-auto text-center text-white">
          <div className="text-3xl">{windSpeed} m/hr</div>
          <h2 className="text-xl font-semibold">Wind Speed</h2>
        </div>
    </div>
  );
}
"use client";
import { Weather } from "../types/weather";
import Image from "next/image";

type Props = {
  data: Weather | null;
  loading?: boolean;
  error?: string | null;
};

export default function Temperature({ data }: Props) {
    const windSpeed = data?.current.windSpeed ? Math.round(data.current.windSpeed) : null;
  return (
    <div>
        <Image 
            src="/images/wind.png" 
            alt="Weather condition" 
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
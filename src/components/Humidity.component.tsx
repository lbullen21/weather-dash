"use client";
import { Weather } from "../types/weather";
import Image from "next/image";

type Props = {
  data: Weather | null;
  loading?: boolean;
  error?: string | null;
};

export default function Temperature({ data }: Props) {
    const humidity = data?.current.humidity;
    return (
    <div>
        <Image 
            src="/images/waves.png" 
            alt="Weather condition" 
            width={100} 
            height={100} 
            className="mx-auto"
        />
        <div className="mt-6 mx-auto text-center text-white">
          <div className="text-3xl">{humidity}%</div>
          <h2 className="text-xl font-semibold">Humidity</h2>
        </div>
    </div>
  );
}
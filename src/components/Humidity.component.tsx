"use client";
import { Weather } from "../types/weather";
import Image from "next/image";

type Props = {
  data: Weather | null;
  loading?: boolean;
  error?: string | null;
};

export default function Humidity({ data, loading }: Props) {
    const humidity = data?.current.humidity;

    if (loading) {
        return (
            <div>
                {/* Skeleton for humidity icon */}
                <div className="w-[100px] h-[100px] bg-gray-100 rounded-full mx-auto animate-pulse" />
                <div className="mt-6 mx-auto text-center">
                    {/* Skeleton for humidity value */}
                    <div className="w-20 h-8 bg-gray-100 rounded-lg mx-auto animate-pulse mb-2" />
                    {/* Skeleton for label */}
                    <div className="w-24 h-6 bg-gray-100 rounded-lg mx-auto animate-pulse" />
                </div>
            </div>
        );
    }

    return (
    <div>
        <Image 
            src="/images/waves.png" 
            alt="Humidity indicator" 
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
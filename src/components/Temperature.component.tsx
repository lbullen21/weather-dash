"use client";
import { Weather } from "../lib/openweather";
import Image from "next/image";

type Props = {
  data: Weather | null;
  loading?: boolean;
  error?: string | null;
};

export default function Temperature({ data, loading, error }: Props) {
    console.log({data, loading, error});
  return (
    <div>
        <Image 
            src="/images/sun.png" 
            alt="Weather condition" 
            width={200} 
            height={200} 
            className="mx-auto"
        />
      {error && <div className="text-red-600">{error}</div>}

      {loading && <div className="text-gray-600">Loading...</div>}
        <div className="mt-6 text-center">
            <div className="text-7xl">60°F</div>
            <h2 className="text-3xl">Bend</h2>
        </div>
    </div>
  );
}

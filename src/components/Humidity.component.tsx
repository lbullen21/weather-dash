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
            src="/images/waves.png" 
            alt="Weather condition" 
            width={100} 
            height={100} 
            className="mx-auto"
        />
      {error && <div className="text-red-600">{error}</div>}

      {loading && <div className="text-gray-600">Loading...</div>}
        <div className="mt-6 mx-auto text-center">
          <div className="text-3xl">80%</div>
          <h2 className="text-xl font-semibold">Humidity</h2>
        </div>
    </div>
  );
}
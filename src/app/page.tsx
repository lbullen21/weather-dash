"use client";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.component";

type Hour = { time: string; tempC: number };
type Weather = {
  city: string;
  current: { tempC: number; tempF: number; condition: string };
  hourly: Hour[];
};

export default function Page() {
  const [city, setCity] = useState("Bend");
  const [data, setData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);


  return (
  <div className=" mx-auto max-w-3xl rounded-2xl p-6 bg-gradient-to-br from-teal-100 via-teal-200 to-purple-300">
      <SearchBar
        value={city}
        onChange={(v) => setCity(v)}
        onSubmit={() => {
          /* form submit handled here if you want to trigger fetch */
        }}
        loading={loading}
        className="flex items-center"
      />

    </div>
  );
}

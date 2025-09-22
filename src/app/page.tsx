"use client";
import { useEffect, useState } from "react";

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
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-semibold mb-4">Weather Dash</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex gap-2 mb-6"
      >
        <input
          className="border rounded px-3 py-2 flex-1"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city…"
        />
        <button className="rounded px-4 py-2 border" disabled={loading}>
          {loading ? "Loading…" : "Search"}
        </button>
      </form>

    </main>
  );
}

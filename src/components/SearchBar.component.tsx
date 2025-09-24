"use client";
import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  loading?: boolean;
};

export default function SearchBar({ value, onChange, onSubmit, loading = false }: Props) {
  return (
    <div
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="flex gap-2"
    >
      <input
        className="border border-gray-400 bg-white rounded-full px-3 py-2 flex-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search city…"
      />
      <button className="rounded-full px-4 py-2 border border-gray-400 bg-white" disabled={loading}>
        {loading ? "Loading…" : "Search"}
      </button>
    </div>
  );
}

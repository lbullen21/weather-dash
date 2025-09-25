"use client";
import React from "react";
import Image from "next/image";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
};

export default function SearchBar({ value, onChange, onSubmit }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="flex gap-2"
    >
      <input
        className="border border-gray-400 bg-white text-black rounded-full px-3 py-2 flex-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="enter city name"
      />
      <button type="submit" className="rounded-full px-4 py-2 border border-gray-400 bg-white flex items-center justify-center">
        <Image src="/images/search.png" alt="Search" width={20} height={20} className="w-5 h-5" />
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}

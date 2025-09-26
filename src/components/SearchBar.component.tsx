"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getPlacePredictions, PlacePrediction } from "@/lib/google";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
};

export default function SearchBar({ value, onChange, onSubmit }: Props) {
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!value.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const predictions = await getPlacePredictions(value);
        setSuggestions(predictions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <div className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.();
          setShowSuggestions(false);
        }}
        className="flex gap-2"
      >
        <input
          className="border border-gray-400 bg-white text-black rounded-full px-3 py-2 flex-1"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="enter city name"
        />
        <button type="submit" className="rounded-full px-4 py-2 border border-gray-400 bg-white flex items-center justify-center">
          <Image src="/images/search.png" alt="Search" width={20} height={20} className="w-5 h-5" />
          <span className="sr-only">Search</span>
        </button>
      </form>

      {showSuggestions && (value.trim() !== '') && (
        <div 
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
          onBlur={() => setShowSuggestions(false)}
        >
          {isLoading ? (
            <div className="px-4 py-2 text-gray-500">Loading...</div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.description}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onChange(suggestion.description);
                    setShowSuggestions(false);
                    onSubmit?.(); // Trigger search when suggestion is selected
                  }}
                >
                  <div className="font-medium">{suggestion.mainText}</div>
                  <div className="text-sm text-gray-500">{suggestion.secondaryText}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-gray-500">No suggestions found</div>
          )}
        </div>
      )}
    </div>
  );
}

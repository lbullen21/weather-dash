import { Client } from "@googlemaps/google-maps-services-js";
import { NextResponse } from "next/server";

const client = new Client({});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input");

  if (!input) {
    return NextResponse.json({ error: "Input is required" }, { status: 400 });
  }

  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: process.env.GOOGLE_MAPS_API_KEY!,
        types: "(cities)" as any, // Restrict to cities
      },
    });

    if (response.data.status !== "OK") {
      throw new Error(`Google Places API error: ${response.data.status}`);
    }

    const predictions = response.data.predictions.map((prediction) => ({
      description: prediction.description,
      placeId: prediction.place_id,
      mainText: prediction.structured_formatting.main_text,
      secondaryText: prediction.structured_formatting.secondary_text,
    }));

    return NextResponse.json(predictions);
  } catch (error) {
    console.error("Error fetching place predictions:", error);
    return NextResponse.json(
      { error: "Failed to fetch predictions" },
      { status: 500 }
    );
  }
}
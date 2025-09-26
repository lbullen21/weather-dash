export interface PlacePrediction {
  description: string;  // Full city name (e.g., "New York, NY, USA")
  mainText: string;    // City name (e.g., "New York")
  secondaryText: string; // Region/Country (e.g., "NY, USA")
}

export async function getPlacePredictions(
  input: string
): Promise<PlacePrediction[]> {
  try {
    const response = await fetch(
      `/api/places/autocomplete?input=${encodeURIComponent(input)}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch predictions');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching place predictions:', error);
    throw error;
  }
}
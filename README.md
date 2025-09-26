# Weather Dashboard

![Weather Dashboard Logo](public/images/weather-dash.png)

A simple weather dashboard built with Next.js that shows current weather conditions including temperature, humidity, and wind speed. Features automatic location detection and city search functionality with Google Places Autocomplete integration.

## Features

- Real-time weather data from OpenWeather API
- Smart city search with Google Places Autocomplete
- Current temperature, humidity, and wind speed display
- Automatic location detection
- Mobile-responsive design

## API Integration

### Google Maps Places API

The dashboard uses the Google Maps Places API for intelligent city search:
- Implements city autocomplete suggestions as you type
- Returns formatted city names with country/region information
- Server-side API implementation for security
- Focused on city-level predictions for weather lookups

To use this feature, you need to:
1. Get a Google Maps API key from the Google Cloud Console
2. Enable the Places API in your Google Cloud project
3. Add your API key to `.env.local`:
   ```
   GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

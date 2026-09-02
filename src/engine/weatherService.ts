import { WeatherData, WeatherCondition } from './types';

let cachedWeather: WeatherData | null = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

function mapWMOCodeToCondition(code: number): WeatherCondition {
  // simplified mapping
  if (code <= 3) return 'CLEAR';
  if (code >= 45 && code <= 48) return 'CLOUDY';
  if (code >= 51 && code <= 64) return 'LIGHT_RAIN'; // light/moderate
  if (code >= 65 && code <= 82) return 'HEAVY_RAIN';
  if (code >= 95) return 'THUNDERSTORM';
  return 'CLEAR'; // Default fallback
}

export async function fetchWeather(): Promise<WeatherData> {
  const now = Date.now();
  if (cachedWeather && (now - lastFetchTime) < CACHE_DURATION_MS) {
    return cachedWeather;
  }

  try {
    const lat = 19.1192214;
    const lon = 72.8436312;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,rain,weather_code,wind_speed_10m&timezone=Asia%2FKolkata`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather API failed');
    const data = await response.json();
    
    const windSpeedKmh = data.current.wind_speed_10m;
    const rainMmPerHour = data.current.precipitation;
    const wmoCode = data.current.weather_code;
    const condition = mapWMOCodeToCondition(wmoCode);
    
    let actualCondition = condition;
    if (windSpeedKmh > 35) {
      actualCondition = 'HIGH_WIND';
    }

    const isDroneSafe = windSpeedKmh <= 35 && rainMmPerHour <= 5 && condition !== 'THUNDERSTORM';
    const smallDroneSafe = windSpeedKmh <= 25 && rainMmPerHour <= 2 && condition !== 'THUNDERSTORM';

    cachedWeather = {
      temperature: data.current.temperature_2m,
      windSpeedKmh,
      rainMmPerHour,
      condition: actualCondition,
      isDroneSafe,
      smallDroneSafe,
      timestamp: now,
    };
    lastFetchTime = now;
    return cachedWeather;
  } catch (err) {
    console.error('Weather fetch failed, using fallback', err);
    if (cachedWeather) return cachedWeather;
    
    // Default clear weather
    return {
      temperature: 30,
      windSpeedKmh: 5,
      rainMmPerHour: 0,
      condition: 'CLEAR',
      isDroneSafe: true,
      smallDroneSafe: true,
      timestamp: now,
    };
  }
}

import { NextResponse } from 'next/server';
import { fetchWeather } from '@/engine/weatherService';

export const revalidate = 0;

export async function GET() {
  try {
    const weather = await fetchWeather();
    return NextResponse.json(weather);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 });
  }
}

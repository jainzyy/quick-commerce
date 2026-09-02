import { NextResponse } from 'next/server';
import { isServiceable } from '@/engine/distanceCalculator';
import { DARK_STORE } from '@/config/delivery';

export async function POST(request: Request) {
  try {
    const { lat, lon } = await request.json();
    if (lat === undefined || lon === undefined) {
      return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });
    }
    
    const serviceable = isServiceable(lat, lon);
    
    return NextResponse.json({
      serviceable,
      darkStore: {
        lat: DARK_STORE.latitude,
        lon: DARK_STORE.longitude
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

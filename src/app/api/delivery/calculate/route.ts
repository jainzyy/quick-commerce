import { NextResponse } from 'next/server';
import { calculateDeliveryOptions } from '@/engine/deliveryCalculator';
import { DeliveryRequest } from '@/engine/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const req: DeliveryRequest = {
      destinationLat: body.customerLocation.lat,
      destinationLon: body.customerLocation.lon,
      items: body.orderItems,
      orderValue: body.orderValue || 0,
      preference: body.preference || 'BALANCED',
      demoOverrides: body.demoOverrides
    };
    
    const result = await calculateDeliveryOptions(req);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Delivery calculation error:', error);
    return NextResponse.json({ error: 'Calculation failed' }, { status: 500 });
  }
}

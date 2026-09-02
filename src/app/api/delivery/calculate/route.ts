import { NextResponse } from 'next/server';
import { calculateDeliveryOptions } from '@/engine/deliveryCalculator';
import { DeliveryRequest } from '@/engine/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const req: DeliveryRequest = {
      destinationLat: body.customerLocation.lat,
      destinationLon: body.customerLocation.lon,
      items: body.orderItems.map((item: any) => ({
        id: item.id,
        quantity: item.quantity,
        weightGrams: (item.unit === 'kg' || item.unit === 'L') ? (item.weight * 1000) : (item.weight || 0),
        lengthCm: item.packageLength || 10,
        widthCm: item.packageWidth || 10,
        heightCm: item.packageHeight || 10,
        isFragile: !!item.isFragile,
        isLiquid: !!item.isLiquid,
        isTemperatureSensitive: !!item.isTemperatureSensitive,
        isHazardous: !!item.isHazardous
      })),
      orderValue: body.orderValue || 0,
      preference: body.preference || 'FASTEST',
      demoOverrides: body.demoOverrides
    };
    
    const result = await calculateDeliveryOptions(req);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Delivery calculation error:', error);
    return NextResponse.json({ error: 'Calculation failed' }, { status: 500 });
  }
}

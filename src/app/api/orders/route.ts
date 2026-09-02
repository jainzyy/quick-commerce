import { NextResponse } from 'next/server';
import db from '@/db';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { 
      id, sessionId, totalValue, deliveryFee, operatingCost,
      deliveryMode, droneType, estimatedEta, estimatedCo2,
      distanceKm, customerLat, customerLong, weatherCondition,
      trafficCondition, customerPreference, items 
    } = data;

    const orderId = id || crypto.randomUUID();

    const statements: any[] = [];

    statements.push({
      sql: `
        INSERT INTO orders (
          id, session_id, total_value, delivery_fee, operating_cost,
          delivery_mode, drone_type, estimated_eta, estimated_co2,
          distance_km, customer_lat, customer_long, weather_condition,
          traffic_condition, customer_preference
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
      `,
      args: [
        orderId, sessionId, totalValue, deliveryFee, operatingCost,
        deliveryMode, droneType || null, estimatedEta, estimatedCo2,
        distanceKm, customerLat, customerLong, weatherCondition,
        trafficCondition, customerPreference
      ]
    });

    if (items && Array.isArray(items)) {
      for (const item of items) {
        statements.push({
          sql: `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
          args: [orderId, item.id, item.quantity, item.price]
        });
        statements.push({
          sql: `UPDATE products SET stock = stock - ? WHERE id = ?`,
          args: [item.quantity, item.id]
        });
      }
    }

    await db.batch(statements, 'write');

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import db from '@/db';
import crypto from 'crypto';

export async function GET() {
  try {
    const result = await db.execute('SELECT * FROM analytics_events ORDER BY timestamp DESC LIMIT 1000');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const event_id = crypto.randomUUID();
    
    await db.execute({
      sql: `
        INSERT INTO analytics_events (
          event_id, session_id, user_id, event_name, page, product_id, category,
          cart_value, order_weight, order_volume, customer_lat, customer_long,
          distance_km, weather_condition, traffic_condition, delivery_mode,
          drone_type, estimated_eta, delivery_cost, estimated_operating_cost,
          estimated_co2, customer_preference, recommended_mode, selected_mode
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
      `,
      args: [
        event_id,
        data.session_id || 'unknown',
        data.user_id || null,
        data.event_name,
        data.page || null,
        data.product_id || null,
        data.category || null,
        data.cart_value || null,
        data.order_weight || null,
        data.order_volume || null,
        data.customer_lat || null,
        data.customer_long || null,
        data.distance_km || null,
        data.weather_condition || null,
        data.traffic_condition || null,
        data.delivery_mode || null,
        data.drone_type || null,
        data.estimated_eta || null,
        data.delivery_cost || null,
        data.estimated_operating_cost || null,
        data.estimated_co2 || null,
        data.customer_preference || null,
        data.recommended_mode || null,
        data.selected_mode || null
      ]
    });

    return NextResponse.json({ success: true, event_id });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}

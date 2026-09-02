import { NextResponse } from 'next/server';
import db from '@/db';

export async function GET() {
  try {
    const result = await db.execute('SELECT DISTINCT category FROM products ORDER BY category ASC');
    const categories = result.rows.map((row: any) => row.category);
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

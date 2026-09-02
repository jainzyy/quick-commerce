import { NextResponse } from 'next/server';
import db from '@/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'rating_desc';

  let query = 'SELECT * FROM products WHERE 1=1';
  const params: any[] = [];

  if (search) {
    query += ' AND (name LIKE ? OR brand LIKE ? OR keywords LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  switch (sort) {
    case 'price_asc': query += ' ORDER BY price ASC'; break;
    case 'price_desc': query += ' ORDER BY price DESC'; break;
    case 'discount_desc': query += ' ORDER BY discount DESC'; break;
    case 'rating_desc': query += ' ORDER BY rating DESC, reviewCount DESC'; break;
    default: query += ' ORDER BY rating DESC'; break;
  }

  try {
    // Count total
    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as total');
    const totalResult = await db.execute({ sql: countQuery, args: params });
    const total = totalResult.rows[0].total as number;

    // Pagination
    query += ' LIMIT ? OFFSET ?';
    params.push(limit, (page - 1) * limit);

    const productsResult = await db.execute({ sql: query, args: params });
    const products = productsResult.rows;

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

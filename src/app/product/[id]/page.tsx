import db from '@/db';
import Header from '@/components/layout/Header';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductAction from './ProductAction';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await db.execute({
    sql: 'SELECT * FROM products WHERE id = ?',
    args: [id]
  });
  const row = result.rows[0];
  const product = row ? (Object.fromEntries(Object.entries(row)) as any) : null;

  if (!product) {
    notFound();
  }

  // Parse keywords safely
  let keywords = [];
  try {
    keywords = JSON.parse(product.keywords || '[]');
  } catch (e) {}

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex gap-2">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link href={`/?category=${encodeURIComponent(product.category)}`} className="hover:text-indigo-600">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-900 truncate max-w-[200px]">{product.name}</span>
        </div>
        
        <div className="bg-white rounded-2xl border p-6 md:p-10 shadow-sm flex flex-col md:flex-row gap-10">
          
          {/* Image */}
          <div className="md:w-1/2">
            <div className="w-full aspect-square bg-gray-50 rounded-xl flex items-center justify-center text-9xl border border-gray-100 relative">
              {product.mrp > product.price && (
                <div className="absolute top-4 left-4 bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded">
                  {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                </div>
              )}
              {product.image}
            </div>
          </div>
          
          {/* Details */}
          <div className="md:w-1/2 flex flex-col">
            <div className="text-indigo-600 font-bold tracking-wider text-xs uppercase mb-2">{product.brand}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="text-gray-500 mb-6 pb-6 border-b">
              {product.weight}{product.unit}
            </div>
            
            <div className="flex items-end gap-4 mb-8">
              <div className="text-4xl font-bold text-gray-900">₹{product.price}</div>
              {product.mrp > product.price && (
                <div className="text-xl text-gray-400 line-through mb-1">MRP ₹{product.mrp}</div>
              )}
            </div>
            
            <ProductAction product={product} />
            
            <div className="mt-12 space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Product Information</h3>
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div className="text-gray-500">Category</div>
                  <div className="font-medium">{product.category}</div>
                  
                  <div className="text-gray-500">Subcategory</div>
                  <div className="font-medium">{product.subcategory}</div>
                  
                  <div className="text-gray-500">Package Dimensions</div>
                  <div className="font-medium">{product.packageLength} x {product.packageWidth} x {product.packageHeight} cm</div>
                  
                  <div className="text-gray-500">Volume</div>
                  <div className="font-medium">{product.volume} cm³</div>
                  
                  {product.droneEligible ? (
                    <div className="col-span-2 mt-2 bg-green-50 text-green-700 text-xs px-3 py-2 rounded flex items-center gap-2">
                      <span>✓</span> Drone Delivery Eligible
                    </div>
                  ) : (
                    <div className="col-span-2 mt-2 bg-gray-100 text-gray-600 text-xs px-3 py-2 rounded flex items-center gap-2">
                      <span>×</span> Not eligible for drone delivery (weight/size restrictions)
                    </div>
                  )}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}

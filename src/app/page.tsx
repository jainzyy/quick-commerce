import Header from '@/components/layout/Header';
import ProductCard from '@/components/product/ProductCard';
import db from '@/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home(props: { searchParams: Promise<{ search?: string, category?: string }> }) {
  const searchParams = await props.searchParams;
  const search = searchParams.search || '';
  const category = searchParams.category || '';

  // Fetch categories
  const categoriesResult = await db.execute('SELECT DISTINCT category FROM products ORDER BY category');
  const categories = categoriesResult.rows as unknown as { category: string }[];

  // Fetch products
  let params: any[] = [];
  
  let query = 'SELECT * FROM products';
  let conditions = [];

  if (search) {
    conditions.push('(name LIKE ? OR brand LIKE ? OR category LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  
  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY stock DESC, rating DESC LIMIT 60';
  
  const productsResult = await db.execute({ sql: query, args: params });
  const products = productsResult.rows as unknown as any[];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        
        {/* Categories Bar */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 hide-scrollbar">
          <Link 
            href="/"
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border ${!category && !search ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-600'}`}
          >
            All Products
          </Link>
          {categories.map((c) => (
            <Link 
              key={c.category}
              href={`/?category=${encodeURIComponent(c.category)}`}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border ${category === c.category ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-600'}`}
            >
              {c.category}
            </Link>
          ))}
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {search ? `Search results for "${search}"` : category ? category : 'Popular right now'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} products found</p>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border">
            <h2 className="text-xl font-bold text-gray-700 mb-2">No products found</h2>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
            <Link href="/" className="inline-block mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700">
              Clear Filters
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}

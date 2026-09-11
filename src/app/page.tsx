import Header from '@/components/layout/Header';
import ProductCard from '@/components/product/ProductCard';
import db from '@/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function getCategoryIcon(category: string) {
  const lower = category.toLowerCase();
  if (lower.includes('fruit') || lower.includes('veg')) return '🥬';
  if (lower.includes('dair') || lower.includes('egg')) return '🥛';
  if (lower.includes('beverage') || lower.includes('drink')) return '🥤';
  if (lower.includes('snack') || lower.includes('munch')) return '🍪';
  if (lower.includes('convenience') || lower.includes('instant')) return '🏪';
  if (lower.includes('house') || lower.includes('clean')) return '🧽';
  if (lower.includes('personal')) return '🧴';
  if (lower.includes('baby')) return '🍼';
  if (lower.includes('pet')) return '🐾';
  if (lower.includes('pharmacy') || lower.includes('well')) return '💊';
  if (lower.includes('bakery') || lower.includes('bread')) return '🍞';
  if (lower.includes('meat') || lower.includes('chicken')) return '🍗';
  return '🛒';
}

function getCategoryTheme(index: number) {
  const themes = [
    'bg-secondary-container/40',
    'bg-surface-container-high',
    'bg-tertiary-fixed/30',
    'bg-secondary-container/50',
    'bg-surface-variant',
    'bg-secondary-container/30',
    'bg-surface-container',
    'bg-surface-variant/40',
    'bg-tertiary-fixed-dim/30',
    'bg-primary-fixed-dim/40',
  ];
  return themes[index % themes.length];
}

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
  const products = productsResult.rows.map(row => Object.fromEntries(Object.entries(row))) as any[];

  const flashDeals = products.filter(p => p.mrp > p.price).sort((a, b) => ((b.mrp - b.price) / b.mrp) - ((a.mrp - a.price) / a.mrp)).slice(0, 6);

  return (
    <div className="bg-background min-h-screen pb-20 font-body-md text-on-surface antialiased">
      <Header />
      
      <main className="w-full pt-[11rem]">
        {/* Top Flash Alert Bar */}
        <section className="w-full bg-surface-container-low py-2 px-grid-gutter hidden sm:block">
          <div className="max-w-container-max-width mx-auto flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
            <div className="flex items-center gap-space-sm overflow-hidden">
              <span className="inline-flex items-center gap-1 bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-label-badge text-label-badge uppercase font-bold">
                <span className="material-symbols-outlined text-[13px]">bolt</span>Live Dark-Store
              </span>
              <span className="truncate font-medium text-on-surface">Indiranagar Micro-Hub 04: Delivering 84 orders right now • Avg speed <strong>9.2 mins</strong></span>
            </div>
            <div className="hidden md:flex items-center gap-space-md shrink-0">
              <span className="flex items-center gap-1 text-primary font-bold"><span className="material-symbols-outlined text-[16px]">local_shipping</span> Free Delivery over ₹499</span>
              <span className="text-outline-variant">•</span>
              <span className="flex items-center gap-1 text-on-surface"><span className="material-symbols-outlined text-[16px] text-tertiary">workspace_premium</span> 100% Quality Assurance</span>
            </div>
          </div>
        </section>

        {!search && !category && (
          <>
            {/* Split Hero Promotional Banners */}
            <section className="max-w-container-max-width mx-auto px-grid-gutter pt-[7rem] w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
                {/* Hero Banner 1 */}
                <div className="lg:col-span-7 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-container text-on-primary p-space-lg md:p-space-xl flex flex-col justify-between shadow-sm min-h-[260px]">
                  <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-secondary-fixed/15 blur-3xl pointer-events-none"></div>
                  <div className="relative z-10 space-y-space-xs max-w-md">
                    <div className="inline-flex items-center gap-1.5 bg-on-primary/15 backdrop-blur-md text-primary-fixed px-3 py-1 rounded-full text-label-badge font-label-badge uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[14px]">wb_twilight</span> Morning chai & Breakfast rush
                    </div>
                    <h2 className="font-headline-lg text-headline-lg font-bold text-on-primary leading-tight">Fresh Dairy, Artisanal Bread & Instant Coffee</h2>
                    <p className="font-body-md text-body-md text-on-primary-container/90 leading-relaxed">
                      Amul full cream milk, Bru roasted blends & farm butter at up to <strong className="text-secondary-fixed font-bold">25% OFF</strong>. Packed in chilled containers.
                    </p>
                  </div>
                  <div className="relative z-10 pt-space-md flex items-center gap-space-md">
                    <Link href="/product/amul-gold-milk" className="inline-flex items-center gap-2 bg-on-primary text-primary px-space-md py-2.5 rounded-full font-label-button text-label-button shadow-md hover:bg-surface-bright transition-all group">
                      Shop Breakfast
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                    <span className="font-body-sm text-body-sm text-primary-fixed flex items-center gap-1 hidden sm:flex">
                      <span className="material-symbols-outlined text-[16px]">timer</span> At your door in 10 mins
                    </span>
                  </div>
                </div>
                
                {/* Hero Banner 2 */}
                <div className="lg:col-span-5 relative overflow-hidden rounded-2xl bg-surface-container-high text-on-surface p-space-lg md:p-space-xl flex flex-col justify-between shadow-sm min-h-[260px]">
                  <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-tertiary-fixed/30 blur-2xl pointer-events-none"></div>
                  <div className="relative z-10 space-y-space-xs">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 bg-tertiary text-on-tertiary px-2.5 py-0.5 rounded-full font-label-badge text-label-badge uppercase">
                        <span className="material-symbols-outlined text-[13px]">verified</span> Wholesale Rates
                      </span>
                      <span className="font-label-badge text-label-badge text-tertiary-container uppercase tracking-wider font-bold">Lowest Price Guarantee</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md font-bold text-on-surface leading-tight">Daily Grocery & Staples</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">Atta, aromatic Basmati, pure cow ghee & cold-pressed oils stocked straight from millers.</p>
                  </div>
                  <div className="relative z-10 pt-space-md flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Starting at</span>
                      <span className="font-price-lg text-price-lg text-primary">₹26</span>
                    </div>
                    <Link href="/?category=Atta%2C%20Rice%20%26%20Dal" className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary px-space-md py-2 rounded-full font-label-button text-label-button transition-colors">
                      Explore Staples <span className="material-symbols-outlined text-[16px]">north_east</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Visual Category Carousel */}
            <section className="max-w-container-max-width mx-auto px-grid-gutter pt-space-xl w-full">
              <div className="flex items-center justify-between mb-space-md">
                <div>
                  <span className="font-label-badge text-label-badge uppercase tracking-widest text-primary font-bold">Aisle Directory</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Explore Categories</h2>
                </div>
              </div>
              <div className="flex gap-space-sm overflow-x-auto pb-2 scroll-smooth hide-scrollbar">
                {categories.map((c, i) => (
                  <Link 
                    key={c.category} 
                    href={`/?category=${encodeURIComponent(c.category)}`}
                    className="flex-shrink-0 w-32 md:w-36 p-space-sm rounded-xl bg-surface-container-lowest hover:bg-surface-container-low shadow-sm transition-all text-center group flex flex-col items-center"
                  >
                    <div className={`w-14 h-14 rounded-full ${getCategoryTheme(i)} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                      {getCategoryIcon(c.category)}
                    </div>
                    <span className="mt-2 font-label-button text-label-button text-on-surface leading-tight min-h-[40px] flex items-center">{c.category}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Flash Deals */}
            {flashDeals.length > 0 && (
              <section className="max-w-container-max-width mx-auto px-grid-gutter pt-[9rem] w-full">
                <div className="bg-surface-container-low rounded-2xl p-space-md md:p-space-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-lg">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[24px]">electric_bolt</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-headline-md text-headline-md text-on-surface">Flash Deals & Steal Prices</h2>
                          <span className="bg-error text-on-error font-label-badge text-label-badge px-2 py-0.5 rounded-full uppercase animate-pulse">Ending Soon</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Deep price drops verified straight from dark-store real-time batch pricing</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-space-sm">
                    {flashDeals.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* Main Storefront Catalog */}
        <section className={`max-w-container-max-width mx-auto px-grid-gutter w-full pb-10 ${!search && !category ? 'pt-space-2xl' : 'pt-space-md'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            
            {/* Smart Filters Sidebar */}
            <aside className="lg:col-span-3 bg-surface-container-lowest rounded-2xl p-space-md shadow-sm space-y-space-lg lg:sticky lg:top-36 hidden md:block border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Smart Filters</h3>
                </div>
                { (search || category) && (
                  <Link href="/" className="font-label-badge text-label-badge uppercase text-outline hover:text-primary">Clear all</Link>
                )}
              </div>
              
              <div className="space-y-space-xs">
                <label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container">
                  <span className="font-body-sm text-body-sm text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">bolt</span> 10-Min Fast Lane
                  </span>
                  <input defaultChecked className="accent-primary w-4 h-4 rounded" type="checkbox" />
                </label>
              </div>

              <div>
                <span className="font-label-button text-label-button uppercase text-outline-variant tracking-wider">Departments</span>
                <nav className="flex flex-col space-y-1 mt-2">
                  <Link 
                    href="/"
                    className={`px-2.5 py-1.5 rounded-lg text-body-sm font-medium flex items-center justify-between ${!category && !search ? 'text-primary bg-primary-fixed/20' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
                  >
                    <span>All Products</span>
                  </Link>
                  {categories.map(c => (
                    <Link 
                      key={c.category}
                      href={`/?category=${encodeURIComponent(c.category)}`}
                      className={`px-2.5 py-1.5 rounded-lg text-body-sm font-medium flex items-center justify-between ${category === c.category ? 'text-primary bg-primary-fixed/20' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
                    >
                      <span>{getCategoryIcon(c.category)} {c.category}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="lg:col-span-9 space-y-space-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    {search ? `Search results for "${search}"` : category ? category : 'All Products'}
                  </h3>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">{products.length} items</span>
              </div>
              
              {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-space-sm">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
                  <span className="material-symbols-outlined text-[48px] text-outline-variant mb-4">search_off</span>
                  <h2 className="text-xl font-bold text-on-surface mb-2">No products found</h2>
                  <p className="text-on-surface-variant mb-6">Try adjusting your search or category filter.</p>
                  <Link href="/" className="inline-block px-6 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-full font-label-button transition-colors">
                    Clear Filters
                  </Link>
                </div>
              )}
            </div>
            
          </div>
        </section>

      </main>
    </div>
  );
}

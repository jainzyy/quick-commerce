'use client';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { items, addItem, removeItem, updateQuantity, clearCart, getCartTotal, getCartWeight, getCartVolume, getItemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  
  const cartTotal = getCartTotal();
  const FREE_DELIVERY_THRESHOLD = 499;
  const isFreeDelivery = cartTotal >= FREE_DELIVERY_THRESHOLD || cartTotal === 0;
  const deliveryFee = (isFreeDelivery || cartTotal === 0) ? 0 : 40;
  const productDiscount = cartTotal > 0 ? Math.floor(cartTotal * 0.15) : 0; // 15% discount
  const mrpTotal = cartTotal + productDiscount;
  const grandTotal = cartTotal + deliveryFee;
  const itemCount = getItemCount();


  if (!mounted) return <div className="min-h-screen bg-slate-50"><Header /><main className="pt-[11rem] md:pt-[9rem] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"></main></div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-[11rem] md:pt-[9rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          
          <nav aria-label="Checkout Progress" className="mb-10 max-w-3xl mx-auto hidden md:block">
            <ol className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full -z-10"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 h-1 bg-primary rounded-full -z-10"></div>
              
              <li className="flex flex-col items-center gap-2 bg-slate-50 px-2 relative z-10">
                <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center shadow-lg ring-4 ring-slate-50">
                  1
                </div>
                <span className="text-xs font-bold text-slate-900">Shopping Cart</span>
              </li>
              
              <li className="flex flex-col items-center gap-2 bg-slate-50 px-2 relative z-10 opacity-60">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 text-slate-400 font-bold flex items-center justify-center ring-4 ring-slate-50">
                  2
                </div>
                <span className="text-xs font-semibold text-slate-500">Address</span>
              </li>
              
              <li className="flex flex-col items-center gap-2 bg-slate-50 px-2 relative z-10 opacity-60">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 text-slate-400 font-bold flex items-center justify-center ring-4 ring-slate-50">
                  3
                </div>
                <span className="text-xs font-semibold text-slate-500">Delivery</span>
              </li>
              
              <li className="flex flex-col items-center gap-2 bg-slate-50 px-2 relative z-10 opacity-60">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 text-slate-400 font-bold flex items-center justify-center ring-4 ring-slate-50">
                  4
                </div>
                <span className="text-xs font-semibold text-slate-500">Payment</span>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            <section className="lg:col-span-7 xl:col-span-8 space-y-6 lg:space-y-8" data-purpose="cart-items">
              
              <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-baseline gap-3">
                    My Shopping Cart
                    <span className="text-sm font-bold text-primary bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-100 align-middle">
                      {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
                    </span>
                  </h1>
                  <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                    Fulfilling from <span className="font-semibold text-slate-700">Andheri Fast Micro-Hub</span> 
                    <span className="text-slate-300">✦</span> 
                    Estimated packing <span className="font-semibold text-slate-700">2 mins</span>
                  </p>
                </div>
                
                {items.length > 0 && (
                  <button 
                    onClick={() => clearCart()}
                    className="text-sm font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-xl transition-colors shrink-0" 
                    type="button"
                  >
                    Clear Cart
                  </button>
                )}
              </header>

              <div className="bg-emerald-50/80 border border-emerald-200/60 rounded-2xl p-4 flex gap-4 items-start relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-emerald-100 relative z-10">
                  <span className="text-xl">🚁</span>
                </div>
                <div className="relative z-10">
                  <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                    Eligible for FREE Drone Delivery! 
                    <span className="text-[10px] uppercase tracking-wider font-extrabold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-sm">Saved ₹40</span>
                  </h4>
                  <p className="text-xs text-emerald-700/80 mt-0.5 max-w-md leading-relaxed">
                    Package weight fits under autonomous aerial drop limits. Superfast guaranteed.
                  </p>
                </div>
                <div className="hidden md:block ml-auto text-right">
                  <div className="text-xs font-bold text-emerald-900 bg-white/60 px-2 py-1 rounded-lg border border-emerald-100">
                    {(getCartWeight() / 1000).toFixed(1)}kg / 3.5 kg max
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
                {items.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">
                    Your cart is empty. <br/><br/>
                    <Link href="/" className="text-primary font-bold hover:underline">Continue Shopping</Link>
                  </div>
                ) : (
                  items.map(item => (
                    <article key={item.id} className="p-5 sm:p-6 border-b border-slate-100 last:border-b-0 flex flex-col sm:flex-row gap-5 sm:gap-6 group">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50/60 border border-slate-100 p-2 flex items-center justify-center shrink-0 overflow-hidden">
                          {item.image.includes('.') ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                          ) : (
                            <span aria-label={item.name} className="text-4xl select-none" role="img">{item.image || '📦'}</span>
                          )}
                          <span className="absolute bottom-1 right-1 bg-white/95 text-[10px] font-bold text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                            {item.weight < 1000 ? `${item.weight}g` : `${(item.weight/1000).toFixed(1)}kg`}
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          <h2 className="text-base font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                            {item.name}
                          </h2>
                          <div className="flex items-baseline gap-2 pt-1">
                            <span className="text-lg font-black text-slate-900">₹{item.price}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 ml-auto">
                        <div className="inline-flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 shadow-2xs">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 active:scale-95 border border-slate-200/80 text-slate-700 font-bold flex items-center justify-center transition-all" 
                            type="button"
                          >
                            −
                          </button>
                          <span className="w-10 text-center font-bold text-sm text-slate-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-primary hover:bg-primary-container active:scale-95 text-white font-bold flex items-center justify-center transition-all shadow-xs" 
                            type="button"
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-rose-600 transition-colors p-1" 
                          type="button"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                          </svg>
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </article>
                  ))
                )}
              </div>
            
              <div className="mt-8 bg-white rounded-2xl border border-slate-200/80 shadow-card p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Frequently Bought With This Item</h2>
                    <p className="text-xs text-slate-500">Add these complementary treats for extra tail wags</p>
                  </div>
                  <span className="text-xs font-semibold text-primary hover:text-primary cursor-pointer">View All</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="border border-slate-200 rounded-xl p-3 flex flex-col justify-between hover:border-primary transition-colors bg-slate-50/50">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-xl shrink-0">
                        🥘
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-slate-900 truncate">Felix Wet Cat Pouch</h3>
                        <p className="text-[11px] text-slate-500">Chicken in Gravy 85g</p>
                        <p className="text-xs font-bold text-slate-900 mt-1">₹45</p>
                      </div>
                    </div>
                    <button onClick={() => {
                        addItem({
                          id: 'upsell-1',
                          name: 'Felix Wet Cat Pouch',
                          price: 45,
                          weight: 85,
                          volume: 0.1,
                          image: '🥘',
                          isFragile: false,
                          isLiquid: false,
                          isTemperatureSensitive: false,
                          isHazardous: false,
                          droneEligible: true
                        }, 1);
                      }} className="mt-3 w-full py-1.5 px-3 bg-white border border-brand-600 text-primary hover:bg-primary hover:text-white rounded-lg text-xs font-bold transition-all shadow-2xs" type="button">
                      + ADD
                    </button>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-3 flex flex-col justify-between hover:border-primary transition-colors bg-slate-50/50">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-xl shrink-0">
                        🐟
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-slate-900 truncate">Cat Treats Salmon</h3>
                        <p className="text-[11px] text-slate-500">Crunchy Bites 50g</p>
                        <p className="text-xs font-bold text-slate-900 mt-1">₹85</p>
                      </div>
                    </div>
                    <button onClick={() => {
                        addItem({
                          id: 'upsell-2',
                          name: 'Cat Treats Salmon',
                          price: 85,
                          weight: 50,
                          volume: 0.1,
                          image: '🐟',
                          isFragile: false,
                          isLiquid: false,
                          isTemperatureSensitive: false,
                          isHazardous: false,
                          droneEligible: true
                        }, 1);
                      }} className="mt-3 w-full py-1.5 px-3 bg-white border border-brand-600 text-primary hover:bg-primary hover:text-white rounded-lg text-xs font-bold transition-all shadow-2xs" type="button">
                      + ADD
                    </button>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-3 flex flex-col justify-between hover:border-primary transition-colors bg-slate-50/50">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-xl shrink-0">
                        🥣
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-slate-900 truncate">Stainless Pet Bowl</h3>
                        <p className="text-[11px] text-slate-500">Non-Skid Base (S)</p>
                        <p className="text-xs font-bold text-slate-900 mt-1">₹120</p>
                      </div>
                    </div>
                    <button onClick={() => {
                        addItem({
                          id: 'upsell-3',
                          name: 'Stainless Pet Bowl',
                          price: 120,
                          weight: 150,
                          volume: 0.5,
                          image: '🥣',
                          isFragile: false,
                          isLiquid: false,
                          isTemperatureSensitive: false,
                          isHazardous: false,
                          droneEligible: true
                        }, 1);
                      }} className="mt-3 w-full py-1.5 px-3 bg-white border border-brand-600 text-primary hover:bg-primary hover:text-white rounded-lg text-xs font-bold transition-all shadow-2xs" type="button">
                      + ADD
                    </button>
                  </div>
                </div>
              </div>

            </section>

            <aside className="lg:col-span-5 xl:col-span-4 space-y-4 lg:sticky lg:top-28">
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-5 sm:p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h2 className="text-lg font-extrabold text-slate-900">Order Summary</h2>
                  <span className="text-xs font-bold text-primary bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
                    {itemCount} {itemCount === 1 ? 'Item' : 'Items'} Added
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Item MRP Total</span>
                    <span className="font-medium text-slate-900">₹{mrpTotal.toFixed(2)}</span>
                  </div>
                  {productDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Product Discount</span>
                      <span>-₹{productDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      Delivery Fee
                      <span className="text-[10px] bg-surface-container-high text-on-surface-variant font-bold px-1.5 rounded">DRONE</span>
                    </span>
                    <span className={`font-bold ${isFreeDelivery ? "text-primary" : "text-slate-900"}`}>{isFreeDelivery ? "FREE" : "₹" + deliveryFee}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                    <div className="flex justify-between items-center">
                      <span>Est. Package Weight</span>
                      <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{(getCartWeight()/1000).toFixed(1)} kg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Est. Package Volume</span>
                      <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{getCartVolume().toFixed(1)} L</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-dashed border-slate-200 flex justify-between items-baseline">
                    <div>
                      <span className="text-base font-extrabold text-slate-900">To Pay</span>
                      <p className="text-[11px] text-slate-400">Inclusive of all taxes</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-slate-900">₹{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input className="w-full text-xs uppercase font-bold text-slate-700 bg-white border border-slate-300 rounded-lg py-2 px-3 focus:ring-1 focus:ring-primary" placeholder="Enter Coupon" type="text" defaultValue="QUICKDRONE" />
                    </div>
                    <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors" type="button">
                      APPLIED
                    </button>
                  </div>
                  {!isFreeDelivery ? (
    <p className="text-[11px] text-amber-600 font-semibold mt-2 flex items-center gap-1">
      Add ₹{FREE_DELIVERY_THRESHOLD - cartTotal} more for FREE delivery!
    </p>
  ) : (
    <p className="text-[11px] text-primary font-semibold mt-2 flex items-center gap-1">
      🎉 'QUICKDRONE' coupon applied: 100% Free Express Delivery!
    </p>
  )}
                </div>

                <Link href="/checkout" className="w-full bg-primary hover:bg-primary-container text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-glow active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 group text-base">
                  <span>Proceed to Checkout</span>
                  <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                  </svg>
                </Link>

              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

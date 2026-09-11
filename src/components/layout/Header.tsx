'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useAppStore } from '@/store/appStore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SAMPLE_LOCATIONS } from '@/config/delivery';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const itemCount = useCartStore((state) => state.getItemCount());
  const cartTotal = useCartStore((state) => state.getCartTotal());
  const { deliveryLocation, setDeliveryLocation } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    { label: "All Products", path: "/" },
    { label: "Baby Care", path: "/?category=Baby%20Care" },
    { label: "Beverages", path: "/?category=Beverages" },
    { label: "Convenience", path: "/?category=Convenience" },
    { label: "Dairy & Eggs", path: "/?category=Dairy%20%26%20Eggs" },
    { label: "Fruits & Vegetables", path: "/?category=Fruits%20%26%20Vegetables" },
    { label: "Grocery", path: "/?category=Grocery" },
    { label: "Household", path: "/?category=Household" },
    { label: "Personal Care", path: "/?category=Personal%20Care" },
    { label: "Pet Care", path: "/?category=Pet%20Care" },
    { label: "Pharmacy/Wellness", path: "/?category=Pharmacy%2FWellness" },
    { label: "Snacks", path: "/?category=Snacks" }
  ];

  return (
    <>
      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-6 max-w-md w-full shadow-2xl flex flex-col max-h-[90vh]">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4 shrink-0">Select Delivery Location</h2>
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
              {SAMPLE_LOCATIONS.map((loc, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDeliveryLocation({ lat: loc.lat, lon: loc.lon, address: loc.name });
                    setShowLocationModal(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border flex items-center gap-3 transition-colors ${
                    deliveryLocation?.address === loc.name ? 'border-primary bg-primary-fixed/10' : 'border-surface-container hover:border-outline-variant bg-surface-container-low'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[20px] shrink-0 ${deliveryLocation?.address === loc.name ? 'text-primary' : 'text-outline'}`}>
                    location_on
                  </span>
                  <div>
                    <div className="font-semibold font-body-md text-on-surface">{loc.name}</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{loc.distanceApprox} km from dark store</div>
                  </div>
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowLocationModal(false)}
              className="mt-6 w-full py-2.5 bg-surface-container font-label-button text-label-button text-on-surface rounded-xl hover:bg-surface-container-high transition-colors shrink-0"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col">
        <div className="max-w-container-max-width w-full mx-auto px-grid-gutter h-header-height flex items-center justify-between gap-space-lg">
          
          <div className="flex items-center gap-space-lg shrink-0">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-space-xs">
              <img alt="QuickDash Brand Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvaFd-Yzcz5B-ujOp9siOi8H17M5bql_powC-gjroMfUM6xRH-hBK06C1Vg5Tpcd7GYlv0i-HypJC6VKwYnwnfG9-smQ8iqQxStMOFSBh19ldSpYDCqM2F6g6PolYZPZ7Fqx-LW-GtW-k_zMsXLQwBn6T_IfC5qISXU8lToCEIINBZfb1dSm0vjW5-cj0KvNePp9JKqXK7TSB_nhWfvvaeGO0lW8gWW6z7HPkOFuaAnzpxXO2Sbk-_AA"/>
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-primary tracking-tight leading-none">QuickDash</span>
                <span className="inline-flex items-center gap-space-2xs bg-secondary-container text-on-secondary-container font-label-badge text-label-badge uppercase px-space-xs py-0.5 rounded-full mt-1">
                  <span className="material-symbols-outlined text-[12px]">bolt</span>10 Mins Delivery
                </span>
              </div>
            </Link>

            <div className="h-8 w-px bg-surface-container-highest hidden md:block"></div>

            {/* Location Selector */}
            <button 
              onClick={() => setShowLocationModal(true)} 
              className="text-left flex items-center gap-space-xs group bg-surface-container-low hover:bg-surface-container px-space-sm py-space-xs rounded-lg transition-colors hidden sm:flex"
            >
              <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface leading-tight">Delivery in 11 Mins ⚡</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant max-w-[180px] truncate leading-tight" suppressHydrationWarning>
                  {deliveryLocation?.address || 'Select Location'}
                </span>
              </div>
              <span className="material-symbols-outlined text-outline text-[18px] group-hover:translate-y-0.5 transition-transform">expand_more</span>
            </button>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl px-space-xs hidden md:block">
            <form onSubmit={handleSearch} className="relative flex items-center w-full">
              <span className="material-symbols-outlined absolute left-space-md text-outline pointer-events-none text-[20px]">search</span>
              <input 
                className="w-full h-12 pl-11 pr-14 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface placeholder:text-outline font-body-md text-body-md outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_rgba(0,105,72,0.2)] transition-all" 
                placeholder='Search "milk", "atta", "chips", "coffee"...' 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute right-space-md hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-badge text-label-badge tracking-wider pointer-events-none">
                ⌘K
              </span>
            </form>
          </div>

          <div className="flex items-center gap-space-md shrink-0">
            <nav className="hidden lg:flex items-center gap-space-xs">
              <Link href="/orders" className="px-space-sm py-space-xs font-label-button text-label-button text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors">
                Orders
              </Link>
              <Link href="/account" className="px-space-sm py-space-xs font-label-button text-label-button text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors">
                Login / Account
              </Link>
            </nav>

            {/* Mobile Location Icon */}
            <button onClick={() => setShowLocationModal(true)} className="sm:hidden w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
               <span className="material-symbols-outlined text-[20px]">location_on</span>
            </button>

            {/* Cart Button */}
            <Link href="/cart" className="relative flex items-center gap-space-sm bg-primary hover:bg-primary-container text-on-primary px-space-md py-2.5 rounded-full transition-all shadow-[0_4px_12px_rgba(0,105,72,0.25)] hover:shadow-[0_6px_16px_rgba(0,105,72,0.35)]" suppressHydrationWarning>
              <div className="relative flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-tertiary text-on-tertiary font-label-badge text-label-badge w-4 h-4 rounded-full flex items-center justify-center leading-none ring-2 ring-surface-container-lowest animate-pulse">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-label-badge text-[10px] font-bold text-primary-fixed uppercase leading-tight">Cart</span>
                <span className="font-label-button text-label-button text-on-primary leading-tight">
                  {mounted ? itemCount : 0} items {mounted && itemCount > 0 && `• ₹${cartTotal.toFixed(0)}`}
                </span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-primary-fixed hidden sm:block">arrow_forward</span>
            </Link>

            <Link href="/account" className="hidden md:flex w-8 h-8 rounded-full bg-primary items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </Link>
          </div>
        </div>

          {/* Horizontal Categories Scroll */}
          <div className="bg-surface border-b border-outline-variant hidden md:block">
            <div className="max-w-container-max-width w-full mx-auto px-grid-gutter h-[3.5rem] flex items-center overflow-x-auto hide-scrollbar">
              <nav className="flex items-center gap-space-2xs w-full py-space-xs">
                {categories.map((cat, index) => {
                  let icon = cat.label === 'All Products' ? '' : '🛒';
                  const lower = cat.label.toLowerCase();
                  if (lower.includes('fruit') || lower.includes('veg')) icon = '🥬';
                  else if (lower.includes('dair') || lower.includes('egg')) icon = '🥛';
                  else if (lower.includes('beverage') || lower.includes('drink')) icon = '🥤';
                  else if (lower.includes('snack') || lower.includes('munch')) icon = '🍪';
                  else if (lower.includes('convenience') || lower.includes('instant')) icon = '🏪';
                  else if (lower.includes('house') || lower.includes('clean')) icon = '🧽';
                  else if (lower.includes('personal')) icon = '🧴';
                  else if (lower.includes('baby')) icon = '🍼';
                  else if (lower.includes('pet')) icon = '🐾';
                  else if (lower.includes('pharmacy') || lower.includes('well')) icon = '💊';
                  if (lower.includes('bakery') || lower.includes('bread')) icon = '🍞';
                  if (lower.includes('meat') || lower.includes('chicken')) icon = '🍗';

                  return (
                    <Link 
                      key={index} 
                      href={cat.path} 
                      className={`shrink-0 px-space-sm py-1.5 rounded-lg font-label-button text-label-button transition-all flex items-center gap-1.5 ${index === 0 ? 'bg-surface-container-lowest text-primary font-bold shadow-[0_1px_4px_rgba(0,0,0,0.06)]' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`}
                    >
                      {icon && <span>{icon}</span>}
                      {cat.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

        {/* Mobile Search Row */}
        <div className="md:hidden max-w-container-max-width mx-auto px-grid-gutter pb-3 pt-1">
          <form onSubmit={handleSearch} className="relative flex items-center w-full">
            <span className="material-symbols-outlined absolute left-3 text-outline pointer-events-none text-[20px]">search</span>
            <input 
              className="w-full h-10 pl-10 pr-4 rounded-full bg-surface-container-low text-on-surface placeholder:text-outline font-body-md outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_rgba(0,105,72,0.2)]" 
              placeholder='Search products...' 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </header>
    </>
  );
}


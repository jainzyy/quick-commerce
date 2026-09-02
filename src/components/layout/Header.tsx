'use client';

import Link from 'next/link';
import { ShoppingCart, MapPin, Search } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAppStore } from '@/store/appStore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SAMPLE_LOCATIONS } from '@/config/delivery';

export default function Header() {
  const itemCount = useCartStore((state) => state.getItemCount());
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

  return (
    <>
      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Select Delivery Location</h2>
            <div className="space-y-3">
              {SAMPLE_LOCATIONS.map((loc, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDeliveryLocation({ lat: loc.lat, lon: loc.lon, address: loc.name });
                    setShowLocationModal(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border flex items-center gap-3 transition-colors ${
                    deliveryLocation?.address === loc.name ? 'border-indigo-600 bg-indigo-50' : 'hover:border-indigo-300'
                  }`}
                >
                  <MapPin size={18} className={deliveryLocation?.address === loc.name ? 'text-indigo-600' : 'text-gray-400'} />
                  <div>
                    <div className="font-semibold">{loc.name}</div>
                    <div className="text-xs text-gray-500">{loc.distanceApprox} km from dark store</div>
                  </div>
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowLocationModal(false)}
              className="mt-6 w-full py-2 bg-gray-100 font-semibold rounded-xl hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">QuickDash</span>
          </Link>

          {/* Desktop Location Selector */}
          <button onClick={() => setShowLocationModal(true)} className="hidden md:flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 truncate max-w-[200px] cursor-pointer">
            <MapPin size={18} className="text-indigo-600 flex-shrink-0" />
            <span className="truncate" suppressHydrationWarning>{deliveryLocation?.address || 'Select Delivery Location'}</span>
          </button>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:block flex-1 max-w-xl relative">
            <input 
              type="text" 
              placeholder="Search for products..." 
              className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600">
              <Search size={18} />
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-indigo-600" suppressHydrationWarning>
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center" suppressHydrationWarning>
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search & Location Row */}
        <div className="flex md:hidden items-center gap-2 mt-3">
          <button onClick={() => setShowLocationModal(true)} className="flex items-center gap-1 text-xs text-gray-700 hover:text-indigo-600 cursor-pointer border rounded-full px-3 py-2 bg-gray-50 max-w-[140px]">
            <MapPin size={14} className="text-indigo-600 flex-shrink-0" />
            <span className="truncate font-medium" suppressHydrationWarning>{deliveryLocation?.address || 'Location'}</span>
          </button>
          
          <form onSubmit={handleSearch} className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full h-9 pl-9 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600">
              <Search size={16} />
            </button>
          </form>
        </div>
      </div>
    </header>
    </>
  );
}

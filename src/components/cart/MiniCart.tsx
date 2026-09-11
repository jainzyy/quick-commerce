'use client';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MiniCart() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  useEffect(() => setMounted(true), []);
  const itemCount = useCartStore(state => state.getItemCount());
  const cartTotal = useCartStore(state => state.getCartTotal());
  const items = useCartStore(state => state.items);

  if (!mounted || itemCount === 0 || pathname === '/cart' || pathname === '/checkout') return null;

  const FREE_DELIVERY_THRESHOLD = 499;
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - cartTotal);
  const progressPercent = Math.min(100, (cartTotal / FREE_DELIVERY_THRESHOLD) * 100);

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-surface-container-lowest rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-outline-variant/30 p-space-lg w-96 hidden md:flex flex-col gap-space-md animate-in fade-in slide-in-from-bottom-5">
      
      {/* Free Delivery Goal */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-tertiary">celebration</span>
            Free Delivery Goal
          </span>
          {remainingForFreeDelivery > 0 ? (
            <span className="font-label-button text-label-button font-bold text-primary">Add ₹{remainingForFreeDelivery.toFixed(0)} more</span>
          ) : (
            <span className="font-label-button text-label-button font-bold text-primary">Goal Reached!</span>
          )}
        </div>
        <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden mb-1">
          <div 
            className="bg-primary h-full rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-on-surface-variant font-body-sm">
          <span>₹{cartTotal.toFixed(0)} in bag</span>
          <span>Free threshold: ₹{FREE_DELIVERY_THRESHOLD}</span>
        </div>
      </div>

      <div className="h-px w-full bg-surface-container-highest" />

      {/* Items Preview & Total */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-hidden flex-1">
          {items.slice(0, 3).map((item, idx) => (
            <div key={idx} className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-lg shrink-0">
              {item.image}
            </div>
          ))}
          {items.length > 3 && (
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-xs font-bold text-on-surface-variant shrink-0">
              +{items.length - 3}
            </div>
          )}
        </div>
        <div className="flex flex-col text-right pl-3">
          <span className="font-body-sm text-[11px] text-on-surface-variant font-medium">{itemCount} Items</span>
          <span className="font-price-lg text-[18px] font-bold text-primary">₹{cartTotal.toFixed(0)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link 
        href="/cart"
        className="w-full bg-primary hover:bg-primary-container text-on-primary py-3 rounded-xl font-label-button text-label-button transition-colors flex items-center justify-between px-4 shadow-[0_4px_12px_rgba(0,105,72,0.25)]"
      >
        <span className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
          View Cart & Checkout
        </span>
        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
      </Link>
    </div>
  );
}


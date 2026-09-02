'use client';

import { useCartStore } from '@/store/cartStore';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Trash2, AlertTriangle, ArrowRight, ShoppingCart } from 'lucide-react';
import { trackEvent } from '@/analytics/tracker';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getCartTotal, getCartWeight, getCartVolume, getItemCount } = useCartStore();

  const handleRemove = (id: string) => {
    removeItem(id);
    trackEvent('remove_from_cart', { product_id: id });
  };

  const handleCheckout = () => {
    trackEvent('checkout_started', { 
      cart_value: getCartTotal(),
      order_weight: getCartWeight(),
      order_volume: getCartVolume(),
      item_count: getItemCount()
    });
  };

  // Hydration fallback removed to ensure cart always renders

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center max-w-md">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
            <ShoppingCart size={48} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/" className="block w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition">
            Start Shopping
          </Link>
        </main>
      </div>
    );
  }

  const total = getCartTotal();
  const weightKg = (getCartWeight() / 1000).toFixed(1);
  const volumeLiters = (getCartVolume() / 1000).toFixed(1);
  
  const hasFragile = items.some(i => i.isFragile);
  const hasLiquid = items.some(i => i.isLiquid);
  const hasTemperature = items.some(i => i.isTemperatureSensitive);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Your Cart ({getItemCount()} items)</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items List */}
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border flex gap-4 items-center">
                <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                  {item.image}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                  <div className="text-sm text-gray-500 mb-2">{item.weight}{(item as any).unit || 'g'}</div>
                  <div className="font-bold">₹{item.price}</div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-200 rounded-l-lg font-bold"
                    >-</button>
                    <span className="font-medium w-4 text-center text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-200 rounded-r-lg font-bold"
                    >+</button>
                  </div>
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border sticky top-24">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Est. Package Weight</span>
                  <span className="font-semibold">{weightKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Est. Package Volume</span>
                  <span className="font-semibold">{volumeLiters} L</span>
                </div>
              </div>
              
              {/* Package constraints alerts */}
              {(hasFragile || hasLiquid || hasTemperature) && (
                <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 mb-6">
                  <div className="flex items-center gap-2 text-orange-800 font-semibold text-sm mb-1">
                    <AlertTriangle size={16} /> Order constraints
                  </div>
                  <ul className="text-xs text-orange-700 list-disc list-inside">
                    {hasFragile && <li>Contains fragile items</li>}
                    {hasLiquid && <li>Contains liquid items</li>}
                    {hasTemperature && <li>Temperature sensitive items</li>}
                  </ul>
                </div>
              )}
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-2xl text-gray-900">₹{total.toFixed(2)}</span>
                </div>
                {total >= 699 ? (
                  <p className="text-xs font-bold text-green-600 text-right mt-1">🎉 Eligible for FREE Delivery on ALL Modes!</p>
                ) : total >= 499 ? (
                  <p className="text-xs font-bold text-green-600 text-right mt-1">🎉 Eligible for FREE Regular Delivery!</p>
                ) : total >= 249 ? (
                  <p className="text-xs font-bold text-green-600 text-right mt-1">🎉 Eligible for FREE Drone Delivery!</p>
                ) : (
                  <p className="text-xs text-gray-500 text-right mt-1">Add ₹{(249 - total).toFixed(2)} more for FREE Drone Delivery</p>
                )}
              </div>
              
              <Link 
                href="/checkout" 
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

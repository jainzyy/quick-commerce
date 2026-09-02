'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { trackEvent } from '@/analytics/tracker';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  weight: number;
  unit: string;
  image: string;
  volume: number;
  isFragile: boolean;
  isLiquid: boolean;
  isTemperatureSensitive: boolean;
  isHazardous: boolean;
  droneEligible: boolean;
  stock: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore(state => state.addItem);
  const cartItems = useCartStore(state => state.items);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  
  const cartItem = cartItems.find(item => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (quantityInCart === 0) {
      addItem(product);
      trackEvent('add_to_cart', { product_id: product.id, price: product.price });
    } else {
      updateQuantity(product.id, quantityInCart + 1);
    }
  };

  const handleRemove = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    updateQuantity(product.id, quantityInCart - 1);
    if (quantityInCart === 1) {
      trackEvent('remove_from_cart', { product_id: product.id });
    }
  };

  const discountPercent = product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0;

  return (
    <div className="border rounded-xl p-3 flex flex-col hover:shadow-lg transition-shadow bg-white relative">
      {discountPercent > 0 && (
        <div className="absolute top-2 left-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded">
          {discountPercent}% OFF
        </div>
      )}
      
      <div className="w-full aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center text-6xl">
        {product.image}
      </div>
      
      <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
      <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2 min-h-[40px]">{product.name}</h3>
      <div className="text-xs text-gray-500 mb-2">{product.weight}{product.unit}</div>
      
      <div className="mt-auto flex items-center justify-between">
        <div>
          <div className="font-bold text-base">₹{product.price}</div>
          {product.mrp > product.price && (
            <div className="text-xs text-gray-400 line-through">₹{product.mrp}</div>
          )}
        </div>
        
        {product.stock === 0 ? (
          <div className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
            OUT OF STOCK
          </div>
        ) : quantityInCart === 0 ? (
          <button 
            type="button"
            onClick={handleAdd}
            className="border border-indigo-600 text-indigo-600 font-medium px-4 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors text-sm relative z-10 select-none touch-manipulation"
          >
            ADD
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-indigo-600 text-white rounded-lg relative z-10 select-none touch-manipulation">
            <button type="button" onClick={handleRemove} className="px-2.5 py-1.5 hover:bg-indigo-700 rounded-l-lg">-</button>
            <span className="font-medium text-sm w-4 text-center">{quantityInCart}</span>
            <button type="button" onClick={handleAdd} className="px-2.5 py-1.5 hover:bg-indigo-700 rounded-r-lg">+</button>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

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

  const savings = product.mrp - product.price;

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-sm flex flex-col justify-between shadow-sm hover:shadow-md transition-all group relative border border-outline-variant/30 hover:border-outline-variant">
      {discountPercent > 0 && (
        <div className="absolute top-space-xs left-space-xs z-10">
          <span className="bg-error text-on-error font-label-badge text-label-badge px-2 py-0.5 rounded-full font-bold">
            {discountPercent}% OFF
          </span>
        </div>
      )}
      
      <div className="w-full aspect-square bg-surface-container-low/60 rounded-lg flex items-center justify-center text-5xl relative group-hover:scale-105 transition-transform overflow-hidden">
        {product.image}
        <span className="absolute bottom-1 right-1 font-label-badge text-[10px] bg-surface-container-lowest/90 px-1.5 py-0.5 rounded text-primary font-bold">
          ⚡ 10 mins
        </span>
      </div>
      
      <div className="mt-space-xs flex-1 flex flex-col">
        <span className="font-label-badge text-label-badge uppercase tracking-wider text-outline truncate">{product.brand}</span>
        <h3 className="font-headline-sm text-sm font-bold text-on-surface line-clamp-2 leading-tight min-h-[40px] mt-1">{product.name}</h3>
        <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{product.weight}{product.unit}</span>
        
        <div className="mt-auto pt-space-xs flex flex-col" suppressHydrationWarning>
          <div className="flex items-baseline gap-1.5">
            <span className="font-price-lg text-headline-sm font-bold text-on-surface">₹{product.price}</span>
            {product.mrp > product.price && (
              <span className="font-price-strike text-price-strike line-through text-outline">₹{product.mrp}</span>
            )}
          </div>
          {savings > 0 ? (
             <span className="font-body-sm text-[11px] text-primary font-semibold min-h-[16px]">Save ₹{savings.toFixed(2)}</span>
          ) : (
             <span className="min-h-[16px]"></span>
          )}
        </div>
      </div>
      
      <div className="mt-space-sm" suppressHydrationWarning>
        {product.stock === 0 ? (
          <div className="w-full bg-error-container text-on-error-container font-label-button text-label-button py-1.5 rounded-lg flex items-center justify-center text-xs">
            OUT OF STOCK
          </div>
        ) : quantityInCart === 0 ? (
          <button 
            type="button"
            onClick={handleAdd}
            className="w-full bg-surface-container-lowest hover:bg-secondary-container text-primary border border-primary/30 font-label-button text-label-button py-1.5 px-space-xs rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm relative z-10 touch-manipulation"
          >
            <span className="material-symbols-outlined text-[16px]">add</span> ADD
          </button>
        ) : (
          <div className="w-full bg-primary text-on-primary rounded-lg flex items-center justify-between px-2 py-1 shadow-sm relative z-10 touch-manipulation">
            <button type="button" onClick={handleRemove} className="w-6 h-6 rounded flex items-center justify-center hover:bg-primary-container text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">remove</span>
            </button>
            <span className="font-label-button text-label-button">{quantityInCart}</span>
            <button type="button" onClick={handleAdd} className="w-6 h-6 rounded flex items-center justify-center hover:bg-primary-container text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">add</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

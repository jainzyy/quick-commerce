'use client';

import { useCartStore } from '@/store/cartStore';
import { trackEvent } from '@/analytics/tracker';

export default function ProductAction({ product }: { product: any }) {
  const addItem = useCartStore(state => state.addItem);
  const cartItems = useCartStore(state => state.items);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  
  const cartItem = cartItems.find(item => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    if (quantityInCart === 0) {
      addItem(product);
      trackEvent('add_to_cart', { product_id: product.id, price: product.price });
    } else {
      updateQuantity(product.id, quantityInCart + 1);
    }
  };

  const handleRemove = () => {
    updateQuantity(product.id, quantityInCart - 1);
    if (quantityInCart === 1) {
      trackEvent('remove_from_cart', { product_id: product.id });
    }
  };

  if (product.stock === 0) {
    return (
      <div className="bg-red-50 text-red-600 font-bold text-center py-4 rounded-xl border border-red-200">
        Currently Out of Stock
      </div>
    );
  }

  if (quantityInCart === 0) {
    return (
      <button 
        onClick={handleAdd}
        className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition"
      >
        Add to Cart
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-xl p-2">
      <button 
        onClick={handleRemove}
        className="w-12 h-12 flex items-center justify-center bg-white text-indigo-600 font-bold text-xl rounded-lg shadow-sm hover:bg-gray-50 transition"
      >
        -
      </button>
      <span className="font-bold text-xl text-indigo-900">{quantityInCart}</span>
      <button 
        onClick={handleAdd}
        className="w-12 h-12 flex items-center justify-center bg-white text-indigo-600 font-bold text-xl rounded-lg shadow-sm hover:bg-gray-50 transition"
      >
        +
      </button>
    </div>
  );
}

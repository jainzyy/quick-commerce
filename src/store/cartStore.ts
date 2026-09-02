import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  weight: number;
  volume: number;
  quantity: number;
  image: string;
  isFragile: boolean;
  isLiquid: boolean;
  isTemperatureSensitive: boolean;
  isHazardous: boolean;
  droneEligible: boolean;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartWeight: () => number;
  getCartVolume: () => number;
  getItemCount: () => number;
}

// Safe storage wrapper to prevent crashes in strict browsers (like Cloudflare tunnels on mobile)
const safeStorage = {
  getItem: (name: string) => {
    try {
      return localStorage.getItem(name);
    } catch (e) {
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    try {
      localStorage.setItem(name, value);
    } catch (e) {}
  },
  removeItem: (name: string) => {
    try {
      localStorage.removeItem(name);
    } catch (e) {}
  },
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) => set((state) => {
        const existing = state.items.find((i) => i.id === item.id);
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
            ),
          };
        }
        return { items: [...state.items, { ...item, quantity }] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id)
      })),
      updateQuantity: (id, quantity) => set((state) => {
        if (quantity <= 0) {
          return { items: state.items.filter((i) => i.id !== id) };
        }
        return {
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        };
      }),
      clearCart: () => set({ items: [] }),
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      getCartWeight: () => {
        return get().items.reduce((total, item) => {
          const w = (item as any).unit === 'kg' ? item.weight * 1000 : item.weight;
          return total + (w * item.quantity);
        }, 0);
      },
      getCartVolume: () => {
        return get().items.reduce((total, item) => total + (item.volume * item.quantity), 0);
      },
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      name: 'quick-commerce-cart',
      storage: createJSONStorage(() => safeStorage),
    }
  )
);

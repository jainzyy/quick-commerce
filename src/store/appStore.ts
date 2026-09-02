import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Location {
  lat: number;
  lon: number;
  address: string;
}

interface AppState {
  // Session
  sessionId: string;
  // Delivery Location
  deliveryLocation: Location | null;
  setDeliveryLocation: (location: Location | null) => void;
  // User Preference
  deliveryPreference: 'FASTEST' | 'CHEAPEST' | 'SUSTAINABLE';
  setDeliveryPreference: (pref: AppState['deliveryPreference']) => void;
  // Admin Overrides (for demo)
  demoOverrides: {
    weatherWmoCode: number | null;
    trafficState: string | null;
    iceAvailable: number | null;
    evAvailable: number | null;
    droneSmallAvailable: number | null;
    droneMediumAvailable: number | null;
    droneHeavyAvailable: number | null;
  };
  updateDemoOverrides: (overrides: Partial<AppState['demoOverrides']>) => void;
  resetDemoOverrides: () => void;
}

// Safe storage wrapper to prevent crashes in strict browsers
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

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sessionId: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      deliveryLocation: null,
      setDeliveryLocation: (location) => set({ deliveryLocation: location }),
      deliveryPreference: 'FASTEST',
      setDeliveryPreference: (pref) => set({ deliveryPreference: pref }),
      demoOverrides: {
        weatherWmoCode: null,
        trafficState: null,
        iceAvailable: null,
        evAvailable: null,
        droneSmallAvailable: null,
        droneMediumAvailable: null,
        droneHeavyAvailable: null,
      },
      updateDemoOverrides: (overrides) => set((state) => ({
        demoOverrides: { ...state.demoOverrides, ...overrides }
      })),
      resetDemoOverrides: () => set({
        demoOverrides: {
          weatherWmoCode: null,
          trafficState: null,
          iceAvailable: null,
          evAvailable: null,
          droneSmallAvailable: null,
          droneMediumAvailable: null,
          droneHeavyAvailable: null,
        }
      })
    }),
    {
      name: 'quick-commerce-app',
      storage: createJSONStorage(() => safeStorage),
    }
  )
);

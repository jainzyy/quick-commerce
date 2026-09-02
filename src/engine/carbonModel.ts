import { DeliveryMode, DroneClassType } from './types';
import { getDroneClass } from './droneSelector';

export function calculateCarbon(
  mode: DeliveryMode,
  subType: string | undefined,
  distanceKm: number
): number {
  // Grid emission factor for India is approx 716 grams CO2 per kWh
  const INDIA_GRID_CO2_PER_KWH = 716; 
  const PETROL_CO2_PER_LITER = 2310;

  if (mode === 'ICE') {
    // Average Indian scooter: ~45 km/liter
    return ((distanceKm * 2) / 45) * PETROL_CO2_PER_LITER;
  }
  
  if (mode === 'EV') {
    // Average EV scooter: ~0.035 kWh/km (35 Wh/km)
    return (distanceKm * 2 * 0.035) * INDIA_GRID_CO2_PER_KWH;
  }
  
  if (mode === 'DRONE' && subType) {
    const drone = getDroneClass(subType as DroneClassType);
    return (distanceKm * 2 * drone.energyPerKmKwh) * INDIA_GRID_CO2_PER_KWH;
  }
  
  return 0;
}


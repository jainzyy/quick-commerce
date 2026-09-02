import { DeliveryMode, WeatherCondition, DroneClassType } from './types';
import { getDroneClass } from './droneSelector';

export function calculateEta(
  mode: DeliveryMode,
  subType: string | undefined,
  routeDurationMin: number,
  trafficMultiplier: number,
  distanceKm: number,
  weatherCondition: WeatherCondition
): number {
  let weatherFactor = 1.0;
  if (weatherCondition === 'LIGHT_RAIN') weatherFactor = 1.15;
  if (weatherCondition === 'HEAVY_RAIN' || weatherCondition === 'THUNDERSTORM') weatherFactor = 1.3;

  if (mode === 'ICE') {
    return (routeDurationMin * trafficMultiplier * weatherFactor) + 3 + 2 + 2;
  }
  
  if (mode === 'EV') {
    return (routeDurationMin * trafficMultiplier * weatherFactor * 1.05) + 3 + 2 + 2;
  }

  if (mode === 'DRONE' && subType) {
    let weatherFactor = 1.0;
    if (weatherCondition === 'LIGHT_RAIN') weatherFactor = 1.15;
    else if (weatherCondition === 'HIGH_WIND') weatherFactor = 1.1; 
    
    const droneClass = getDroneClass(subType as DroneClassType);
    const flightTimeMin = (distanceKm / droneClass.speedKmh) * 60;
    
    // Drones have extremely fast prep (1 min) and handover (1 min)
    return 1 + (flightTimeMin * weatherFactor) + 1 + 1;
  }

  return 999;
}


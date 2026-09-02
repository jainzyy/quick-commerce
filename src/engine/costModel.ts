import { DeliveryMode, TrafficState, WeatherCondition, DroneClassType, FleetState } from './types';
import { getDroneClass } from './droneSelector';

export function calculateCost(
  mode: DeliveryMode,
  subType: string | undefined,
  distanceKm: number,
  orderValue: number,
  hour: number,
  weatherCondition: WeatherCondition,
  trafficState: TrafficState,
  fleet?: FleetState
): { internalCost: number; customerFee: number } {
  let internalCost = 0;
  let customerFee = 0;
  const isPeakHour = (hour >= 7 && hour < 10) || (hour >= 16 && hour < 20);
  
  // Weather & Traffic multipliers for internal cost
  let trafficCostMultiplier = 1.0;
  if (trafficState === 'MODERATE') trafficCostMultiplier = 1.1;
  if (trafficState === 'HIGH') trafficCostMultiplier = 1.3;
  if (trafficState === 'SEVERE') trafficCostMultiplier = 1.6;

  let weatherCostMultiplier = 1.0;
  if (weatherCondition === 'LIGHT_RAIN') weatherCostMultiplier = 1.1;
  if (weatherCondition === 'HEAVY_RAIN' || weatherCondition === 'THUNDERSTORM') weatherCostMultiplier = 1.3;
  
  if (mode === 'ICE') {
    const fuelCost = (distanceKm * 2 / 45) * 105 * trafficCostMultiplier * weatherCostMultiplier;
    internalCost = fuelCost + 15 + (1.5 * distanceKm * 2) + (0.8 * distanceKm * 2);
    
    let baseFee = 15;
    let distanceCharge = distanceKm > 1 ? (distanceKm - 1) * 4 : 0; 
    customerFee = baseFee + distanceCharge;
    
    if (isPeakHour) customerFee *= 1.2;
    if (weatherCondition !== 'CLEAR' && weatherCondition !== 'CLOUDY') customerFee *= 1.2;

    // Scarcity pricing: total ICE fleet = 10 (hardcoded default in deliveryCalculator is 10)
    // If available <= 2, increase price by 50%
    if (fleet && fleet.iceAvailable <= 2) customerFee *= 1.5;

  } 
  else if (mode === 'EV') {
    const electricityCost = (distanceKm * 2 * 0.035) * 8 * trafficCostMultiplier * weatherCostMultiplier;
    internalCost = electricityCost + 15 + (0.6 * distanceKm * 2) + (1.2 * distanceKm * 2);
    
    let baseFee = 10;
    let distanceCharge = distanceKm > 1 ? (distanceKm - 1) * 4 : 0;
    customerFee = baseFee + distanceCharge;
    
    if (isPeakHour) customerFee *= 1.2;
    if (weatherCondition !== 'CLEAR' && weatherCondition !== 'CLOUDY') customerFee *= 1.2;

    // Scarcity pricing
    if (fleet && fleet.evAvailable <= 2) customerFee *= 1.5;

  }
  else if (mode === 'DRONE' && subType) {
    const drone = getDroneClass(subType as DroneClassType);
    const electricityCost = (distanceKm * 2 * drone.energyPerKmKwh) * 8; // drones not affected by traffic, slightly by weather but minor
    const batteryWear = 5;
    const maintenance = 3;
    internalCost = electricityCost + batteryWear + maintenance + 5;
    
    let baseFee = 25; 
    let distanceCharge = distanceKm > 1 ? (distanceKm - 1) * 5 : 0;
    customerFee = baseFee + distanceCharge;
    
    if (isPeakHour) customerFee *= 1.2;

    // Scarcity pricing
    if (fleet && subType === 'SMALL' && fleet.droneSmallAvailable <= 1) customerFee *= 1.5;
    if (fleet && subType === 'MEDIUM' && fleet.droneMediumAvailable <= 1) customerFee *= 1.5;
    if (fleet && subType === 'HEAVY' && fleet.droneHeavyAvailable <= 1) customerFee *= 1.5;
  }

  // Tiered Free delivery
  if (mode === 'EV' && orderValue >= 699) {
    customerFee = 0;
  } else if (mode === 'ICE' && orderValue >= 499) {
    customerFee = 0;
  } else if (mode === 'DRONE' && orderValue >= 249) {
    customerFee = 0;
  }

  return { internalCost, customerFee };
}


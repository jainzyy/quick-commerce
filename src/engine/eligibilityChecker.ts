import { PackageMetrics, WeatherData, FleetState, EligibilityResult, DeliveryMode } from './types';
import { SMALL_DRONE, MEDIUM_DRONE, HEAVY_DRONE } from './droneSelector';

export function checkEligibility(
  packageMetrics: PackageMetrics,
  distanceKm: number,
  weather: WeatherData,
  fleet: FleetState | undefined,
  hour: number
): EligibilityResult[] {
  const results: EligibilityResult[] = [];
  
  const weightKg = packageMetrics.totalWeightGrams / 1000;
  
  // Checking ICE
  const iceReasons: string[] = [];
  if (fleet && fleet.iceAvailable <= 0) iceReasons.push('No REGULAR vehicles available');
  if (weightKg > 50) iceReasons.push('Weight exceeds REGULAR capacity');
  results.push({
    mode: 'ICE',
    isEligible: iceReasons.length === 0,
    reasons: iceReasons
  });

  // Checking EV
  const evReasons: string[] = [];
  if (fleet && fleet.evAvailable <= 0) evReasons.push('No EV vehicles available');
  if (weightKg > 30) evReasons.push('Weight exceeds EV capacity');
  results.push({
    mode: 'EV',
    isEligible: evReasons.length === 0,
    reasons: evReasons
  });

  // Checking Drone - SMALL
  const dsReasons: string[] = [];
  if (fleet && fleet.droneSmallAvailable <= 0) dsReasons.push('No Small Drones available');
  if (packageMetrics.hasHazardous) dsReasons.push('Hazardous materials not allowed on drone');
  if (weightKg > SMALL_DRONE.maxPayloadKg) dsReasons.push('Weight exceeds Small Drone capacity');
  if (packageMetrics.maxDimensionCm > SMALL_DRONE.maxDimensionCm) dsReasons.push('Dimensions exceed Small Drone capacity');
  if (distanceKm > SMALL_DRONE.rangeKm) dsReasons.push('Distance exceeds Small Drone range');
  if (!weather.smallDroneSafe) dsReasons.push('Weather unsafe for Small Drone');
  
  // Checking Drone - MEDIUM
  const dmReasons: string[] = [];
  if (fleet && fleet.droneMediumAvailable <= 0) dmReasons.push('No Medium Drones available');
  if (packageMetrics.hasHazardous) dmReasons.push('Hazardous materials not allowed on drone');
  if (weightKg > MEDIUM_DRONE.maxPayloadKg) dmReasons.push('Weight exceeds Medium Drone capacity');
  if (packageMetrics.maxDimensionCm > MEDIUM_DRONE.maxDimensionCm) dmReasons.push('Dimensions exceed Medium Drone capacity');
  if (distanceKm > MEDIUM_DRONE.rangeKm) dmReasons.push('Distance exceeds Medium Drone range');
  if (!weather.isDroneSafe) dmReasons.push('Weather unsafe for drone');

  // Checking Drone - HEAVY
  const dhReasons: string[] = [];
  if (fleet && fleet.droneHeavyAvailable <= 0) dhReasons.push('No Heavy Drones available');
  if (packageMetrics.hasHazardous) dhReasons.push('Hazardous materials not allowed on drone');
  if (weightKg > HEAVY_DRONE.maxPayloadKg) dhReasons.push('Weight exceeds Heavy Drone capacity');
  if (packageMetrics.maxDimensionCm > HEAVY_DRONE.maxDimensionCm) dhReasons.push('Dimensions exceed Heavy Drone capacity');
  if (distanceKm > HEAVY_DRONE.rangeKm) dhReasons.push('Distance exceeds Heavy Drone range');
  if (!weather.isDroneSafe) dhReasons.push('Weather unsafe for drone');

  // Determine the best drone
  let bestDrone: any = null;
  
  if (dsReasons.length === 0) {
    bestDrone = { mode: 'DRONE', subType: 'SMALL', isEligible: true, reasons: [] };
  } else if (dmReasons.length === 0) {
    bestDrone = { mode: 'DRONE', subType: 'MEDIUM', isEligible: true, reasons: [] };
  } else if (dhReasons.length === 0) {
    bestDrone = { mode: 'DRONE', subType: 'HEAVY', isEligible: true, reasons: [] };
  } else {
    // If none are eligible, determine the closest reason
    let fallback = 'SMALL';
    let fallbackReasons = dsReasons;
    
    // if small failed only due to weight/size, but medium is ok except weather... wait, just default to HEAVY failure
    if (weightKg > MEDIUM_DRONE.maxPayloadKg || packageMetrics.maxDimensionCm > MEDIUM_DRONE.maxDimensionCm) {
      fallback = 'HEAVY';
      fallbackReasons = dhReasons;
    } else if (weightKg > SMALL_DRONE.maxPayloadKg || packageMetrics.maxDimensionCm > SMALL_DRONE.maxDimensionCm) {
      fallback = 'MEDIUM';
      fallbackReasons = dmReasons;
    }
    
    bestDrone = { mode: 'DRONE', subType: fallback, isEligible: false, reasons: fallbackReasons };
  }
  
  results.push(bestDrone);

  return results;
}

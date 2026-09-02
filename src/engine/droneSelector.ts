import { DroneClass, DroneClassType } from './types';

export const SMALL_DRONE: DroneClass = {
  type: 'SMALL',
  maxPayloadKg: 1.5,
  maxDimensionCm: 30,
  rangeKm: 7,
  speedKmh: 60,
  baseCost: 45,
  energyPerKmKwh: 0.02
};

export const MEDIUM_DRONE: DroneClass = {
  type: 'MEDIUM',
  maxPayloadKg: 3.5,
  maxDimensionCm: 45,
  rangeKm: 8,
  speedKmh: 50,
  baseCost: 65,
  energyPerKmKwh: 0.035
};

export const HEAVY_DRONE: DroneClass = {
  type: 'HEAVY',
  maxPayloadKg: 8.0,
  maxDimensionCm: 60,
  rangeKm: 6,
  speedKmh: 40,
  baseCost: 95,
  energyPerKmKwh: 0.05
};

export function getDroneClass(type: DroneClassType): DroneClass {
  switch (type) {
    case 'SMALL': return SMALL_DRONE;
    case 'MEDIUM': return MEDIUM_DRONE;
    case 'HEAVY': return HEAVY_DRONE;
  }
}

export function selectDrone(weightKg: number, maxDimensionCm: number, distanceKm: number): DroneClass | null {
  if (weightKg <= SMALL_DRONE.maxPayloadKg && maxDimensionCm <= SMALL_DRONE.maxDimensionCm && distanceKm <= SMALL_DRONE.rangeKm) {
    return SMALL_DRONE;
  }
  if (weightKg <= MEDIUM_DRONE.maxPayloadKg && maxDimensionCm <= MEDIUM_DRONE.maxDimensionCm && distanceKm <= MEDIUM_DRONE.rangeKm) {
    return MEDIUM_DRONE;
  }
  if (weightKg <= HEAVY_DRONE.maxPayloadKg && maxDimensionCm <= HEAVY_DRONE.maxDimensionCm && distanceKm <= HEAVY_DRONE.rangeKm) {
    return HEAVY_DRONE;
  }
  return null;
}


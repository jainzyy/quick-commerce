import { TrafficState } from './types';

export function getTrafficState(hour?: number): TrafficState {
  const currentHour = hour !== undefined ? hour : new Date().getHours();

  if (currentHour >= 7 && currentHour < 10) return 'HIGH';
  if (currentHour >= 10 && currentHour < 16) return 'MODERATE';
  if (currentHour >= 16 && currentHour < 20) return 'HIGH';
  if (currentHour >= 20 && currentHour < 23) return 'MODERATE';
  return 'LOW'; // 23 to 7
}

export function getTrafficMultiplier(state: TrafficState): number {
  switch (state) {
    case 'LOW': return 1.0;
    case 'MODERATE': return 1.3;
    case 'HIGH': return 1.6;
    case 'SEVERE': return 2.0;
    default: return 1.0;
  }
}

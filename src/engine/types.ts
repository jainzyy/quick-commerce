export type DeliveryMode = 'ICE' | 'EV' | 'DRONE';
export type DroneClassType = 'SMALL' | 'MEDIUM' | 'HEAVY';
export type TrafficState = 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';
export type WeatherCondition = 'CLEAR' | 'CLOUDY' | 'LIGHT_RAIN' | 'HEAVY_RAIN' | 'THUNDERSTORM' | 'HIGH_WIND';
export type PreferenceWeight = 'FASTEST' | 'CHEAPEST' | 'SUSTAINABLE';

export interface CartItem {
  id: string;
  weightGrams: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  isFragile?: boolean;
  isLiquid?: boolean;
  isTemperatureSensitive?: boolean;
  isHazardous?: boolean;
  quantity: number;
  price: number;
}

export interface PackageMetrics {
  totalWeightGrams: number;
  totalVolumeCm3: number;
  maxDimensionCm: number;
  itemCount: number;
  hasFragile: boolean;
  hasLiquid: boolean;
  hasTemperatureSensitive: boolean;
  hasHazardous: boolean;
}

export interface DeliveryRequest {
  destinationLat: number;
  destinationLon: number;
  items: CartItem[];
  orderValue: number;
  preference: PreferenceWeight;
  fleetState?: FleetState;
  demoOverrides?: {
    weatherWmoCode: number | null;
    trafficState: string | null;
    iceAvailable: number | null;
    evAvailable: number | null;
    droneSmallAvailable: number | null;
    droneMediumAvailable: number | null;
    droneHeavyAvailable: number | null;
  };
}

export interface FleetState {
  iceAvailable: number;
  evAvailable: number;
  droneSmallAvailable: number;
  droneMediumAvailable: number;
  droneHeavyAvailable: number;
}

export interface WeatherData {
  temperature: number;
  windSpeedKmh: number;
  rainMmPerHour: number;
  condition: WeatherCondition;
  isDroneSafe: boolean;
  smallDroneSafe: boolean;
  timestamp: number;
}

export interface DroneClass {
  type: DroneClassType;
  maxPayloadKg: number;
  maxDimensionCm: number;
  rangeKm: number;
  speedKmh: number;
  baseCost: number;
  energyPerKmKwh: number;
}

export interface EligibilityResult {
  mode: DeliveryMode;
  subType?: string;
  isEligible: boolean;
  reasons: string[];
}

export interface DeliveryOption {
  mode: DeliveryMode;
  subType?: string;
  etaMinutes: number;
  customerFee: number;
  internalCost: number;
  carbonEmissionsGrams: number;
  reliabilityScore: number;
  eligibility: EligibilityResult;
}

export interface ScoredOption extends DeliveryOption {
  score: number;
  pros: string[];
  cons: string[];
}

export interface DeliveryResult {
  serviceable: boolean;
  reasons?: string[];
  distanceKm: number;
  routeDurationMin?: number;
  weather: WeatherData;
  trafficState: TrafficState;
  packageMetrics: PackageMetrics;
  options: ScoredOption[];
  ineligibleModes?: EligibilityResult[];
  recommendation: {
    mode: DeliveryMode;
    subType?: string;
    explanation: string;
  };
}

/**
 * DELIVERY CONFIGURATION — Centralized Assumptions Register
 * 
 * All operational parameters are defined here so they can be modified
 * without rewriting application logic. Every value has a documented
 * assumption/source where applicable.
 * 
 * Dark Store: Andheri East, Mumbai
 * Coordinates: 19.1192214, 72.8436312
 */

// ─── Dark Store ───────────────────────────────────────────────
export const DARK_STORE = {
  name: 'QuickDash Dark Store — Andheri East',
  latitude: 19.1192214,
  longitude: 72.8436312,
  address: 'Western Express Highway, Andheri East, Mumbai 400069',
  operatingHours: { open: 6, close: 23 }, // 6 AM to 11 PM
} as const;

export const SERVICE_RADIUS_KM = 5;

// ─── ICE Vehicle Configuration ────────────────────────────────
export const ICE_VEHICLE = {
  name: 'Petrol Scooter',
  type: 'ICE' as const,
  // Speed & travel
  averageSpeedKmh: 25,         // Avg speed in Mumbai urban traffic (source: typical Mumbai commute data)
  maxPayloadKg: 20,            // Standard delivery bag capacity
  maxVolumeCm3: 80000,         // ~80 liters delivery box
  maxDimensionCm: 60,          // Largest box dimension
  // Fuel economics (source: average Indian petrol scooter)
  fuelEfficiencyKmPerL: 35,    // km per liter (typical Honda Activa / TVS Jupiter)
  petrolPricePerL: 105,        // ₹/liter (Mumbai, Aug 2026 approx)
  // Operating costs
  driverCostPerDelivery: 15,   // ₹ per delivery (piece-rate component)
  maintenanceCostPerKm: 1.5,   // ₹/km (tires, oil, servicing amortized)
  depreciationPerKm: 0.8,      // ₹/km (vehicle cost spread over lifetime km)
  // Timing
  loadingTimeMin: 3,           // Order picking + packing
  handoffTimeMin: 2,           // Customer handoff
  bufferTimeMin: 2,            // Operational buffer
  // Carbon (source: IPCC, petrol = 2.31 kg CO₂/liter)
  co2PerLiter: 2310,           // grams CO₂ per liter of petrol
  // Availability
  totalFleet: 8,
  availableFleet: 6,
};

// ─── EV Vehicle Configuration ─────────────────────────────────
export const EV_VEHICLE = {
  name: 'Electric Scooter',
  type: 'EV' as const,
  // Speed & travel
  averageSpeedKmh: 23,         // Slightly lower due to speed limiting for battery efficiency
  maxPayloadKg: 18,            // Slightly lower than ICE (battery weight tradeoff)
  maxVolumeCm3: 75000,         // ~75 liters
  maxDimensionCm: 55,
  // Electricity economics
  energyConsumptionKwhPerKm: 0.06, // kWh/km (typical Ather/Ola S1 in city)
  electricityTariffPerKwh: 8,      // ₹/kWh (Mumbai commercial tariff, BEST supply)
  // Operating costs
  driverCostPerDelivery: 15,
  maintenanceCostPerKm: 0.6,       // Lower than ICE (fewer moving parts)
  depreciationPerKm: 1.2,          // Higher initial cost spread over km
  // Timing
  loadingTimeMin: 3,
  handoffTimeMin: 2,
  bufferTimeMin: 2,
  accelerationFactor: 1.05,        // 5% slower acceleration in dense traffic
  // Carbon (source: CEA India grid emission factor 2023-24 ≈ 0.71 kg CO₂/kWh)
  gridEmissionFactor: 710,         // grams CO₂ per kWh (Indian grid average)
  // Availability
  totalFleet: 5,
  availableFleet: 4,
};

// ─── Drone Configuration ──────────────────────────────────────
export const DRONE_CLASSES = {
  SMALL: {
    name: 'Small Drone',
    class: 'SMALL' as const,
    maxPayloadKg: 1.5,
    maxDimensionCm: 30,
    maxRangeKm: 5,
    averageSpeedKmh: 60,
    // Energy
    energyConsumptionKwhPerKm: 0.02,
    batteryWearPerFlight: 3,       // ₹ per flight
    maintenancePerFlight: 2,       // ₹ per flight
    operatorCostPerDelivery: 5,    // ₹ per delivery (remote monitoring)
    // Customer fee
    baseFee: 35,
    // Weather restrictions
    maxWindSpeedKmh: 35,
    maxRainMmPerHour: 2,
    // Timing
    dispatchTimeMin: 4,            // Preflight check + loading
    handoffTimeMin: 3,             // Landing + customer pickup
    bufferTimeMin: 1,
    // Carbon (same grid factor as EV)
    gridEmissionFactor: 710,
    // Availability
    totalFleet: 3,
    availableFleet: 2,
  },
  MEDIUM: {
    name: 'Medium Drone',
    class: 'MEDIUM' as const,
    maxPayloadKg: 3.5,
    maxDimensionCm: 45,
    maxRangeKm: 7,
    averageSpeedKmh: 50,
    energyConsumptionKwhPerKm: 0.035,
    batteryWearPerFlight: 5,
    maintenancePerFlight: 3,
    operatorCostPerDelivery: 5,
    baseFee: 45,
    maxWindSpeedKmh: 30,
    maxRainMmPerHour: 2,
    dispatchTimeMin: 5,
    handoffTimeMin: 3,
    bufferTimeMin: 1,
    gridEmissionFactor: 710,
    totalFleet: 2,
    availableFleet: 2,
  },
  HEAVY: {
    name: 'Heavy-Lift Drone',
    class: 'HEAVY' as const,
    maxPayloadKg: 8,
    maxDimensionCm: 60,
    maxRangeKm: 4,
    averageSpeedKmh: 40,
    energyConsumptionKwhPerKm: 0.05,
    batteryWearPerFlight: 8,
    maintenancePerFlight: 5,
    operatorCostPerDelivery: 7,
    baseFee: 60,
    maxWindSpeedKmh: 25,
    maxRainMmPerHour: 1.5,
    dispatchTimeMin: 6,
    handoffTimeMin: 4,
    bufferTimeMin: 2,
    gridEmissionFactor: 710,
    totalFleet: 1,
    availableFleet: 1,
  },
} as const;

// ─── Traffic Model ────────────────────────────────────────────
export const TRAFFIC_CONFIG = {
  states: {
    LOW: { label: 'Low Traffic', multiplier: 1.0, color: '#22c55e' },
    MODERATE: { label: 'Moderate Traffic', multiplier: 1.3, color: '#f59e0b' },
    HIGH: { label: 'High Traffic', multiplier: 1.6, color: '#f97316' },
    SEVERE: { label: 'Severe Congestion', multiplier: 2.0, color: '#ef4444' },
  },
  // Time-of-day default patterns (hour → state)
  // Source: General Mumbai traffic patterns
  timeOfDayPattern: {
    0: 'LOW', 1: 'LOW', 2: 'LOW', 3: 'LOW', 4: 'LOW', 5: 'LOW',
    6: 'LOW', 7: 'MODERATE', 8: 'HIGH', 9: 'HIGH',
    10: 'MODERATE', 11: 'MODERATE', 12: 'MODERATE', 13: 'MODERATE',
    14: 'MODERATE', 15: 'MODERATE', 16: 'HIGH',
    17: 'HIGH', 18: 'HIGH', 19: 'HIGH',
    20: 'MODERATE', 21: 'MODERATE', 22: 'MODERATE', 23: 'LOW',
  } as Record<number, string>,
} as const;

// ─── Weather Thresholds ───────────────────────────────────────
export const WEATHER_CONFIG = {
  // Source: General UAV operating guidelines, Indian DGCA drone regulations
  droneGroundingConditions: {
    thunderstorm: true,                // WMO codes 95, 96, 99
    heavyRain: true,                   // precipitation > 5 mm/h
    severeWind: true,                  // wind > 40 km/h (all drones grounded)
  },
  // Weather-based ETA adjustments for road vehicles
  roadVehicleRainMultiplier: 1.15,     // 15% slower in rain
  roadVehicleHeavyRainMultiplier: 1.3, // 30% slower in heavy rain
  // Weather surcharge thresholds
  rainSurchargeThreshold: 2,           // mm/h before surcharge kicks in
  weatherSurchargeMultiplier: 1.15,    // 15% surcharge in bad weather
  heavyWeatherSurchargeMultiplier: 1.3,
  // Drone weather ETA adjustments
  droneWindPenaltyFactor: 0.003,       // Per km/h wind above 15 km/h
  droneRainPenaltyFactor: 1.15,        // 15% slower in light rain
  // Open-Meteo WMO weather code mapping
  wmoCodeMap: {
    0: 'Clear sky',
    1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Foggy', 48: 'Depositing rime fog',
    51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
    56: 'Light freezing drizzle', 57: 'Dense freezing drizzle',
    61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    66: 'Light freezing rain', 67: 'Heavy freezing rain',
    71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
    85: 'Slight snow showers', 86: 'Heavy snow showers',
    95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail',
  } as Record<number, string>,
} as const;

// ─── Customer Pricing ─────────────────────────────────────────
export const PRICING_CONFIG = {
  // Base delivery fees (before distance/surcharges)
  baseFee: {
    ICE: 25,
    EV: 20,
    DRONE: 35,
  },
  // Distance-based charge (per km beyond first km)
  distanceChargePerKm: {
    ICE: 5,
    EV: 5,
    DRONE: 8,
  },
  // Free delivery threshold
  freeDeliveryThreshold: 499,         // ₹ order value
  freeDeliveryDiscount: 0.8,          // 80% off delivery fee
  // Peak hour surcharge (multiplier)
  peakSurchargeMultiplier: 1.2,
  // Minimum delivery fee (even with discounts)
  minimumDeliveryFee: 9,
} as const;

// ─── Recommendation Weights ───────────────────────────────────
export const RECOMMENDATION_WEIGHTS = {
  FASTEST: { time: 0.6, cost: 0.15, sustainability: 0.1, reliability: 0.15 },
  CHEAPEST: { time: 0.15, cost: 0.6, sustainability: 0.1, reliability: 0.15 },
  SUSTAINABLE: { time: 0.1, cost: 0.15, sustainability: 0.6, reliability: 0.15 }
} as const;

// ─── Predefined Serviceable Locations (for demo) ──────────────
export const SAMPLE_LOCATIONS = [
  { name: 'Andheri West — DN Nagar', lat: 19.1265, lon: 72.8366, distanceApprox: 1.7 },
  { name: 'Lokhandwala Complex', lat: 19.1392, lon: 72.8326, distanceApprox: 3.7 },
  { name: 'Versova', lat: 19.1345, lon: 72.8170, distanceApprox: 4.7 },
  { name: 'Jogeshwari East', lat: 19.1362, lon: 72.8570, distanceApprox: 4.0 },
  { name: 'Vile Parle East', lat: 19.0990, lon: 72.8565, distanceApprox: 4.4 },
  { name: 'Juhu Beach Area', lat: 19.0989, lon: 72.8265, distanceApprox: 4.7 },
  { name: 'JVPD Scheme', lat: 19.1075, lon: 72.8360, distanceApprox: 2.4 },
  { name: 'Powai — Near IIT Gate', lat: 19.1290, lon: 72.8980, distanceApprox: 8.8 },
  { name: 'Goregaon East — Film City', lat: 19.1617, lon: 72.8631, distanceApprox: 7.8 },
  { name: 'Chakala — Near Airport', lat: 19.1120, lon: 72.8680, distanceApprox: 3.4 },
  // Out of range locations for demo
  { name: 'Bandra West (Out of Range)', lat: 19.0596, lon: 72.8295, distanceApprox: 16.0 }, // Ensure it fails 15km check
  { name: 'Borivali (Out of Range)', lat: 19.2304, lon: 72.8567, distanceApprox: 18.1 },
] as const;

// ─── Analytics Event Types ────────────────────────────────────
export const ANALYTICS_EVENTS = {
  // Browsing
  PAGE_VIEW: 'page_view',
  PRODUCT_IMPRESSION: 'product_impression',
  SEARCH: 'search',
  CATEGORY_CLICK: 'category_click',
  FILTER_USED: 'filter_used',
  SORT_USED: 'sort_used',
  PRODUCT_VIEW: 'product_view',
  // Engagement
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  QUANTITY_CHANGE: 'quantity_change',
  // Checkout
  CHECKOUT_STARTED: 'checkout_started',
  ADDRESS_SELECTED: 'address_selected',
  SERVICEABILITY_CHECK: 'serviceability_check',
  DELIVERY_MODES_VIEWED: 'delivery_modes_viewed',
  DELIVERY_MODE_SELECTED: 'delivery_mode_selected',
  PREFERENCE_SELECTED: 'preference_selected',
  PAYMENT_INITIATED: 'payment_initiated',
  ORDER_COMPLETED: 'order_completed',
  CHECKOUT_ABANDONED: 'checkout_abandoned',
} as const;

// ─── App Branding ─────────────────────────────────────────────
export const APP_CONFIG = {
  name: 'QuickDash',
  tagline: 'Lightning-fast delivery, transparently optimized',
  currency: '₹',
  locale: 'en-IN',
} as const;

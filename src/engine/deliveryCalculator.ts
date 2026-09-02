import { DeliveryRequest, DeliveryResult, DeliveryOption } from './types';
import { isServiceable, getRouteDistance, haversineDistance, DARK_STORE_LAT, DARK_STORE_LON } from './distanceCalculator';
import { fetchWeather } from './weatherService';
import { getTrafficState, getTrafficMultiplier } from './trafficModel';
import { calculatePackageMetrics } from './packingCalculator';
import { checkEligibility } from './eligibilityChecker';
import { calculateEta } from './etaModel';
import { calculateCost } from './costModel';
import { calculateCarbon } from './carbonModel';
import { scoreDeliveryOptions } from './recommendationEngine';

export async function calculateDeliveryOptions(request: DeliveryRequest): Promise<DeliveryResult> {
  const currentHour = new Date().getHours();
  
  if (!isServiceable(request.destinationLat, request.destinationLon)) {
    return {
      serviceable: false,
      reasons: ['Outside 15km service radius'],
      distanceKm: 0,
      weather: await fetchWeather(),
      trafficState: getTrafficState(currentHour),
      packageMetrics: calculatePackageMetrics(request.items),
      options: [],
      recommendation: { mode: 'ICE', explanation: '' }
    };
  }

  const routeDistance = await getRouteDistance(
    19.1192214, 72.8436312, // Dark store
    request.destinationLat, request.destinationLon
  );
  const straightLineKm = haversineDistance(DARK_STORE_LAT, DARK_STORE_LON, request.destinationLat, request.destinationLon);

  const weather = await fetchWeather();
  let trafficState = getTrafficState(currentHour);

  // Apply Admin Overrides
  if (request.demoOverrides) {
      if (request.demoOverrides.weatherWmoCode !== null && request.demoOverrides.weatherWmoCode !== undefined) {
      const code = request.demoOverrides.weatherWmoCode;
      if (code <= 3) weather.condition = 'CLEAR';
      else if (code >= 45 && code <= 48) weather.condition = 'CLOUDY';
      else if (code >= 51 && code <= 64) weather.condition = 'LIGHT_RAIN';
      else if (code >= 65 && code <= 82) weather.condition = 'HEAVY_RAIN';
      else if (code >= 95) weather.condition = 'THUNDERSTORM';
      
      weather.isDroneSafe = (weather.condition !== 'THUNDERSTORM' && weather.condition !== 'HEAVY_RAIN' && weather.condition !== 'HIGH_WIND');
      weather.smallDroneSafe = (weather.condition === 'CLEAR' || weather.condition === 'CLOUDY');
    }
    if (request.demoOverrides.trafficState) {
      trafficState = request.demoOverrides.trafficState as any;
    }
  }

  const trafficMultiplier = getTrafficMultiplier(trafficState);
  const packageMetrics = calculatePackageMetrics(request.items);
  
  const mockFleet = request.fleetState || {
    iceAvailable: request.demoOverrides?.iceAvailable ?? 10,
    evAvailable: request.demoOverrides?.evAvailable ?? 5,
    droneSmallAvailable: request.demoOverrides?.droneSmallAvailable ?? 3,
    droneMediumAvailable: request.demoOverrides?.droneMediumAvailable ?? 2,
    droneHeavyAvailable: request.demoOverrides?.droneHeavyAvailable ?? 1
  };

  const eligibilities = checkEligibility(packageMetrics, straightLineKm, weather, mockFleet, currentHour);
  
  const options: DeliveryOption[] = [];
  
  for (const el of eligibilities) {
    if (el.isEligible) {
      const actualDistanceKm = el.mode === 'DRONE' ? straightLineKm : routeDistance.distanceKm;
      
      const etaMinutes = calculateEta(el.mode, el.subType, routeDistance.durationMin, trafficMultiplier, actualDistanceKm, weather.condition);
      const { internalCost, customerFee } = calculateCost(el.mode, el.subType, actualDistanceKm, request.orderValue, currentHour, weather.condition, trafficState, mockFleet);
      const carbon = calculateCarbon(el.mode, el.subType, actualDistanceKm);
      
      let reliabilityScore = 0.9;
      if (weather.condition !== 'CLEAR') reliabilityScore -= 0.1;
      if (trafficState === 'HIGH' || trafficState === 'SEVERE') reliabilityScore -= 0.1;

      options.push({
        mode: el.mode,
        subType: el.subType,
        etaMinutes,
        customerFee,
        internalCost,
        carbonEmissionsGrams: carbon,
        reliabilityScore,
        eligibility: el
      });
    }
  }

  const scoredOptions = scoreDeliveryOptions(options, request.preference);
  
    let recommendation = { mode: 'ICE' as any, subType: '' as any, explanation: 'No options available' };
  if (scoredOptions.length > 0) {
    const best = scoredOptions[0];
    const displayMode = best.mode === 'ICE' ? 'REGULAR' : best.mode;
    recommendation = {
      mode: best.mode,
      subType: best.subType,
      explanation: `${displayMode} ${best.subType ? best.subType : ''} recommended: Selected based on ${request.preference} preference. ETA: ${Math.round(best.etaMinutes)} min.`
    };
  }

    return {
      serviceable: true,
      distanceKm: routeDistance.distanceKm,
      routeDurationMin: routeDistance.durationMin,
      weather,
      trafficState,
      packageMetrics,
      options: scoredOptions,
      ineligibleModes: eligibilities.filter(e => !e.isEligible),
      recommendation
    };
}

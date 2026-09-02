export const DARK_STORE_LAT = 19.1192214;
export const DARK_STORE_LON = 72.8436312;
export const MAX_SERVICE_RADIUS_KM = 15;

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

export function isServiceable(lat: number, lon: number): boolean {
  const distance = haversineDistance(DARK_STORE_LAT, DARK_STORE_LON, lat, lon);
  return distance <= MAX_SERVICE_RADIUS_KM;
}

export async function getRouteDistance(
  originLat: number,
  originLon: number,
  destLat: number,
  destLon: number
): Promise<{ distanceKm: number; durationMin: number }> {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${originLon},${originLat};${destLon},${destLat}?overview=false`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('OSRM API failed');
    }
    const data = await response.json();
    if (data.routes && data.routes.length > 0) {
      const distanceKm = data.routes[0].distance / 1000;
      const durationMin = data.routes[0].duration / 60;
      return { distanceKm, durationMin };
    }
    throw new Error('No routes found');
  } catch (error) {
    console.error('Error fetching route distance, falling back to Haversine:', error);
    const hDist = haversineDistance(originLat, originLon, destLat, destLon);
    return {
      distanceKm: hDist * 1.3,
      durationMin: (hDist * 1.3) / 20 * 60 // fallback assuming 20km/h avg speed
    };
  }
}

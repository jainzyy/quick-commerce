'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface DeliveryMapProps {
  storeLat: number;
  storeLon: number;
  customerLat: number;
  customerLon: number;
  mode: string;
}

export default function DeliveryMap({ storeLat, storeLon, customerLat, customerLon, mode }: DeliveryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, { zoomControl: false, scrollWheelZoom: false }).fitBounds([
      [storeLat, storeLon],
      [customerLat, customerLon]
    ], { padding: [50, 50] });
    
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Custom icons
    const storeIcon = L.divIcon({
      className: 'bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-lg',
      html: 'Q',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const homeIcon = L.divIcon({
      className: 'bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-lg',
      html: 'H',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const vehicleIcon = L.divIcon({
      className: 'bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-lg text-lg z-[1000]',
      html: mode === 'DRONE' ? '🚁' : mode === 'EV' ? '🍃' : '🛵',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    L.marker([storeLat, storeLon], { icon: storeIcon }).addTo(map);
    L.marker([customerLat, customerLon], { icon: homeIcon }).addTo(map);

    // Draw route line
    L.polyline([
      [storeLat, storeLon],
      [customerLat, customerLon]
    ], { color: '#4f46e5', weight: 4, dashArray: '10, 10' }).addTo(map);

    // Animate vehicle
    const vehicleMarker = L.marker([storeLat, storeLon], { icon: vehicleIcon, zIndexOffset: 1000 }).addTo(map);
    
    let progress = 0;
    let animationId: number;
    
    const animate = () => {
      progress += 0.005; // speed
      if (progress > 1) progress = 0;
      
      const currentLat = storeLat + (customerLat - storeLat) * progress;
      const currentLon = storeLon + (customerLon - storeLon) * progress;
      
      vehicleMarker.setLatLng([currentLat, currentLon]);
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [storeLat, storeLon, customerLat, customerLon, mode]);

  return (
    <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden border shadow-inner relative">
      <div ref={mapRef} className="w-full h-full absolute inset-0 z-0" />
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';

export default function GeoMap({ students, onPositionUpdate }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    async function initMap() {
      const L = (await import('leaflet')).default;

      const map = L.map(mapRef.current, {
        center: [31.7917, -7.0926],
        zoom: 6,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      students.forEach(s => {
        if (s.longitude && s.latitude) {
          L.marker([s.latitude, s.longitude]).addTo(map)
            .bindPopup(`<b>${s.nom}</b><br/>Moyenne: ${s.moyenne.toFixed(1)}/20`);
        }
      });

      mapInstanceRef.current = map;
    }

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [students]);

  function handleUseMyPosition() {
    if (!navigator.geolocation) {
      alert('La géolocalisation n\'est pas supportée par votre navigateur.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        onPositionUpdate(lat, lng);

        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([lat, lng], 13);
        }
      },
      () => {
        alert('Impossible d\'obtenir votre position.');
      }
    );
  }

  return (
    <div>
      <button
        onClick={handleUseMyPosition}
        className="mb-4 bg-secondary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#3a6b8a] transition-colors"
      >
        📍 Utiliser ma position
      </button>
      <div ref={mapRef} className="w-full rounded-lg overflow-hidden" style={{ height: '450px' }} />
    </div>
  );
}

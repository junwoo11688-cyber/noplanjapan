import { useId } from 'react';
import type { Destination, DestinationCoordinates } from '../types';
import { PinIcon } from './Icons';

interface DestinationMapProps {
  destination: Destination;
}

const MAP_BOUNDS = { west: 122.5, east: 146.0, north: 46.0, south: 23.5 } as const;

function projectCoordinates({ latitude, longitude }: DestinationCoordinates) {
  const longitudeRatio = (longitude - MAP_BOUNDS.west) / (MAP_BOUNDS.east - MAP_BOUNDS.west);
  const latitudeRatio = (MAP_BOUNDS.north - latitude) / (MAP_BOUNDS.north - MAP_BOUNDS.south);
  return {
    x: Math.min(286, Math.max(30, 30 + longitudeRatio * 256)),
    y: Math.min(390, Math.max(30, 30 + latitudeRatio * 360)),
  };
}

export function DestinationMap({ destination }: DestinationMapProps) {
  const instanceId = useId().replace(/:/g, '');
  if (!destination.coordinates) return null;

  const marker = projectCoordinates(destination.coordinates);
  const fullName = `${destination.province} ${destination.name}`;
  const labelOnLeft = marker.x > 205;

  return (
    <section className="destination-map-card" aria-labelledby={`map-title-${instanceId}`}>
      <div className="destination-map-copy">
        <span className="card-label">WHERE YOU&apos;RE GOING</span>
        <h3 id={`map-title-${instanceId}`}>일본 지도에서 확인하기</h3>
        <strong><PinIcon /> {fullName}</strong>
        <p>핀은 해당 여행지의 대략적인 위치를 표시합니다.</p>
      </div>
      <div className="japan-map-wrap">
        <svg className="japan-map" viewBox="0 0 320 420" role="img" aria-label={`${fullName}의 일본 지도상 위치`}>
          <defs>
            <linearGradient id={`map-land-${instanceId}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff1e8" />
              <stop offset="1" stopColor="#f2c9bf" />
            </linearGradient>
            <filter id={`map-shadow-${instanceId}`} x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#3d1820" floodOpacity=".2" />
            </filter>
          </defs>
          <path className="map-sea-line" d="M20 328 C76 303 122 330 171 299 C221 269 255 273 300 238" />
          <path className="map-mainland map-hokkaido" fill={`url(#map-land-${instanceId})`} d="M221 29 L253 24 L276 39 L270 58 L286 76 L269 91 L247 83 L231 96 L212 83 L204 57 Z" />
          <path className="map-mainland map-honshu" fill={`url(#map-land-${instanceId})`} d="M226 101 L248 111 L246 132 L237 145 L243 160 L232 177 L229 194 L216 208 L201 207 L190 217 L174 218 L160 210 L146 222 L127 222 L116 211 L130 202 L151 201 L169 193 L184 199 L200 190 L211 173 L215 151 L222 132 Z" />
          <path className="map-mainland map-shikoku" fill={`url(#map-land-${instanceId})`} d="M132 219 L153 214 L164 224 L153 239 L132 244 L123 233 Z" />
          <path className="map-mainland map-kyushu" fill={`url(#map-land-${instanceId})`} d="M101 226 L121 235 L126 252 L118 265 L120 282 L104 287 L96 269 L84 260 L89 244 L80 236 Z" />
          <circle className="map-island-dot" cx="198" cy="162" r="5" />
          <circle className="map-island-dot" cx="35" cy="365" r="5" />
          <circle className="map-island-dot" cx="27" cy="382" r="4" />
          <circle className="map-island-dot" cx="20" cy="398" r="3" />
          <g className="destination-map-marker" transform={`translate(${marker.x} ${marker.y})`} filter={`url(#map-shadow-${instanceId})`}>
            <circle className="map-marker-wave" r="18" />
            <circle className="map-marker-ring" r="9" />
            <path className="map-marker-pin" d="M0 -13 C-7.3 -13 -12 -8 -12 -1.6 C-12 6.9 0 18 0 18 C0 18 12 6.9 12 -1.6 C12 -8 7.3 -13 0 -13 Z" />
            <circle className="map-marker-core" cy="-2" r="3.5" />
            <text className="map-city-label" x={labelOnLeft ? -16 : 16} y="-18" textAnchor={labelOnLeft ? 'end' : 'start'}>{destination.name}</text>
          </g>
        </svg>
      </div>
    </section>
  );
}

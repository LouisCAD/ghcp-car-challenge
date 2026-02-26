import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Resort } from '../types';

// Fix default marker icons for Vite/bundler environments
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

interface ResortMapProps {
  resorts: Resort[];
}

export default function ResortMap({ resorts }: ResortMapProps) {
  // Geneva region center
  const center: [number, number] = [46.2, 7.2];

  return (
    <div className="rounded-2xl overflow-hidden shadow-md h-72 md:h-96">
      <MapContainer center={center} zoom={8} className="h-full w-full" scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" rel="noopener noreferrer" target="_blank">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {resorts.map((resort) => (
          <Marker key={resort.id} position={[resort.lat, resort.lon]}>
            <Popup>
              <div className="text-center">
                <strong>{resort.name}</strong><br />
                <span className="text-sm text-gray-600">{resort.altitude} m · {resort.country}</span><br />
                <Link
                  to={`/resort/${resort.id}`}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Voir la météo →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

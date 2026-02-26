import type { WeatherData } from '../types';
import { getWeatherCondition, getWindDirectionLabel } from '../services/weatherUtils';
import { Link } from 'react-router-dom';

interface ResortCardProps {
  weather: WeatherData;
}

export default function ResortCard({ weather }: ResortCardProps) {
  const { resort, current } = weather;
  const condition = getWeatherCondition(current.weatherCode);
  const windDir = getWindDirectionLabel(current.windDirection);

  return (
    <Link
      to={`/resort/${resort.id}`}
      className={`block rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden ${condition.bgClass}`}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{resort.name}</h2>
            <p className="text-sm text-slate-500">{resort.country} · {resort.altitude} m</p>
          </div>
          <span className="text-4xl" role="img" aria-label={condition.label}>
            {condition.icon}
          </span>
        </div>

        {/* Temperature */}
        <div className="flex items-end gap-1 mb-2">
          <span className="text-5xl font-bold text-slate-800">{current.temperature}°</span>
          <span className="text-lg text-slate-500 mb-1">C</span>
        </div>

        {/* Condition label */}
        <p className="text-sm font-medium text-slate-600 mb-4">{condition.label}</p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-600">
          <div className="bg-white/50 rounded-lg p-2">
            <div className="text-lg mb-1">❄️</div>
            <div className="font-semibold">{current.snowDepth} cm</div>
            <div>enneigement</div>
          </div>
          <div className="bg-white/50 rounded-lg p-2">
            <div className="text-lg mb-1">💨</div>
            <div className="font-semibold">{current.windSpeed} km/h</div>
            <div>{windDir}</div>
          </div>
          <div className="bg-white/50 rounded-lg p-2">
            <div className="text-lg mb-1">🌧️</div>
            <div className="font-semibold">{current.precipitation} mm</div>
            <div>précip.</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

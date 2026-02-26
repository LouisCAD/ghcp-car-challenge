import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { resorts } from '../data/resorts';
import { fetchWeather } from '../services/weatherService';
import { getWeatherCondition, getWindDirectionLabel } from '../services/weatherUtils';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function ResortDetailPage() {
  const { id } = useParams<{ id: string }>();
  const resort = resorts.find((r) => r.id === id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['weather', id],
    queryFn: () => fetchWeather(resort!),
    enabled: !!resort,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (!resort) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <span className="text-5xl">🏔️</span>
        <p className="text-slate-600 text-lg">Station introuvable.</p>
        <Link to="/" className="text-blue-500 hover:underline">← Retour à l'accueil</Link>
      </div>
    );
  }

  if (isLoading) return <div className="min-h-screen"><LoadingSpinner /></div>;
  if (isError || !data) return <div className="min-h-screen"><ErrorMessage message={`Impossible de charger la météo de ${resort.name}.`} /></div>;

  const condition = getWeatherCondition(data.current.weatherCode);
  const windDir = getWindDirectionLabel(data.current.windDirection);

  // Build next-12-hour forecast (every 3 hours)
  const forecastSlots = [0, 3, 6, 9, 12].map((offset) => ({
    time: data.hourly.time[offset],
    temp: data.hourly.temperature[offset],
    weatherCode: data.hourly.weatherCode[offset],
    snowfall: data.hourly.snowfall[offset],
  }));

  return (
    <div className={`min-h-screen ${condition.bgClass}`}>
      {/* Back nav */}
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <Link to="/" className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm transition-colors">
          ← Retour
        </Link>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">{resort.name}</h1>
            <p className="text-slate-500">{resort.country} · {resort.altitude} m d'altitude</p>
            <p className="text-slate-500 text-sm mt-1">{resort.description}</p>
          </div>
          <span className="text-6xl" role="img" aria-label={condition.label}>{condition.icon}</span>
        </div>

        {/* Current conditions */}
        <div className="bg-white/70 rounded-2xl p-6 shadow">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Conditions actuelles</h2>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-7xl font-bold text-slate-800">{data.current.temperature}°C</span>
          </div>
          <p className="text-slate-600 mb-6">{condition.label}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm">
            <div className="bg-white/60 rounded-xl p-3">
              <div className="text-2xl mb-1">❄️</div>
              <div className="font-bold text-slate-800">{data.current.snowDepth} cm</div>
              <div className="text-slate-500">enneigement</div>
            </div>
            <div className="bg-white/60 rounded-xl p-3">
              <div className="text-2xl mb-1">💨</div>
              <div className="font-bold text-slate-800">{data.current.windSpeed} km/h</div>
              <div className="text-slate-500">vent {windDir}</div>
            </div>
            <div className="bg-white/60 rounded-xl p-3">
              <div className="text-2xl mb-1">🌧️</div>
              <div className="font-bold text-slate-800">{data.current.precipitation} mm</div>
              <div className="text-slate-500">précipitations</div>
            </div>
            <div className="bg-white/60 rounded-xl p-3">
              <div className="text-2xl mb-1">📍</div>
              <div className="font-bold text-slate-800">{resort.altitude} m</div>
              <div className="text-slate-500">altitude</div>
            </div>
          </div>
        </div>

        {/* Hourly forecast */}
        <div className="bg-white/70 rounded-2xl p-6 shadow">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Prévisions (12h)</h2>
          <div className="flex justify-between gap-2 overflow-x-auto pb-2">
            {forecastSlots.map((slot, i) => {
              if (!slot.time) return null;
              const slotCondition = getWeatherCondition(slot.weatherCode ?? 0);
              const hour = new Date(slot.time).toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Zurich' });
              return (
                <div key={i} className="flex flex-col items-center gap-1 min-w-14 bg-white/60 rounded-xl p-2">
                  <span className="text-xs text-slate-500">{hour}</span>
                  <span className="text-xl" role="img" aria-label={slotCondition.label}>{slotCondition.icon}</span>
                  <span className="font-semibold text-slate-800">{slot.temp ?? '--'}°</span>
                  {(slot.snowfall ?? 0) > 0 && (
                    <span className="text-xs text-indigo-500">❄ {slot.snowfall} cm</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center">
          Mis à jour : {new Date(data.fetchedAt).toLocaleString('fr-CH', { timeZone: 'Europe/Zurich' })} ·{' '}
          Source :{' '}
          <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="underline">
            Open-Meteo
          </a>
        </p>
      </main>
    </div>
  );
}

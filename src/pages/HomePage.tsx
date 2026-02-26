import { useQueries } from '@tanstack/react-query';
import { resorts } from '../data/resorts';
import { fetchWeather } from '../services/weatherService';
import ResortCard from '../components/ResortCard';
import ResortMap from '../components/ResortMap';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function HomePage() {
  const results = useQueries({
    queries: resorts.map((resort) => ({
      queryKey: ['weather', resort.id],
      queryFn: () => fetchWeather(resort),
      staleTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    })),
  });

  const isLoading = results.some((r) => r.isLoading);
  const hasError = results.every((r) => r.isError);
  const weatherData = results.flatMap((r) => (r.data ? [r.data] : []));

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Hero banner */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-10 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2 tracking-tight">
            ⛷️ Météo des Neiges
          </h1>
          <p className="text-blue-100 text-sm md:text-base">
            Conditions météo en temps réel pour les stations de ski autour de Genève
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* Map section */}
        <section>
          <h2 className="text-xl font-semibold text-slate-700 mb-4">🗺️ Carte des stations</h2>
          <ResortMap resorts={resorts} />
        </section>

        {/* Weather cards */}
        <section>
          <h2 className="text-xl font-semibold text-slate-700 mb-4">🌡️ Conditions actuelles</h2>

          {isLoading && <LoadingSpinner />}

          {!isLoading && hasError && (
            <ErrorMessage message="Impossible de charger les données météo." />
          )}

          {!isLoading && weatherData.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {weatherData.map((w) => (
                <ResortCard key={w.resort.id} weather={w} />
              ))}
            </div>
          )}
        </section>

        {/* Partially loaded results */}
        {!isLoading && !hasError && weatherData.length === 0 && (
          <ErrorMessage message="Aucune donnée disponible pour le moment." />
        )}
      </main>

      <footer className="text-center text-slate-400 text-xs py-6 mt-4">
        Données météo fournies par{' '}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-slate-600"
        >
          Open-Meteo
        </a>{' '}
        · Carte ©{' '}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-slate-600"
        >
          OpenStreetMap
        </a>
      </footer>
    </div>
  );
}

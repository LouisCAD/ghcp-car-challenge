import type { WeatherCondition } from '../types';

// WMO Weather interpretation codes
// https://open-meteo.com/en/docs#weathervariables
const WMO_CONDITIONS: Record<number, WeatherCondition> = {
  0:  { label: 'Ciel dégagé',        icon: '☀️',  bgClass: 'bg-sky-100' },
  1:  { label: 'Principalement dégagé', icon: '🌤️', bgClass: 'bg-sky-100' },
  2:  { label: 'Partiellement nuageux', icon: '⛅', bgClass: 'bg-slate-100' },
  3:  { label: 'Couvert',             icon: '☁️',  bgClass: 'bg-slate-200' },
  45: { label: 'Brouillard',          icon: '🌫️', bgClass: 'bg-slate-200' },
  48: { label: 'Brouillard givrant',  icon: '🌫️', bgClass: 'bg-slate-200' },
  51: { label: 'Bruine légère',       icon: '🌦️', bgClass: 'bg-blue-100' },
  53: { label: 'Bruine modérée',      icon: '🌦️', bgClass: 'bg-blue-100' },
  55: { label: 'Bruine dense',        icon: '🌧️', bgClass: 'bg-blue-200' },
  61: { label: 'Pluie légère',        icon: '🌧️', bgClass: 'bg-blue-100' },
  63: { label: 'Pluie modérée',       icon: '🌧️', bgClass: 'bg-blue-200' },
  65: { label: 'Pluie forte',         icon: '🌧️', bgClass: 'bg-blue-300' },
  71: { label: 'Neige légère',        icon: '🌨️', bgClass: 'bg-indigo-100' },
  73: { label: 'Neige modérée',       icon: '❄️',  bgClass: 'bg-indigo-100' },
  75: { label: 'Neige forte',         icon: '❄️',  bgClass: 'bg-indigo-200' },
  77: { label: 'Grains de neige',     icon: '🌨️', bgClass: 'bg-indigo-100' },
  80: { label: 'Averses légères',     icon: '🌦️', bgClass: 'bg-blue-100' },
  81: { label: 'Averses modérées',    icon: '🌧️', bgClass: 'bg-blue-200' },
  82: { label: 'Averses violentes',   icon: '⛈️',  bgClass: 'bg-blue-300' },
  85: { label: 'Averses de neige',    icon: '🌨️', bgClass: 'bg-indigo-100' },
  86: { label: 'Averses de neige',    icon: '❄️',  bgClass: 'bg-indigo-200' },
  95: { label: 'Orage',              icon: '⛈️',  bgClass: 'bg-yellow-200' },
  96: { label: 'Orage avec grêle',   icon: '⛈️',  bgClass: 'bg-yellow-300' },
  99: { label: 'Orage fort avec grêle', icon: '⛈️', bgClass: 'bg-yellow-400' },
};

const DEFAULT_CONDITION: WeatherCondition = {
  label: 'Inconnu',
  icon: '❓',
  bgClass: 'bg-slate-100',
};

export function getWeatherCondition(code: number): WeatherCondition {
  return WMO_CONDITIONS[code] ?? DEFAULT_CONDITION;
}

export function getWindDirectionLabel(degrees: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  const index = Math.round(degrees / 45) % 8;
  return dirs[index] ?? 'N';
}

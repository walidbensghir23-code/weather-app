// ─────────────────────────────────────────────
// weatherService.js — OpenWeatherMap API calls
// ─────────────────────────────────────────────
//
// ⚠️  IMPORTANT : Crée un compte GRATUIT sur https://openweathermap.org/api
// et remplace "YOUR_API_KEY_HERE" par ta clé API.
// La clé gratuite suffit (1000 appels/jour).
//
const API_KEY = "YOUR_API_KEY_HERE";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const isApiKeySet = () => API_KEY !== "YOUR_API_KEY_HERE" && API_KEY.length > 0;

export async function fetchCurrentWeather(city) {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=fr`;
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) throw new Error("Ville introuvable. Vérifie l'orthographe.");
    if (res.status === 401) throw new Error("Clé API invalide. Configure ta clé dans weatherService.js");
    throw new Error("Erreur serveur. Réessaie plus tard.");
  }
  return res.json();
}

export async function fetchForecast(city) {
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=fr&cnt=40`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Impossible de charger les prévisions.");
  return res.json();
}

// Returns one forecast entry per day (at noon)
export function parseDailyForecast(forecastData) {
  const days = {};
  forecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric" });
    const hour = date.getHours();
    if (!days[dayKey] || Math.abs(hour - 12) < Math.abs(new Date(days[dayKey].dt * 1000).getHours() - 12)) {
      days[dayKey] = item;
    }
  });
  return Object.entries(days).slice(0, 5).map(([label, data]) => ({ label, data }));
}

// Map weather codes to emojis
export function weatherEmoji(id) {
  if (id >= 200 && id < 300) return "⛈️";
  if (id >= 300 && id < 400) return "🌦️";
  if (id >= 500 && id < 600) return "🌧️";
  if (id >= 600 && id < 700) return "❄️";
  if (id >= 700 && id < 800) return "🌫️";
  if (id === 800) return "☀️";
  if (id === 801) return "🌤️";
  if (id <= 804) return "☁️";
  return "🌡️";
}

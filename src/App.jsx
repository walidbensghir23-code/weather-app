import { useState } from "react";
import { Search, Wind, Droplets, Thermometer, Eye, AlertCircle, Info } from "lucide-react";
import { fetchCurrentWeather, fetchForecast, parseDailyForecast, weatherEmoji, isApiKeySet } from "./weatherService";

function StatItem({ icon, label, value }) {
  return (
    <div className="stat-item">
      <span className="stat-label">{icon} {label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

function ForecastCard({ label, data }) {
  return (
    <div className="forecast-card">
      <div className="forecast-day">{label}</div>
      <div className="forecast-emoji">{weatherEmoji(data.weather[0].id)}</div>
      <div className="forecast-temp">{Math.round(data.main.temp)}°C</div>
      <div className="forecast-min">{Math.round(data.main.temp_min)}° / {Math.round(data.main.temp_max)}°</div>
    </div>
  );
}

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);
    setForecast([]);
    try {
      const [current, forecastData] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);
      setWeather(current);
      setForecast(parseDailyForecast(forecastData));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1>🌤️ Météo en Direct</h1>
          <p>Consultez la météo par ville — OpenWeatherMap API</p>
        </header>

        {/* API Key notice */}
        {!isApiKeySet() && (
          <div className="api-notice">
            <strong>⚠️ Configuration requise :</strong> Ouvre <code>src/weatherService.js</code> et remplace <code>YOUR_API_KEY_HERE</code> par ta clé API OpenWeatherMap gratuite.{" "}
            <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" style={{color: "#fbbf24"}}>
              Obtenir une clé gratuite →
            </a>
          </div>
        )}

        {/* Search */}
        <form className="search-form" onSubmit={handleSearch} role="search">
          <input
            id="city-input"
            className="search-input"
            type="text"
            placeholder="Entrez une ville... ex: Casablanca"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-label="Nom de la ville"
          />
          <button
            id="search-btn"
            className="search-btn"
            type="submit"
            disabled={loading || !city.trim()}
            aria-label="Rechercher la météo"
          >
            <Search size={16} />
            {loading ? "Chargement..." : "Rechercher"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="error-box" role="alert">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="loading">
            <div className="spinner" />
            <p>Récupération des données météo...</p>
          </div>
        )}

        {/* Current Weather */}
        {weather && !loading && (
          <main>
            <div className="weather-card">
              <div className="city-name">{weather.name}</div>
              <div className="city-country">{weather.sys.country} · Mis à jour à {new Date(weather.dt * 1000).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</div>

              <div className="weather-main">
                <div className="weather-emoji" aria-hidden="true">{weatherEmoji(weather.weather[0].id)}</div>
                <div>
                  <div className="temp-big">{Math.round(weather.main.temp)}°C</div>
                  <div className="temp-feels">Ressenti {Math.round(weather.main.feels_like)}°C</div>
                </div>
              </div>

              <div className="weather-desc">{weather.weather[0].description}</div>

              <div className="weather-stats">
                <StatItem icon="💧" label="Humidité" value={`${weather.main.humidity}%`} />
                <StatItem icon="💨" label="Vent" value={`${Math.round(weather.wind.speed * 3.6)} km/h`} />
                <StatItem icon="👁️" label="Visibilité" value={`${(weather.visibility / 1000).toFixed(1)} km`} />
                <StatItem icon="🌡️" label="Min / Max" value={`${Math.round(weather.main.temp_min)}° / ${Math.round(weather.main.temp_max)}°`} />
              </div>
            </div>

            {/* 5-day Forecast */}
            {forecast.length > 0 && (
              <section aria-label="Prévisions sur 5 jours">
                <p className="forecast-title">📅 Prévisions sur 5 jours</p>
                <div className="forecast-grid">
                  {forecast.map(({ label, data }) => (
                    <ForecastCard key={label} label={label} data={data} />
                  ))}
                </div>
              </section>
            )}
          </main>
        )}

        {/* Empty state */}
        {!weather && !loading && !error && (
          <div className="empty-state" aria-label="Aucune ville sélectionnée">
            <div className="big-emoji">🌍</div>
            <p>Recherchez une ville pour afficher la météo</p>
          </div>
        )}

        {/* Footer */}
        <footer className="app-footer">
          Développé par Walid Bensghir · React + OpenWeatherMap API
        </footer>
      </div>
    </div>
  );
}

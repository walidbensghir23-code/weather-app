# 🌤️ Application Météo

Application météo en temps réel développée avec **React** et l'API **OpenWeatherMap**.

Développée par **Walid Bensghir** — Étudiant en Développement Digital · ISTA NTIC 2 SM, Casablanca

---

## ✨ Fonctionnalités

- 🔍 Recherche de météo par ville
- 🌡️ Température actuelle + ressenti
- 💧 Humidité, vitesse du vent, visibilité
- 📅 Prévisions sur 5 jours
- 🌍 Support multilingue (descriptions en français)
- 📱 Interface 100% responsive

## 🛠️ Technologies utilisées

- **React** (Vite)
- **JavaScript** (ES6+)
- **CSS** (custom design system)
- **OpenWeatherMap REST API**

## 🚀 Démarrer le projet

```bash
# 1. Cloner le dépôt
git clone https://github.com/ton-username/weather-app.git
cd weather-app

# 2. Installer les dépendances
npm install

# 3. Configurer la clé API
# Ouvre src/weatherService.js
# Remplace YOUR_API_KEY_HERE par ta clé OpenWeatherMap gratuite
# 👉 https://openweathermap.org/api (inscription gratuite)

# 4. Lancer le serveur de développement
npm run dev
```

## 🔑 Configuration de la clé API

1. Crée un compte gratuit sur [openweathermap.org](https://openweathermap.org/api)
2. Génère une clé API (gratuite, 1000 appels/jour)
3. Dans `src/weatherService.js`, remplace :
   ```js
   const API_KEY = "YOUR_API_KEY_HERE";
   ```
   par :
   ```js
   const API_KEY = "ta_vraie_cle_api";
   ```

## 📁 Structure du projet

```
weather-app/
├── src/
│   ├── App.jsx             ← Composant principal
│   ├── weatherService.js   ← Appels API (à configurer)
│   ├── main.jsx
│   └── index.css
├── index.html
└── package.json
```

---

© 2025 Walid Bensghir

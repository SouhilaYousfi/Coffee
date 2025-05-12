# ☕ Coffee Machine App

Une application web simulant une machine à café connectée, avec un backend Laravel et un frontend Next.js. Développée pour démontrer la gestion de files d'attente, communication temps réel et interactions API.

## 🧐 Fonctionalités

- Interface utilisateur permettant de commander des cafés
- Visualisation en temps réél de la commande
- Système de queue permettant une prise de commande

## 📦 Stack technique

- **Backend** : Laravel 12
- **Frontend** : Next.js (React)
- **Base de données** : SQLite
- **Conteneurisation** : Docker + Docker Compose
- **WebSocket** : Laravel Echo / Laravel WebSockets

---

## 🚀 Lancer le projet

```bash
docker compose up --build
```

Vous devrez ensuite lancer la migration Laravel

```bash
docker compose exec coffeebackend php artisan migrate
```

Puis accéder à l'interface web http://localhost:3100/

# Master RSI - Langage du Web

Projet pour le module Langage du Web (Master RSI, Pr. Sofia El Amoury, 2025-2026).

## Structure

```
├── database/
│   └── master_rsi.sql
├── version-nextjs/                 # Version 1: Next.js full-stack
├── version-laravel/
│   ├── laravel-backend/            # Version 2: API Laravel
│   └── nextjs-frontend/            # Version 2: Client Next.js
└── README.md
```

2 versions sont disponibles :
- **Version 1** : Next.js full-stack (un seul serveur)
- **Version 2** : Laravel backend + Next.js frontend (architecture decouplee)

## Demarrage rapide

### Version 1 (Next.js full-stack)

```bash
cd version-nextjs
npm install
cp .env.example .env.local
# Editer .env.local avec vos identifiants MySQL
npm run dev
```

### Version 2 (Laravel + Next.js)

**Terminal 1 - Backend Laravel :**

```bash
cd version-laravel/laravel-backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

**Terminal 2 - Frontend Next.js :**

```bash
cd version-laravel/nextjs-frontend
npm install
cp .env.example .env.local
npm run dev
```

## Comptes de test

| Login | Mot de passe | Nom |
|-------|-------------|-----|
| ahmed | ahmed123 | Ahmed |
| sara | sara123 | Sara |
| anouar | anouar123 | Anouar |
| amine | amine123 | Amine |
| badr | badr123 | Badr |

## Fonctionnalites

- Authentification avec tokens
- Manipulation de matrices en JavaScript
- Gestion de fichiers (notes etudiants)
- Upload et affichage d'images
- Quiz JavaScript et HTML/CSS
- Statistiques avec Chart.js
- Geolocalisation avec Leaflet

## Prérequis

- Node.js 20+
- MySQL 8.0+
- PHP 8.3+ et Composer (Version 2 uniquement)

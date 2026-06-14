# Master RSI — Langage du Web

Portfolio interactif pour les étudiants du **Master RSI** à **Université Hassan 1er — Faculté des Sciences et Techniques Settat** (Pr. Sofia El Amoury, 2025–2026).

## Structure du projet

```
├── database/
│   └── master_rsi.sql              ← Script SQL (CREATE + INSERT)
├── version-nextjs/                 ← Version 1: Next.js full-stack
├── version-laravel/
│   ├── nextjs-frontend/            ← Version 2: Frontend Next.js
│   └── laravel-backend/            ← Version 2: Backend Laravel
└── README.md
```

## Versions

### Version 1 — Next.js Full Stack
- Framework: Next.js 16 (App Router) + TypeScript
- Base de données: MySQL via `mysql2`
- Auth: JWT (jose) + httpOnly cookies
- Styling: Tailwind CSS v4
- Dépendances: Chart.js, Leaflet.js

### Version 2 — Next.js + Laravel
- Frontend: Next.js 16 (App Router) + TypeScript
- Backend: Laravel 11 + Sanctum (API tokens)
- Base de données: MySQL
- Communication: REST API (fetch)

## Installation rapide

1. Créer la base de données : importer `database/master_rsi.sql` dans phpMyAdmin
2. Version Next.js : `cd version-nextjs && npm install && npm run dev`
3. Version Laravel : voir les README dans `version-laravel/`

## Identifiants de test

| Login | Mot de passe |
|-------|-------------|
| ahmed | ahmed123 |
| sara  | sara123 |
| anouar | anouar123 |
| amine | amine123 |
| badr  | badr123 |

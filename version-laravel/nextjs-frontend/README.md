# Master RSI — Frontend Next.js (Laravel Backend)

Interface utilisateur Next.js 16 qui consomme l'API Laravel.

## Prérequis

- Node.js 20.9+
- npm
- Backend Laravel en cours d'exécution (voir `../laravel-backend/README.md`)

## Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

## Configuration

Par défaut, l'API Laravel est attendue sur `http://localhost:8000/api`.

Pour changer l'URL, définissez la variable d'environnement :

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Accès

Ouvrir [http://localhost:3000](http://localhost:3000)

**Important :** Le backend Laravel doit être lancé (`php artisan serve` dans `../laravel-backend/`).

## Identifiants de test

| Login | Mot de passe |
|-------|-------------|
| ahmed | ahmed123 |
| sara  | sara123 |
| anouar | anouar123 |
| amine | amine123 |
| badr  | badr123 |

## Fonctionnalités

Même interface que la version Next.js full-stack, mais toutes les données proviennent de l'API Laravel.

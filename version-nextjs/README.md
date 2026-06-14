# Master RSI — Version Next.js Full Stack

Application full-stack Next.js 16 avec base de données MySQL.

## Prérequis

- Node.js 20.9+
- MySQL (serveur local via XAMPP, WAMP, ou phpMyAdmin)
- npm

## Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Créer la base de données
# Importer ../database/master_rsi.sql dans phpMyAdmin

# 3. Lancer le serveur de développement
npm run dev
```

## Configuration

Éditez `lib/db.ts` ou utilisez les variables d'environnement :

```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=master_rsi
JWT_SECRET=votre-secret
```

## Accès

Ouvrir [http://localhost:3000](http://localhost:3000)

## Identifiants de test

| Login | Mot de passe |
|-------|-------------|
| ahmed | ahmed123 |
| sara  | sara123 |
| anouar | anouar123 |
| amine | amine123 |
| badr  | badr123 |

## Fonctionnalités

- Authentification avec JWT et cookies httpOnly
- CV interactif avec photo, notes, localisation (Leaflet)
- Manipulation de matrices (JavaScript pur)
- Gestion de fichiers texte (CRUD)
- Upload/affichage d'images en base MySQL
- Quiz JavaScript et PHP avec sauvegarde des notes
- Statistiques avec Chart.js
- Carte de géolocalisation avec Leaflet.js
- Design responsive avec sidebar mobile

## Build

```bash
npm run build
npm start
```

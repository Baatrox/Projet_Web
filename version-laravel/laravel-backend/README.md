# Master RSI — Backend Laravel

API REST Laravel 11 pour l'application Master RSI.

## Prérequis

- PHP 8.1+
- Composer
- MySQL
- Extensions PHP : `pdo_mysql`, `gd`, `fileinfo`

## Installation

```bash
# 1. Installer les dépendances
composer install

# 2. Créer le fichier .env
cp .env.example .env
# Modifier DB_DATABASE=master_rsi, DB_USERNAME=root, DB_PASSWORD=

# 3. Générer la clé d'application
php artisan key:generate

# 4. Créer la base de données
# Importer ../../database/master_rsi.sql dans phpMyAdmin
# OU lancer les migrations :
php artisan migrate
php artisan db:seed --class=EtudiantSeeder

# 5. Lancer le serveur
php artisan serve
```

## Configuration CORS

Le fichier `config/cors.php` autorise le frontend Next.js sur `http://localhost:3000`.

## Endpoints API

| Méthode | URL | Description |
|---------|-----|-------------|
| POST | `/api/login` | Authentification |
| POST | `/api/logout` | Déconnexion (auth) |
| GET | `/api/etudiants` | Tous les étudiants (auth) |
| GET | `/api/etudiants/me` | Étudiant connecté (auth) |
| PUT | `/api/etudiants/{id}` | Modifier étudiant (auth) |
| POST | `/api/images` | Upload image (auth) |
| GET | `/api/images` | Toutes les images (auth) |
| DELETE | `/api/images/{id}` | Supprimer image (auth) |
| GET | `/api/fichiers` | Lire fichier texte (auth) |
| POST | `/api/fichiers` | Ajouter ligne fichier (auth) |
| PUT | `/api/fichiers` | Modifier ligne fichier (auth) |
| POST | `/api/quiz/submit` | Soumettre note quiz (auth) |

## Identifiants de test

| Login | Mot de passe |
|-------|-------------|
| ahmed | ahmed123 |
| sara  | sara123 |
| anouar | anouar123 |
| amine | amine123 |
| badr  | badr123 |

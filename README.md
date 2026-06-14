# Master RSI — Langage du Web

Portfolio interactif pour les étudiants du **Master RSI** à **Université Hassan 1er — Faculté des Sciences et Techniques Settat** (Pr. Sofia El Amoury, 2025–2026).

## 📋 Structure du projet

Le projet est composé de **3 versions** architecturales indépendantes :

```
├── database/
│   └── master_rsi.sql              ← Script SQL (CREATE + INSERT)
├── version-nextjs/                 ← Version 1: Next.js full-stack (standalone)
├── version-laravel/
│   ├── laravel-backend/            ← Version 2: Backend API (Laravel 11)
│   └── nextjs-frontend/            ← Version 2: Frontend client (Next.js)
└── README.md
```

---

## 🎯 Versions disponibles

### Version 1 — Next.js Full Stack (Recommandée pour démarrage rapide)

**Architecture** : Application monolithique Next.js + MySQL local

**Technos** : Next.js 16 (App Router), MySQL2, bcryptjs, JWT (jose), Chart.js, Leaflet

**Pour qui** : Développement rapide, prototype, démonstration simple

**Installation rapide** :
```bash
cd version-nextjs
npm install
cp .env.example .env.local
# Éditer .env.local avec vos credentials
npm run dev
# Accès : http://localhost:3000
```

### Version 2 — Laravel Backend + Next.js Frontend (Architecture recommandée pour production)

**Architecture** : API REST Laravel 11 + Client Next.js découplé

**Technos** : Laravel 11 + Sanctum (tokens), Next.js 16, MySQL, bcryptjs

**Pour qui** : Production, déploiement cloud, équipes front/back séparées

**Installation**:

#### Backend Laravel :
```bash
cd version-laravel/laravel-backend
composer install
cp .env.example .env
# Éditer .env avec vos credentials MySQL
php artisan key:generate
php artisan migrate --seed
php artisan serve
# API disponible sur : http://localhost:8000
```

#### Frontend Next.js :
```bash
cd version-laravel/nextjs-frontend
npm install
cp .env.example .env.local
# Éditer .env.local : NEXT_PUBLIC_API_URL=http://localhost:8000/api
npm run dev
# Accès : http://localhost:3000
```

---

## 📊 Spécifications techniques

### Base de données : `master_rsi`

#### Table `etudiants`
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | INT PRIMARY KEY | Identifiant unique auto-incrémenté |
| `login` | VARCHAR(20) | Nom d'utilisateur unique |
| `pass` | VARCHAR(256) | Mot de passe hashé (bcrypt) |
| `nom` | VARCHAR(20) | Nom complet de l'étudiant |
| `note1` | INT | Note du Quiz 1 (0-20) |
| `note2` | INT | Note du Quiz 2 (0-20) |
| `moyenne` | FLOAT | Moyenne calculée (note1 + note2) / 2 |
| `longitude` | FLOAT | Coordonnée GPS longitude (-180 à +180) |
| `latitude` | FLOAT | Coordonnée GPS latitude (-90 à +90) |

#### Table `images`
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | INT PRIMARY KEY | Identifiant unique auto-incrémenté |
| `name` | VARCHAR(20) | Nom du fichier image |
| `type` | VARCHAR(6) | Extension (jpg, png, gif, webp) |
| `size` | INT | Taille en bytes |
| `bin_img` | LONGBLOB | Données binaires de l'image |

---

## 🔐 Authentification

### Comptes de test

| Login | Mot de passe | Nom |
|-------|-------------|-----|
| `ahmed` | `ahmed123` | Ahmed |
| `sara` | `sara123` | Sara |
| `anouar` | `anouar123` | Anouar |
| `amine` | `amine123` | Amine |
| `badr` | `badr123` | Badr |

**Note** : Les mots de passe sont hashés avec bcrypt lors du premier login. Le fichier `database/master_rsi.sql` contient les hashs précalculés.

### Système de sécurité

- **Hachage des mots de passe** : bcryptjs (10 rounds)
- **Tokens JWT** (Version 1) : 24h d'expiration
- **Tokens Sanctum** (Version 2) : Illimité (révocable au logout)
- **Transport** : Cookies httpOnly (sécurisé contre XSS)
- **HTTPS** : Obligatoire en production

---

## ✨ Fonctionnalités obligatoires (6 projets)

### 1. Manipulation de matrices avec JavaScript
- Génération de matrices aléatoires
- Calcul de sommes matricielles
- Calcul de produits matriciels
- Validation des dimensions

### 2. Manipulation de formulaires avec fichier
- Fichier : `storage/master_rsi2020.txt` (Version 2) ou fichier temporaire (Version 1)
- Format pipe-delimited : `CNE|nom|prenom|note1|note2|note3`
- Ajout, consultation, modification d'entrées
- Validation des notes (0-20)

### 3. Insertion et affichage d'images dans la base de données
- Upload de photo de profil (JPEG, PNG, GIF, WebP, max 10MB)
- Stockage en base de données (LONGBLOB)
- Affichage en gallery
- Suppression

### 4. Quiz (2 Quiz)
- **Quiz 1** : 20 questions sur HTML/CSS (10 points = 1 point/question)
- **Quiz 2** : 20 questions sur JavaScript (10 points = 1 point/question)
- Sauvegarde des scores en base (note1, note2)
- Calcul automatique de la moyenne

### 5. Statistiques avec Chart.js
- Graphique de distribution des moyennes
- Graphique des notes par étudiant
- Export en PNG (optionnel)

### 6. Géolocalisation des étudiants
- Carte Leaflet avec marqueurs
- Affichage des étudiants par coordonnées
- Mise à jour de position (si permit par le navigateur)
- Tableau récapitulatif

---

## 🚀 Guide de démarrage

### Prérequis

- **Node.js** 20+ et npm 10+
- **PHP** 8.3+ (pour Version 2)
- **Composer** 2.4+ (pour Version 2)
- **MySQL** 8.0+ (ou compatible)

### Étape 1 : Préparer la base de données

```bash
# Créer la base de données
mysql -u root -p < database/master_rsi.sql

# Vérifiez :
mysql -u root -p -e "USE master_rsi; SELECT COUNT(*) FROM etudiants;"
```

Résultat attendu : `5 étudiants`

### Étape 2 : Choisir votre version

#### Version 1 (Rapide) :
```bash
cd version-nextjs
npm install
cp .env.example .env.local
# Éditer .env.local
npm run dev
# http://localhost:3000
```

#### Version 2 (Production) :

**Terminal 1 - Backend** :
```bash
cd version-laravel/laravel-backend
composer install
cp .env.example .env
# Éditer .env
php artisan migrate --seed
php artisan serve
# http://localhost:8000/api
```

**Terminal 2 - Frontend** :
```bash
cd version-laravel/nextjs-frontend
npm install
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000/api
npm run dev
# http://localhost:3000
```

### Étape 3 : Se connecter

1. Ouvrir `http://localhost:3000`
2. Utiliser un compte de test (voir tableau ci-dessus)
3. Explorer les 6 projets du menu

---

## 📁 Variables d'environnement

### Version 1 : `.env.local` (Next.js full-stack)

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=master_rsi
DB_USER=root
DB_PASS=your_password
JWT_SECRET=your_strong_secret_key_at_least_32_chars
NODE_ENV=development
```

### Version 2 Backend : `.env` (Laravel)

```
APP_NAME=MasterRSI
APP_KEY=base64:xxxxxxxxxxxxx (généré par php artisan key:generate)
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=master_rsi
DB_USERNAME=root
DB_PASSWORD=your_password
```

### Version 2 Frontend : `.env.local` (Next.js)

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NODE_ENV=development
```

---

## 🔄 Commandes essentielles

### Version 1 (Next.js)
```bash
npm run dev          # Développement
npm run build        # Build production
npm run lint         # Linting (si disponible)
```

### Version 2 Laravel
```bash
php artisan serve             # Serveur dev
php artisan migrate --seed    # DB + données test
php artisan route:list        # Afficher les routes
php artisan tinker            # REPL PHP
```

### Version 2 Next.js Frontend
```bash
npm run dev          # Développement
npm run build        # Build production
```

---

## ⚠️ Résolution de problèmes

### Erreur : "Cannot connect to database"
- Vérifiez que MySQL est en cours d'exécution
- Vérifiez les credentials dans `.env.local`
- Assurez-vous que `master_rsi` existe : `mysql -u root -p -e "SHOW DATABASES;"`

### Erreur : "Missing required environment variable"
- Copiez `.env.example` vers `.env.local`
- Remplissez tous les champs

### Images ne s'affichent pas
- Vérifiez que les images sont bien insérées en base
- Vérifiez le format MIME (dataUrl doit commencer par `data:image/...;base64,...`)

### Géolocalisation ne fonctionne pas
- Vérifiez les permissions du navigateur
- Assurez-vous que le site est en HTTPS (ou localhost)

---

## 📝 Conventions de code

- **JavaScript** : ES6+, camelCase pour les variables/fonctions
- **PHP/Laravel** : PSR-12, snake_case pour les tables/colonnes
- **Bases de données** : snake_case pour les noms
- **Commits Git** : Messages clairs en français/anglais

---

## 📄 Licence

Projet académique - Master RSI 2025–2026

---

**Question ? Consultez les README spécifiques dans chaque dossier (`version-nextjs/README.md`, etc.)**

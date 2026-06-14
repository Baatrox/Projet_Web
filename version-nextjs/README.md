# Next.js Full-Stack — Master RSI

**Version 1** : Application standalone Next.js 16 avec MySQL intégré.

Cette version est idéale pour :
- ✅ Prototype rapide
- ✅ Démonstration simple
- ✅ Environnement de développement
- ✅ Petits projets

---

## 🚀 Démarrage rapide

### 1. Installation

```bash
npm install
```

### 2. Configuration

```bash
cp .env.example .env.local
```

Éditer `.env.local` avec vos paramètres MySQL :

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=master_rsi
DB_USER=root
DB_PASS=your_password
JWT_SECRET=your_very_strong_secret_key_32_chars_minimum
NODE_ENV=development
```

### 3. Initialiser la base de données

```bash
# Importer le script SQL
mysql -u root -p master_rsi < ../database/master_rsi.sql
```

### 4. Démarrer le serveur

```bash
npm run dev
```

Accès : **http://localhost:3000**

---

## 📚 Structure du projet

```
version-nextjs/
├── app/                            # Pages et API (App Router)
│   ├── api/                        # Routes API
│   │   ├── auth/                   # Authentification
│   │   ├── etudiants/              # Gestion des étudiants
│   │   ├── images/                 # Upload/affichage images
│   │   ├── fichiers/               # Gestion fichiers
│   │   └── quiz/                   # Soumission quiz
│   ├── dashboard/                  # Pages protégées
│   │   ├── about/                  # Profil étudiant (CV + photo)
│   │   └── projects/               # 6 projets disponibles
│   ├── page.jsx                    # Page de login
│   └── layout.jsx                  # Layout principal
├── lib/
│   ├── db.js                       # Connexion MySQL
│   └── auth.js                     # JWT + Session
├── components/                     # Composants React
├── public/                         # Actifs statiques
├── .env.example                    # Template variables
├── .env.local                      # Variables locales (non committé)
└── package.json
```

---

## 🔐 Authentification

### Comptes de test

| Login | Mot de passe |
|-------|------------|
| ahmed | ahmed123 |
| sara | sara123 |
| anouar | anouar123 |
| amine | amine123 |
| badr | badr123 |

### Mécanisme

1. **Login** : POST `/api/auth/login` avec `{ login, password }`
2. **Vérification** : Comparaison avec bcryptjs
3. **Token JWT** : Créé et stocké dans cookie httpOnly
4. **Session** : Automatique pour les routes protégées

---

## 🌟 Fonctionnalités

### Pages disponibles

- `/` : **Login** - Authentification simple
- `/dashboard` : **Accueil** - Menu des projets
- `/dashboard/about` : **CV** - Profil avec photo et stats
- `/dashboard/projects` : **Hub** - Accès aux 6 projets
  - `matrices` : Manipulation de matrices JS
  - `fichiers` : Gestion fichier `master_rsi2020.txt`
  - `images` : Galerie d'images en base de données
  - `quiz/quiz1` : Quiz 1 (HTML/CSS)
  - `quiz/quiz2` : Quiz 2 (JavaScript)
  - `stats` : Graphiques Chart.js
  - `geo` : Carte Leaflet + géolocalisation

---

## 🔌 API Routes

### Authentification
```
POST   /api/auth/login          Login + création token JWT
POST   /api/auth/logout         Revocation du token
```

### Étudiants (protégé)
```
GET    /api/etudiants           Liste tous les étudiants
GET    /api/etudiants/me        Profil de l'utilisateur connecté
PUT    /api/etudiants/[id]      Modification (notes, GPS)
```

### Images (protégé)
```
GET    /api/images              Liste toutes les images (base64)
POST   /api/images              Upload image (FormData)
DELETE /api/images/[id]         Suppression
```

### Fichiers (protégé)
```
GET    /api/fichiers            Lecture `master_rsi2020.txt`
POST   /api/fichiers            Ajout ligne
PUT    /api/fichiers            Modification ligne
```

### Quiz (protégé)
```
POST   /api/quiz/submit         Sauvegarde score (note1 ou note2)
```

---

## 🛠️ Commandes

```bash
npm run dev              # Mode développement (http://localhost:3000)
npm run build            # Build production
npm run start            # Serveur production
npm run lint             # Linter (si config ESLint présente)
```

---

## 🗄️ Base de données

### Import SQL

```bash
mysql -u root -p
> CREATE DATABASE master_rsi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
> USE master_rsi;
> SOURCE database/master_rsi.sql;
> SELECT COUNT(*) FROM etudiants;  # Doit afficher 5
```

### Vérification

```bash
mysql -u root -p master_rsi -e "DESC etudiants; DESC images;"
```

---

## 📦 Dépendances principales

- **next** : Framework React
- **mysql2** : Connecteur MySQL
- **jose** : Tokens JWT
- **bcryptjs** : Hachage des mots de passe
- **chart.js** : Graphiques
- **leaflet** : Cartes géographiques
- **tailwindcss** : Styling CSS

---

## ⚠️ Points importants

### Sécurité
- ✅ Mots de passe hashés avec bcryptjs
- ✅ JWT signés et stockés en cookie httpOnly
- ✅ Validation côté serveur sur les routes API
- ✅ Pas de secrets en dur (utiliser `.env.local`)

### Performance
- ✅ Connexion MySQL poolée (10 connexions max)
- ✅ Mise en cache des pages statiques
- ✅ Compression CSS/JS en production

### Limitations
- ⚠️ Une seule base de données MySQL
- ⚠️ Pas de migrations (schéma fixe)
- ⚠️ Images stockées directement en base (limité pour très gros fichiers)

---

## 🐛 Dépannage

### "Cannot connect to database"
```bash
# Vérifier MySQL
systemctl status mysql

# Vérifier les credentials dans .env.local
cat .env.local | grep DB_
```

### "Missing JWT_SECRET"
```bash
# Ajouter dans .env.local
echo "JWT_SECRET=your_secret_here" >> .env.local
```

### Build échoue
```bash
# Nettoyer et reconstruire
rm -rf .next
npm run build
```

---

## 📖 Ressources

- [Next.js 16](https://nextjs.org)
- [MySQL 8.0](https://dev.mysql.com)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [jose](https://github.com/panva/jose)
- [Tailwind CSS](https://tailwindcss.com)

---

**Retrouvez le README principal pour les autres versions** : `../README.md`

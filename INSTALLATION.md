# 📖 Guide d'installation complet — Master RSI

Guide étape par étape pour déployer toutes les versions du projet Master RSI.

---

## 🎯 Choix de la version

### Version 1 — Next.js Full-Stack (⚡ Rapide)
```
✅ Un seul serveur
✅ Déploiement simple
✅ Parfait pour prototype
❌ Pas de séparation front/back
```
**Durée d'installation** : 5-10 minutes

---

### Version 2 — Laravel + Next.js (🚀 Production)
```
✅ Architecture découplée
✅ Équipes séparées
✅ Scalabilité
❌ 2 serveurs à gérer
```
**Durée d'installation** : 15-20 minutes

---

## 📋 Prérequis globaux

Tous deux versions nécessitent :

```bash
# Node.js 20+
node --version
npm --version

# MySQL 8.0+
mysql --version

# Version 2 uniquement : PHP 8.3+ et Composer
php --version
composer --version
```

### Installation rapide

#### macOS
```bash
brew install node mysql php composer
brew services start mysql
```

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install nodejs npm mysql-server php php-mysql composer
sudo systemctl start mysql
```

#### Windows
- [Node.js](https://nodejs.org)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- [PHP](https://windows.php.net/download/)
- [Composer](https://getcomposer.org/download/)

---

## 🗄️ Étape 1 : Préparer la base de données

### Créer la base de données

```bash
# Accéder à MySQL
mysql -u root -p

# Dans le shell MySQL :
CREATE DATABASE master_rsi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### Importer les données

```bash
# Depuis la racine du projet
mysql -u root -p master_rsi < database/master_rsi.sql

# Vérification
mysql -u root -p -e "USE master_rsi; SELECT COUNT(*) FROM etudiants;"
# Résultat attendu : 5
```

### Tester la connexion

```bash
mysql -u root -p -e "USE master_rsi; SELECT login, nom FROM etudiants;"
```

```
+--------+-------+
| login  | nom   |
+--------+-------+
| ahmed  | Ahmed |
| sara   | Sara  |
| anouar | Anouar|
| amine  | Amine |
| badr   | Badr  |
+--------+-------+
```

---

## ✨ Installation Version 1 : Next.js Full-Stack

### Étape 1 : Accéder au dossier

```bash
cd /chemin/vers/projet/version-nextjs
```

### Étape 2 : Installer les dépendances

```bash
npm install
```

Attendre la fin de l'installation (1-2 minutes).

### Étape 3 : Configurer l'environnement

```bash
cp .env.example .env.local
nano .env.local  # Ou éditeur préféré
```

Remplir avec vos credentials MySQL :

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=master_rsi
DB_USER=root
DB_PASS=votre_mot_de_passe_mysql
JWT_SECRET=votre_clé_secrète_très_longue_et_aléatoire_32_chars_minimum
NODE_ENV=development
```

### Étape 4 : Démarrer le serveur

```bash
npm run dev
```

```
▲ Next.js 16.0.0
- Local:        http://localhost:3000
```

### Étape 5 : Tester

1. Ouvrir **http://localhost:3000**
2. Se connecter avec `ahmed` / `ahmed123`
3. Explorez les 6 projets

✅ **Version 1 installée avec succès !**

---

## 🚀 Installation Version 2 : Laravel Backend + Next.js Frontend

### Architecture

```
Terminal 1                  Terminal 2
├─ Laravel Backend          ├─ Next.js Frontend
│  http://localhost:8000    │  http://localhost:3000
│  API                      │  Client
└─ Reçoit requêtes          └─ Envoie requêtes
```

---

## 📝 Installation Backend Laravel

### Étape 1 : Accéder au dossier

```bash
cd /chemin/vers/projet/version-laravel/laravel-backend
```

### Étape 2 : Installer les dépendances

```bash
composer install
```

Attendre la fin de l'installation (2-3 minutes).

### Étape 3 : Configurer l'environnement

```bash
cp .env.example .env
nano .env  # Ou éditeur préféré
```

Remplir la configuration :

```
APP_NAME=MasterRSI
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=master_rsi
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe_mysql
```

### Étape 4 : Générer la clé d'application

```bash
php artisan key:generate
```

```
Application key set successfully.
```

### Étape 5 : Initialiser la base de données

```bash
php artisan migrate --seed
```

```
Migrating: 2024_01_01_000000_create_etudiants_table
Migrated:  2024_01_01_000000_create_etudiants_table
...
Database seeded successfully.
```

### Étape 6 : Démarrer le serveur

```bash
php artisan serve
```

```
INFO  Server running on [http://127.0.0.1:8000].
```

**Ne pas fermer ce terminal.**

✅ **Backend lancé ! API disponible sur http://localhost:8000**

---

## 🎨 Installation Frontend Next.js

### Dans un nouveau terminal

### Étape 1 : Accéder au dossier

```bash
cd /chemin/vers/projet/version-laravel/nextjs-frontend
```

### Étape 2 : Installer les dépendances

```bash
npm install
```

### Étape 3 : Configurer l'environnement

```bash
cp .env.example .env.local
nano .env.local  # Ou éditeur préféré
```

Pointer vers l'API Laravel :

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NODE_ENV=development
```

### Étape 4 : Démarrer le serveur

```bash
npm run dev
```

```
▲ Next.js 16.0.0
- Local:        http://localhost:3000
```

### Étape 5 : Tester

1. Ouvrir **http://localhost:3000**
2. Se connecter avec `ahmed` / `ahmed123`
3. Les données viennent du backend Laravel
4. Explorer les 6 projets

✅ **Version 2 installée avec succès !**

---

## 🧪 Tests de validation

### Test 1 : Authentification

```bash
# Terminal 3 (Test Backend)
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"login":"ahmed","password":"ahmed123"}'

# Résultat attendu
{
  "success": true,
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "student": {
    "id": 1,
    "login": "ahmed",
    "nom": "Ahmed",
    "note1": null,
    "note2": null,
    "moyenne": 0
  }
}
```

### Test 2 : Lister les étudiants

```bash
# Remplacer TOKEN par le token reçu ci-dessus
curl -X GET http://localhost:8000/api/etudiants \
  -H "Authorization: Bearer TOKEN"

# Résultat : Liste de 5 étudiants
```

### Test 3 : Interface web

1. Ouvrir http://localhost:3000
2. Connexion → Dashboard → Projects
3. Tester chaque projet (matrices, images, quiz, etc.)

---

## 📊 Vérification finale

### Checklist

- [ ] Base de données `master_rsi` créée
- [ ] 5 étudiants de test présents
- [ ] Version 1 : `npm run dev` fonctionne
- [ ] Version 2 Backend : `php artisan serve` fonctionne
- [ ] Version 2 Frontend : `npm run dev` fonctionne
- [ ] Login avec `ahmed` / `ahmed123` réussit
- [ ] Menu des 6 projets visible
- [ ] Au moins 1 projet testé (ex: matrices)

Si tous les points sont cochés : ✅ **Projet prêt !**

---

## 🐛 Résolution de problèmes

### Erreur : "Cannot connect to database"

```bash
# Vérifier que MySQL est en cours d'exécution
systemctl status mysql  # Linux
brew services list      # macOS

# Vérifier les credentials
cat .env | grep DB_

# Tester la connexion
mysql -u root -p -e "SELECT 1"
```

### Erreur : "Port 3000 already in use"

```bash
# Utiliser un autre port
npm run dev -- -p 3001

# Ou tuer le processus
lsof -i :3000
kill -9 <PID>
```

### Erreur : "Port 8000 already in use"

```bash
# Utiliser un autre port
php artisan serve --port=8001
```

### Erreur : "Missing JWT_SECRET" (Version 1)

```bash
# Ajouter dans .env.local
echo "JWT_SECRET=$(openssl rand -base64 32)" >> .env.local
```

### Erreur : "SQLSTATE[HY000]: General error" (Version 2)

```bash
# Nettoyer le cache Laravel
php artisan config:clear
php artisan cache:clear

# Régénérer la clé
php artisan key:generate

# Réinitialiser la DB
php artisan migrate:fresh --seed
```

---

## 🔐 Comptes de test

Tous les mots de passe sont identiques à la fin du login :

| Login | Mot de passe | Exemple |
|-------|------------|---------|
| ahmed | ahmed123 | a + hmed123 |
| sara | sara123 | s + ara123 |
| anouar | anouar123 | a + nouar123 |
| amine | amine123 | a + mine123 |
| badr | badr123 | b + adr123 |

---

## 📁 Structure finale

```
/projet
├── database/
│   └── master_rsi.sql
├── version-nextjs/                   # Version 1
│   ├── .env.local                    # À créer
│   ├── node_modules/
│   └── ...
├── version-laravel/
│   ├── laravel-backend/              # Version 2 Backend
│   │   ├── .env                      # À créer
│   │   ├── vendor/
│   │   └── ...
│   └── nextjs-frontend/              # Version 2 Frontend
│       ├── .env.local                # À créer
│       ├── node_modules/
│       └── ...
└── README.md
```

---

## 🚀 Déploiement en production

### Vercel (Next.js)

```bash
# Version 1
cd version-nextjs
npm install -g vercel
vercel

# Version 2 Frontend
cd version-laravel/nextjs-frontend
vercel --env NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Heroku (Laravel)

```bash
# Version 2 Backend
cd version-laravel/laravel-backend
heroku login
heroku create your-app-name
git push heroku main
```

### VPS (Generic)

```bash
# Cloner le repo
git clone <repo> /var/www/master-rsi
cd /var/www/master-rsi/version-nextjs

# Version 1
npm install
npm run build
NODE_ENV=production node server.js

# Version 2
cd version-laravel/laravel-backend
composer install --optimize-autoloader
php artisan migrate --force
php-fpm &
nginx -g 'daemon off;'
```

---

## 📞 Support

- Consultez les README individuels : `version-nextjs/README.md`, `version-laravel/laravel-backend/README.md`
- Reportez les bugs : https://github.com/anomalyco/opencode
- Documentation Next.js : https://nextjs.org
- Documentation Laravel : https://laravel.com

---

**Bon développement ! 🎉**

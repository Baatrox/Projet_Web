# Laravel Backend API — Master RSI

**Version 2 Backend** : API REST Laravel 11 + Sanctum tokens.

Cette version est destinée à :
- ✅ Production (déploiement cloud)
- ✅ Équipes front/back séparées
- ✅ API réutilisable
- ✅ Architectures microservices

---

## 🚀 Démarrage rapide

### 1. Installation des dépendances

```bash
composer install
```

### 2. Configuration

```bash
cp .env.example .env
```

Éditer `.env` avec vos paramètres :

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
DB_PASSWORD=your_password
```

### 3. Générer la clé d'application

```bash
php artisan key:generate
```

### 4. Initialiser la base de données

```bash
php artisan migrate --seed
```

**Données de test créées automatiquement** (5 étudiants).

### 5. Démarrer le serveur

```bash
php artisan serve
```

API disponible sur : **http://localhost:8000**

---

## 📚 Structure du projet

```
laravel-backend/
├── app/
│   ├── Http/Controllers/         # Contrôleurs API
│   │   ├── AuthController.php       # Login/Logout
│   │   ├── EtudiantController.php   # CRUD étudiants
│   │   ├── ImageController.php      # Images
│   │   ├── FichierController.php    # Fichiers
│   │   └── QuizController.php       # Scores quiz
│   ├── Models/
│   │   ├── Etudiant.php            # Modèle étudiant
│   │   └── Image.php               # Modèle image
│   └── ...
├── routes/
│   ├── api.php                   # Routes API (v1)
│   └── web.php                   # (non utilisé)
├── database/
│   ├── migrations/               # Schéma DB
│   └── seeders/                  # Données de test
├── storage/
│   └── app/                      # Fichiers (master_rsi2020.txt)
├── .env.example                  # Template
├── .env                          # Credentials (à ignorer)
└── composer.json
```

---

## 🔐 Authentification (Sanctum)

### Comptes de test

| Login | Mot de passe | ID |
|-------|------------|-----|
| ahmed | ahmed123 | 1 |
| sara | sara123 | 2 |
| anouar | anouar123 | 3 |
| amine | amine123 | 4 |
| badr | badr123 | 5 |

### Mécanisme

1. **Login** : POST `/api/login` → reçoit un token Sanctum
2. **Token** : Bearer token dans header `Authorization: Bearer <token>`
3. **Middleware** : `auth:sanctum` protège les routes
4. **Logout** : DELETE token + revocation

---

## 🔌 Endpoints API

### Authentification (Public)

```
POST /api/login
Body: { login: string, password: string }
Response: { success: true, token: string, student: {...} }
```

### Authentification (Protégé)

```
POST /api/logout
Response: { success: true }
```

### Étudiants (Protégé)

```
GET /api/etudiants
Response: [{ id, nom, note1, note2, moyenne, longitude, latitude }, ...]

GET /api/etudiants/me
Response: { id, login, nom, note1, note2, moyenne, longitude, latitude }

PUT /api/etudiants/{id}
Body: { note1?: int, note2?: int, longitude?: float, latitude?: float }
Response: { success: true, student: {...} }
```

### Images (Protégé)

```
GET /api/images
Response: [{ id, name, type, mimeType, size, dataUrl }, ...]

POST /api/images
Body: FormData { image: File, name?: string }
Response: { success: true, id: int }

DELETE /api/images/{id}
Response: { success: true }
```

### Fichiers (Protégé)

```
GET /api/fichiers
Response: [{ index, cne, nom, prenom, note1, note2, note3 }, ...]

POST /api/fichiers
Body: { cne: string, nom: string, prenom: string, note1: int, note2: int, note3: int }
Response: { success: true }

PUT /api/fichiers
Body: { index: int, cne: string, nom: string, prenom: string, note1: int, note2: int, note3: int }
Response: { success: true }
```

### Quiz (Protégé)

```
POST /api/quiz/submit
Body: { quiz: 1|2, score: int (0-20) }
Response: { success: true, score: int }
```

---

## 🛠️ Commandes Laravel

```bash
php artisan serve               # Serveur dev
php artisan migrate             # Créer tables
php artisan migrate --seed      # + données test
php artisan migrate:fresh --seed # Réinitialiser DB
php artisan route:list          # Afficher routes
php artisan tinker              # REPL interactif
php artisan config:cache        # Cache config
php artisan cache:clear         # Vider cache
```

---

## 🗄️ Base de données

### Tables

**etudiants**
- id, login, pass (bcrypt), nom
- note1, note2, moyenne
- longitude, latitude

**images**
- id, name, type, size
- bin_img (LONGBLOB)

### Seeders

```bash
# Créer 5 étudiants de test
php artisan migrate --seed

# Ou réinitialiser
php artisan migrate:fresh --seed
```

---

## 📦 Dépendances principales

```json
{
  "laravel/framework": "^11.0",
  "laravel/sanctum": "^4.0",
  "laravel/tinker": "^3.0"
}
```

---

## 🔒 Sécurité

### Mots de passe
- ✅ Hashés avec bcrypt (10 rounds)
- ✅ Jamais envoyés en réponse JSON

### Tokens
- ✅ Sanctum + CSRF protection
- ✅ Révocation au logout
- ✅ Pas d'expiration (mais révocable)

### Validation
- ✅ Validation des notes (0-20)
- ✅ Validation GPS (latitude, longitude)
- ✅ Validation des types d'image
- ✅ Authentification stricte (utilisateur ne peut modifier ses données)

### CORS
- ✅ Configuré pour `http://localhost:3000`
- À adapter en production

---

## ⚠️ Points importants

### Production
- Mettre `APP_DEBUG=false`
- Générer des clés fortes
- Configurer HTTPS
- Adapter CORS aux domaines autorisés

### CORS (config/cors.php)
```php
'allowed_origins' => ['localhost', 'yourdomain.com'],
'allowed_paths' => ['api/*'],
```

### Performance
- Utiliser `php artisan config:cache`
- Activer l'optimisation : `php artisan optimize`

---

## 🐛 Dépannage

### "SQLSTATE[HY000]: General error"
```bash
# Régénérer la clé
php artisan key:generate

# Migrer de nouveau
php artisan migrate:fresh --seed
```

### "Class not found"
```bash
# Recharger autoloader
composer dump-autoload
```

### "Port 8000 already in use"
```bash
# Utiliser un autre port
php artisan serve --port=8001
```

---

## 📖 Ressources

- [Laravel 11](https://laravel.com)
- [Sanctum](https://laravel.com/docs/sanctum)
- [API Resources](https://laravel.com/docs/eloquent-resources)
- [Validation](https://laravel.com/docs/validation)

---

**Frontend associé** : `../nextjs-frontend/`
**README principal** : `../../README.md`

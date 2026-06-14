# Laravel Backend API — Master RSI

REST API with Laravel 11 and Sanctum authentication.

## Quick Start

### 1. Install dependencies

```bash
composer install
```

### 2. Setup environment

```bash
cp .env.example .env
php artisan key:generate
```

Edit `.env` with your MySQL credentials:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=master_rsi
DB_USERNAME=root
DB_PASSWORD=PROGEEK2m!
```

### 3. Setup database

```bash
php artisan migrate:fresh --seed
```

### 4. Run development server

```bash
php artisan serve
```

API available at [http://localhost:8000](http://localhost:8000)

## Test Accounts

| Login | Password |
|-------|----------|
| ahmed | ahmed123 |
| sara | sara123 |
| anouar | anouar123 |
| amine | amine123 |
| badr | badr123 |

## API Endpoints

### Authentication
- `POST /api/login` — Login (returns token)
- `POST /api/logout` — Logout (requires auth)

### Students (protected)
- `GET /api/etudiants` — List all students
- `GET /api/etudiants/me` — Current student
- `PUT /api/etudiants/{id}` — Update student

### Images (protected)
- `GET /api/images` — List all images
- `POST /api/images` — Upload image
- `DELETE /api/images/{id}` — Delete image

### Files (protected)
- `GET /api/fichiers` — Read file
- `POST /api/fichiers` — Add entry
- `PUT /api/fichiers` — Update entry

### Quiz (protected)
- `POST /api/quiz/submit` — Submit quiz answers

## Useful Commands

```bash
php artisan serve              # Run dev server
php artisan migrate:fresh --seed  # Reset database
php artisan route:list         # Show routes
php artisan tinker             # PHP REPL
```

## Troubleshooting

**"SQLSTATE[HY000]: General error"**
```bash
php artisan config:clear
php artisan migrate:fresh --seed
```

**"Port 8000 already in use"**
```bash
php artisan serve --port=8001
```

# Master RSI — Next.js Frontend

Frontend client for Laravel backend API.

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Setup environment

```bash
cp .env.example .env.local
```

Verify backend URL in `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Test Accounts

| Login | Password |
|-------|----------|
| ahmed | ahmed123 |
| sara | sara123 |
| anouar | anouar123 |
| amine | amine123 |
| badr | badr123 |

## Prerequisites

- Laravel backend running on `http://localhost:8000`
- Database `master_rsi` with test data

## Features

- Login with backend API
- Student profile with photo
- Matrices manipulation
- File management (CSV)
- Image upload & gallery
- Quiz 1 & 2
- Statistics (Chart.js)
- Geolocation (Leaflet)

## Build & Deploy

```bash
npm run build
npm run start
```

## Troubleshooting

**"Cannot reach API"**
- Check backend is running: `php artisan serve`
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`

**"401 Unauthorized"**
- Token expired → logout and login again
- Check `localStorage` for `authToken`

**Port 3000 already in use**
```bash
npm run dev -- -p 3001
```

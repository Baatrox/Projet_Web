# Master RSI — Next.js Full-Stack

Simple application with Node.js + Next.js 16 and MySQL.

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Setup environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your MySQL credentials:

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=master_rsi
JWT_SECRET=your-secret-key-here
```

### 3. Setup database

```bash
mysql -u root -p < ../database/master_rsi.sql
```

### 4. Run development server

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

## Features

- Matrices manipulation (JS)
- File management (CSV)
- Image upload & gallery (database)
- Quiz 1 (JavaScript) - 10 questions
- Quiz 2 (HTML/CSS) - 10 questions
- Statistics (Chart.js)
- Geolocation (Leaflet)

## Build & Deploy

```bash
npm run build
npm run start
```

## Troubleshooting

**"Cannot connect to database"**
- Check MySQL is running: `systemctl status mysql`
- Verify `.env.local` credentials
- Ensure `master_rsi` database exists

**"DB_PASS can be empty"**
- If using XAMPP, MySQL password can be empty
- Use empty string: `DB_PASS=`

**"Port 3000 already in use"**
```bash
npm run dev -- -p 3001
```

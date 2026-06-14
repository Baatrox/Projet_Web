# Next.js Frontend — Master RSI

**Version 2 Frontend** : Client Next.js 16 consommant l'API Laravel.

Cette version est destinée à :
- ✅ Production (déploiement séparé du backend)
- ✅ Développement frontend indépendant
- ✅ Équipes distribuées
- ✅ Scalabilité

---

## 🚀 Démarrage rapide

### Prérequis

Le backend Laravel doit être en cours d'exécution sur `http://localhost:8000`

### 1. Installation

```bash
npm install
```

### 2. Configuration

```bash
cp .env.example .env.local
```

Éditer `.env.local` :

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NODE_ENV=development
```

### 3. Démarrer le frontend

```bash
npm run dev
```

Accès : **http://localhost:3000**

---

## 📚 Structure du projet

```
nextjs-frontend/
├── app/                            # Pages et API routes (App Router)
│   ├── api/                        # Proxy API (optionnel)
│   ├── dashboard/                  # Pages protégées
│   │   ├── about/                  # Profil étudiant
│   │   ├── projects/               # 6 projets
│   │   │   ├── matrices/
│   │   │   ├── fichiers/
│   │   │   ├── images/
│   │   │   ├── quiz/
│   │   │   ├── stats/
│   │   │   └── geo/
│   │   └── ...
│   ├── page.jsx                    # Login
│   └── layout.jsx                  # Layout
├── lib/
│   └── api.js                      # Wrapper API + gestion tokens
├── components/                     # Composants réutilisables
├── public/                         # Actifs statiques
├── .env.example                    # Template
├── .env.local                      # Credentials (non committé)
└── package.json
```

---

## 🔐 Authentification

### Connexion avec le Backend

1. **Récupération du token** : POST `/api/login` → token Sanctum
2. **Stockage** : localStorage (`authToken`)
3. **Requêtes** : Header `Authorization: Bearer <token>`
4. **Logout** : Suppression du token + invalidation côté serveur

### Comptes de test

| Login | Mot de passe |
|-------|------------|
| ahmed | ahmed123 |
| sara | sara123 |
| anouar | anouar123 |
| amine | amine123 |
| badr | badr123 |

---

## 🔌 Communication avec le Backend

### Wrapper API (`lib/api.js`)

```javascript
// Automatiquement gère :
// - Token Bearer dans Authorization header
// - Rejet des réponses 401 (token expiré)
// - Conversion JSON

const response = await apiRequest('/etudiants/me');
const data = await response.json();
```

### Exemple d'utilisation

```javascript
// GET
const response = await apiRequest('/etudiants');
const students = await response.json();

// POST
const response = await apiRequest('/images', {
  method: 'POST',
  body: formData  // multipart/form-data
});

// PUT
const response = await apiRequest(`/etudiants/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ note1: 15 })
});

// DELETE
await apiRequest(`/images/${id}`, { method: 'DELETE' });
```

---

## 🌟 Fonctionnalités

### Pages disponibles

- `/` : **Login**
- `/dashboard` : **Accueil** avec menu
- `/dashboard/about` : **CV** + photo + stats
- `/dashboard/projects` : **Hub** des 6 projets
  - **matrices** : Multiplication/addition matrices
  - **fichiers** : Gestion du fichier CSV
  - **images** : Galerie + upload
  - **quiz/quiz1** : Quiz HTML/CSS
  - **quiz/quiz2** : Quiz JavaScript
  - **stats** : Graphiques (Chart.js)
  - **geo** : Carte Leaflet

### Affichage des images

Les images sont reçues du backend au format **Base64 dataUrl** :

```javascript
// Réponse API
{
  id: 1,
  name: "photo.jpg",
  mimeType: "image/jpeg",
  dataUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}

// Utilisation en HTML
<img src={image.dataUrl} alt={image.name} />
```

---

## 🛠️ Commandes

```bash
npm run dev              # Développement (http://localhost:3000)
npm run build            # Build production
npm run start            # Serveur production
npm run lint             # Linter
```

---

## 📦 Dépendances principales

```json
{
  "next": "^16.0",
  "react": "^19.0",
  "chart.js": "^4.x",
  "leaflet": "^1.x",
  "tailwindcss": "^3.x"
}
```

---

## 🔒 Sécurité

### Tokens
- ✅ Stockés en localStorage
- ⚠️ Considérés comme XSS-vulnerable
- 💡 Alternative : httpOnly cookies (côté backend)

### Requêtes API
- ✅ Validation des réponses
- ✅ Gestion des erreurs 401/403
- ✅ HTTPS recommandé en production

### Environnement
- ✅ `NEXT_PUBLIC_*` peut être exposé au client
- ✅ `DB_*` ne devrait JAMAIS être en .env.local frontend

---

## ⚠️ Configuration pour Production

### CORS Backend

Mettre à jour `config/cors.php` (Laravel) :

```php
'allowed_origins' => ['yourdomain.com', 'app.yourdomain.com'],
'allowed_paths' => ['api/*'],
```

### Variables d'environnement

```bash
# .env.production.local
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NODE_ENV=production
```

### Build

```bash
npm run build
npm run start
```

---

## 🐛 Dépannage

### "Cannot reach API"
```bash
# Vérifier que le backend est en cours d'exécution
curl -i http://localhost:8000/api

# Vérifier NEXT_PUBLIC_API_URL
echo $NEXT_PUBLIC_API_URL
```

### "401 Unauthorized"
```bash
# Token expiré ou invalide → logout + re-login
# Vérifier localStorage
localStorage.getItem('authToken')
```

### Erreur CORS
```bash
# Backend Laravel : config/cors.php
# Ajouter le domaine du frontend
'allowed_origins' => ['http://localhost:3000']
```

### Images ne s'affichent pas
```bash
# Vérifier que dataUrl commence par "data:image/"
console.log(image.dataUrl.substring(0, 30))
```

---

## 📖 Ressources

- [Next.js 16](https://nextjs.org)
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Chart.js](https://www.chartjs.org)
- [Leaflet](https://leafletjs.com)

---

## 🔗 Configuration CORS complète

### Backend Laravel (config/cors.php)

```php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    
    'allowed_methods' => ['*'],
    
    'allowed_origins' => [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://yourdomain.com',
    ],
    
    'allowed_origins_patterns' => [],
    
    'allowed_headers' => ['*'],
    
    'exposed_headers' => [],
    
    'max_age' => 0,
    
    'supports_credentials' => true,
];
```

### Frontend Next.js (.env.local)

```
# Développement
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Production
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

**Backend associé** : `../laravel-backend/`
**README principal** : `../../README.md`

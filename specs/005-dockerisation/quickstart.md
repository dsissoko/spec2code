# Quickstart — Docker fullstack & WCS embarqué

## Pré-requis
- Node.js 20 si exécution hors Docker.
- Docker + docker-compose.
- Fichier `.env` à la racine contenant `DATABASE_URL` (externe ou `postgres://user:pass@postgres:5432/db` pour le profil `localdb`).

## Lancer le stack docker-compose
1) Sans base locale (DB externe) :  
   ```bash
   docker compose up backend frontend
   ```  
   - Ports : backend 3001 (health `/api/health`), frontend 3000.  
   - Pas de migrations/seeders automatiques.

2) Avec base locale + pgAdmin :  
   ```bash
   docker compose --profile localdb up backend frontend postgres pgadmin
   ```  
   - Postgres 17 (volume persistant), pgAdmin sur 8080.  
   - `docker compose down` conserve les volumes ; ajouter `-v` pour purger.

## Construire et lancer les images
- Backend :  
  ```bash
  docker build -t afa-backend -f backend/Dockerfile backend
  docker run --env-file .env -p 3001:3001 afa-backend
  ```
- Frontend (build args pour le backend cible et le niveau de log) :  
  ```bash
  docker build -t afa-frontend -f frontend/Dockerfile frontend \
    --build-arg VITE_API_BASE_URL=http://backend:3001 \
    --build-arg VITE_LOG_LEVEL=info
  docker run -p 3000:3000 afa-frontend
  ```

## WCS statique côté front
- Assets `wcs.css` / `wcs.esm.js` copiés dans `frontend/public/wcs` et chargés dans `frontend/index.html`.  
- `VITE_API_BASE_URL` par défaut pointe sur le service backend du compose.  
- Typages JSX déclarés dans `frontend/src/types/*`, `tsconfig.app.json`, `src/vite-env.d.ts`.

## Logger backend
- En dev : tente `pino-pretty`; si absent, fallback JSON + avertissement, `reqId`/serializers inchangés.  
- En prod : logs JSON uniquement.  
- Healthcheck `/api/health` utilisé par compose et l’image backend.

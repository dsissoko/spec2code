# Backend AFA (Automatisation des Flux Applicatifs)

Ce dossier contiendra l’API REST (Node.js/Express) qui pilote la saisie des demandes de flux, le calcul des objets MQ et la génération des données techniques. L’objectif est de fournir des endpoints clairs, sécurisés et traçables pour le frontend.

## Ce qui est prévu
- Stack : Node.js + Express, validation d’entrée, logging.
- Accès PostgreSQL via Sequelize (ORM) pour mapper nos entités métiers (flux, files MQ, topics, abonnements, users/canaux, demandes).
- Migrations versionnées et seeders (déjà présents dans `database/`).
- Config 12-factor : tout passe par les variables d’environnement, aucune cred en dur.

## Démarrage local (dev)
1. Installer les dépendances (depuis `backend/`) :
   ```bash
   npm install
   ```
2. Créer un fichier `backend/.env` (non committé), par exemple :
   ```bash
   # Connexion PostgreSQL (exemple fourni)
   DATABASE_URL=postgres://postgres:changeme@localhost:5433/AFA_DB
   # Port HTTP de l’API
   PORT=3001
   # Logs
   LOG_LEVEL=info
   NODE_ENV=development
   # Nom d'environnement fonctionnel (affiché dans / et /api/info)
   APP_ENV=dev
   # CORS front dev
   CORS_ORIGIN=http://localhost:3000
   ```
   - `DATABASE_URL` est lu par Sequelize (format standard PostgreSQL).
   - `PORT` sera utilisé par Express (par défaut 3001 si non défini).
3. Appliquer les migrations et seeders (depuis `backend/`, avec `DATABASE_URL` dans l’environnement ou le `.env`) :
   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all   # optionnel, pour charger les environnements DEV/INT/QUAL/REC/PREPROD/PROD
   npx sequelize-cli db:migrate:status   # pour vérifier l’état des migrations
   ```
4. Lancer l’API :
   ```bash
   npm start
   ```
   L’API écoute sur `http://localhost:3001` (sauf si `PORT` est surchargé).

## Démarrage via Docker Compose (frontend + backend)
1. À la racine du dépôt, créer `.env` depuis l’exemple :
   ```bash
   cp .env.example .env
   # Remplacer DATABASE_URL par l'URL PostgreSQL 17 externe (PaaS/instance existante).
   # Les variables POSTGRES_* ne servent qu'au service postgres local du docker compose.
   ```
2. Lancer les conteneurs :
   ```bash
   docker compose up --build                      # DB externe via DATABASE_URL
   docker compose --profile localdb up --build    # ajoute Postgres local (17-alpine)
   ```
   - Backend : http://localhost:3001 (healthcheck : `/api/health`).
   - Frontend : http://localhost:3000 (proxy direct vers l’API en local).
   - Service `postgres` (17-alpine) fourni pour du dev local uniquement, jamais en env réels.
   - Avec le profil `localdb`, définir `DATABASE_URL=postgres://postgres:postgres@postgres:5432/afa_db` dans `.env`.
   - Pour viser une base qui tourne sur votre machine hors compose, utilisez `host.docker.internal` comme host (mappé dans le compose).
   - pgAdmin (profil `localdb`) : http://localhost:8080 avec `PGADMIN_DEFAULT_EMAIL` / `PGADMIN_DEFAULT_PASSWORD` (à mettre dans `.env`).
3. Migrations/seeders (manuels) depuis les conteneurs :
   ```bash
   docker compose run --rm backend npx sequelize-cli db:migrate
   docker compose run --rm backend npx sequelize-cli db:seed:all   # optionnel
   docker compose run --rm backend npx sequelize-cli db:migrate:status
   ```
4. Arrêt :
   ```bash
   docker compose down            # conserve les données postgres locales
   docker compose down -v         # supprime le volume postgres local
   ```

## Base de données (PostgreSQL)
Le backend se connecte à PostgreSQL en lisant `DATABASE_URL`. Le schéma est géré par des migrations et seeders situés dans `database/`.

- Migrations/seeders : voir [`database/README.md`](../database/README.md) pour la procédure détaillée et le descriptif du schéma.
- Artefacts existants : `database/migrations/20250326123000-create-afa-core.js` (socle) et `database/seeders/20250326123500-init-environnements.js` (DEV/INT/QUAL/REC/PREPROD/PROD). Ne pas recréer ces fichiers.
- Ce backend lit uniquement `DATABASE_URL` pour se connecter (format PostgreSQL).

### Comment le backend sait se connecter
- Le fichier `backend/src/config/config.js` (Sequelize) doit lire `process.env.DATABASE_URL` pour les environnements `development` et `production`.
- Si le `.env` contient `DATABASE_URL`, `sequelize-cli` et l’API l’utiliseront automatiquement.
- Pas d’autres fichiers secrets : pas de credentials en dur, pas de `.env` committé.

## Configuration (prod vs hors prod)
- **Hors prod (dev/int)** :
  ```bash
  # backend/.env
  DATABASE_URL=postgres://postgres:changeme@localhost:5433/AFA_DB
  PORT=3001
  LOG_LEVEL=info
  NODE_ENV=development
  APP_ENV=dev
  CORS_ORIGIN=http://localhost:3000
  ```
  Pretty logs auto (pino-pretty) si `NODE_ENV` ≠ production.
- **Prod** : variables injectées par l’environnement (pas de fichier) :
  ```bash
  export DATABASE_URL=postgres://user:pass@host:5432/db
  export PORT=3001
  export LOG_LEVEL=info   # info ou warn en prod
  export NODE_ENV=production
  export APP_ENV=prod      # staging/preprod/prod
  export CORS_ORIGIN=https://front.domaine.tld
  ```
  Logs en JSON compact sur stdout/stderr pour la collecte.

`.env.example.bak` fournit un exemple minimal : duplique-le en `.env` pour ton poste, ne le commit pas.

## Ops
- **Santé** : `curl http://localhost:3001/api/health` (répond OK si API up et DB accessible).
- **Logs** : un log par requête (méthode, URL, statut, durée, reqId). Niveaux via `LOG_LEVEL`. Pretty en dev, JSON en prod.
- **Absence de pino-pretty en dev** : si le module n’est pas installé, les logs restent en JSON et un avertissement unique est émis au démarrage (reqId/serializers inchangés).
- **Migrations** : jamais auto au start. Utiliser `npx sequelize-cli db:migrate` avant de lancer l’API sur une base fraîche ou après pull.
- **Seeders** : `npx sequelize-cli db:seed:all` pour charger les environnements MQ de référence.
- **Containers** : passer les variables via l’environnement. Healthcheck Docker sur `/api/health`. Logs collectés via stdout/stderr.

### RunBooks (copier-coller)
- **Démarrer en dev** :
  ```bash
  cd backend
  npm install
  cp .env.example.bak .env   # adapter DATABASE_URL, LOG_LEVEL, etc.
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all
  npm start
  ```
- **Vérifier la santé** :
  ```bash
  curl -i http://localhost:3001/api/health
  ```
- **Appliquer migrations** :
  ```bash
  cd backend
  npx sequelize-cli db:migrate
  npx sequelize-cli db:migrate:status
  ```
- **Changer le niveau de log (ex: debug provisoire)** :
  ```bash
  LOG_LEVEL=debug npm start
  ```
- **CORS front local custom** :
  ```bash
  CORS_ORIGIN=http://localhost:4173 npm start
  ```

## Bonnes pratiques
- Toujours lancer les migrations avant de démarrer l’API sur une nouvelle base ou après un pull contenant de nouvelles migrations.
- Ne jamais committer le `.env` ni des credentials.
- Utiliser des validateurs d’entrée (ex. express-validator/zod) pour sécuriser les payloads.
- Logger les erreurs côté serveur, retourner des erreurs JSON standardisées côté client.

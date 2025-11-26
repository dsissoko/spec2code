# Feature Specification: Docker fullstack & WCS embarqué

**Feature Branch**: `005-dockerisation`  
**Created**: 2025-11-26  
**Status**: Draft  
**Input**: Prompt « Docker fullstack & WCS embarqué » couvrant docker-compose (backend/front + profil localdb Postgres/pgAdmin), images Docker, intégration statique WCS côté front, et robustesse du logger backend sans pino-pretty.

## Garde-fous Constitution AFA (ne pas supprimer)

- Langue : français, identifiants en anglais acceptés.
- Stack : backend Node.js/Express + Sequelize/PostgreSQL ; frontend React + TypeScript + Vite ; composants WCS.
- Conventions : respecter `specs/spec-convention.md` et `specs/technical-conventions.md` (stories indépendantes, critères Given/When/Then, tests identifiables).
- Ops : pas d’auto-migrations/seeders au démarrage ; healthcheck backend sur `/api/health`.
- Sécurité : `.env` à la racine, secrets non commit ; volumes Docker préservés sauf `docker compose down -v`.

## User Stories & Tests

### US1 – Lancer le stack docker-compose (Priority: P1)
Un dev veut lancer le front et le back via docker-compose, avec ou sans base locale, afin de tester l’application sans installer Node/PG en local.

**Acceptance Scenarios**
1. **Given** un fichier `.env` à la racine contenant `DATABASE_URL` pointant vers une base externe, **When** je lance `docker compose up backend frontend`, **Then** les services exposent respectivement les ports 3001 et 3000, le healthcheck `/api/health` du backend passe, et aucune migration/seed n’est exécutée automatiquement.
2. **Given** je souhaite une base locale, **When** je lance `docker compose --profile localdb up backend frontend postgres pgadmin`, **Then** Postgres 17 démarre avec un volume persistant, pgAdmin répond sur 8080, le backend utilise la `DATABASE_URL` locale fournie dans `.env`, et un `docker compose down` sans `-v` conserve les données.
3. **Given** je consulte la documentation, **When** je lis `README.md` et `backend/README.md`, **Then** les instructions docker-compose (profils, ports, variables) et les rappels sur les migrations/seeders manuelles (`npx sequelize-cli db:migrate` / `db:seed:all`) sont clairement décrits.

### US2 – Construire et lancer les images front/back (Priority: P1)
Un intégrateur veut construire les images Docker pour le backend et le frontend et les exécuter de façon autonome, en conservant les bonnes configs build/run.

**Acceptance Scenarios**
1. **Given** le répertoire `backend/`, **When** je lance `docker build -t afa-backend -f backend/Dockerfile backend`, **Then** l’image Node 20 alpine est construite via `npm ci`, copie le fichier `.sequelizerc` depuis `src/public`, expose le healthcheck `/api/health`, et n’exécute ni migrations ni seeders au start.
2. **Given** le répertoire `frontend/`, **When** je lance `docker build -t afa-frontend -f frontend/Dockerfile frontend --build-arg VITE_API_BASE_URL=http://backend:3001 --build-arg VITE_LOG_LEVEL=info`, **Then** le multi-stage Vite produit un artefact statique servi par le runner (serve), les `.dockerignore` racine et `frontend/.dockerignore` excluent node_modules/build caches, et l’image démarre sur le port 3000.
3. **Given** les images construites, **When** je les lance avec `docker run` ou via `docker compose` sans profil localdb, **Then** le front cible par défaut le service backend du compose (`VITE_API_BASE_URL` par défaut) et le healthcheck du backend reste opérationnel.

### US3 – Auto-chargement WCS statique & types JSX (Priority: P2)
Un développeur front veut disposer des assets WCS embarqués et taper les composants Web dans React/TS, sans devoir appeler `defineCustomElements` de `wcs-react`.

**Acceptance Scenarios**
1. **Given** le dépôt, **When** j’ouvre `frontend/public/wcs`, **Then** j’y trouve les assets `wcs.css` et `wcs.esm.js` copiés depuis wcs-core et référencés dans `frontend/index.html` pour le dev et le build.
2. **Given** l’app tourne en dev ou buildée, **When** j’inspecte le rendu, **Then** les composants WCS sont disponibles sans appel `defineCustomElements` de `@wcs/wcs-react`, et aucune erreur de chargement des scripts/styles statiques n’apparaît.
3. **Given** je code en TypeScript/JSX, **When** j’importe un `<wcs-button>`, `<wcs-breadcrumb>`, `<wcs-divider>` ou le loader, **Then** les types JSX sont résolus via `frontend/src/types/*`, `tsconfig.app.json` et `src/vite-env.d.ts` mis à jour.

### US4 – Logger backend robuste sans pino-pretty (Priority: P2)
Un exploitant veut que les logs backend restent exploitables en dev même si `pino-pretty` n’est pas installé, tout en gardant les reqId et serializers existants.

**Acceptance Scenarios**
1. **Given** un environnement de dev où `pino-pretty` est installé, **When** je démarre l’API et appelle `/api/health`, **Then** le logger utilise pino-pretty avec `reqId` et les serializers actuels.
2. **Given** un environnement de dev sans `pino-pretty` dans `node_modules`, **When** je démarre l’API et appelle `/api/health`, **Then** le logger bascule automatiquement en JSON, journalise un avertissement unique sur l’absence de pino-pretty, et conserve les mêmes `reqId`/serializers.
3. **Given** le logger en prod (`NODE_ENV=production`), **When** je consulte les logs, **Then** ils restent en JSON sans tentative de pretty-print et sans perte de champs.

## Requirements

### Functional Requirements
- **FR-001** : Fournir un `docker-compose` avec services `backend` (3001) et `frontend` (3000) et un profil optionnel `localdb` ajoutant Postgres 17 + pgAdmin 8080, avec healthcheck backend sur `/api/health`, `.env` racine pour `DATABASE_URL`, et volumes persistants sauf `down -v`.
- **FR-002** : Documenter dans `README.md` et `backend/README.md` les commandes `docker compose` (avec/sans profil localdb), les variables attendues, et le caractère manuel des migrations/seeders (jamais au démarrage).
- **FR-003** : Définir `backend/Dockerfile` (Node 20 alpine) utilisant `npm ci`, copiant `.sequelizerc` depuis `src/public`, incluant un healthcheck, et `frontend/Dockerfile` multi-stage (build Vite avec args `VITE_API_BASE_URL` / `VITE_LOG_LEVEL`, runner `serve`), plus `.dockerignore` racine et `frontend/.dockerignore`.
- **FR-004** : Intégrer les assets WCS (`wcs.css`, `wcs.esm.js`) dans `frontend/public/wcs`, les charger via `frontend/index.html`, supprimer l’appel `defineCustomElements` de `@wcs/wcs-react`, et garantir le fonctionnement en dev/build avec `VITE_API_BASE_URL` par défaut pointant sur le service backend compose.
- **FR-005** : Déclarer les types JSX/TS pour `wcs-button`, `wcs-breadcrumb`, `wcs-divider` et le loader dans `frontend/src/types/*`, `tsconfig.app.json`, `src/vite-env.d.ts`.
- **FR-006** : Ajuster `backend/src/api/logger.js` pour utiliser `pino-pretty` seulement si présent en dev, sinon émettre des logs JSON et un avertissement, sans modifier la gestion de `reqId` ni les serializers.

### Out of Scope
- Aucun nouvel endpoint backend ni nouvel écran frontend.
- Pas de modification du modèle de données ni de nouvelles migrations/seeders.

# Tasks: Docker fullstack & WCS embarqué

**Input**: Design documents from `/specs/005-dockerisation/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Pas de tâches de test ajoutées par défaut ; ajouter uniquement si demandé explicitement.

**Constitution Guardrails**: tâches en français, stack Node.js/Express + Sequelize/PostgreSQL, frontend React + TypeScript + Vite + WCS, conventions `specs/spec-convention.md` / `specs/technical-conventions.md`, user stories indépendantes.

**Organization**: Tâches groupées par user story pour garantir une implémentation et un test indépendants.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Tâche parallélisable (fichiers distincts, pas de dépendance en cours).
- **[Story]**: User story (US1, US2, US3, US4).
- Inclure les chemins de fichiers exacts dans les descriptions.

---

## Phase 1: Setup (Infrastructure partagée)

**Purpose**: Préparer les artefacts communs nécessaires à l’ensemble des stories.

- [x] T001 Créer/mettre à jour le modèle d’environnement dans `.env.example` (DATABASE_URL, LOG_LEVEL, NODE_ENV, APP_ENV, CORS_ORIGIN, POSTGRES_*, PGADMIN_*, VITE_API_BASE_URL, VITE_LOG_LEVEL) à la racine.

---

## Phase 2: Foundational (Pré-requis bloquants)

**Purpose**: Alignements transverses avant stories.

- [x] T002 Synchroniser `specs/005-dockerisation/quickstart.md` avec les commandes finales compose/build pour servir de référence commune.

---

## Phase 3: User Story 1 - Lancer le stack docker-compose (Priority: P1) 🎯 MVP

**Goal**: Pouvoir démarrer backend 3001 + frontend 3000 via compose avec/sans profil `localdb`, sans auto-migrations, docs à jour.

**Independent Test**: `docker compose up backend frontend` fonctionne avec `.env` externe ; `docker compose --profile localdb up backend frontend postgres pgadmin` démarre Postgres 17 + pgAdmin 8080, healthcheck `/api/health` OK, volumes conservés hors `down -v`, docs README/backend/README conformes.

### Implementation for User Story 1

- [x] T003 [US1] Mettre à jour `docker-compose.yml` pour services `backend`/`frontend`, profil `localdb` (postgres 17 + pgAdmin 8080), healthcheck backend `/api/health`, volumes persistants, aucune auto-migration/seed au démarrage.
- [x] T004 [P] [US1] Documenter les commandes compose (avec/sans profil `localdb`), variables `.env`, et migrations/seeders manuelles dans `README.md`.
- [x] T005 [P] [US1] Documenter l’usage compose côté backend (ports, healthcheck, migrations/seeders manuelles, `.env`) dans `backend/README.md`.

**Checkpoint**: Stack compose utilisable en dev avec ou sans base locale, documentation claire.

---

## Phase 4: User Story 2 - Construire et lancer les images front/back (Priority: P1)

**Goal**: Produire des images Docker reproductibles pour backend/front et les exécuter avec les bons arguments build/run.

**Independent Test**: `docker build -t afa-backend -f backend/Dockerfile backend` et `docker build -t afa-frontend -f frontend/Dockerfile frontend --build-arg ...` réussissent ; images démarrent sur 3001/3000 avec healthcheck backend actif et front pointant par défaut sur le service backend compose.

### Implementation for User Story 2

- [x] T006 [US2] Mettre à jour `backend/Dockerfile` (Node 20 alpine, `npm ci`, copie `.sequelizerc`, healthcheck `/api/health`, aucune migration/seed au start).
- [x] T007 [P] [US2] Mettre à jour `frontend/Dockerfile` multi-stage Vite (build args `VITE_API_BASE_URL`/`VITE_LOG_LEVEL`, runner `serve`).
- [x] T008 [P] [US2] Ajouter/ajuster `.dockerignore` à la racine (exclure `node_modules`, `dist`, `build`, `.env`, caches).
- [x] T009 [P] [US2] Ajouter/ajuster `frontend/.dockerignore` (exclure `node_modules`, `dist`, caches Vite).
- [x] T010 [P] [US2] Ajuster `docker-compose.yml` pour que `VITE_API_BASE_URL` par défaut cible l’API accessible depuis le navigateur (`http://localhost:3001/api`), y compris les `build.args`.

**Checkpoint**: Images front/back construites et exécutables avec configs par défaut cohérentes.

---

## Phase 5: User Story 3 - Auto-chargement WCS statique & types JSX (Priority: P2)

**Goal**: Embraquer les assets WCS statiques et fournir les typings JSX pour les web components sans `defineCustomElements`.

**Independent Test**: Assets `wcs.css`/`wcs.esm.js` présents dans `frontend/public/wcs` et chargés par `frontend/index.html` en dev/build ; aucun appel `defineCustomElements` requis ; `<wcs-button/breadcrumb/divider>` et loader sont typés via TS/JSX (`frontend/src/types/*`, `tsconfig.app.json`, `src/vite-env.d.ts`).

### Implementation for User Story 3

- [x] T011 [US3] Copier les assets `wcs.css` et `wcs.esm.js` depuis `node_modules/wcs-core/dist` vers `frontend/public/wcs/`.
- [x] T012 [P] [US3] Ajouter le chargement des assets WCS (link/script) dans `frontend/index.html` pour dev/build.
- [x] T013 [P] [US3] Retirer/éviter tout appel `defineCustomElements` de `@wcs/wcs-react` et s’appuyer sur les assets statiques dans `frontend/src/main.tsx` (ou fichier d’entrée équivalent).
- [x] T014 [P] [US3] Déclarer les types JSX pour `wcs-button`, `wcs-breadcrumb`, `wcs-divider` et le loader dans `frontend/src/types/wcs.d.ts` et référencer ce dossier dans `frontend/tsconfig.app.json`.
- [x] T015 [P] [US3] Étendre `frontend/src/vite-env.d.ts` pour inclure les typings WCS (import ou référence du fichier de types).

**Checkpoint**: WCS chargé statiquement, composants utilisables avec autocomplétion/typage TS/JSX.

---

## Phase 6: User Story 4 - Logger backend robuste sans pino-pretty (Priority: P2)

**Goal**: Conserver des logs lisibles en dev si `pino-pretty` est absent, sans changer reqId/serializers ; prod reste en JSON.

**Independent Test**: En dev avec `pino-pretty`, `/api/health` loggué en pretty avec reqId ; sans `pino-pretty`, log JSON + avertissement unique ; en prod, logs JSON sans perte de champs.

### Implementation for User Story 4

- [x] T016 [US4] Mettre à jour `backend/src/api/logger.js` pour tenter `pino-pretty` en dev si présent, sinon fallback JSON avec avertissement unique, reqId/serializers inchangés.
- [x] T017 [P] [US4] Documenter le comportement du logger (pino-pretty optionnel, fallback JSON) dans `backend/README.md`.

**Checkpoint**: Logger dev résilient à l’absence de `pino-pretty`, prod inchangée.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Cohérence finale et documentation transversale.

- [x] T018 [P] Harmoniser la documentation finale (`README.md`, `backend/README.md`, `specs/005-dockerisation/quickstart.md`) après implémentation pour refléter commandes, profils compose, et rappels migrations/seeders.

---

## Dependencies & Execution Order

- **Phase order**: Setup → Foundational → US1 (P1, MVP) → US2 (P1) → US3 (P2) → US4 (P2) → Polish.
- **Story dependencies**: US1 et US2 indépendantes après Foundational ; US3 et US4 peuvent démarrer après Foundational et n’ont pas de dépendance fonctionnelle aux autres stories.
- **Task dependencies**: Respecter l’ordre des IDs ; les tâches marquées [P] peuvent être parallélisées si les fichiers ne se chevauchent pas.

## Parallel Opportunities (par story)

- US1 : T004 et T005 en parallèle pendant que T003 ajuste le compose.
- US2 : T007, T008, T009, T010 en parallèle une fois T006 commencé ; éviter conflits sur `docker-compose.yml` (T010 vs T003 déjà appliqué).
- US3 : T012, T013, T014, T015 en parallèle après la copie des assets (T011).
- US4 : T017 en parallèle du code T016 (documentation vs implémentation).

## MVP Scope

- MVP = US1 (compose up avec/without localdb, docs à jour). Livrable dès fin Phase 3.

## Task Counts

- Total tasks: 18 (18 terminées, 0 restante)
- Par user story: US1 (3/3 faites), US2 (5/5 faites), US3 (5/5 faites), US4 (2/2 faites)
- Setup/Foundational/Polish: 3 tâches (3 faites)

## Format Validation

- Tous les items suivent le format `- [ ] T### [P?] [Story?] Description avec chemin de fichier`.

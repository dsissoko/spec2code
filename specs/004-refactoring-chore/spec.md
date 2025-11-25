# Feature Specification: Refactoring & Chore (rétrospective)

**Feature Branch**: `004-refactoring-chore`  
**Created**: 2025-11-24  
**Status**: Rétrospec (aucun développement attendu)  
**Input**: Constat des changements livrés entre `v0.3.0` et `v0.4.0` (back + front), incluant la refonte des logs backend, les endpoints d'information d'app, la documentation env/ops, et l'injection de version côté front.

## Garde-fous Constitution AFA (ne pas supprimer)

- Langue : français (identifiants en anglais acceptés).
- Stack : backend Node.js/Express + Sequelize/PostgreSQL ; frontend React + TypeScript + Vite.
- Conventions : respecter `specs/spec-convention.md` et `specs/technical-conventions.md` (user stories indépendantes, critères Given/When/Then, pas de dettes cachées).
- Scope : rétrospective de features déjà livrées ; aucun code à ajouter ni migrer.

## User Stories & Tests

### US1 – Journalisation unifiée backend (Priority: P1)
Un exploitant veut tracer chaque requête HTTP avec un `reqId`, un niveau de log adapté au statut, et un format lisible en dev (pretty) ou compact en prod (JSON), afin de diagnostiquer rapidement les erreurs.

**Acceptance Scenarios**
1. **Given** l’API tourne en dev (`NODE_ENV` ≠ production, `LOG_LEVEL` défini), **When** j’appelle `/api/health`, **Then** un log pino-pretty apparaît avec `reqId`, méthode, URL, statut et durée.
2. **Given** l’API tourne en prod (`NODE_ENV=production`), **When** j’appelle une route inexistante, **Then** le log est émis en JSON avec `reqId`, statut 404 et niveau `warn`.
3. **Given** une erreur applicative est levée, **When** le middleware d’erreur la traite, **Then** elle est loguée via le logger partagé avec `reqId`, chemin et statut.

### US2 – Exposition des métadonnées d’application (Priority: P1)
Un support veut vérifier en un coup d’œil la version déployée et l’environnement, pour diagnostiquer un problème de configuration sans exposer de secrets.

**Acceptance Scenarios**
1. **Given** l’API est démarrée, **When** j’ouvre la racine `/`, **Then** j’obtiens une page HTML affichant nom, version, env (`APP_ENV`/`NODE_ENV`), uptime et des liens vers `/api/health` et `/api/info`.
2. **Given** l’API est démarrée avec `APP_ENV=preprod`, **When** j’appelle `/api/info`, **Then** la réponse JSON contient `name`, `version` (issue du `package.json`), `env.app=preprod`, `env.node`, `uptimeSeconds`, `startedAt`, `now`.

### US3 – Configuration documentée et cloisonnée (Priority: P2)
Un dev veut lancer l’API ou la packager sans chercher dans le code quelles variables sont requises, et en distinguant dev/prod.

**Acceptance Scenarios**
1. **Given** je lis `backend/README.md`, **When** je cherche les variables nécessaires, **Then** je trouve la liste (`DATABASE_URL`, `PORT`, `LOG_LEVEL`, `NODE_ENV`, `APP_ENV`, `CORS_ORIGIN`) avec valeurs exemple et différences dev/prod.
2. **Given** je prépare une image/container, **When** je cherche la procédure, **Then** la doc précise que les variables sont injectées via l’environnement (pas de `.env` committé) et que le healthcheck cible `/api/health`.
3. **Given** je souhaite appliquer les migrations/seeders, **When** je consulte le README, **Then** les commandes `npx sequelize-cli db:migrate` et `db:seed:all` sont présentes et explicites (pas d’auto-migration au démarrage).

### US4 – Version front affichée et configurable (Priority: P2)
Un utilisateur front doit pouvoir identifier la version du build et pointer vers le backend cible pour vérifier la cohérence des environnements.

**Acceptance Scenarios**
1. **Given** le front est construit, **When** j’affiche le footer, **Then** il montre `AFA front vX.Y.Z` où `X.Y.Z` provient du `package.json` (injection build-time, pas de saisie manuelle).
2. **Given** je configure `VITE_API_BASE_URL` dans `frontend/.env`, **When** je lance `npm run dev`, **Then** le front ping `/health` sur cette base URL au démarrage et journalise le résultat via le logger front.
3. **Given** je lis `frontend/README.md`, **When** je cherche comment changer l’URL backend ou le niveau de log, **Then** je trouve les variables `VITE_API_BASE_URL` et `VITE_LOG_LEVEL` documentées et des runbooks dev/build.

### US5 – Routine de version applicative (Priority: P3)
Un intégrateur veut savoir comment bumper les versions et taguer les releases pour front et back dans le monorepo.

**Acceptance Scenarios**
1. **Given** je consulte `docs/GIT-USAGE.md`, **When** je cherche la routine de release, **Then** je trouve les exemples `npm version` (front/back séparés ou coordonnés) et la consigne de tag sur le commit de bump.
2. **Given** je lis la même doc, **When** je m’interroge sur les valeurs runtime, **Then** il est précisé que les versions affichées proviennent automatiquement des `package.json` (API `/api/info`, footer front).

## Hors scope
- Pas de nouveaux endpoints ni écrans.
- Pas de modification du data model ou des migrations.
- Pas de changement sur la stack (logs restent sur pino/pino-http).

## Notes de validation
- Tout le périmètre de cette rétrospec est déjà livré dans `v0.4.0`.  
- Les vérifications se font par lecture de la doc et appels des endpoints existants (`/`, `/api/info`, `/api/health`).

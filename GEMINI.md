# afav2 Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-11-24

## Active Technologies
- Node.js 20 (backend) / TypeScript (frontend Vite) + Express, Sequelize + pg/pg-hstore, pino/pino-http, Vite/React, wcs-core assets, docker-compose (005-dockerisation)
- PostgreSQL 17 (profil localdb ou DB externe via `DATABASE_URL`) (005-dockerisation)

- Node.js LTS (>=20), JavaScript + express, sequelize, sequelize-cli, pg, pg-hstore (validation recommandé : express-validator ou zod ; logging : pino ou winston) (003-datamodel-init)

## Project Structure

```text
src/
tests/
```

## Commands

npm test && npm run lint

## Code Style

Node.js LTS (>=20), JavaScript: Follow standard conventions

## Communication
- Français, ton concis et factuel
- Citer chemins précis (`backend/...`, `frontend/...`, `specs/...`)
- Réponses courtes, éviter le blabla

## Processus SPECKIT
- Lire/ respecter `.specify/memory/constitution.md` et le `plan.md` de la feature courante
- Suivre les commandes/prompts SPECKIT, ne pas inventer d'étapes
- Ne pas régénérer de fichiers auto (migrations, lockfiles) sans demande explicite

## Sécurité / Garde-fous
- Ne jamais exposer ni modifier de secrets
- Pas d'actions destructives ou globales sans accord
- Si une info manque ou semble ambiguë : demander avant d'agir

## Workflow de dev
- Vérifier la branche/feature avant de coder
- Après modification : proposer tests/linters adaptés (ou les exécuter si attendu)
- Garder les changements ciblés et motivés

## Clarifications
- En cas de doute sur le périmètre ou une règle : poser la question plutôt que supposer

## Recent Changes
- 005-dockerisation: Added Node.js 20 (backend) / TypeScript (frontend Vite) + Express, Sequelize + pg/pg-hstore, pino/pino-http, Vite/React, wcs-core assets, docker-compose

- 003-datamodel-init: Added Node.js LTS (>=20), JavaScript + express, sequelize, sequelize-cli, pg, pg-hstore (validation recommandé : express-validator ou zod ; logging : pino ou winston)

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->

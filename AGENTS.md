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

## Recent Changes
- 005-dockerisation: Added Node.js 20 (backend) / TypeScript (frontend Vite) + Express, Sequelize + pg/pg-hstore, pino/pino-http, Vite/React, wcs-core assets, docker-compose

- 003-datamodel-init: Added Node.js LTS (>=20), JavaScript + express, sequelize, sequelize-cli, pg, pg-hstore (validation recommandé : express-validator ou zod ; logging : pino ou winston)

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->

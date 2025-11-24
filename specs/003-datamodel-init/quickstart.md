# Quickstart backend AFA (incrément 003)

## Prérequis
- Node.js LTS (>=20)
- PostgreSQL accessible avec un compte ayant droits DDL
- Dépôt cloné, branche `003-datamodel-init`

## Installation
```bash
cd backend
npm install
```

## Configuration
Créer un fichier `.env` à la racine du projet (même niveau que `backend/`) :
```bash
DATABASE_URL=postgres://postgres:changeme@localhost:5433/AFA_DB
PORT=3001
```
- `DATABASE_URL` est obligatoire pour Sequelize.
- `PORT` est optionnel (3001 par défaut). Garder CORS autorisé pour `http://localhost:3000` (front).

## Préparer la base
```bash
# Depuis backend/ ou la racine
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all   # charge les environnements DEV/INT/QUAL/REC/PREPROD/PROD
npx sequelize-cli db:migrate:status   # vérifier l’état des migrations
```
> Migrations/seeders existants : `database/migrations/20250326123000-create-afa-core.js` et `database/seeders/20250326123500-init-environnements.js` (ne pas recréer).

## Démarrer l’API
```bash
npm start
# L’API écoute sur http://localhost:3001 (ou PORT défini)
```

## Dépendances principales
- express (serveur REST)
- sequelize, sequelize-cli (ORM + migrations)
- pg, pg-hstore (drivers PostgreSQL)
- express-validator (ou zod) pour valider les payloads
- pino (ou winston) pour les logs

## Contrats API
Voir `specs/003-datamodel-init/contracts/openapi.yaml` pour les endpoints de référence (CRUD référentiel MQ, demandes, healthcheck).

## Tests
- Recommandé : Jest pour tests unitaires/services (non inclus dans cet incrément).

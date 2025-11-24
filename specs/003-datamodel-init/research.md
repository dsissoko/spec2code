# Research Notes — Modèle de données & backend minimal AFA

## Décisions et justifications

### 1) Stack backend / dépendances
- **Decision** : Node.js LTS (>=20) + Express ; Sequelize + sequelize-cli ; drivers pg/pg-hstore ; validation via express-validator (ou zod) ; logging via pino (ou winston).
- **Rationale** : Conforme stack imposée (Node REST + PostgreSQL via Sequelize) ; libs standard, supportées et légères pour un backend simple.
- **Alternatives considered** : Fastify (rejeté : non requis ici), Prisma/Drizzle (rejeté : stack imposée Sequelize), Joi/Ajv (rejeté : express-validator plus direct pour Express).

### 2) Connexion BD / migrations
- **Decision** : Connexion via `DATABASE_URL` (format postgres://user:pass@host:port/db) dans `.env` ; port API `3001` (override via `PORT`) ; CORS autorisé pour front `http://localhost:3000`. Migrations manuelles `npx sequelize-cli db:migrate`, seeders `db:seed:all` (pas d’auto-migration au démarrage).
- **Rationale** : 12-factor (config par env), évite collisions avec le front (3000), CORS explicite, migrations contrôlées (pas d’effet de bord en prod).
- **Alternatives considered** : Auto-migration au start (rejeté : risques prod), port 8080 (rejeté : collision potentielle, front déjà en 3000).

### 3) Contraintes métier MQ
- **Decision** : Rappeler dans le modèle et les validations : taille msg max 50 Mo, TTL max 3600 s, alias suffixe `.QA`, préfixes F/FR/FT/T, users lowercase `mq<trigramme><env><indice>`, canaux uppercase `LS[N|S]_...` ; pas d’auto-creation d’artefacts côté backend (c’est du déclaratif).
- **Rationale** : Aligné sur la doc MQ et le formulaire (chap. 5) ; nécessaire pour générer l’Excel.
- **Alternatives considered** : Laisser libre (rejeté : risque d’incohérence avec l’usine MQ).

### 4) Tests
- **Decision** : Utiliser Jest pour tests unitaires/services API (dev) ; pas d’exigence d’E2E dans cet incrément.
- **Rationale** : Outil courant Node, faible friction, compatible TS ou JS.
- **Alternatives considered** : Mocha/Chai (rejeté : non nécessaire), E2E Cypress/Playwright (rejeté : hors périmètre de l’incrément).

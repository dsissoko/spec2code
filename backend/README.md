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
2. Créer un fichier `.env` à la racine du projet (même niveau que `backend/`), par exemple :
   ```bash
   # Connexion PostgreSQL (exemple fourni)
   DATABASE_URL=postgres://postgres:changeme@localhost:5433/AFA_DB
   # Port HTTP de l’API
   PORT=3001
   ```
   - `DATABASE_URL` est lu par Sequelize (format standard PostgreSQL).
   - `PORT` sera utilisé par Express (par défaut 3001 si non défini).
3. Appliquer les migrations et seeders (depuis la racine ou `backend/`, avec `DATABASE_URL` exporté ou dans `.env`) :
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

## Base de données (PostgreSQL)
Le backend se connecte à PostgreSQL en lisant `DATABASE_URL`. Le schéma est géré par des migrations et seeders situés dans `database/`.

- Migrations/seeders : voir [`database/README.md`](../database/README.md) pour la procédure détaillée et le descriptif du schéma.
- Artefacts existants : `database/migrations/20250326123000-create-afa-core.js` (socle) et `database/seeders/20250326123500-init-environnements.js` (DEV/INT/QUAL/REC/PREPROD/PROD). Ne pas recréer ces fichiers.
- Ce backend lit uniquement `DATABASE_URL` pour se connecter (format PostgreSQL).

### Comment le backend sait se connecter
- Le fichier `backend/src/config/config.js` (Sequelize) doit lire `process.env.DATABASE_URL` pour les environnements `development` et `production`.
- Si le `.env` contient `DATABASE_URL`, `sequelize-cli` et l’API l’utiliseront automatiquement.
- Pas d’autres fichiers secrets : pas de credentials en dur, pas de `.env` committé.

## Bonnes pratiques
- Toujours lancer les migrations avant de démarrer l’API sur une nouvelle base ou après un pull contenant de nouvelles migrations.
- Ne jamais committer le `.env` ni des credentials.
- Utiliser des validateurs d’entrée (ex. express-validator/zod) pour sécuriser les payloads.
- Logger les erreurs côté serveur, retourner des erreurs JSON standardisées côté client.

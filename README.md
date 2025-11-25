# AFA — Automatisation des Flux Applicatifs

Application métier destinée à automatiser la mise en place de flux applicatifs (ex. MQ Series).  
Le dépôt est organisé pour séparer frontend, backend (en cours), base de données et infrastructure.

## Panorama du dépôt

- `frontend/` : SPA React 19 + TypeScript + Vite 7, intégrée au design system WCS (`wcs-core`, `wcs-react`).
- `backend/` : esquelettes en attente d’implémentation.
- `database/` : documentation Sequelize/PostgreSQL (migrations, seeders) → voir `database/README.md`.
- `infrastructure/` : pistes de déploiement Azure CaaS, AWS Elastic Beanstalk et Kubernetes Nuagik → voir `infrastructure/README.md`.
- `specs/` : conventions, écrans et user stories (voir `specs/spec-convention.md`, `specs/001-afa-home/spec.md`, etc.).

## Démarrer avec Docker Compose (fullstack)

1. Copier l’exemple d’environnement et l’adapter (aucun secret dans le dépôt) :
   ```bash
   cp .env.example .env
   # Renseigner DATABASE_URL pour votre base PostgreSQL 17 externe (PaaS/instance existante).
   # Option rapide locale : laisser POSTGRES_* par défaut pour lancer le service postgres du compose.
   # Front : VITE_API_BASE_URL=http://localhost:3001/api (par défaut) et VITE_LOG_LEVEL=info.
   ```
2. Lancer tout le stack en local (frontend 3000, backend 3001). Base locale Postgres optionnelle via profil :
   ```bash
   docker compose up --build                  # utilise DATABASE_URL externe
   docker compose --profile localdb up --build  # ajoute le Postgres local (17-alpine)
   ```
   - Healthcheck backend : `curl http://localhost:3001/api/health`.
   - Le service `postgres` (17-alpine) est uniquement pour du dev local ; en environnement réel utilisez la base gérée existante.
   - Si vous utilisez le profil `localdb`, mettez `DATABASE_URL=postgres://postgres:postgres@postgres:5432/afa_db` dans `.env`.
   - Si vous ciblez une base qui tourne sur votre machine hors compose, utilisez `host.docker.internal` comme host (déjà mappé dans le compose).
   - pgAdmin (optionnel, profil `localdb`) : accessible sur http://localhost:8080 avec `PGADMIN_DEFAULT_EMAIL`/`PGADMIN_DEFAULT_PASSWORD` du `.env`.
   - Le front injecte `VITE_API_BASE_URL` au build (par défaut `http://backend:3001/api` dans le compose). Adaptez-le dans `.env` si besoin d’un host différent.
3. Appliquer les migrations (manuel, jamais au start) :
   ```bash
   docker compose run --rm backend npx sequelize-cli db:migrate
   # Option seeders : docker compose run --rm backend npx sequelize-cli db:seed:all
   ```
4. Arrêt :
   ```bash
   docker compose down            # garde le volume postgres
   docker compose down -v         # supprime aussi les données postgres locales
   ```

## Démarrer rapidement le frontend

Prérequis : Node.js 20+ et npm.

```bash
cd frontend
npm ci                     # installe les dépendances (inclut Vite)
npm run dev -- --host --port 3000
# L’UI est accessible sur http://localhost:3000
```

Scripts utiles (dans `frontend/`) :

- `npm run dev` : serveur Vite avec HMR.
- `npm run build` : build de production.
- `npm run preview` : prévisualisation du build.
- `npm run lint` : ESLint (config React + TypeScript).

## Frontend : repères rapides

- Entrée : `frontend/src/main.tsx` initialise le router et les Web Components WCS.
- Routing : `/` (accueil), `/mq`, `/mq/demande`, `/mq/cartographie`, `/test` (démo WCS).
- UI : composants maison `CtaTile`, `HeaderAfa`, `FooterContact` + styles dans `frontend/src/styles/global.css`.
- Design : palette SNCF via tokens `wcs-core/design-tokens/dist/sncf-holding.css`.

## TODO (connectivité Postgres hôte Windows depuis les conteneurs)
- Tester d’abord avec le Postgres du docker compose (`--profile localdb`) pour éviter les contraintes réseau hôte.
- Si base Windows à exposer : vérifier `listen_addresses` (0.0.0.0) et `pg_hba.conf` (autoriser le CIDR Docker, ex. 172.17.0.0/16).
- Valider l’usage de `host.docker.internal` ou d’un DNS/IP réelle dans `DATABASE_URL`.
- Dernier recours : ajuster les règles firewall Windows pour ouvrir le port Postgres (option à éviter si non maîtrisé).

## Travailler avec les specs

- Les scénarios fonctionnels et conventions techniques sont décrits dans `specs/` (par ex. `specs/001-afa-home/plan.md`, `specs/001-afa-home/spec.md`).
- Utiliser ces fichiers comme source de vérité pour aligner les écrans React et préparer les endpoints backend.

## Ce qui manque côté backend

- Aucun service n’est encore exposé : l’UI fonctionne en mode statique/démo.
- Prévoir les endpoints flux (ex. création de demandes MQ, cartographie) et les brancher ensuite au frontend.

## Notes infrastructure et base de données

- Déploiement : trois pistes documentées (Azure CaaS, AWS EB, Kubernetes Nuagik) dans `infrastructure/README.md`.
- Base de données : guide Sequelize/PostgreSQL dans `database/README.md` (migrations, seeders, config `backend/src/config/config.js`).

## Support

Contact support : `david.sissoko@sncf.fr`.

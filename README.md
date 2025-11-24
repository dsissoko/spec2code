# AFA — Automatisation des Flux Applicatifs

Application métier destinée à automatiser la mise en place de flux applicatifs (ex. MQ Series).  
Le dépôt est organisé pour séparer frontend, backend (en cours), base de données et infrastructure.

## Panorama du dépôt

- `frontend/` : SPA React 19 + TypeScript + Vite 7, intégrée au design system WCS (`wcs-core`, `wcs-react`).
- `backend/` : esquelettes en attente d’implémentation.
- `database/` : documentation Sequelize/PostgreSQL (migrations, seeders) → voir `database/README.md`.
- `infrastructure/` : pistes de déploiement Azure CaaS, AWS Elastic Beanstalk et Kubernetes Nuagik → voir `infrastructure/README.md`.
- `specs/` : conventions, écrans et user stories (voir `specs/spec-convention.md`, `specs/001-afa-home/spec.md`, etc.).

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

# Research – Docker fullstack & WCS embarqué

## Performance goals (NEEDS CLARIFICATION)
- **Decision**: Aucun objectif chiffré ; vérifier seulement que les services démarrent et passent les healthchecks dans compose (ports 3000/3001) avec ou sans profil `localdb`.
- **Rationale**: Le périmètre est la dockerisation et l’embarquement d’assets WCS, pas l’optimisation runtime ; la Constitution impose de signaler l’absence de cible plutôt que d’inventer.
- **Alternatives considered**: Fixer un p95 ou un temps de build arbitraire — rejeté faute de besoin exprimé.

## docker-compose (backend/frontend + profil localdb)
- **Decision**: Services `backend` (3001) et `frontend` (3000) par défaut ; profil `localdb` ajoutant Postgres 17 + pgAdmin 8080 ; healthcheck backend `/api/health`; `.env` racine pour `DATABASE_URL`; migrations/seeders manuelles uniquement ; volumes conservés sauf `docker compose down -v`.
- **Rationale**: Aligne le comportement dev/CI sur le brief (pas d’auto-migration) et permet une base locale optionnelle sans imposer Postgres à tous.
- **Alternatives considered**: Auto-run des migrations au start — rejeté car contraire aux contraintes. Supprimer pgAdmin — rejeté pour l’ops local demandé.

## Dockerfiles backend / frontend
- **Decision**: `backend/Dockerfile` en Node 20 alpine avec `npm ci`, copie de `.sequelizerc` (depuis `src/public`), healthcheck `/api/health`, pas d’exécution de migrations/seeders. `frontend/Dockerfile` multi-stage Vite (build args `VITE_API_BASE_URL`, `VITE_LOG_LEVEL`, runner `serve`), `.dockerignore` à la racine et dans `frontend/`.
- **Rationale**: Garantit des images reproductibles, légères et conformes aux variables demandées ; multi-stage pour séparer build et runtime.
- **Alternatives considered**: Utiliser `npm install` — rejeté (lockfile, CI). Runner nginx — rejeté car le brief impose `serve`.

## WCS statique + typings JSX
- **Decision**: Copier `wcs.css` et `wcs.esm.js` dans `frontend/public/wcs`, les charger dans `index.html`, retirer `defineCustomElements` de `@wcs/wcs-react`; typer `wcs-button`, `wcs-breadcrumb`, `wcs-divider`, loader via `frontend/src/types/*`, `tsconfig.app.json`, `src/vite-env.d.ts`; `VITE_API_BASE_URL` par défaut pointant sur le service backend compose.
- **Rationale**: Assure le chargement WCS en dev/build sans initialisation dynamique et offre l’ergonomie TypeScript pour les Web Components.
- **Alternatives considered**: Conserver `@wcs/wcs-react` — rejeté (brief demande suppression). CDN WCS — rejeté pour fonctionnement offline/docker.

## Logger backend sans pino-pretty
- **Decision**: En dev, essayer `pino-pretty` ; si absent, fallback JSON et émettre un avertissement unique, sans toucher `reqId` ni les serializers actuels ; prod reste en JSON.
- **Rationale**: Maintient la lisibilité en dev tout en restant robuste aux installations partielles.
- **Alternatives considered**: Rendre `pino-pretty` obligatoire — rejeté (doit fonctionner sans). Ajouter une autre lib de prettify — rejeté pour limiter la surface.

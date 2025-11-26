# Implementation Plan: Docker fullstack & WCS embarqué

**Branch**: `005-dockerisation` | **Date**: 2025-11-26 | **Spec**: `specs/005-dockerisation/spec.md`
**Input**: Feature specification from `/specs/005-dockerisation/spec.md`

## Summary

Mettre en place une stack docker-compose front/back avec profil optionnel localdb (Postgres 17 + pgAdmin), fournir Dockerfiles backend/frontend conformes (Node 20 alpine, build Vite multi-stage, healthcheck backend), embarquer les assets WCS statiques et typer leurs composants JSX, et rendre le logger backend tolérant à l’absence de pino-pretty (fallback JSON + avertissement).

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Node.js 20 (backend) / TypeScript (frontend Vite)  
**Primary Dependencies**: Express, Sequelize + pg/pg-hstore, pino/pino-http, Vite/React, wcs-core assets, docker-compose  
**Storage**: PostgreSQL 17 (profil localdb ou DB externe via `DATABASE_URL`)  
**Testing**: npm test && npm run lint (monorepo), pas de tests supplémentaires demandés  
**Target Platform**: Conteneurs Docker (compose) pour dev/intégration, ports 3000/3001/8080  
**Project Type**: Web app front+back (monorepo)  
**Performance Goals**: Aucune exigence spécifique (NEEDS CLARIFICATION)  
**Constraints**: Pas d’auto-migration/seed au démarrage ; healthcheck backend `/api/health` ; volumes persistés sauf `down -v`  
**Scale/Scope**: Périmètre limité à la dockerisation et à l’embarquement WCS (pas de nouvelles features métier)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Langue : tous les contenus (specs, plan, tasks, prompts) sont rédigés en français ; réponses IA
  exclusivement en français (code/identifiants peuvent rester en anglais).
- UX cible PDD : les propositions répondent à un usage expert (rapidité, clarté, peu de friction) et
  ne dérivent pas vers des patterns B2C génériques.
- Stack imposée : backend Node.js LTS en REST HTTP/JSON, frontend React + TypeScript + Vite avec
  composants WCS uniquement ; base PostgreSQL via Sequelize. Aucune dépendance à une autre stack
  n’est acceptée sans dérogation validée.
- Conventions : la spec doit suivre `specs/spec-convention.md` et `specs/technical-conventions.md`
  (structure des incréments `specs/NNN-.../`, user stories indépendantes, critères Given/When/Then,
  tests identifiés uniquement si demandés par la spec/plan, traçabilité FR/SC).
- Assets : si l’écran touche l’UI, référencer la doc `.specify/support/wcs` pour les composants
  (wcs-input, wcs-button, etc.) et aligner les choix UI sur WCS.

**Statut gate** : OK (aucune dérogation identifiée).

## Project Structure

### Documentation (this feature)

```text
specs/005-dockerisation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md              # généré par /speckit.tasks (hors périmètre ici)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── api/
│   ├── models/
│   └── services/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

database/
└── migrations/seeders (non modifiés par cet incrément)
```

**Structure Decision**: Monorepo web avec répertoires `backend/`, `frontend/`, `database/` déjà en place ; la feature agit sur la dockerisation et l’UI WCS sans modifier la structure de code.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

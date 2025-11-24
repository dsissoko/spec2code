# Implementation Plan: Modèle de données & backend minimal AFA

**Branch**: `003-datamodel-init` | **Date**: 2025-03-26 | **Spec**: specs/003-datamodel-init/spec.md
**Input**: Feature specification from `/specs/003-datamodel-init/spec.md`

## Summary

Modéliser fonctionnellement l’ensemble des entités MQ (environnements, applications, QMgr, files/alias F/FR/FT/T, topics/abos, users/canaux, XMIT, demandes) et cadrer un backend minimal pour se connecter à PostgreSQL via `DATABASE_URL`, exposer une API REST sur le port 3001 (CORS autorisé pour le front 3000) et s’appuyer sur Sequelize/pg. Les migrations/seeders existants (core + environnements) sont déjà livrés et seulement référencés. Le plan produit la doc de conception (data-model, contrats API, quickstart) sans toucher au répertoire database.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Node.js LTS (>=20), JavaScript  
**Primary Dependencies**: express, sequelize, sequelize-cli, pg, pg-hstore (validation recommandé : express-validator ou zod ; logging : pino ou winston)  
**Storage**: PostgreSQL (schema géré par migrations Sequelize)  
**Testing**: Jest (API/services)  
**Target Platform**: Linux server (REST HTTP/JSON)  
**Project Type**: Web app (backend + frontend)  
**Performance Goals**: Non spécifiés ; usage interne, API simple (réactivité standard sub-seconde à affiner au besoin)  
**Constraints**: Messages MQ <= 50 Mo ; TTL <= 3600 s ; pas d’auto-migration au démarrage ; CORS autorisé pour front 3000  
**Scale/Scope**: Application interne PDD ; volumétrie non fournie (flux d’applications internes, multi-QMgr)

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
- Statut : conforme (aucune dérogation demandée).

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

database/
├── migrations/
└── seeders/
```

**Structure Decision**: Application web avec backend/ et frontend/ distincts ; database/ dédié aux migrations/seeders Sequelize.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

## Phase 0 — Recherche & clarifications
- Aucun point en `NEEDS CLARIFICATION` ; décisions clés consignées dans `specs/003-datamodel-init/research.md` (stack, config DB, contraintes MQ, tests).
- Objectif : verrouiller les choix techniques et rappeler les contraintes MQ (50 Mo, TTL 3600, nomenclatures).

## Phase 1 — Design & contrats
- Produire `specs/003-datamodel-init/data-model.md` : liste des entités, attributs, contraintes, règles de validation et relations (aligné draw.io + migrations existantes).
- Produire `specs/003-datamodel-init/contracts/openapi.yaml` : endpoints REST de référence (CRUD référentiels MQ, flux, demandes, health), schémas et validations clés.
- Produire `specs/003-datamodel-init/quickstart.md` : pas-à-pas backend (env vars, port 3001, CORS 3000, migrations/seeders existants, dépendances à installer).
- Mettre à jour le contexte agent : `.specify/scripts/bash/update-agent-context.sh codex`.

## Phase 2 — (non couvert par /speckit.plan)
- `tasks.md` sera généré via `/speckit.tasks` si nécessaire.

## Constitution Check (post-Phase 1)
- Langue : OK. Stack : OK (Node/Express + Sequelize/PostgreSQL). UX PDD : OK (pas d’UI dans cet incrément). Conventions : OK (références aux specs/technical-conventions). Aucune dérogation.

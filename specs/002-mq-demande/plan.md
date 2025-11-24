# Implementation Plan: Formulaire demande MQ

**Branch**: `002-mq-demande` | **Date**: 2025-11-24 | **Spec**: `/specs/002-mq-demande/spec.md` (+ `/specs/002-mq-demande/screen-mq-demande.md`)
**Input**: Spécification feature `/specs/002-mq-demande/spec.md` et écran `/specs/002-mq-demande/screen-mq-demande.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Page `/mq/demande` dédiée, alignée sur les pages existantes (header AFA, fil d’Ariane, footer Contact), affichant un bloc WCS avec le texte « Ici le formulaire de saisie de la demande de flux » pour lever tout blocage backend. Préparation des états LOADING/ERROR pour un futur appel d’init, mais non bloquants. UX : simple, épurée et cohérente avec Home et MQ.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript + React 18 (frontend), Node.js LTS REST backend (futur)  
**Primary Dependencies**: Vite, wcs-react / wcs-core (thème Holding), React Router ; backend Express probable (non requis pour ce placeholder)  
**Storage**: PostgreSQL via Sequelize (non utilisé ici)  
**Testing**: Non prévus pour ce placeholder (à reconsidérer si logique ajoutée)  
**Target Platform**: Web desktop/mobile (responsive) via Vite dev server 3000  
**Project Type**: Web app frontend (backend REST futur pour init)  
**Performance Goals**: UI légère et réactive ; pas d’objectif chiffré requis pour ce placeholder  
**Constraints**: Respect du style existant simple/épuré, cohérence Home/MQ/demande ; pas de dépendance backend dans cet incrément  
**Scale/Scope**: Une page `/mq/demande` (placeholder) + navigation depuis `/mq`

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
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
└── (vide pour cet incrément, backend REST init à définir)

frontend/
├── src/
│   ├── components/ (HeaderAfa, FooterContact, CtaTile existants)
│   ├── pages/ (Home.tsx, MqSeries.tsx ; future page MqDemande.tsx)
│   └── styles/ (global.css WCS Holding)
└── tests/ (non présents)

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: Option 2 (Web application) retenue. Code existant sous `frontend/src` avec pages Home/MQ ; backend/ vide à ce jour. La nouvelle page `/mq/demande` sera ajoutée sous `frontend/src/pages/`, en réutilisant les composants et styles existants pour conserver un code simple et cohérent entre pages.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (aucune) | - | - |

## Constitution Check (évaluation)

- Langue : Français respecté (spec, plan, écran). → OK
- UX cible PDD : layout simple/épuré cohérent avec Home/MQ. → OK
- Stack : React+TS+Vite + WCS pour l’UI ; backend REST Node.js prévu mais non requis pour ce placeholder. → OK
- Conventions Speckit : dossier `specs/002-mq-demande/`, spec.md présent, templates suivis. → OK
- Assets WCS : disponibles sous `.specify/support/wcs`, thème Holding importé. → OK

Gate : PASS.

## Phase 0 — Outline & Recherche

- Blocages levés pour livrer le placeholder : la page fonctionne sans backend.
- Points futurs (non bloquants) : endpoint d’init, champs/validations, objectifs perf/tests si ajout de logique.

## Phase 1 — Design & Contrats

- Modèle de données : non applicable pour ce placeholder (`/specs/002-mq-demande/data-model.md` mentionne l’attente du vrai formulaire).
- Contrats API : non requis dans cet incrément (`/specs/002-mq-demande/contracts/README.md` indique l’attente de l’init).
- Quickstart : `/specs/002-mq-demande/quickstart.md` décrit la mise en place et le placeholder.
- Agent context : à mettre à jour via `.specify/scripts/bash/update-agent-context.sh codex` après validation éventuelle d’un futur contrat d’init (inutile pour ce placeholder).

## Phase 2 — Plan de tâches (via /speckit.tasks)

- Générer `tasks.md` pour livrer la page placeholder : création de la page `/mq/demande`, ajout de la route, bloc texte WCS, cohérence de style.
- Rappels : code simple/épuré, cohérent entre pages ; réutiliser HeaderAfa/FooterContact/styles existants.

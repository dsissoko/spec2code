---

description: "Task list for formulaire demande MQ"

---

# Tasks: Formulaire demande MQ

**Input**: Design documents from `/specs/002-mq-demande/`  
**Prerequisites**: plan.md (required), spec.md (required for user stories)  
**Tests**: Pas de tâches de test par défaut (non demandées dans la spec/plan).  
**Constitution Guardrails**: Français, stack imposée (React+TS+Vite + WCS, backend Node REST, PostgreSQL/Sequelize), conventions `specs/spec-convention.md` et `specs/technical-conventions.md`, code simple/épuré et cohérent entre pages.
**Organization**: Tasks sont groupées par user story pour permettre une implémentation et un test indépendants.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Peut être réalisé en parallèle (fichiers distincts, pas de dépendance).
- **[Story]**: US1 pour cette incrément (P1).
- Inclure des chemins de fichiers précis.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Vérifications préalables et réutilisation des briques existantes.

- [x] T001 Vérifier les imports WCS et thème Holding dans `frontend/src/styles/global.css` (aucune modification attendue).
- [x] T002 Confirmer la disponibilité et la réutilisation des composants communs dans `frontend/src/components/` (HeaderAfa.tsx, FooterContact.tsx, CtaTile.tsx) pour maintenir un style cohérent.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Préparer le routage et le socle nécessaire avant l’implémentation de l’US.

- [x] T003 Examiner le routeur `frontend/src/App.tsx` pour intégrer proprement la future page `/mq/demande` sans casser les routes existantes.

---

## Phase 3: User Story 1 - Page `/mq/demande` placeholder (Priority: P1) 🎯 MVP

**Goal**: Afficher une page dédiée `/mq/demande` avec header/breadcrumb/footer cohérents et un bloc WCS « Ici le formulaire de saisie de la demande de flux », sans dépendance backend.

**Independent Test**: Depuis `/mq`, cliquer sur « Faire une demande de flux MQ Series » ouvre `/mq/demande` affichant header, breadcrumb « Bienvenue > MQ Series > Demande de flux », bloc placeholder, footer Contact, layout responsive et cohérent visuellement avec Home/MQ.

### Implementation

- [x] T004 [US1] Créer la page `frontend/src/pages/MqDemande.tsx` réutilisant HeaderAfa/FooterContact et le fil d’Ariane WCS (« Bienvenue > MQ Series > Demande de flux ») avec un bloc WCS (ex. wcs-card) contenant le texte « Ici le formulaire de saisie de la demande de flux ».
- [x] T005 [US1] Ajouter la route `/mq/demande` dans `frontend/src/App.tsx` pour pointer vers `MqDemande` en conservant les autres routes existantes.
- [x] T006 [P] [US1] Ajuster les styles dans `frontend/src/styles/global.css` si nécessaire pour centrer le bloc placeholder et rester aligné avec les pages Home/MQ (code simple/épuré).
- [x] T007 [US1] Vérifier/ajuster la navigation depuis `frontend/src/pages/MqSeries.tsx` afin que le CTA « Faire une demande de flux MQ Series » affiche correctement la page placeholder (cohérence aria-label au besoin).
- [x] T008 [US1] Assurer la cohérence responsive (desktop/mobile) du bloc placeholder et des marges via les classes existantes ou ajustements mineurs dans `frontend/src/styles/global.css`.

---

## Phase 4: Polish & Cross-Cutting Concerns

- [x] T009 Mettre à jour la documentation rapide `specs/002-mq-demande/quickstart.md` si nécessaire (référence à `spec.md` et mention du placeholder livré).

---

## Dependencies & Execution Order

- Phase 1 → Phase 2 → US1 (Phase 3) → Polish (Phase 4).
- US1 est le MVP livrable (placeholder sans backend).

---

## Parallel Execution Examples

- T006 peut être fait en parallèle de T004/T005 si les classes CSS sont déjà connues.
- T007 peut se faire après ajout de la route (T005) mais en parallèle des finitions de styles (T006/T008).

---

## Implementation Strategy

1. Valider imports WCS et composants communs (Phase 1).
2. Vérifier le routeur pour accueillir `/mq/demande` (Phase 2).
3. Implémenter US1 : page `MqDemande`, route, styles/minimas responsive, CTA depuis `/mq` (Phase 3).
4. Ajuster la doc (Polish).

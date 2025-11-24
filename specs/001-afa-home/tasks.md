---

description: "Task list for page d'accueil AFA"
---

# Tasks: Page d'accueil AFA

**Input**: Design documents from `/specs/001-afa-home/`  
**Prerequisites**: plan.md (required), spec.md (required for user stories)  
**Tests**: Pas de tâches de test par défaut (non demandées dans la spec/plan).  
**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 Vérifier la disponibilité des composants WCS et du thème Holding dans `.specify/support/wcs` et côté build Vite (frontend/).
- [x] T002 Documenter dans `frontend/README.md` (ou doc existante) les refs maquettes `specs/001-afa-home/afa.png` et `specs/001-afa-home/afa-mq.png` pour ce sprint.

## Phase 2: Foundational (Blocking Prerequisites)

- [x] T003 Préparer un shell de page d’accueil dans `frontend/src/pages/Home.tsx` (structure de base sans logique métier).
- [x] T004 Préparer un shell de page MQ dans `frontend/src/pages/MqSeries.tsx` (structure de base sans logique métier).
- [x] T005 [P] Créer un composant Header WCS dans `frontend/src/components/HeaderAfa.tsx` (logo + titre).
- [x] T006 [P] Créer un composant Footer WCS dans `frontend/src/components/FooterContact.tsx` (lien contact configuré).
- [x] T007 [P] Créer un composant commun CTA carré WCS dans `frontend/src/components/CtaTile.tsx` (supporte label et lien cible).

---

## Phase 3: User Story 1 - Page d’accueil (Priority: P1) 🎯 MVP

**Goal**: Afficher la home avec header/logo, deux CTA centraux (« Flux MQ Series », « Flux Fluxbox ») et navigation vers la page MQ/Fluxbox.

**Independent Test**: Depuis la home, vérifier présence header + deux CTA centrés et navigation valide vers la page MQ Series et la section Fluxbox.

### Implementation

- [x] T008 [US1] Compléter la page home selon maquette `afa.png` dans `frontend/src/pages/Home.tsx` (layout WCS, centrage CTA).
- [x] T009 [US1] Brancher le composant HeaderAfa sur la home (logo + titre) dans `frontend/src/pages/Home.tsx`.
- [x] T010 [US1] Brancher le composant FooterContact sur la home (lien Contact) dans `frontend/src/pages/Home.tsx`.
- [x] T011 [US1] Instancier deux CtaTile dans la home (« Flux MQ Series », « Flux Fluxbox ») avec tailles/espacements visés dans `frontend/src/pages/Home.tsx`.
- [x] T012 [US1] Ajouter la navigation clic CTA → page MQ (`/mq`) et section Fluxbox (`/fluxbox` placeholder) dans `frontend/src/pages/Home.tsx` ou routeur associé.
- [x] T013 [US1] Appliquer le thème WCS SNCF Holding (variables, classes, imports nécessaires) au scope home dans `frontend/src/pages/Home.tsx` et styles associés.
- [x] T014 [US1] Ajuster le responsive home (empilement CTA en mobile, espacement 16–24px, header/footer visibles) dans `frontend/src/pages/Home.tsx` et styles.

---

## Phase 4: User Story 2 - Contact support (Priority: P2)

**Goal**: Assurer la disponibilité du lien Contact dans le footer et son ouverture du canal de support.

**Independent Test**: Cliquer sur « Contact » depuis la home et vérifier l’ouverture du canal support (mailto ou page contact) avec focus clavier conservé.

### Implementation

- [x] T015 [US2] Configurer le lien Contact (mailto ou URL support) dans `frontend/src/components/FooterContact.tsx` avec texte « Contact ».
- [x] T016 [US2] Vérifier accessibilité du footer (focus visible, aria-label) dans `frontend/src/components/FooterContact.tsx`.

---

## Phase 5: User Story 3 - Affichage responsive (Priority: P3)

**Goal**: Garantir une UX utilisable sur mobile/tablette (CTA visibles, espacés, header/footer accessibles).

**Independent Test**: Sur viewport mobile, vérifier que header/footer restent visibles et que les CTA sont empilés/centrés avec l’espacement requis (≥16–24px).

### Implementation

- [x] T017 [US3] Affiner les breakpoints et styles responsive pour la home (CTA empilés, marges) dans `frontend/src/pages/Home.tsx` et styles.
- [x] T018 [US3] Affiner responsive du footer (touch target, espacement) dans `frontend/src/components/FooterContact.tsx`.

---

## Phase 6: Page MQ Series (lié US1 navigation)

**Goal**: Page MQ Series avec fil d’Ariane « Bienvenue > MQ Series » et deux CTA (« Faire une demande de flux MQ Series », « Cartographie »).

**Independent Test**: Depuis la home, clic « Flux MQ Series » → page MQ avec fil d’Ariane et deux CTA cliquables.

### Implementation

- [x] T019 [US1] Implémenter le fil d’Ariane « Bienvenue > MQ Series » dans `frontend/src/pages/MqSeries.tsx`.
- [x] T020 [US1] Ajouter deux CtaTile (« Faire une demande de flux MQ Series », « Cartographie ») dans `frontend/src/pages/MqSeries.tsx` avec tailles/espacements alignés maquette `afa-mq.png`.
- [x] T021 [US1] Appliquer thème WCS Holding et responsive (CTA centrés/empilables) dans `frontend/src/pages/MqSeries.tsx` et styles.

---

## Phase N: Polish & Cross-Cutting Concerns

- [x] T022 [P] Harmoniser typographie/espacements selon WCS (vérifier contrastes et focus) dans `frontend/src/pages` et `frontend/src/components`.
- [x] T023 Mettre à jour la doc succincte (si besoin) dans `frontend/README.md` pour lier routes home/MQ et rappeler l’usage du thème WCS Holding.

---

## Dependencies & Execution Order

- Setup (Phase 1) → Foundational (Phase 2) → US1 (Phase 3) est le chemin critique pour livrer la home.  
- US2 dépend de la présence du footer (T006) mais peut être finalisée après US1.  
- US3 est un affinage responsive sur la base de la home (US1) et du footer (US2).  
- Page MQ (Phase 6) dépend de la navigation définie en US1.

## Parallel Example: User Story 1

```bash
# En parallèle après T003–T007 :
T008/T009/T010/T011 peuvent être répartis (structure home, header, footer, CTA instanciation)
# Puis
T012 navigation → T013 thème → T014 responsive
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Setup (Phase 1)  
2. Foundational (Phase 2)  
3. US1 (home + navigation vers MQ/Fluxbox)  
4. STOP & VALIDER : home et navigation OK

### Incremental Delivery

1. US1 (home + nav)  
2. US2 (footer contact)  
3. US3 (responsive mobile)  
4. Page MQ (CTA MQ + carto)  
5. Polish

### Parallel Team Strategy

- Après Phase 2 :  
  - Dev A : Home (T008–T014)  
  - Dev B : Page MQ (T019–T021)  
  - Dev C : Footer/Contact + responsive (T015–T018)  
- Harmonisation finale (T022–T023)

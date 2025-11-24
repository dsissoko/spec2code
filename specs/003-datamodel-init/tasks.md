---

description: "Tasks for feature implementation"
---

# Tasks: Modèle de données & backend minimal AFA

**Input**: Design documents from `/specs/003-datamodel-init/`
**Prerequisites**: plan.md (required), spec.md (user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Aucun test imposé par la spec/plan pour cet incrément ; ne pas créer de tâches de tests automatiques.

**Constitution Guardrails**: tâches en français, alignées sur la stack (backend Node.js REST/JSON, frontend React+TS+Vite+WCS, PostgreSQL/Sequelize), conformes à `specs/spec-convention.md` et `specs/technical-conventions.md`. User stories indépendantes et traçables (US1, US2, US3).

## Format: `[ID] [P?] [Story] Description`

## Phase 1: Setup (Infrastructure partagée)

**Purpose**: Initialiser le backend Node/Sequelize et la configuration d’environnement.

- [X] T001 Initialiser le projet backend (npm init) et créer `backend/package.json` avec scripts `start` et dépendances de base déclarées
- [X] T002 Créer `backend/.env.example` avec `DATABASE_URL` et `PORT=3001` documentés (CORS prévu pour `http://localhost:3000`)
- [X] T003 [P] Créer l’arbo backend de base `backend/src/{config,models,services,api}` et un README court dans `backend/` rappelant l’usage du `.env`

---

## Phase 2: Foundational (Prérequis bloquants)

**Purpose**: Mettre en place la connexion DB, l’application Express minimale et la configuration commune.

- [X] T004 Configurer Sequelize pour lire `DATABASE_URL` dans `backend/src/config/db.js` (initialisation Sequelize, export instance)
- [X] T005 [P] Ajouter la configuration CORS/JSON/logger et l’app Express de base dans `backend/src/api/app.js` (CORS autorisant `http://localhost:3000`, parsing JSON, log minimal)
- [X] T006 [P] Créer le point d’entrée `backend/src/index.js` qui charge le `.env`, instancie Sequelize, démarre l’app sur `process.env.PORT || 3001`, gère l’erreur si `DATABASE_URL` manquant
- [X] T007 Définir un middleware d’erreurs générique dans `backend/src/api/middlewares/error.js` et l’intégrer à l’app

**Checkpoint**: Fondation prête (app Express + connexion Sequelize opérationnelles).

---

## Phase 3: User Story 1 - Spécifier le modèle de données AFA (Priority: P1) 🎯 MVP

**Goal**: Disposer d’un modèle de données complet (Sequelize) couvrant les entités MQ et leurs relations pour générer/valider les flux.

**Independent Test**: Chaque entité du draw.io est définie (champs, contraintes) et les associations principales sont posées dans `models/index.js`.

### Implementation for User Story 1

- [X] T008 [P] [US1] Créer les modèles référentiels dans `backend/src/models/environnement.js` et `backend/src/models/application.js` (champs et contraintes clés)
- [X] T009 [P] [US1] Créer `backend/src/models/qmanager.js` (nom unique par env, dns/port, fk env)
- [X] T010 [P] [US1] Créer `backend/src/models/flux.js` et `backend/src/models/consommateur_flux.js` (type_flux, flags sécurité, fk app/env, ordre)
- [X] T011 [P] [US1] Créer `backend/src/models/topic.js` et `backend/src/models/abonnement.js` (alias .QA, filtre optionnel, etat)
- [X] T012 [P] [US1] Créer `backend/src/models/file.js` (F/FR/FT/T, alias .QA, nb_max_msg, taille_max_mo<=50, ttl<=3600, persistante, remote_qmanager_id, topic_id)
- [X] T013 [P] [US1] Créer `backend/src/models/user_mq.js` et `backend/src/models/canal.js` (login lowercase, droits, indice 1..9 ; nom canal uppercase LSN/LSS, type prod/cons/XMIT, etat)
- [X] T014 [P] [US1] Créer `backend/src/models/xmit.js` (qmanager source/dest, file_xmit_id, canal_xmit_id)
- [X] T015 [P] [US1] Créer `backend/src/models/demande_flux.js` et `backend/src/models/flux_ligne.js` (statuts demande, formulaire_json, ligne (flux_id, numero_champ unique), valeur_saisie/calculee, source_valeur)
- [X] T016 [P] [US1] Créer `backend/src/models/snow_change.js` (demande_id, snow_number, statut, sys_id, payload_json)
- [X] T017 [US1] Définir les associations dans `backend/src/models/index.js` (belongsTo/hasMany selon data-model : files ↔ qmanagers, topics ↔ abonnements ↔ files cibles, flux ↔ consommateurs ↔ applications/env, user_mq ↔ canaux, xmit ↔ qmanagers/files/canaux, demandes ↔ flux_lignes ↔ snow_change)

**Checkpoint**: Modèles Sequelize et associations alignés sur le data-model.

---

## Phase 4: User Story 2 - Comprendre le backend minimal (Priority: P2)

**Goal**: Offrir un backend prêt à l’emploi : dépendances installées, config .env, port/CORS, endpoints de base et doc d’usage.

**Independent Test**: Un dev peut installer, configurer et démarrer l’API (healthcheck OK, connexion DB OK) en suivant README/quickstart.

### Implementation for User Story 2

- [X] T018 [US2] Ajouter les dépendances dans `backend/package.json` (express, sequelize, sequelize-cli, pg, pg-hstore, cors, dotenv, logger choisi) et scripts `start`, `dev` (nodemon si souhaité)
- [X] T019 [US2] Implémenter un endpoint healthcheck `GET /api/health` dans `backend/src/api/routes/health.js` et l’enregistrer dans `app.js`
- [X] T020 [US2] Mettre à jour `backend/README.md` pour documenter l’installation, le .env, le port 3001, CORS 3000, et la commande `npx sequelize-cli db:migrate`
- [X] T021 [US2] Aligner `specs/003-datamodel-init/quickstart.md` si nécessaire avec les scripts npm effectifs (start/dev) et la liste des dépendances réelles

---

## Phase 5: User Story 3 - Tracer les artefacts DB existants (Priority: P3)

**Goal**: Rendre explicite l’inventaire des migrations/seeders existants pour éviter toute recréation ou divergence.

**Independent Test**: La doc backend mentionne clairement la migration core et le seeder environnements, avec la commande pour consulter l’état des migrations.

### Implementation for User Story 3

- [X] T022 [US3] Ajouter une section “Migrations/Seeders existants” dans `backend/README.md` listant `database/migrations/20250326123000-create-afa-core.js` et `database/seeders/20250326123500-init-environnements.js` (sans les modifier)
- [X] T023 [US3] Ajouter un script npm `migrate:status` dans `backend/package.json` (alias `npx sequelize-cli db:migrate:status`) et documenter son usage dans le README

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Harmoniser la doc et l’API de référence.

- [X] T024 [P] Vérifier/cohérer `specs/003-datamodel-init/contracts/openapi.yaml` avec les routes implémentées (health, référentiels) et ajuster si besoin
- [X] T025 [P] Passer en revue `specs/003-datamodel-init/data-model.md` pour refléter fidèlement les modèles Sequelize créés (ajouter/ajuster si écart)
- [X] T026 Mettre à jour `specs/003-datamodel-init/quickstart.md` si des changements de scripts/chemins ont été effectués

---

## Dependencies & Execution Order

### Phase Dependencies
- Setup (Phase 1) → prerequisite pour Foundational.
- Foundational (Phase 2) → prerequisite pour toutes les user stories.
- US1, US2, US3 peuvent démarrer après Phase 2 ; ordre recommandé : P1 → P2 → P3 (mais parallélisable après fondation).
- Polish (Phase 6) après les phases précédentes.

### User Story Dependencies
- US1 (P1) : aucune dépendance fonctionnelle sur US2/US3.
- US2 (P2) : dépend de la fondation et des modèles initiaux si routes utilisent les entités.
- US3 (P3) : dépend du README et scripts npm en place (US2), pas des modèles.

### Parallel Opportunities
- T002/T003 peuvent suivre T001 en parallèle (création de structure et .env example).
- Dans US1, modèles (T008–T016) peuvent être travaillés en parallèle (différents fichiers) avant associations (T017).
- US2 et US3 peuvent avancer en parallèle une fois la fondation posée, si coordination sur `package.json` et `backend/README.md`.
- Polish (T024–T026) peut se faire en parallèle si les fichiers ciblés ne sont pas en conflit.

---

## Implementation Strategy

### MVP First (US1)
1. Phase 1 + Phase 2.
2. Phase 3 (US1) pour disposer du modèle complet.
3. Valider associations et cohérence avec data-model.

### Incremental Delivery
1. Fondation OK → US1 (modèles).
2. US2 (backend prêt à l’emploi) → README/quickstart alignés.
3. US3 (traçabilité des artefacts DB) → scripts npm/README.

### Parallel Team Strategy
- Dev A : US1 (modèles + associations).
- Dev B : US2 (dépendances, health, README/quickstart).
- Dev C : US3 (doc migrations/seeders, script status).

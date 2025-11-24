# Feature Specification: Modèle de données & backend minimal AFA

**Feature Branch**: `003-datamodel-init`  
**Created**: 2025-03-26  
**Status**: Draft  
**Input**: User description: "# Incrément 003 – Modèle de données & backend minimal AFA

  ## Contexte
  - Projet AFA (Automatisation des Flux Applicatifs) pour générer des flux MQ Series.
  - Branch: 003-datamodel-init.
  - Diagramme de référence: docs/afa-datamodel.drawio (entités MQ et demandes).

  ## Attendus
  1) Spécifier fonctionnellement le modèle de données (PostgreSQL/Sequelize) couvrant toutes les entités du dernier draw.io : environnements, applications, qmanagers, flux,
  consommateur_flux, topics, abonnements, files (F/FR/FT/T + alias .QA), user_mq, canaux (LSN/LSS, prod/cons/XMIT), xmit, demande_flux, flux_lignes, snow_change. Pour chaque
  entité : champs, type attendu, contraintes (unique, FK, nullabilité), et rôle métier.
  2) spécifier le backend minimal :
     - Stack: Node.js/Express.
     - ORM: Sequelize + pg/pg-hstore.
     - Config DB via .env (`DATABASE_URL` au format postgres://user:pass@host:port/db), port HTTP par défaut 3001 (surchargé par `PORT`), CORS autorisant le front 3000.
     - Mentionner les libs nécessaires (express, sequelize, sequelize-cli, pg, pg-hstore; éventuellement express-validator/zod pour validations, pino/winston pour logs).
     - Rappeler qu’on n’automigre pas au start: migrations via `npx sequelize-cli db:migrate`, seeders via `db:seed:all`.
  3) rétro spécifier  ce qui existe déjà côté DB (sans modifier le répertoire database) : mentionner explicitement que le plan ne devra pas triater cette partie de la spec car deja mis en place par ailleurs
     - Migration initiale : `database/migrations/20250326123000-create-afa-core.js` (création des tables listées ci-dessus, uniques/ FK, table SequelizeMeta implicite).
     - Seeder d’environnements : `database/seeders/20250326123500-init-environnements.js` (DEV, INT, QUAL, REC, PREPROD, PROD).
     - README DB : `database/README.md` (procédure migrations/seeders).
  4) Sortie attendue : une spécification claire (français) décrivant modèle de données + backend minimal + configuration DB, réutilisable par un dev junior."

## Garde-fous Constitution AFA (ne pas supprimer)

- Langue : tout le contenu est rédigé en français (code/identifiants en anglais admis).
- UX cible : répond aux besoins PDD (usage expert, rapidité, clarté, peu de friction).
- Stack imposée : backend Node.js REST/JSON, frontend React + TypeScript + Vite avec composants
  WCS, base PostgreSQL via Sequelize ; aucune autre stack sans dérogation validée.
- Conventions : respecter `specs/spec-convention.md` et `specs/technical-conventions.md`
  (structure `specs/NNN-<increment>/`, user stories indépendantes, critères Given/When/Then,
  tests identifiés uniquement si demandé dans la spec/plan, traçabilité FR/SC).
- UI : pour les écrans, utiliser les composants WCS (wcs-input, wcs-select, wcs-button, etc.) en
  s’appuyant sur `.specify/support/wcs`.

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Spécifier le modèle de données AFA (Priority: P1)

Un rédacteur de spécifications veut disposer d’une description fonctionnelle exhaustive des entités MQ (apps, QMgrs, files/alias, topics/abos, canaux/users, XMIT, demandes) pour cadrer le développement et la génération du classeur MQ.

**Why this priority**: Sans modèle clair, impossible de générer l’Excel usine MQ ni de valider les flux.

**Independent Test**: Vérifier que chaque entité est décrite avec rôle métier, attributs attendus et contraintes, et que les relations principales sont explicitement listées.

**Acceptance Scenarios**:

1. **Given** la spec, **When** on consulte la section modèle de données, **Then** toutes les entités du draw.io y figurent avec leurs champs et contraintes.
2. **Given** la spec, **When** on cherche la relation entre files/alias et QManagers, **Then** la cardinalité et les contraintes d’unicité sont décrites.

---

### User Story 2 - Comprendre le backend minimal (Priority: P2)

Un dev backend veut savoir quelles dépendances installer, comment paramétrer l’API (port, CORS), et comment lire la config DB via `.env` pour brancher l’API à PostgreSQL.

**Why this priority**: Permet de démarrer rapidement l’API et de valider le modèle avec une base vivante.

**Independent Test**: Vérifier que la spec liste le port par défaut, les variables d’environnement nécessaires, et les librairies à installer pour exposer l’API et accéder à la DB.

**Acceptance Scenarios**:

1. **Given** la spec, **When** un dev prépare le backend, **Then** il trouve le port cible (3001 par défaut), les libs à installer et la variable `DATABASE_URL` à renseigner.

---

### User Story 3 - Tracer les artefacts DB existants (Priority: P3)

Un dev/ops veut savoir quelles migrations/seeders existent déjà pour éviter de les recréer.

**Why this priority**: Réduit le risque de duplication ou de divergence de schéma.

**Independent Test**: Vérifier que la spec référence explicitement la migration initiale et le seeder d’environnements, et indique qu’ils ne sont pas à rejouer dans le plan.

**Acceptance Scenarios**:

1. **Given** la spec, **When** on cherche l’inventaire des scripts DB, **Then** la migration `20250326123000-create-afa-core.js` et le seeder `20250326123500-init-environnements.js` sont mentionnés avec leur rôle.

---

### Edge Cases

- Absence de `.env` ou `DATABASE_URL` mal formée : comment le backend doit documenter le comportement attendu (erreur bloquante documentée).
- Port déjà utilisé (3001) : préciser que le port est overridable via `PORT`.
- CORS non configuré : indiquer que l’accès front (3000) doit être autorisé.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001** : La spécification DOIT décrire chaque entité du modèle (environnements, applications, qmanagers, flux, consommateurs, files/alias F/FR/FT/T, topics, abonnements, user_mq, canaux, xmit, demande_flux, flux_lignes, snow_change) avec rôle métier, attributs et contraintes (unique/FK/nullabilité/cardinalités).
- **FR-002** : La spécification DOIT expliciter les relations principales (files ↔ qmanagers, alias .QA, topics ↔ abonnements ↔ files cibles, canaux/users ↔ qmanagers, flux ↔ consommateurs, XMIT entre QMgr source/dest).
- **FR-003** : La spécification DOIT documenter le backend minimal : port HTTP par défaut (3001), variable `PORT` optionnelle, `DATABASE_URL` requise (format postgres://user:pass@host:port/db), CORS autorisé pour le front 3000, et librairies nécessaires (express, sequelize, sequelize-cli, pg, pg-hstore; validation/logging recommandés).
- **FR-004** : La spécification DOIT rappeler la procédure d’usage des migrations/seeders (exécution manuelle `npx sequelize-cli db:migrate` et `db:seed:all`, pas d’auto-migration au démarrage).
- **FR-005** : La spécification DOIT référencer les artefacts DB existants (`20250326123000-create-afa-core.js`, `20250326123500-init-environnements.js`, `database/README.md`) et indiquer que le plan ne doit pas les recréer ni les modifier.

### Key Entities *(include if feature involves data)*

- **environnements** : référentiel des environnements (code, description).
- **applications** : applications métier (nom, trigramme, MOA/MOE, responsables, localisation).
- **qmanagers** : QMgr par environnement (nom, DNS/port, hébergement, version MQ).
- **flux / consommateur_flux** : flux MQ décrivant type simple/distant/topic et la liste des consommateurs (application, environnement, ordre).
- **files (F/FR/FT/T) & alias .QA** : files MQ et alias, paramètres techniques (nb max msg, taille max, TTL, persistance), QMgr source/dest (pour FR), lien éventuel vers topic.
- **topics / abonnements** : topics MQ, alias, rubrique, abonnements (état, filtre, file cible, consommateur).
- **user_mq / canaux** : credentials MQ (login, droits, indice) et canaux (nom LSN/LSS, type prod/cons/XMIT, CN, état) liés à QMgr.
- **xmit** : liaisons XMIT (file + canal) entre QMgr source/destination.
- **demande_flux / flux_lignes** : demandes, statuts, formulaires JSON, lignes de formulaire (valeur saisie/calculée, source AUTO/SAISIE/OPT).
- **snow_change** : suivi du ticket ServiceNow associé à une demande.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001** : 100 % des entités présentes dans le draw.io sont décrites avec rôle, attributs et contraintes testables.
- **SC-002** : Un dev junior peut configurer l’API et la base en < 15 minutes en suivant la section backend (port, CORS, env var, libs, commandes migrations/seeders).
- **SC-003** : Les artefacts DB existants (migration initiale, seeder environnements, README DB) sont référencés sans ambiguïté, sans requérir de recréation.
- **SC-004** : Les edge cases de configuration (port, `.env`, CORS) sont identifiables et adressés dans la spec.

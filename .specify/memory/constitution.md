<!--
Sync Impact Report
- Version: 1.0.0 → 1.1.0
- Modified principles: Organisation des spécifications Speckit (tests désormais créés uniquement si demandés)
- Added sections: none
- Removed sections: none
- Templates requiring updates: ✅ .specify/templates/plan-template.md; ✅ .specify/templates/spec-template.md; ✅ .specify/templates/tasks-template.md
- Follow-up TODOs: none
-->

# Constitution AFA (Automatisation des Flux Applicatifs)

## Core Principles

### I. Expérience Utilisateur (UX) ciblée

L’application sert des experts métiers PDD (Pilotes De la Demande) et privilégie la rapidité,
la lisibilité et l’efficacité pour un usage intensif. L’interface est responsive et accessible,
mais aucun compromis n’est accepté sur la vitesse d’exécution ou la clarté des actions clés.

### II. Langue et communication

- Français obligatoire pour toute documentation, spécification, ticket et prompt IA.
- L’IA doit répondre exclusivement en français.
- Exceptions limitées : code, identifiants (API, classes, variables) et citations externes.
- Interdiction de livrer une spécification ou un prompt entièrement en anglais (hors exceptions).

### III. Conventions de développement et de spécification

Le document `specs/spec-convention.md` est la source unique de vérité pour la rédaction des
specs Speckit (écrans, APIs, entités). En cas de conflit avec un autre document, ses règles
priment. Toute spec doit être traçable, testable et rédigée en français avec user stories
indépendantes et scénarios Given/When/Then.

### IV. Invariants techniques

- Stack imposée : backend Node.js (LTS) en REST HTTP/JSON avec validation des payloads côté
  backend ; frontend React + TypeScript + Vite utilisant exclusivement les Web Components WCS
  (`.specify/support/wcs` comme référence) ; PostgreSQL via Sequelize/CLI pour la base.
- Les specs Speckit ne doivent proposer que des architectures compatibles avec cette stack.
- Les écrans décrivent l’intent fonctionnel en WCS (wcs-input, wcs-select, wcs-button, etc.)
  sans détailler CSS ou logique JS.
- Les APIs et entités doivent rester cohérentes avec des routes REST Node.js et une base SQL.

## Invariants techniques et assets de référence

- Conventions techniques détaillées dans `specs/technical-conventions.md` : toute dérogation
  doit être validée par un architecte et documentée.
- Documentation WCS locale requise dans `.specify/support/wcs` pour guider les écrans React.
- Dépôt organisé selon l’arborescence imposée (backend/, frontend/, database/, infrastructure/)
  afin de garantir la cohérence des livrables Speckit avec les cibles de déploiement.

## Organisation des spécifications Speckit

- Dossiers d’incrément : `specs/NNN-<nom-increment>/` regroupant écrans (screen-*), APIs
  (api-*) et entités (entity-*).
- Templates obligatoires : `specs/screen-template.md`, `specs/api-template.md`,
  `specs/entity-template.md` comme base de chaque fichier.
- Métadonnées minimales : nom d’incrément, branche Git `feat/spec/NNN-<nom>`, statut
  (Draft/Reviewed/Approved), date de mise à jour, auteur/relecteur optionnel.
- User stories prioritaires (P1, P2, …), indépendantes, avec critères Given/When/Then et
  tests identifiés uniquement si la spec ou le plan l’exigent (contrat/integration/données). Aucune
  génération systématique de tests n’est autorisée. Toute incertitude est marquée
  `NEEDS CLARIFICATION` et traitée dans `plan.md`.
- Traçabilité : exigences FR limitées au périmètre de la spec, liens explicites vers APIs,
  écrans et entités concernés ; historique des changements versionné dans chaque spec.

## Gouvernance

- La présente Constitution est la référence du projet AFA et prime sur tout autre document.
- Amendements : documentés, approuvés par un architecte, communiqués à l’équipe produit et
  intégrés dans cette Constitution avec incrément de version sémantique.
- Contrôles systématiques : toute revue (spec, plan, tâches, code) vérifie la conformité aux
  principes I-IV, à `specs/spec-convention.md` et à `specs/technical-conventions.md`.
- Versioning : MAJOR pour changements incompatibles ou suppression de principes, MINOR pour
  ajout/extension de principe ou section, PATCH pour clarifications sans impact de fond.
- Tout écart doit être justifié dans le plan ou la spec concernée avec alternative plus simple
  évaluée ; aucune livraison n’est acceptée si la langue ou la stack s’écartent des principes.

**Version**: 1.1.0 | **Ratified**: 2025-11-23 | **Last Amended**: 2025-11-23

# Feature Specification: Formulaire demande MQ

**Feature Branch**: `002-mq-demande`  
**Created**: 2025-11-24  
**Status**: Draft  
**Input**: Besoin exprimé : afficher une page `/mq/demande` dédiée, simple et cohérente avec les pages existantes, contenant un placeholder de formulaire (« Ici le formulaire de saisie de la demande de flux ») en attendant l’intégration backend.

## Garde-fous Constitution AFA

- Langue : contenu en français, code/identifiants en anglais admis.
- UX cible : usage expert, rapidité, clarté ; style simple et épuré, cohérent avec Home et MQ.
- Stack imposée : frontend React+TypeScript+Vite avec WCS, backend Node.js REST/JSON, PostgreSQL via Sequelize (non sollicité dans cet incrément), thème Holding WCS.
- Conventions : respecter `specs/spec-convention.md` et `specs/technical-conventions.md`, dossiers `specs/NNN-increment/`, composants WCS pour l’UI.
- UI : composants WCS (wcs-button, wcs-form-field, wcs-card/skeleton/spinner), référence `.specify/support/wcs`.

## Objectif métier

Permettre à l’utilisateur de disposer d’une page dédiée à la demande de flux MQ, alignée visuellement avec les autres pages, en attendant la définition du formulaire et de l’API d’initialisation.

## Périmètre fonctionnel (v0 placeholder)

- Route `/mq/demande` accessible depuis le CTA « Faire une demande de flux MQ Series » de la page `/mq`.
- Afficher le layout commun : header AFA (logo SNCF + titre), fil d’Ariane « Bienvenue > MQ Series > Demande de flux », footer Contact.
- Zone centrale : un bloc WCS (ex. wcs-card) contenant le texte « Ici le formulaire de saisie de la demande de flux » pour éviter tout blocage en absence de backend.
- États : LOADING (spinner WCS) facultatif si future init, SUCCESS (affichage placeholder), ERROR (message + bouton Réessayer, même si l’init est absente à ce stade).

## Hypothèses / Backlog

- L’API d’initialisation et les champs du formulaire seront définis dans un incrément ultérieur ; non bloquant pour ce livrable.
- Aucun stockage ni validation métier côté frontend pour ce placeholder.

## Critères de succès (v0)

- SC-001 : Depuis `/mq`, le clic « Faire une demande de flux MQ Series » affiche une nouvelle page `/mq/demande` avec header, breadcrumb, footer et le texte placeholder.
- SC-002 : L’écran reste cohérent visuellement (thème Holding, composants WCS) et simple/épuré, aligné avec Home et MQ.
- SC-003 : Responsive : le bloc central reste lisible et centré sur desktop et mobile.

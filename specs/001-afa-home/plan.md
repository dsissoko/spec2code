# Implementation Plan: Page d'accueil AFA

**Branch**: `001-afa-home` | **Date**: 2025-11-23 | **Spec**: specs/001-afa-home/spec.md  
**Input**: Feature specification from `specs/001-afa-home/spec.md`

**Note**: Plan focalisé sur l’UI WCS (frontend uniquement). Pas de backend dans cet incrément. Pas de génération de tests par défaut (conformément à la Constitution v1.1.0).

## Summary

Créer la home AFA en WCS avec header (logo SNCF + titre complet), deux CTA centraux (« Flux MQ Series », « Flux Fluxbox »), footer avec lien contact, responsive desktop/mobile. Créer la page MQ Series avec fil d’Ariane (« Bienvenue > MQ Series ») et deux CTA (« Faire une demande de flux MQ Series », « Cartographie »). Appliquer le thème WCS SNCF Holding, respecter les maquettes `afa.png` et `afa-mq.png`, sans toucher au backend.

## Technical Context

**Language/Version**: TypeScript, React (WCS web components)  
**Primary Dependencies**: WCS SNCF (design system), Vite (outillage front)  
**Storage**: N/A (pas d’état persistant dans cet incrément)  
**Testing**: Non prévu par défaut (pas demandé)  
**Target Platform**: Web desktop et mobile (responsive)  
**Project Type**: Web app (frontend uniquement sur cet incrément)  
**Performance Goals**: Chargement et affichage immédiats des CTA (pas de latence perçue)  
**Constraints**: Respect strict des maquettes, accessibilité (focus/contraste), thème WCS Holding  
**Scale/Scope**: Page d’accueil + page MQ statiques/navigations internes

## Constitution Check

- Langue : tout le contenu (spec/plan/tasks, prompts) reste en français ; code/identifiants peuvent être en anglais.
- UX PDD : page d’entrée claire, accès immédiat aux flux MQ/FluxBox, friction minimale.
- Stack imposée : frontend React + TypeScript + Vite + composants WCS ; aucune dépendance backend ajoutée dans cet incrément.
- Conventions : respecter `specs/spec-convention.md` et `specs/technical-conventions.md` (structure `specs/NNN-.../`, user stories indépendantes, Given/When/Then, traçabilité FR/SC).
- Assets WCS : utiliser le thème WCS SNCF Holding et les composants WCS (boutons, typographie, focus) en s’appuyant sur `.specify/support/wcs`.
- Tests : ne pas générer de tâches/tests par défaut (uniquement si demandés explicitement).

## Project Structure

### Documentation (ce feature)

```text
specs/001-afa-home/
├── spec.md
├── plan.md              # ce fichier
└── checklists/
    └── requirements.md
```

### Source Code (dépôt)

```text
frontend/
└── src/
    ├── components/      # Header/Footer/CTA blocks
    ├── pages/           # Home, MQ Series page
    └── services/        # (non modifié dans cet incrément)

backend/ (inchangé)
database/ (inchangé)
infrastructure/ (inchangé)
```

**Structure Decision**: Web app, travail limité au dossier `frontend/` (pages + composants WCS). Aucun changement backend/database/infrastructure dans cet incrément.

## Complexity Tracking

> Aucune dérogation de complexité identifiée (pas d’ajout de projet, pas de pattern supplémentaire).

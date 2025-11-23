# Conventions techniques AFA

Ce document définit les contraintes techniques imposées par l’architecture de l’entreprise pour le projet AFA.
Il complète la Constitution AFA et doit être respecté par toutes les spécifications Speckit (screen-*, api-*, entity-*).

## 1. Stack technique imposée

### 1.1 Backend

- Runtime : Node.js (LTS)
- API : REST HTTP/JSON
- Framework serveur : Express ou équivalent léger
- Tests : unitaires et d’intégration
- Format des réponses : JSON
- Validation des payloads : effectuée côté backend

Toutes les specs d’API Speckit (api-*) doivent être compatibles avec une implémentation Node.js.

### 1.2 Frontend

- React + TypeScript
- Vite (dev server + build)
- WCS – SNCF Web Component System Référence : https://wcs.dev.sncf/?path=/docs/documentation-introduction--documentation : l'ensemble des informations relatives à WCS est disponible dans .specify/support/wcs

Contraintes UI :

- Les écrans doivent utiliser les Web Components WCS pour toutes les briques d’interface (wcs-input, wcs-select, wcs-button, wcs-form-field, wcs-card, etc.).
- Les patterns de layout (grids, spacing, formulaires) doivent suivre les conventions WCS.
- Les specs screen-* doivent refléter cette contrainte : champ → wcs-input, bouton → wcs-button, etc.

## 2. Organisation du dépôt

Le dépôt doit respecter l’arborescence suivante :

.
├── backend
├── database
│   ├── migrations
│   └── seeders
├── docs
├── frontend
├── infrastructure
│   ├── aws_eb
│   ├── azure_caas
│   └── nuagik

### 2.1 backend/

- Code Node.js
- Routes REST
- Tests backend
- Intégration base de données
- Manipulation du modèle métier décrit par les specs Speckit

### 2.2 frontend/

- Application React + Vite + TypeScript
- Pages et composants
- Intégration WCS
- Appels aux APIs définies dans les specs Speckit

### 2.3 database/

- migrations/ : scripts de création et modification de schémas
- seeders/ : données initiales ou de démonstration

### 2.4 infrastructure/

- aws_eb : fichiers de déploiement Elastic Beanstalk
- azure_caas : fichiers de déploiement Azure Container App Service
- nuagik : fichiers de déploiement Nuagik

Les specs Speckit ne doivent pas supposer une architecture incompatible avec ces cibles.

## 3. Règles d’usage avec Speckit

### 3.1 Specs d’écran (screen-*)

- Décrivent des écrans React utilisant WCS
- Présentent uniquement l’intent fonctionnel et les interactions UI
- Évitent les détails CSS ou la logique JavaScript précise
- L’IA doit proposer une UI cohérente avec WCS par défaut

### 3.2 Specs d’API (api-*)

- Chaque endpoint doit correspondre à une route REST implémentée dans backend/
- Les payloads doivent rester strictement JSON
- Les specs ne doivent pas supposer l’usage d’un backend autre que Node.js

### 3.3 Specs d’entités (entity-*)

- Les entités persistées doivent être cohérentes avec une base SQL
- Les migrations associées doivent être créées dans database/migrations

## 4. Documentation WCS locale

Pour aider l’IA et les humains à produire des écrans cohérents avec le design system SNCF, la documentation WCS est stockée dans le dépôt :

- Dossier : .specify/support/wcs
- Contenu attendu :
  - extraits HTML des pages WCS (Storybook, docs…)
  - un fichier wcs-cheatsheet.md regroupant les patterns principaux
  - des exemples d’intégration React + WCS

Les modèles d’IA utilisés avec Speckit peuvent s’appuyer sur ces fichiers pour générer :

- des specs screen-* respectant WCS
- du code React utilisant correctement les Web Components WCS

Quand un nouveau pattern UI important est identifié, il doit être ajouté dans ce dossier.

## 5. Évolution des conventions

Toute modification de ce fichier doit être :

1. validée par un architecte
2. versionnée
3. communiquée à l’équipe produit
4. intégrée dans le workflow Speckit si nécessaire

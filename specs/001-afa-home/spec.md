# Feature Specification: Page d'accueil AFA

**Feature Branch**: `[001-afa-home]`  
**Created**: 2025-11-23  
**Status**: Draft  
**Input**: User description: "je voudrais créer la home page de afa elle contient un header avec le logo sncf et le nom de lapplication AFA (Automatisation des Flux Applicatifs), un footer avec un lien contact, un contenu principal qui affichera au centre 2 gros boutons cliquables : le 1er bouton a comme label \"Flux MQ Series\" et le 2eme a comme label \"Flux Fluxbox\". Lensemble doit être responsive bien sur"

Références visuelles (maquettes) : `specs/001-afa-home/afa.png` (home) et `specs/001-afa-home/afa-mq.png` (page MQ).

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

### User Story 1 - [Brief Title] (Priority: P1)

Page d’accueil PDD : En tant que PDD, je veux accéder à la page d’accueil pour identifier
immédiatement l’application et choisir rapidement le flux à consulter (Flux MQ Series ou Flux
Fluxbox).

**Why this priority**: Point d’entrée principal pour tout parcours sur l’application AFA.

**Independent Test**: Ouvrir la home et vérifier la présence du header (logo SNCF + nom complet),
des deux boutons centrés et leur cliquabilité vers les sections correspondantes.

**Acceptance Scenarios**:

1. **Given** un PDD arrive sur la page d’accueil, **When** la page se charge, **Then** il voit le
   logo SNCF, le nom complet « AFA – Automatisation des Flux Applicatifs » et les deux boutons
   centrés « Flux MQ Series » et « Flux Fluxbox ».
2. **Given** un PDD sur la page d’accueil, **When** il clique « Flux MQ Series », **Then** il est
   dirigé vers la section Flux MQ Series.
3. **Given** un PDD sur la page d’accueil, **When** il clique « Flux Fluxbox », **Then** il est
   dirigé vers la section Flux Fluxbox.
4. **Given** un PDD a cliqué « Flux MQ Series », **When** la page MQ Series s’affiche, **Then** il
   voit le fil d’Ariane « Bienvenue > MQ Series » et deux boutons : « Faire une demande de flux MQ
   Series » et « Cartographie ».

---

### User Story 2 - Contact support (Priority: P2)

En tant que utilisateur AFA, je veux un lien de contact visible pour solliciter de l’aide sans
quitter la page d’accueil.

**Why this priority**: Réduit la friction pour obtenir du support produit.

**Independent Test**: Cliquer sur le lien de contact du footer et vérifier l’ouverture du canal de
support défini (page ou mailto).

**Acceptance Scenarios**:

1. **Given** un utilisateur voit le footer, **When** il clique sur « Contact », **Then** le canal de
   support configuré s’ouvre (mailto support AFA ou page de contact) avec le focus clavier conservé.

---

### User Story 3 - Affichage responsive (Priority: P3)

En tant que utilisateur mobile, je veux que la page d’accueil reste lisible et utilisable sur petit
écran.

**Why this priority**: Garantit l’accès depuis postes mobiles ou tablettes terrain.

**Independent Test**: Charger la page sur viewport réduit et vérifier que header, boutons et footer
restent visibles, accessibles et sans recouvrement.

**Acceptance Scenarios**:

1. **Given** un viewport mobile, **When** la page se charge, **Then** les deux boutons sont centrés
   ou empilés avec un espace suffisant pour un tap sans recouvrement et le header/footer restent
   visibles et accessibles.

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- Logo SNCF indisponible : afficher un texte alternatif « SNCF » pour garder l’identification.
- Viewport très étroit : boutons empilés verticalement et toujours entièrement visibles.
- Canal de contact non configuré : afficher un message clair et ne pas bloquer la navigation.
- Charge lente des assets de maquette : conserver une mise en page stable sans décalage majeur
  (pas de layout shift perceptible).

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: La page d’accueil affiche un header contenant le logo SNCF (avec texte alternatif) et
  le nom complet « AFA – Automatisation des Flux Applicatifs ».
- **FR-002**: La zone principale présente deux boutons centrés et de grande taille libellés
  « Flux MQ Series » et « Flux Fluxbox » et chacun est cliquable sur desktop et mobile.
- **FR-003**: Le clic sur « Flux MQ Series » redirige vers la section dédiée aux flux MQ Series ;
  le clic sur « Flux Fluxbox » ouvre l’URL externe `https://portail-fluxbox.flx.sncf.fr`.
- **FR-004**: La page MQ Series affiche un fil d’Ariane « Bienvenue > MQ Series » et deux boutons
  alignés : « Faire une demande de flux MQ Series » et « Cartographie », correspondant aux maquettes
  `afa-mq.png`.
- **FR-005**: Un footer est présent sur toutes les tailles d’écran et contient un lien « Contact »
  qui ouvre le canal de support configuré (page de contact ou mailto support AFA) sans bloquer la
  navigation.
- **FR-006**: L’affichage est responsive : sur viewport réduit, les boutons restent entièrement
  visibles, lisibles et espacés ; le header et le footer restent accessibles sans chevauchement.
- **FR-007**: Les composants UI utilisés sont alignés sur WCS (boutons, typographie, espace) et
  conservent un contraste et un focus clavier visibles pour l’accessibilité.
- **FR-008**: Le thème visuel appliqué est le thème WCS SNCF Holding (palette et styles par défaut
  du design system) pour assurer cohérence graphique entre pages.
- **FR-009**: Sur desktop, chaque bouton mesure environ 200–220 px de large et 120–140 px de haut
  (ordre de grandeur de la maquette) avec un padding interne confortable (~24 px vertical et
  24–32 px horizontal) et un espacement horizontal entre les deux boutons de ~40–60 px ; sur mobile,
  les boutons s’empilent verticalement avec un espacement d’au moins 16–24 px.
- **FR-010**: En environnement de développement, le frontend est servi sur le port `3000` pour
  garantir la cohérence des accès.

### Key Entities *(include if feature involves data)*

- Aucune entité métier nouvelle : la page est purement navigationnelle.

### Assumptions & Implementation Notes

- Routage spécifique à cet incrément : `/` (Home), `/mq` (page MQ), `/mq/demande` (demande de flux
  MQ) et `/mq/cartographie` (cartographie MQ). Les deux sous-routes MQ sont de vraies pages à
  prévoir, pas de placeholders.
- Logo SNCF accessible dans `frontend/public/assets/sncf-logo.png` (ou équivalent) avec texte
  alternatif « SNCF ».
- Lien contact par défaut : `mailto:david.sissoko@sncf.fr` (ajustable si autre canal est fourni).
- Thème WCS SNCF Holding appliqué via les assets disponibles pour styliser header, CTA et footer.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Sur desktop (≥1280px), header, deux boutons et footer sont visibles sans scroll
  initial dans 100 % des essais.
- **SC-002**: Sur mobile (≤768px), les deux boutons restent entièrement visibles et espacés, avec un
  tap possible sans recouvrement dans 100 % des essais.
- **SC-003**: 100 % des clics sur « Flux MQ Series » et « Flux Fluxbox » ouvrent la section cible en
  une seule action depuis la home.
- **SC-004**: Sur la page MQ Series, 100 % des clics sur « Faire une demande de flux MQ Series » et
  « Cartographie » déclenchent la navigation attendue depuis la grille centrale.
- **SC-005**: Les espacements et dimensions observés sur desktop restent dans la fourchette visée
  (boutons ~200–220 px x ~120–140 px, marge horizontale ~40–60 px) et sur mobile l’empilement
  conserve au moins 16–24 px d’espace vertical.
- **SC-006**: 100 % des clics sur « Flux Fluxbox » ouvrent l’URL `https://portail-fluxbox.flx.sncf.fr`
  en une action depuis la home.
- **SC-007**: 100 % des clics sur « Contact » ouvrent le canal de support défini et restent
  accessibles via clavier comme via pointeur.

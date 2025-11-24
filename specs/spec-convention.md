# Convention de rédaction des spécifications (spec.md)

## 1. Objectif

Fournir des spécifications lisibles par un humain (français), alignées avec la Constitution AFA et
exploitables directement par `plan.md`, `tasks.md` et les équipes front/back/data.

Les spécifications doivent permettre à l’IA et aux humains de comprendre clairement :
- le besoin métier,
- l’impact sur les écrans, les APIs et les données,
- les critères de succès et les tests associés.

---

## 2. Organisation des fichiers

La racine des spécifications Speckit est :

specs/
    spec-convention.md        # conventions de rédaction (ce fichier)
    screen-template.md        # template global pour les écrans
    api-template.md           # template global pour les APIs
    entity-template.md        # template global pour les entités

    001-<nom-increment>/
      screen-*.md             # écrans de cet incrément (optionnel)
      api-*.md                # APIs de cet incrément (optionnel)
      entity-*.md             # entités de cet incrément (optionnel)

    002-<nom-increment>/
      ...

- Chaque répertoire NNN-<nom-increment> représente un incrément fonctionnel.
- Tous les fichiers de specs liés à cet incrément (écrans, APIs, entités) sont regroupés dans ce répertoire.
- Les templates globaux servent de base pour chaque nouveau fichier.

---

## 3. Types de fichiers et templates obligatoires

Dans chaque répertoire d’incrément (001-.../, 002-.../, etc.) :

- screen-*.md  
  → doit suivre la structure décrite dans screen-template.md.

- api-*.md  
  → doit suivre la structure décrite dans api-template.md.

- entity-*.md  
  → doit suivre la structure décrite dans entity-template.md.

Rappels :
- Nommage en kebab-case : screen-sessions.md, api-sessions-list.md, entity-session.md.
- Un fichier par sujet : une entité, une API, un écran.

---

## 4. Langue et ton

- Langue : français.
- Phrases courtes, vocabulaire métier explicite.
- Éviter le jargon technique non expliqué (ou le définir rapidement).
- Prioriser la compréhension par un humain avant tout formatage machine.

---

## 5. Structure minimale d’une spec (quel que soit le type)

Chaque fichier de spec (écran, API, entité) doit inclure au minimum :

### 5.1 Métadonnées

Bloc en haut de fichier :

- Nom de l’incrément (ex : 001-session-list).
- Branche Git associée (ex : 001-session-list).
- Statut : Draft / Reviewed / Approved.
- Date de dernière mise à jour.
- Auteur / relecteur (optionnel).

### 5.2 Contenu structuré

Suivant le type (screen/api/entity), utiliser le template correspondant :
- Objectif métier clair.
- Règles visibles / comportement attendu.
- Références aux autres specs (screen/api/entity) si nécessaire.
- Historique / incréments de cette spec.

---

## 6. Règles d’écriture des user stories

Lorsque des user stories sont présentes dans une spec :

- Chaque story doit être un incrément autonome, implémentable et déployable seule.
- Scénarios d’acceptation structurés en Given / When / Then, couvrant :
  - au moins un cas de succès,
  - les erreurs métiers prévisibles.
- Tests à prévoir :
  - validations front (comportement visible),
  - validations back (contrats d’API),
  - validations données (persistance, intégrité).

---

## 7. Règles d’exigences et de couverture

- Les exigences fonctionnelles (FR-xxx) couvrent uniquement le périmètre de la spec.
- Les extensions futures sont reportées en backlog.
- Toute interface nouvelle ou modifiée doit préciser :
  - les I/O attendus,
  - les principaux scénarios d’intégration.
- Edge cases à considérer :
  - absence de données,
  - limites de pagination,
  - droits insuffisants,
  - valeurs incohérentes,
  - timeouts / erreurs visibles.

---

## 8. Alignement front / back / base de données

Pour chaque incrément :

- Identifier, quand c’est pertinent :
  - les écrans concernés (screen-*.md),
  - les APIs concernées (api-*.md),
  - les entités manipulées (entity-*.md).
- Décrire les règles backend :
  - propriétés garanties,
  - tri / pagination,
  - filtrage,
  - statuts / droits.
- Préciser la source de vérité :
  - base de données,
  - cache,
  - stockage front.

---

## 9. UX interne (productivité)

- Optimiser pour des experts internes : peu de friction, informations clés visibles, raccourcis clavier possibles.
- Messages et erreurs : compréhensibles, en français, cohérents entre écrans.
- Responsive si le contexte l’exige ; sinon préciser le device principal.

---

## 10. Traçabilité

- Chaque story (si présente) référence FR et SC concernés.
- Les liens entre fichiers assurent la cohérence interne.
- Toute incertitude = NEEDS CLARIFICATION → traiter dans plan.md.

---

## 11. Version et historique

- Mise à jour du statut : Draft → Reviewed → Approved.
- Documenter les changements majeurs :
  - ajout / modification de règle métier,
  - nouveau cas d’usage,
  - rupture de compatibilité éventuelle.

---

## 12. Validation constitutionnelle

Avant d’approuver une spec :

- Stories indépendantes et en français.
- Scénarios d’acceptation mesurables.
- Tests identifiés (contrat / intégration).
- UX conforme à la Constitution AFA.

---

## 13. Organisation des incréments et workflow Git

- Les spécifications sont regroupées par incrément fonctionnel :

  specs/NNN-nom-increment/

- Un incrément peut contenir :
  - uniquement du frontend (screen-*.md),
  - uniquement du backend (api-*.md),
  - uniquement du modèle (entity-*.md),
  - ou une combinaison des trois.

- Chaque incrément correspond à une branche Git dédiée :

  NNN-nom-increment

- Les templates globaux doivent être utilisés comme référence.

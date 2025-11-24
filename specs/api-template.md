# API <Nom> (`/chemin/exemple`)

## 0. Métadonnées

- Incrément : `NNN-nom-increment`
- Branche : `NNN-nom-increment`
- Statut : `Draft` / `Reviewed` / `Approved`
- Dernière mise à jour : `AAAA-MM-JJ`
- Auteur / Relecteur(s) : …

---

## 1. Objectif

Décrire ce que fournit cette API, pour qui, et pour quel usage métier.  
Ex. : Fournir la liste des sessions avec leurs statuts pour affichage dans l’écran Sessions.

---

## 2. Consommateurs

- Écrans consommateurs (dans le même incrément ou ailleurs) :
  - `[screen-xxx.md](./screen-xxx.md)` (si applicable)
- (Optionnel) Autres services internes consommateurs.

---

## 3. Endpoints exposés

Lister les endpoints (sans forcément tout le détail technique).

### 3.1 GET `/api/...`

- But : …
- Paramètres principaux (au niveau fonctionnel) :
  - `status` (optionnel, valeurs possibles : …)
  - `fromDate` / `toDate` (optionnels)
- Règles de base :
  - tri par défaut,
  - limites (pagination, nombre max de résultats),
  - filtres implicites (ex : sessions non supprimées).

### 3.2 (Autres endpoints si besoin)

---

## 4. Données manipulées

Référencer les entités concernées plutôt que copier les champs :

- `[entity-xxx.md](./entity-xxx.md)`

Préciser :

- quelles propriétés sont **garanties** (non nulles),
- quelles transformations sont faites (ex : formatage de dates pour le front),
- quelles propriétés sont **optionnelles**.

---

## 5. Règles métier côté backend

Décrire les règles métier importantes appliquées par cette API :

- Filtrage en fonction des droits utilisateur.
- Gestion des statuts (`active`, `archived`, `deleted`, etc.).
- Contrôles métiers (ex : interdire l’accès à certaines données selon le rôle).
- Limitation du nombre de résultats / pagination obligatoire.

> Pas besoin de pseudo-code : on décrit les **règles**, pas l’implémentation.

---

## 6. Erreurs et cas particuliers

- Codes d’erreur (en termes **métier**, pas forcément HTTP) :
  - ex : `SESSION_NOT_FOUND`, `INVALID_PERIOD`, `UNAUTHORIZED_ACTION`.
- Messages d’erreur “stables” attendus par le front.
- Cas limites :
  - trop de résultats,
  - aucune donnée,
  - paramètres incohérents,
  - ressource inexistante.

---

## 7. Historique / Incréments

- v1.0 : exposition basique de la liste
- v1.1 : ajout du filtre par statut
- v1.2 : ajout de la pagination

> Permet de suivre les changements sans relire tout l’historique Git.

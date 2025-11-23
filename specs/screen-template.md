# Screen <Nom de l’écran>

## 0. Métadonnées

- Incrément : NNN-nom-increment
- Branche : feat/spec/NNN-nom-increment
- Statut : Draft / Reviewed / Approved
- Dernière mise à jour : AAAA-MM-JJ
- Auteur / Relecteur(s) : …

---

## 1. Objectif

Décrire en une phrase le rôle de cet écran pour l’utilisateur métier interne.
Ex. : Permettre à l’utilisateur de consulter et gérer ses sessions.

---

## 2. Utilisateurs cibles

- Qui utilise cet écran ? (ex : PDD, support, managers…)
- Contexte d’usage : fréquence, moment, device.

---

## 3. Comportements principaux

Actions possibles côté utilisateur :

- Lister / filtrer / rechercher
- Créer / modifier / supprimer
- Naviguer vers un autre écran
- Lancer un traitement (ex : démarrer une session)

> Pas de technique ici, seulement “ce que l’utilisateur peut faire”.

---

## 4. États de l’écran

États à décrire :

- EMPTY
- LIST
- LOADING
- ERROR

Pour chaque état :

- ce qui est visible,
- ce qui est cliquable,
- cas concrets si nécessaire.

---

## 5. Sources de données

APIs utilisées :

- API interne : [api-xxx.md](./api-xxx.md)
- (Optionnel) API externe

Sources possibles :

- cache local,
- stockage front,
- paramètres de navigation (ex : ID passé depuis un autre écran).

---

## 6. Règles métier visibles

Règles impactant l’UX :

- conditions de désactivation des boutons,
- messages d’erreur d’usage,
- colonnes obligatoires dans une liste,
- tri par défaut visible par l’utilisateur.

---

## 7. Accessibilité et UX

- Responsive si pertinent.
- Navigation clavier.
- Messages d’erreur clairs et en français.
- Bonnes pratiques UI :
  - titres cohérents,
  - contrastes suffisants,
  - tailles de police adaptées.

---

## 8. Historique / Incréments

- v1.0 : première version
- v1.1 : ajout d’un filtre
- v1.2 : amélioration de la pagination

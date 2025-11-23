# Entity <Nom de l’entité> (ex. Session)

## 0. Métadonnées

- Incrément : `NNN-nom-increment`
- Branche : `feat/spec/NNN-nom-increment`
- Statut : `Draft` / `Reviewed` / `Approved`
- Dernière mise à jour : `AAAA-MM-JJ`
- Auteur / Relecteur(s) : …

---

## 1. Rôle de l’entité

Décrire ce que représente cette entité dans le métier.  
Ex. : Une session représente une période d’activité, avec un début, une fin et un statut.

---

## 2. Attributs

Lister les champs de l’entité de manière conceptuelle (pas forcément typée Java) :

- `id` : identifiant unique technique (string / UUID)
- `label` : libellé lisible par l’utilisateur
- `status` : statut (ex : CREATED, RUNNING, PAUSED, STOPPED)
- `startTime` : date/heure de début
- `endTime` : date/heure de fin (optionnelle)
- `ownerId` : identifiant du propriétaire (référence à User)
- …

Pour chaque attribut, préciser :

- **obligatoire / optionnel**,
- **sens métier**,
- contraintes éventuelles (ex : `endTime > startTime`).

---

## 3. Relations

Lister les relations importantes avec d’autres entités :

- `owner` : lien vers `[entity-user.md](./entity-user.md)`
- Autres relations éventuelles.

Préciser :

- multiplicité (1–1, 1–N, N–N),
- direction principale de la relation (si utile côté métier).

---

## 4. Utilisation principale

Exemples de contextes où cette entité est utilisée :

- Affichage dans `[screen-xxx.md](./screen-xxx.md)`
- Exposée par `[api-xxx.md](./api-xxx.md)`
- Utilisée dans des règles métier particulières (ex : calcul d’indicateurs).

---

## 5. Cycle de vie et invariants

### 5.1 Cycle de vie (exemple)

Exemple pour une session :

- `CREATED` → `RUNNING` → `PAUSED` → `RUNNING` → `STOPPED` → `ARCHIVED`

Adapter ce schéma au besoin de l’entité.

### 5.2 Invariants

Lister les règles toujours vraies, par exemple :

- Une session ne peut pas être en statut `RUNNING` si `startTime` est null.
- Une session terminée (`STOPPED` ou `ARCHIVED`) doit avoir un `endTime` non null.
- Certaines transitions de statut sont interdites (ex : `ARCHIVED` → `RUNNING`).

---

## 6. Historique / Incréments

- v1.0 : définition initiale de l’entité
- v1.1 : ajout du champ `archived`
- v1.2 : ajout d’un nouvel invariant métier

> Permet de comprendre comment l’entité a évolué sans aller fouiller le code.

# Screen Formulaire demande MQ (`/mq/demande`)

## 0. Métadonnées

- Incrément : 002-mq-demande
- Branche : 002-mq-demande
- Statut : Draft
- Dernière mise à jour : 2025-11-24
- Auteur / Relecteur(s) : À renseigner

---

## 1. Objectif

Permettre à un utilisateur interne d’accéder à la page `/mq/demande`, alignée visuellement avec Home/MQ, et d’y afficher un bloc central WCS contenant le texte « Ici le formulaire de saisie de la demande de flux » pour éviter tout blocage en l’absence de backend. Prévoir la future pré-initialisation via appel REST sans la rendre bloquante.

---

## 2. Utilisateurs cibles

- PDD / équipes support flux applicatifs.
- Usage ponctuel mais critique pour initier une demande MQ.
- Device : desktop en priorité, mobile/tablette possible (responsive requis).

---

## 3. Comportements principaux

- Afficher le header AFA (logo SNCF + titre) et le fil d’Ariane « Bienvenue > MQ Series > Demande de flux ».
- Afficher un bloc central WCS (ex. wcs-card) avec le texte « Ici le formulaire de saisie de la demande de flux » (placeholder).
- Prévoir la future pré-initialisation via appel REST sans bloquer le rendu actuel.
- États gérés : chargement initial (spinner/skeleton si init ajoutée), succès (affichage placeholder), erreur (message et action de retry si init ajoutée).
- Soumettre/continuer : différé à un incrément ultérieur (non bloquant pour ce livrable).
- Footer avec lien Contact présent et accessible.

---

## 4. États de l’écran

- LOADING : spinner WCS ou skeleton sur la zone centrale (uniquement si un appel d’init est ajouté plus tard).
- SUCCESS : afficher le bloc central avec le texte placeholder. Si des données d’init existent plus tard, préremplir alors le formulaire réel.
- ERROR : message clair en français + bouton WCS « Réessayer » (si un appel d’init est présent).
- EMPTY : comportement par défaut actuel (placeholder) sans dépendance backend.

---

## 5. Sources de données

- Appel REST d’initialisation (placeholder non bloquant) : GET `/api/mq/demandes/init` (à définir ultérieurement). Le livrable fonctionne sans cet appel.
- Pas d’autres sources locales connues (pas de paramètre de navigation spécifique).
- Stockage front : uniquement pour l’état temporaire si un init est ajouté plus tard.

---

## 6. Règles métier visibles

- Tant que l’init n’est pas reçue (si ajoutée), conserver le spinner ; sinon afficher directement le placeholder.
- En cas d’erreur d’init (si ajoutée), message clair + « Réessayer » ; fallback autorisé.
- Labels et messages en français, cohérents avec le vocabulaire MQ interne.
- Boutons désactivés si l’état est en chargement ou en soumission (si une soumission est ajoutée plus tard).

---

## 7. Accessibilité et UX

- Composants WCS obligatoires : wcs-button, wcs-card (ou équivalent) pour le bloc placeholder, wcs-spinner/skeleton si init ajoutée.
- Fil d’Ariane WCS aligné sur le reste de l’app.
- Responsive : empilement vertical sur mobile, espacements ≥16–24 px ; largeur contenue sur desktop pour une lecture confortable.
- Accessibilité : labels explicites, aria-label sur les boutons, focus visible, texte alternatif pour le logo déjà fourni par le header.
- Messages d’erreur lisibles, contrastes conformes au thème Holding.

---

## 8. Historique / Incréments

- v0.1 (Draft) : création de l’écran avec placeholder texte « Ici le formulaire de saisie de la demande de flux » et préparation des états LOADING/ERROR pour un futur appel d’init.

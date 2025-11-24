# Recherche - 002-mq-demande

## Points clarifiés

- Blocage backend levé : la page livrable se contente d’un bloc WCS avec le texte « Ici le formulaire de saisie de la demande de flux » (placeholder). Pas d’appel backend obligatoire dans cet incrément.
- Style/UX : conserver le layout existant (HeaderAfa, breadcrumb, footer Contact), thème Holding, code simple et cohérent avec Home/MQ.
- États : LOADING/ERROR restent préparés pour un futur appel d’init, mais non bloquants.
- Tests : non exigés pour ce placeholder (à reconsidérer si backend ou logique de formulaire ajoutés).

## Points encore à définir (pour incréments ultérieurs)

- Endpoint d’initialisation (route, payload, statut) : à spécifier quand le backend sera prêt.
- Liste des champs et validations : à définir avec la spec métier/backend.
- Objectifs de performance chiffrés : non spécifiés, pas critiques pour ce placeholder.

## Synthèse

- Decision : Livrer la page `/mq/demande` avec placeholder texte et layout WCS existant, sans dépendance backend.
  - Rationale : éviter tout blocage, répondre à la demande d’un code simple/épuré et cohérent.
  - Alternatives considered : Attendre la spec backend pour implémenter le vrai formulaire → rejeté (bloquant).

## Actions de suivi

- Attendre/recevoir la spec API d’init pour lever les NEEDS CLARIFICATION ci-dessus.
- Mettre à jour ce fichier dès que l’endpoint et la liste des champs seront définis.

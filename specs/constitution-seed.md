# Constitution du projet AFA (Automatisation des Flux Applicatifs)

## Principes Fondamentaux

### I. Expérience Utilisateur (UX) Ciblée

L'application AFA est conçue pour des experts métiers (PDD - Pilotes De la Demande) et doit privilégier la rapidité, l'efficacité et la simplicité d'utilisation. L'interface, bien que responsive et accessible, est optimisée pour un usage intensif et spécialisé, sans les contraintes des applications grand public.

### II. Langue et Communication

- **Langue de travail :** Le français est la langue officielle du projet pour la documentation, les spécifications, les échanges, les tickets (issues) et les prompts fournis à l'IA.
- **Règles pour les prompts :** Toutes les interactions avec l'IA (questions, consignes) doivent être en français. L'IA doit répondre exclusivement en français.
- **Exceptions :** Le code, les identifiants (API, classes, variables), les extraits de code (snippets) et les citations externes peuvent rester en anglais.
- **Interdiction :** Aucune spécification ou prompt ne doit être entièrement rédigé en anglais (hors exceptions mentionnées).

### III. Conventions de Développement

L'ensemble du projet doit respecter strictement les conventions définies dans le fichier `specs/spec-convention.md`. Ce document est la seule source de vérité ("single source of truth") pour toutes les pratiques de développement et de spécification. En cas de conflit avec tout autre document, les règles de `spec-convention.md` prévalent.

## Invariants techniques

Les choix techniques de base (stack, organisation du code, modes de déploiement) sont définis dans les documents de conventions techniques sous `specs/`.
Les supports techniques complémentaires (par exemple : documentation WCS, exemples d’implémentation) sont stockés sous `.specify/support/` et peuvent être utilisés par les outils d’IA pour interpréter et appliquer les spécifications.
Toutes les spécifications produites avec Speckit (écrans, APIs, modèles, workflows) doivent respecter ces invariants, sauf décision explicite documentée de l’architecte.


## Gouvernance

Cette constitution est le document de référence du projet. Tout amendement doit être documenté, approuvé et intégré dans une nouvelle version de ce document. Toutes les revues de code et validations de spécifications doivent s'assurer de la conformité avec les principes énoncés ici.

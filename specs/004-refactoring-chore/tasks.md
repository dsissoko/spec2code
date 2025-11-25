# Tasks – 004-refactoring-chore

## Portée
- Rétrospec uniquement : aucune évolution à coder ni migration à appliquer.

## Vérifications à effectuer
- [ ] Confirmer la présence des routes `/` (HTML), `/api/health`, `/api/info` et leur contenu attendu.
- [ ] Vérifier que les logs HTTP utilisent pino/pino-http avec `reqId`, niveaux par statut et pretty en dev.
- [ ] Vérifier la doc des variables backend (`backend/README.md`) et la routine de versionnage (`docs/GIT-USAGE.md`).
- [ ] Côté front, vérifier l’injection de version dans le footer (`__APP_VERSION__`) et la doc `.env` (`frontend/README.md`).

## Non actions
- Pas de plan d’implémentation ni de tickets dev : tout est livré en `v0.4.0`.

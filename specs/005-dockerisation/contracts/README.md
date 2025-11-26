# Contracts — Docker fullstack & WCS embarqué

## Portée
Aucun nouvel endpoint ni modification de contrats API. Les points d’intégration existants restent inchangés :
- Healthcheck backend `/api/health` (référencé par docker-compose et le healthcheck image).
- Frontend configuré via `VITE_API_BASE_URL` (par défaut vers le service backend du compose).

## Notes
- La dockerisation ne déclenche pas de migrations/seeders automatiquement.
- Les logs backend conservent `reqId`/serializers ; seul le formatting dev varie selon la présence de `pino-pretty`.

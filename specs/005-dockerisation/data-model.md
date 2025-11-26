# Data Model — Docker fullstack & WCS embarqué

## Portée de l’incrément
Aucun ajout ou modification d’entités métier. Le périmètre traite uniquement la dockerisation front/back, l’embarquement des assets WCS statiques et l’ajustement du logger backend.

## Impacts données
- Base PostgreSQL : réutilisation des schémas existants ; aucune migration nouvelle.  
- Migrations/seeders : restent manuels (`npx sequelize-cli db:migrate` / `db:seed:all`) et ne sont pas exécutés automatiquement par les conteneurs.

## Notes d’intégration
- `DATABASE_URL` peut cibler une base externe ou le Postgres du profil `localdb` (compose).  
- Les volumes Docker préservent l’état DB sauf en cas de `docker compose down -v`.

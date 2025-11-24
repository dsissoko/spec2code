# AFA Database

Ce répertoire contient tout ce qui concerne **la gestion du schéma PostgreSQL** de l'application AFA via **Sequelize** et **sequelize-cli**.  
Il est conçu pour fonctionner à la fois :

- **en développement local** (PostgreSQL installé sur le poste développeur),
- **en cloud** (PostgreSQL en PaaS).

---

## 🎯 Objectif

Centraliser et versionner :

- la création des tables (migrations)
- l’évolution du schéma (alter, rename, add/drop columns…)
- les données d’initialisation (seeders pour dev)
- la procédure pour appliquer les migrations localement et en cloud

---

## 🧭 Aperçu fonctionnel du schéma

Schéma orienté génération du classeur MQ et gestion des demandes :
- **environnements** : référentiel DEV/INT/QUAL/REC/PREPROD/PROD.
- **applications** : app métier (nom, trigramme, MOA/MOE, responsables).
- **qmanagers** : QMgr par environnement (DNS/port, hébergement).
- **flux / consommateur_flux** : description d’un flux (type simple/topic/remote) et liste des consommateurs.
- **topics / abonnements** : topics MQ, alias .QA, abonnements (filtre optionnel) vers files cibles.
- **files** : files MQ (F/FR/FT/T), alias .QA, paramètres taille/TTL/persistance, lien QMgr (et remote QMgr si FR).
- **user_mq / canaux** : users MQ et canaux (LSN/LSS) prod/cons/XMIT, CN optionnel.
- **xmit** : liaisons XMIT (file + canal) entre QMgr source/dest.
- **demande_flux / flux_lignes** : demandes, statuts, et lignes de formulaire (valeur saisie/calculée).
- **snow_change** : suivi du ticket ServiceNow lié à une demande.

---

## 📁 Structure du répertoire

```
database/
  migrations/   → scripts pour créer/modifier le schéma
  seeders/      → données d’init facultatives
  README.md     → ce fichier
```

---

## 🧰 Outils utilisés

Nous utilisons :

- **Sequelize ORM**
- **sequelize-cli** pour piloter migrations et seeders
- **PostgreSQL 17+**

Les fichiers de configuration Sequelize CLI se trouvent côté backend :

```
backend/src/config/config.js
```

---

## 🚀 Installation (à faire une fois)

Depuis le dossier `backend/` :

```bash
npm install sequelize sequelize-cli pg pg-hstore
```

Puis initialiser l’arbo cli (déjà faite chez nous mais rappel) :

```bash
npx sequelize-cli init
```

---

## 🔧 Configuration des environnements

La config des connexions DB se fait dans :

```
backend/src/config/config.js
```

Avec ce format :

```js
module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postgres"
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres"
  }
};
```

Les variables d'environnement doivent définir :

```
DATABASE_URL=postgres://user:password@host:5432/dbname
```

La première migration livrée est `20250326123000-create-afa-core.js` (création du socle).  
Un seeder d’init des environnements est fourni : `20250326123500-init-environnements.js`.

---

## 📦 Créer une migration

Depuis **backend/** :

```bash
npx sequelize-cli migration:generate --name create-nom-table
```

Une migration vide est créée dans `database/migrations/`.

Tu peux ensuite remplir :

```js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Applications", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nomApplication: { type: Sequelize.STRING, allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Applications");
  }
};
```

---

## 🚀 Appliquer les migrations

### En local
```bash
npx sequelize-cli db:migrate
```

### En cloud (PaaS)
Identique : la commande s'exécute dans le pipeline CI/CD ou manuellement.

---

## 🔄 Annuler une migration

```bash
npx sequelize-cli db:migrate:undo
```

---

## 🌱 Seeders (optionnel)

Créer un seeder :

```bash
npx sequelize-cli seed:generate --name demo-data
```

Appliquer :

```bash
npx sequelize-cli db:seed:all
```

---

## 🧪 Workflow recommandé

1. Modifier/ajouter un modèle Sequelize dans `backend/src/models/`
2. Générer une migration correspondante
3. Lancer `db:migrate` localement
4. Commit + push
5. Envoyer la migration en cloud (CI/CD ou commande manuelle)
6. (Optionnel) Charger les seeders en dev

---

## 🔐 Sécurité

- **Jamais** de `.env` dans Git  
- Toujours utiliser `DATABASE_URL`  
- Pour le cloud, stocker les credentials DB dans un secret manager

---

## 🧑‍💻 Création de l'utilisateur applicatif PostgreSQL

L’application ne doit pas utiliser le superuser `postgres` pour se connecter à la base `AFA_DB`.  
Un utilisateur applicatif dédié (par exemple `afa_app`) doit être créé une fois, à la main, côté base de données.

### Emplacement du script d’admin

Un script SQL d’admin (non exécuté par Sequelize) peut être stocké ici :

```
database/admin/000-create-afa-app-user.sql
```

Exemple de contenu **générique** (à adapter avant exécution) :

```sql
-- À exécuter connecté en superuser (postgres)

CREATE USER afa_app WITH PASSWORD 'CHANGE_ME';

GRANT CONNECT ON DATABASE "AFA_DB" TO afa_app;

\c "AFA_DB"

GRANT USAGE, CREATE ON SCHEMA public TO afa_app;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO afa_app;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO afa_app;
```

> 💡 Ne jamais committer le vrai mot de passe dans ce fichier.  
> Garder `CHANGE_ME` dans Git, puis modifier le mot de passe directement en base après exécution :

```sql
ALTER USER afa_app WITH PASSWORD 'mot_de_passe_réel';
```

### Procédure d’exécution (une seule fois par environnement)

Depuis WSL2 ou un poste admin, connecté en `postgres` :

```bash
psql -h localhost -p 5433 -U postgres -d postgres
```

Puis dans `psql` :

```sql
\i database/admin/000-create-afa-app-user.sql
```

L’URL de connexion utilisée par l’application pourra ensuite être de la forme :

```env
DATABASE_URL=postgres://afa_app:mot_de_passe_réel@localhost:5433/AFA_DB
```

---

## 📄 Licence

Projet interne AFA. Usage restreint.

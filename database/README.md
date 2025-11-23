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

## 📄 Licence

Projet interne AFA. Usage restreint.

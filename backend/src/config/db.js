"use strict";

const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL manquant : définissez-le dans le .env ou l'environnement");
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false
});

async function assertConnection() {
  await sequelize.authenticate();
}

module.exports = { sequelize, assertConnection };

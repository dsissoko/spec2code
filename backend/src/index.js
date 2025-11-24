"use strict";

const dotenv = require("dotenv");
dotenv.config();

const app = require("./api/app");
const { assertConnection } = require("./config/db");

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    await assertConnection();
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`AFA backend démarré sur http://localhost:${PORT}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Échec de connexion à la base :", err.message);
    process.exit(1);
  }
}

start();

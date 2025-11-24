"use strict";

const pkg = require("../../package.json");

const startedAt = Date.now();

function getAppInfo() {
  const appEnv = process.env.APP_ENV || process.env.NODE_ENV || "development";
  const nodeEnv = process.env.NODE_ENV || "development";

  return {
    name: pkg.name,
    version: pkg.version,
    env: {
      app: appEnv, // environnement fonctionnel (dev/staging/preprod/prod)
      node: nodeEnv // environnement technique (dev vs production pour optimiser Node/Express)
    },
    uptimeSeconds: Math.round(process.uptime()),
    startedAt: new Date(startedAt).toISOString(),
    now: new Date().toISOString()
  };
}

module.exports = { getAppInfo };

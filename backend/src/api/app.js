"use strict";

const express = require("express");
const path = require("path");
const cors = require("cors");
const { errorHandler } = require("./middlewares/error");
const healthRoute = require("./routes/health");
const { logger, httpLogger } = require("./logger");
const infoRoute = require("./routes/info");
const { getAppInfo } = require("./appInfo");

const app = express();

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());
app.use(httpLogger);

// Fichiers statiques (favicon, etc.)
app.use(express.static(path.join(__dirname, "..", "..", "public")));

// Accueil lisible par un humain avec infos minimales (sans secrets)
app.get("/", (_req, res) => {
  const info = getAppInfo();
  res.type("html").send(
    `<html><head><link rel="icon" href="/favicon.ico" /></head><body><h1>AFA API</h1><p>Version: ${info.version}</p><p>Env: ${info.env.app} (node: ${info.env.node})</p><p>Uptime: ${info.uptimeSeconds}s</p><p><a href="/api/health">/api/health</a> | <a href="/api/info">/api/info</a></p></body></html>`
  );
});

app.use("/api/health", healthRoute);
app.use("/api/info", infoRoute);

// 404 minimal
app.use((req, res) => {
  logger.warn({ path: req.path, reqId: req.id }, "Route non trouvée");
  res.status(404).json({ error: "Not found" });
});

app.use(errorHandler);

module.exports = app;

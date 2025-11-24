"use strict";

const express = require("express");
const cors = require("cors");
const pino = require("pino");
const pinoHttp = require("pino-http");
const { errorHandler } = require("./middlewares/error");
const healthRoute = require("./routes/health");

const app = express();
const logger = pino({ level: process.env.LOG_LEVEL || "info" });
const httpLogger = pinoHttp({ logger });

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());
app.use(httpLogger);

app.use("/api/health", healthRoute);

// 404 minimal
app.use((req, res) => {
  logger.warn({ path: req.path }, "Route non trouvée");
  res.status(404).json({ error: "Not found" });
});

app.use(errorHandler);

module.exports = app;

"use strict";

const { logger } = require("../logger");

function errorHandler(err, req, res, _next) {
  const status = err.status || 500;
  const message = err.message || "Erreur interne";
  logger.error({ err, reqId: req?.id, path: req?.path, status }, message);
  res.status(status).json({ error: message });
}

module.exports = { errorHandler };

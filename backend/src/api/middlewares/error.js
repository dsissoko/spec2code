"use strict";

function errorHandler(err, _req, res, _next) {
  // Log minimal (peut être remplacé par pino)
  console.error(err); // eslint-disable-line no-console
  const status = err.status || 500;
  const message = err.message || "Erreur interne";
  res.status(status).json({ error: message });
}

module.exports = { errorHandler };

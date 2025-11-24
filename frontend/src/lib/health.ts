"use strict";

import { logger } from "./logger";

export async function checkBackendHealth() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!baseUrl) {
    logger.warn("VITE_API_BASE_URL non défini : impossible de vérifier le backend");
    return;
  }
  const url = `${baseUrl.replace(/\/+$/, "")}/health`;
  try {
    const started = performance.now();
    const resp = await fetch(url, { method: "GET" });
    const duration = Math.round(performance.now() - started);
    if (!resp.ok) {
      logger.warn(`Health backend KO (${resp.status}) en ${duration}ms`);
      return;
    }
    logger.info(`Health backend OK en ${duration}ms`);
  } catch (err) {
    logger.error("Échec health backend :", err);
  }
}

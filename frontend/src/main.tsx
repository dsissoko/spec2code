import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { defineCustomElements } from "wcs-react";
import "./styles/global.css";
import App from "./App";
import { checkBackendHealth } from "./lib/health";
import { logger } from "./lib/logger";

defineCustomElements();

checkBackendHealth().catch((err) => logger.error("Healthcheck backend échoué :", err));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

"use strict";

const { randomUUID } = require("crypto");
const pino = require("pino");
const pinoHttp = require("pino-http");

const level = process.env.LOG_LEVEL || "info";
const isDev = process.env.NODE_ENV !== "production";

const logger = isDev
  ? pino({
      level,
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          singleLine: true,
        },
      },
    })
  : pino({ level });

const httpLogger = pinoHttp({
  logger,
  genReqId: (req) => req.headers["x-request-id"] || randomUUID(),
  serializers: {
    req: (req) => ({ id: req.id, method: req.method, url: req.url }),
    res: (res) => ({ statusCode: res.statusCode, responseTime: res.responseTime }),
  },
  customLogLevel: (req, res, err) => {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
  customSuccessMessage: (req, res) => {
    const duration =
      typeof res.responseTime === "number" ? `${res.responseTime}ms` : "n/a";
    return `reqId=${req.id} ${req.method} ${req.url} -> ${res.statusCode} (${duration})`;
  },
  customErrorMessage: (req, res, err) => {
    const duration =
      typeof res.responseTime === "number" ? `${res.responseTime}ms` : "n/a";
    return `reqId=${req.id} ${req.method} ${req.url} -> ${res.statusCode} (${err?.message || "error"}) (${duration})`;
  },
  customProps: (req) => ({ reqId: req.id }),
});

module.exports = { logger, httpLogger };

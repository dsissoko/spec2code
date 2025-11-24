"use strict";

const express = require("express");
const { getAppInfo } = require("../appInfo");

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(getAppInfo());
});

module.exports = router;

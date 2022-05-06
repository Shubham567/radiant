const superGlobals = require("@recode/shared/globals");

const express = require("express");

const healthRouter = express.Router();

healthRouter.get("/health",(req, res, err) => {
  res.json(superGlobals);
})

module.exports = healthRouter;

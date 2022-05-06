const express = require("express");
const healthRouter = require("../../../../radiant/packages/routes/v1/health");
const createLesson = require("../../../../radiant/packages/routes/v1/createLesson");
const getLessonRouter = require("../../../../radiant/packages/routes/v1/getLesson");

const v1Router = express.Router();

v1Router.use(healthRouter);
v1Router.use(createLesson);
v1Router.use(getLessonRouter);

module.exports = v1Router;

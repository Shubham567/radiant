const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('../../../radiant/packages/recode-apis/routes');

const app = express();

const cors = require("cors");
const v1Router = require("../../../radiant/packages/recode-apis/routes/v1");


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);

app.use("/v1",v1Router)

module.exports = app;

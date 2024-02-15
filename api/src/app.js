require('dotenv').config();
const routes = require('./routes');
const express = require('express');
const FileCleaner = require('./utils/FileCleaner');

FileCleaner.runCleaner();

const app = express();

routes(app);

module.exports = app;

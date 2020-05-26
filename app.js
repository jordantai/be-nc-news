const express = require('express');
const apiRouter = require('./routes/api.router');
const cors = require('cors');
app.use(cors());
const app = express();
const {
  handlePSQLErrors,
  handleCustomErrors,
  handleInternalErrors,
  send404,
} = require('./errors');

app.use(express.json());
app.use('/api', apiRouter);
app.use(send404);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleInternalErrors);

module.exports = app;

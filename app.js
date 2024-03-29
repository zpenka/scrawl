const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const Logger = require('bunyan');
const app = express();

// Instantiate Logger
const log = new Logger({
  name: 'App',
  streams: process.env.MUTE_LOGS ? [] : [{ stream: process.stdout }]
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

// Catch 404s and forward to Error Handler
app.use((req, res, next) => {
  log.error('service returned 404', req.headers.host);
  const err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

// Don't leak stacktraces to production
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

module.exports = app;


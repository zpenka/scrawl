const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', routes);

// Catch 404s and forward to Error Handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

// Don't leak stacktraces to production
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'production' ? {} : err,
  });
});

module.exports = app;


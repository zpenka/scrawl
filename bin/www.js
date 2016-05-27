#!/usr/bin/env node

const app = require('../app');
const http = require('http');

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // Named pipe
    return val;
  }

  if (port >= 0) {
    // Port number
    return port;
  }

  return false;
}

const onError = (err) => {
  if (err.syscall !== 'listen') {
    throw err;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (err.code) {
    case 'EACCESS':
      console.error(`${bind} requires elevated priviledges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
  default:
    throw err;
  }
}

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

  return console.log(`Listening on ${bind}`);
}

// Set port
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Create HTTP Server
const server = http.createServer(app);

// Listen on port
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

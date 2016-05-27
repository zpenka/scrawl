const environment = process.env.NODE_ENV || 'default';
const config = require('../knexfile.js')[environment];

module.exports = require('knex')(config);

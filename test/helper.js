const db = require('../db/knex');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const Promise = require('bluebird');
const _ = require('lodash');

chai.config.includeStack = true;
chai.use(require('sinon-chai'));

var tables_to_clear;
function clearTables(done) {
  Promise.map(tables_to_clear, function(table_name) {
    if (!table_name) {
      console.log(`Empty table name ${table_name} in ${tables_to_clear}`);
      throw new Error('Invalid table name: ' + table_name);
    }

    return db(table_name).del();
  })
  .then(() => done())
  .catch((err) => done(err));
}

before(function(done) {
  process.env.NODE_ENV = 'test';

  db.migrate.latest()
  .then(() => done())
  .catch((err) => done(err));
});



beforeEach(function(done) {
  process.env.NODE_ENV = 'test';

  if (this.sinon) {
    this.sinon.restore();
  } else {
    this.sinon = sinon.sandbox.create();
  }

  if (tables_to_clear) {
    return clearTables(done);
  }

  db.raw('SHOW TABLES')
  .then((result) => {

    const all_tables  = result[0].map(function(table_data) {
      const key = Object.keys(table_data)[0];
      return table_data[key];
    });

    tables_to_clear = _.without(all_tables, 'knex_migrations');
    return clearTables(done);
  })
  .catch((err) => done(err));
});


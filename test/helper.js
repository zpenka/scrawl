const db = require('../db/knex');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const Promise = require('bluebird');
const _ = require('lodash');
const moment = require('moment');

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

  // Reset sinon between each test
  this.sinon ? this.sinon.restore() : this.sinon = sinon.sandbox.create();

  if (tables_to_clear) {
    return clearTables(done);
  }

  db.raw('SHOW TABLES')
  .then((result) => {
    const all_tables = result[0].map(function(table_data) {
      const key = Object.keys(table_data)[0];
      return table_data[key];
    });

    tables_to_clear = _.without(all_tables, 'knex_migrations');
    return clearTables(done);
  })
  .catch((err) => done(err));
});

module.exports.insertFixtures = (table_name, data, chunk_size = 1000) => {
  return db
  .batchInsert(table_name, data, chunk_size)
  .then(() => db.select().orderBy('id', 'desc').from(table_name))
  .then((results) => {
    return results.map((result) => {
      return {
        id: result.id,
        message: result.message,
        liked: result.liked,
        date_created: result.date_created.toISOString(),
        date_updated: result.date_updated.toISOString(),
      };
    });
  })
  .catch((err) => console.log('err', err));
}

module.exports.generateNotesRows = (num_rows) => {
  const date = moment().format().toString();
  let rows = [];
  let i = 0;

  for (i; i < num_rows; i++) {
    rows.push({
      date_created: date,
      date_updated: date,
      message: `fake-message ${i}`,
      liked: 0,
    });
  }

  return rows;
}

module.exports.checkTimes = (t1, t2) => {
  const first = parseInt(t1, 10);
  const second = parseInt(t2, 10);

  const diff = first - second;

  return expect(diff).to.be.below(2);
}


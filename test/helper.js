const db = require('../db/knex');
const chai = require('chai');
const sinon = require('sinon');

chai.config.includeStack = true;
chai.use(require('sinon-chai'));

beforeEach(function(done) {
  process.env.NODE_ENV = 'test';

  if (this.sinon) {
    this.sinon.restore();
  } else {
    this.sinon = sinon.sandbox.create();
  }

  return db.migrate.rollback()
  .then(() => done());
});


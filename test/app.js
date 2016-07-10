const expect = require('chai').expect;
const request = require('supertest');
const helper = require('./helper');
const app = require('../app');
const db = require('../db/knex');

describe('app', function() {
  context('when a valid request is made', function() {
    let note = {};

    beforeEach(function(done) {
      const rows = helper.generateNotesRows(1);

      return helper.insertFixtures('notes', rows)
      .then((result) => {
        note = result;
        return done();
      });
    });

    it('responds correctly', function(done) {
      request(app)
      .get('/api/v1/notes')
      .expect(202)
      .end(function(err, res) {
        expect(err).to.not.exist;
        expect(res).to.be.json;

        expect(res.body).to.deep.equal(note);

        return done();
      });
    });
  });

  context('when an unknown request is made', function() {
    it('returns a 404', function(done) {
      request(app)
      .get('/wat')
      .expect(404)
      .end(function(err, res) {
        expect(err).to.not.exist;
        expect(res).to.be.json;

        expect(res.body.message).to.equal('Not Found');
        expect(res.body.error).to.not.deep.equal({});

        return done();
      });
    });

    context('in a production setting', function() {
      beforeEach(function() {
        process.env.NODE_ENV = 'production'
      });

      it('doesn\'t leak a stack trace', function(done) {
        request(app)
        .get('/wat')
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res).to.be.json;

          expect(res.body.error).to.deep.equal({});

          return done();
        });
      });
    });
  });
});

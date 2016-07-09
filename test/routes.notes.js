const expect = require('chai').expect;
const request = require('supertest');
const helper = require('./helper');
const app = require('../app');
const db = require('../db/knex');

describe('routes/notes', function() {
  const date = Date.now();
  let note = {};

  beforeEach(function(done) {
    const row = {
      date_created: date,
      date_updated: date,
      message: 'fake-message 1',
      liked: 0,
    };

    return helper.insertFixtures('notes', row)
    .then((result) => {
      note = result;
      return done();
    });
  });

  describe('GET /notes', function() {
    const url = '/api/v1/notes';

    context('When a GET request is made', function() {

      context('with no parameters', function() {
        it('fetches all notes', function(done) {
          request(app)
          .get(url)
          .expect(202)
          .end(function(err, res) {
            expect(err).to.not.exist;
            expect(res).to.be.json;

            expect(res.body).to.deep.equal(note);

            return done();
          });
        });
      });

      context('with bad parameters', function() {
        const bad_url = url + '?lols=123';

        it('returns a 401', function(done) {
          request(app)
          .get(bad_url)
          .end(function(err, res) {
            expect(err).to.not.exist;
            expect(res).to.be.json;

            expect(res.body).to.deep.equal({
              message: `No parameters should be passed to the url ${bad_url}`,
            });

            return done();
          });
        });
      });
    });
  });
});

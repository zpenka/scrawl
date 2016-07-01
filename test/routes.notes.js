const expect = require('chai').expect;
const request = require('supertest');
const helper = require('./helper');
const app = require('../app');
const db = require('../db/knex');

describe.skip('routes/notes', function() {
  describe('GET /notes', function() {
    const url = '/api/v1/notes';

    context('When a GET request is made', function() {

      context('with no parameters', function() {
        it('fetches all notes', function(done) {
          console.log('url', url);
          console.log('app', app);

          request(app)
          .get(url)
          .expect(202)
          .end(function(err, res) {
            expect(err).to.not.exist;
            expect(res).to.be.json;

            expect(true).to.be.false;

            done();
          });

        });
      });

      context('with bad parameters', function() {
        it('returns a 401', function(done) {
          request(app)
          .get(url + '?lols=123')
          .end(function(err, res) {
            expect(err).to.not.exist;
            expect(res).to.be.json;

            expect(res.body.error).to.deep.equal({
              message: 'Bad parameter passed',
            });

            done();
          });
        });
      });

    });
  });

});

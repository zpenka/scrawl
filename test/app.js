const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app');
const db = require('../db/knex');

describe('app', function() {
  context('When an unknown request is made', function() {

    it('returns a 404', function(done) {
      request(app)
      .get('/wat')
      .expect(404)
      .end(function(err, res) {
        expect(err).to.not.exist;
        expect(res).to.be.json;
        expect(res.body.message).to.equal('Not Found');
        expect(res.body.error).to.not.deep.equal({});

        done();
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

          done();
        });
      });
    });

  });

});

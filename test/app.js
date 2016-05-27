process.env.NODE_ENV = 'test';

const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);

describe('app', function() {

  context('When an unknown request is made', function() {

    it('returns a 404', function(done) {
      chai.request(server)
      .get('/wat')
      .end(function(err, res) {
        expect(err).to.not.exist;
        expect(res).to.be.json;
        expect(res.status).to.equal(404);
      });

      done();
    });

  });

});

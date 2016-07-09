const expect = require('chai').expect;
const request = require('supertest');
const helper = require('./helper');
const app = require('../app');
const db = require('../db/knex');

describe('routes/notes', function() {
  describe('GET /notes', function() {
    const url = '/api/v1/notes';

    context('and there are less than 100 notes', function() {
      const date = Date.now();
      let note = {};

      beforeEach(function(done) {
        const rows = helper.generateNotesRows(1);

        return helper.insertFixtures('notes', rows)
        .then((result) => {
          note = result;
          return done();
        });
      });

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

    context('and there are more than 100 notes', function() {
      let notes = [];

      beforeEach(function(done) {
        const rows = helper.generateNotesRows(101);

        return helper.insertFixtures('notes', rows)
        .then((result) => {
          notes = result.slice(0, 100);
          return done();
        });
      });

      it('only returns 100', function(done) {
        request(app)
        .get(url)
        .expect(202)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res).to.be.json;

          expect(res.body.length).to.equal(100);
          expect(res.body).to.deep.equal(notes);

          return done();
        });
      });
    });

    context('with bad parameters', function() {
      const bad_url = url + '?lols=123';

      it('returns a 401', function(done) {
        request(app)
        .get(bad_url)
        .expect(401)
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

  describe('GET /notes/:note', function() {
    const base_url = '/api/v1/notes/';
    let note_id = 0;
    let note = {};

    context('when the requested note exists', function() {
      beforeEach(function(done) {
        const rows = helper.generateNotesRows(1);

        return helper.insertFixtures('notes', rows)
        .then((result_rows) => {
          note = result_rows;
          note_id = note[0].id;
          return done();
        });
      });

      it('returns the note', function(done) {
        const url = base_url + note_id;

        request(app)
        .get(url)
        .expect(202)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res).to.be.json;

          expect(res.body.length).to.equal(1);
          expect(res.body).to.deep.equal(note);

          return done();
        });
      });
    });

    context('when the request note does not exist', function() {
      it('yields an error message', function(done) {
        const url = base_url + note_id;

        request(app)
        .get(url)
        .expect(404)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res).to.be.json;

          expect(res.body).to.deep.equal({
            message: `Note with id ${note_id} not found`,
          });

          return done();
        });
      });
    });
  });

  describe.skip('POST /notes/:note', function() {
    const base_url = '/api/v1/notes/';
    let note_id = 0;
    let body = {};

    context('when the new note is valid', function() {
      beforeEach(function() {
        const rows = helper.generateNotesRows(1);
        body = rows[0];
        note_id = body.id;
      });

      it('creates and returns the note', function(done) {
        const url = base_url + note_id;

        request(app)
        .get(url)
        .expect(202)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res).to.be.json;

          expect(res.body.length).to.equal(1);
          expect(res.body).to.deep.equal(note);

          return done();
        });
      });
    });

    context('when the new note is not valid', function() {
      it('does not create anything', function(done) {
        return done();
      });
    });

    context('when the new note already exists', function() {
      it('does not create anything', function(done) {
        return done();
      });
    });
  });
});

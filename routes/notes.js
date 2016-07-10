const router = require('./router');
const _ = require('lodash');
const db = require('../db/knex');

router.get('/api/v1/notes', (req, res, next) => {
  if (!_.isEmpty(req.query)) {
    return res
    .status(401)
    .json({ message: `No parameters should be passed to the url ${req.url}` });
  }

  return db
  .select()
  .from('notes')
  .limit(100)
  .orderBy('id', 'desc')
  .then((result) => {
    return res
    .status(202)
    .json(result);
  })
  .catch((err) => next(err));
});

router.post('/api/v1/notes', (req, res, next) => {
  if (!_.isEmpty(req.query)) {
    return res
    .status(401)
    .json({ message: `No parameters should be passed to the url ${req.url}` });
  }

  if (!req.body.message) {
    return res
    .status(400)
    .json({ message: 'POST body is missing required field "message"' });
  }

  const message = req.body.message;
  const liked = false;

  return db('notes')
  .insert({
    message,
    liked,
  })
  .then((rows) => {
    const id = rows[0];

    return db('notes')
    .where('id', id)
    .then((rows) => {
      const note = rows[0];

      return res
      .status(202)
      .json(note);
    });
  })
  .catch((err) => next(err));
});

router.get('/api/v1/notes/:note', (req, res, next) => {
  if (!_.isEmpty(req.query)) {
    return res
    .status(401)
    .json({ message: `No parameters should be passed to the url ${req.url}` });
  }

  const note_id = req.params.note;

  return db
  .select()
  .from('notes')
  .where('id', note_id)
  .then((result) => {
    if (result.length === 0) {
      return res
      .status(404)
      .json({ message: `Note with id ${note_id} not found` });
    }

    return res
    .status(202)
    .json(result);
  })
  .catch((err) => next(err));
});

router.put('/api/v1/notes/:note', (req, res, next) => {
  if (!_.isEmpty(req.query)) {
    return res
    .status(401)
    .json({ message: `No parameters should be passed to the url ${req.url}` });
  }

  if (!req.body.message) {
    return res
    .status(400)
    .json({ message: 'ERROR: No message to PUT passed' });
  }

  const note_id = req.params.note;
  const message = req.body.message;

  return db('notes')
  .where('id', note_id)
  .update({ message })
  .then((num_rows_updated) => {
    if (num_rows_updated < 1) {
      return res
      .status(404)
      .json({ message: 'ERROR: Message not found' });
    }

    return db
    .select()
    .from('notes')
    .where('id', note_id)
    .then((rows) => {
      const note = rows[0];

      return res
      .status(202)
      .json(note);
    });
  })
  .catch((err) => next(err));
});

router.delete('/api/v1/notes/:note', (req, res, next) => {
  if (!_.isEmpty(req.query)) {
    return res
    .status(401)
    .json({ message: `No parameters should be passed to the url ${req.url}` });
  }

  const note_id = req.params.note;

  return db('notes')
  .where('id', note_id)
  .del()
  .then((num_rows) => {
    if (num_rows === 0) {
      return res
      .status(404)
      .json({ message: 'ERROR: Message not found' });
    }

    return res
    .status(202)
    .json({ message: `Note ${note_id} deleted successfully` });
  });
});


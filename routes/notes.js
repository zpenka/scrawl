const router = require('./router');
const _ = require('lodash');
const db = require('../db/knex');
const Logger = require('bunyan');

// Instantiate Logger
const log = new Logger({
  name: '/api/v1/notes',
  streams: process.env.MUTE_LOGS ? [] : [{ stream: process.stdout }]
});

router.get('/api/v1/notes', (req, res, next) => {
  if (!_.isEmpty(req.query)) {
    log.error('service returned 401 to ', req.headers.host);

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
    log.info('service returned 202 to ', req.headers.host);

    return res
    .status(202)
    .json(result);
  })
  .catch((err) => next(err));
});

router.post('/api/v1/notes', (req, res, next) => {
  if (!_.isEmpty(req.query)) {
    log.error('service returned 401 to ', req.headers.host);

    return res
    .status(401)
    .json({ message: `No parameters should be passed to the url ${req.url}` });
  }

  if (!req.body.message) {
    log.error('service returned 400 to ', req.headers.host);

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
      log.info('service returned 202 to ', req.headers.host);

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
    log.error('service returned 401 to ', req.headers.host);

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
      log.error('service returned 404 to ', req.headers.host);

      return res
      .status(404)
      .json({ message: `Note with id ${note_id} not found` });
    }

    log.info('service returned 202 to ', req.headers.host);

    return res
    .status(202)
    .json(result);
  })
  .catch((err) => next(err));
});

router.put('/api/v1/notes/:note', (req, res, next) => {
  if (!_.isEmpty(req.query)) {
    log.error('service returned 401 to ', req.headers.host);

    return res
    .status(401)
    .json({ message: `No parameters should be passed to the url ${req.url}` });
  }


  if (!req.body.message) {
    log.error('service returned 400 to ', req.headers.host);

    return res
    .status(400)
    .json({ message: 'ERROR: No message to PUT passed' });
  }

  const note_id = req.params.note;
  const message = req.body.message;
  const liked = req.body.liked || null;

  return db('notes')
  .where('id', note_id)
  .update({ message, liked })
  .then((num_rows_updated) => {
    if (num_rows_updated < 1) {
      log.error('service returned 404 to', req.headers.host);

      return res
      .status(404)
      .json({ message: 'ERROR: Message not found' });
    }

    return db
    .select()
    .from('notes')
    .where('id', note_id)
    .then((rows) => {
      log.info('service returned 202 to ', req.headers.host);

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
    log.error('service returned 401 to ', req.headers.host);

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
      log.error('service returned 404 to ', req.headers.host);

      return res
      .status(404)
      .json({ message: 'ERROR: Message not found' });
    }

    log.info('service returned 202 to ', req.headers.host);

    return res
    .status(202)
    .json({ message: `Note ${note_id} deleted successfully` });
  });
});

router.put('/api/v1/notes/:note/liked', (req, res, next) => {
  if (!_.isEmpty(req.query)) {
    log.error('service returned 401 to ', req.headers.host);

    return res
    .status(401)
    .json({ message: `No parameters should be passed to the url ${req.url}` });
  }

  const note_id = req.params.note;

  return db
  .select()
  .from('notes')
  .where('id', note_id)
  .then((rows) => {
    if (rows.length === 0) {
      log.error('service returned 404 to ', req.headers.host);

      return res
      .status(404)
      .json({ message: 'ERROR: Message not found' });
    }

    const note = rows[0];
    const liked = note.liked === 0 ? 1 : 0;

    return db('notes')
    .where('id', note_id)
    .update({ liked })
    .then((num_rows_updated) => {
      if (num_rows_updated < 1) {
        log.error('service returned 503 to ', req.headers.host);

        return res
        .status(503)
        .json({ message: 'ERROR: Failed to updated note' });
      }

      log.info('service returned 202 to ', req.headers.host);

      const new_note = note;
      new_note.liked = liked;

      return res
      .status(202)
      .json(new_note);
    });
  })
  .catch((err) => next(err));
});


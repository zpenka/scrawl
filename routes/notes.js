const router = require('./router');
const _ = require('lodash');
const db = require('../db/knex');

router.get('/api/v1/notes', (req, res, next) => {
  if (!_.isEmpty(req.query)) {
    return res
    .status(401)
    .json({ message: `No parameters should be passed to the url ${req.url}` });
  }

  //if (!_.isEmpty(req.body)) {
  //  return res
  //  .status(401)
  //  .json({ message: 'Bad parameter passed' });
  //}

  return db
  .select()
  .from('notes')
  .then((rows) => {
    const result = rows[0];

    return res
    .status(202)
    .json(result);
  })
  .catch((err) => next(err));
});

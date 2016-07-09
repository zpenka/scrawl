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

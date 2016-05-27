var express = require('express');
var router = express.Router();

router.get('/notes', (req, res, next) => {
  res.send('hello world');
});

module.exports = router;

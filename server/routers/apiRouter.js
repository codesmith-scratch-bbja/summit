//router boilerplate
const express = require('express');
const router = express.Router();

router.get('/path', (req, res, next) => {
  res.locals.path = { path: 'Do this thing' };
  next();
});

module.exports = router;

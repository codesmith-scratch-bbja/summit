//router boilerplate
const express = require('express');
const router = express.Router();

const pathController = require('../controllers/pathController');

router.get('/path', pathController.getAllPaths, (req, res, next) => {
  // res.locals.path = { path: 'Do this thing' };
  res.status(200).json(res.locals.paths);
  next();
});

router.post('/path', pathController.createPath, (req, res, next) => {
  res.status(200).json(res.locals.newPath);
  next();
});

router.patch('/path/:id', (req, res, next) => {
  res.status(200).json(res.locals.updatedPath);
  next();
});

router.delete('/path/:id', (req, res, next) => {
  res.status(200).json(res.locals.deletedPath);
  next();
});

module.exports = router;

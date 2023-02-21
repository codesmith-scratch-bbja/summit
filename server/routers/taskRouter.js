const express = require('express');

const taskRouter = express.Router();

taskRouter.get('/:goalId', (req, res, next) => {
  res.status(200).json({});
});

module.exports = taskRouter;

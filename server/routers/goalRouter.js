//router boilerplate
const express = require('express');
const router = express.Router();
const app = express();

const taskRouter = require('./taskRouter');
app.use('/goal/task', taskRouter);

const goalController = require('../controllers/goalController');
const sessionController = require('../controllers/sessionController');

router.get(
  '/',
  [sessionController.isLoggedIn, goalController.getUserGoals],
  (req, res, next) => {
    res.status(200).json(res.locals.userGoals);
    next();
  }
);

router.post(
  '/',
  [sessionController.isLoggedIn, goalController.createGoal],
  (req, res, next) => {
    res.status(200).json(res.locals.newGoal);
    next();
  }
);

router.patch('/:id', goalController.updateGoal, (req, res, next) => {
  res.status(200).json(res.locals.updatedGoal);
  next();
});

router.delete('/:id', goalController.deleteGoal, (req, res, next) => {
  res.status(200).json(res.locals.deletedGoal);
  next();
});

module.exports = router;

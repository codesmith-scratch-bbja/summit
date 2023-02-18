//router boilerplate
const express = require('express');
const router = express.Router();
const app = express();

const taskRouter = require('./taskRouter');
app.use('/goal/task', taskRouter);

const goalController = require('../controllers/goalController');

router.get('/goal', goalController.getAllGoals, (req, res, next) => {
  res.status(200).json(res.locals.allGoals);
  next();
});

router.post('/goal', goalController.createGoal, (req, res, next) => {
  res.status(200).json(res.locals.newGoal);
  next();
});

router.patch('/goal/:id', goalController.updateGoal, (req, res, next) => {
  res.status(200).json(res.locals.updatedGoal);
  next();
});

router.delete('/goal/:id', goalController.deleteGoal, (req, res, next) => {
  res.status(200).json(res.locals.deletedGoal);
  next();
});

module.exports = router;

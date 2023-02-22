//router boilerplate
const express = require('express');
const router = express.Router();
const app = express();

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

router.post('/task', goalController.addTask, (req, res, next) => {
  res.status(200).json(res.locals.newTask);
  next();
});
//adding middleware to query trending is true to populate

router.get('/trending', goalController.trendingGoals, (req, res, next) => {
  //if(trending), populate what user sees on /trending homepage
  res.status(200).json(res.locals.trendingGoals);
  //trendingGoal: async(req, res, next) => {
  //  }
  next();
});

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

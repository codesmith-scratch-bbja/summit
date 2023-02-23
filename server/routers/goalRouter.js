//router boilerplate
const express = require('express');
const router = express.Router();
const app = express();

const goalController = require('../controllers/goalController');
const sessionController = require('../controllers/sessionController');

router.use(sessionController.isLoggedIn, (req, res, next) => {
  console.log('In the goal router');
  next();
});

router.get('/', goalController.getUserGoals, (req, res, next) => {
  res.status(200).json(res.locals.userGoals);
  next();
});

router.post('/task', goalController.addTask, (req, res, next) => {
  res.status(200).json(res.locals.newTask);
  next();
});

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

router.post('/adopt', goalController.adoptGoal, (req, res, next) => {
  res.status(200).json(res.locals.adoptedGoal);
  next();
});

router.patch('/:taskId', goalController.completeTask, (req, res, next) => {
  res.status(200).json({ message: 'Task completed' });
  next();
});

router.delete('/:taskId', goalController.uncompleteTask, (req, res, next) => {
  res.status(200).json({ message: 'Task uncompleted' });
  next();
});

module.exports = router;

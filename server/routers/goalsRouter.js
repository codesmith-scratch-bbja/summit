import express from 'express';
const router = express.Router();

import goalController from '../controllers/goalsController.js';
import sessionController from '../controllers/sessionController.js';

function logLocation(req, res, next) {
  console.log('In the goal router');
  next();
}

router.use(logLocation);

router.get('/', goalController.getUserGoals, (req, res) => {
  res.status(200).json(res.locals.userGoals);
});

router.post('/task', goalController.addTask, (req, res) => {
  res.status(200).json(res.locals.newTask);
});

router.get('/trending', goalController.trendingGoals, (req, res) => {
  res.status(200).json(res.locals.trendingGoals);
});

router.get('/friends', goalController.friendGoals, (req, res) => {
  res.status(200).json(res.locals.friendGoals);
});

router.post('/', goalController.createGoal, (req, res) => {
  res.status(200).json(res.locals.newGoal);
});

router.post('/adopt', goalController.adoptGoal, (req, res) => {
  res.status(200).json(res.locals.adoptedGoal);
});

router.patch('/:taskId', goalController.completeTask, (req, res) => {
  res.status(200).json({ message: 'Task completed' });
});

router.delete('/:taskId', goalController.uncompleteTask, (req, res) => {
  res.status(200).json({ message: 'Task uncompleted' });
});

export default router;

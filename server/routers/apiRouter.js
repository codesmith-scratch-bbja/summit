import express from 'express';
const router = express.Router();

import goalsRouter from './goalsRouter.js';
import authRouter from './authRouter.js';
import usersRouter from './usersRouter.js';

// Debug logging
router.use((req, res, next) => {
  console.log('In the API router');
  next();
});

// Auth router - /api/auth
router.use('/auth', authRouter);

// Goals router - /api/goals
router.use('/goals', goalsRouter);

// Users router - /api/users
router.use('/users', usersRouter);

// Tasks router - /api/tasks

export default router;

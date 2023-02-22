//router boilerplate
const express = require('express');
const router = express.Router();

const goalRouter = require('./goalRouter');
// const taskRouter = require('./taskRouter');
const authRouter = require('./authRouter');

router.use((req, res, next) => {
  console.log('In the API router');
  next();
});

router.use('/auth', authRouter);
router.use('/goal', goalRouter);
// router.use('/task', taskRouter);

module.exports = router;
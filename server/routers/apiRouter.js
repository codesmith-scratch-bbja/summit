//router boilerplate
const express = require('express');
const router = express.Router();

const goalRouter = require('./goalRouter');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');

router.use((req, res, next) => {
  console.log('In the API router');
  next();
});

router.use('/auth', authRouter);
router.use('/goal', goalRouter);
router.use('/user', userRouter);

router.get('/profileredirect', (req, res, next) => {
  console.log('Redirecting to profile');
  const username = req.cookies.loggedInAs;
  res.redirect(`/${username}`);
});

module.exports = router;

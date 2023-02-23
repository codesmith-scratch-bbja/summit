const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.use((req, res, next) => {
  console.log('In the user router');
  next();
});

router.get('/avatar', userController.getAvatar, (req, res, next) => {
  res.status(200).json(res.locals.avatar);
  next();
});

router.get('/:username', userController.getProfileData, (req, res, next) => {
  res.status(200).json(res.locals.profileData);
  next();
});

router.post('/follow/:userId', userController.followUser, (req, res, next) => {
  res.status(200).json(res.locals.actionTaken);
  next();
});

module.exports = router;

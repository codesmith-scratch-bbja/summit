import express from 'express';
const router = express.Router();

import userController from '../controllers/usersController.js';

router.use(logLocation);

router.get('/avatar', userController.getAvatar, (req, res) => {
  res.status(200).json(res.locals.avatar);
});

router.get('/self', userController.getSessionData, (req, res) => {
  if (!res.locals.authenticated) {
    res.status(400).json({ message: 'Not authenticated' });
  }
  res.status(200).json(res.locals.sessionData);
});

router.get('/:username', userController.getProfileData, (req, res) => {
  res.status(200).json(res.locals.profileData);
});

router.post('/follow/:userId', userController.followUser, (req, res) => {
  res.status(200).json(res.locals.actionTaken);
});

export default router;

function logLocation(req, res, next) {
  console.log('//USERS ROUTER//');
  next();
}

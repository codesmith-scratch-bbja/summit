import express from 'express';
const router = express.Router();

import authController from '../controllers/authController.js';
import sessionController from '../controllers/sessionController.js';

// Redirect login request to selected provider
router.get('/login/:provider', authController.redirect);

router.post('/logout', sessionController.endSession);

// Callback route after succesful authentication
router.get(
  '/callback/:provider',
  authController.login,
  sessionController.startSession
);

export default router;

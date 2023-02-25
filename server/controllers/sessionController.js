import prisma from '../db.js';
import crypto from 'crypto';
import session from 'express-session';

const sessionController = {};

sessionController.isLoggedIn = async (req, res, next) => {
  console.log('Checking cookies');

  const cookie = req.cookies['connect.sid'];
  console.log({ cookie });

  if (!cookie) {
    console.log('No cookie found');
    return next({ log: 'No cookie found' });
  }

  console.log('Validating session');
  const foundSession = await prisma.session.findUnique({
    where: { sessionToken: cookie }
  });

  if (!foundSession) {
    console.log('Session not found');
    return res.redirect('/');
  }

  if (foundSession.expires < new Date()) {
    console.log('Session expired');
    return res.status(401).send('Session expired');
  }

  console.log('Moving to next middleware');
  res.locals.id = foundSession.userId;
  res.locals.username = foundSession.name;
  res.locals.authenticated = true;
  next();
};

// Check if the session cookie is valid
sessionController.isAuthenticated = async (req, res, next) => {
  console.log('Checking session');
  if (!req.session.user) {
    console.log('No session found');
    res.locals.authenticated = false;
    return next();
  }

  console.log('Session found');
  console.log({ session: req.session });
  res.locals.authenticated = true;

  next();
};

// Start a new session after log in
sessionController.startSession = (req, res, next) => {
  console.log('Starting session');

  // User data object to be stored in session
  const userData = {
    id: res.locals.id,
    name: res.locals.name,
    avatarUrl: res.locals.avatarUrl
  };

  // Assign session data to user field
  req.session.user = userData;

  // Redirect to profile
  // This logic should change to redirect to the page the user was on before logging in
  res.redirect(`http://localhost:8080/${userData.name}`);
  next();
};

// Log out and end session
sessionController.endSession = async (req, res, next) => {
  console.log('Ending session');

  res.clearCookie('connect.sid');

  req.session.destroy();

  res.redirect('http://localhost:8080/');
};

export default sessionController;

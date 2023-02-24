const prisma = require('../db.js');
const crypto = require('crypto');

const sessionController = {};

sessionController.isLoggedIn = async (req, res, next) => {
  console.log('Checking cookies');

  const cookie = req.cookies.session;
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

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = (req, res, next) => {
  //Check if user already has a session
  const userId = req.locals.userId;

  const session = prisma.session.create(
    {
      data: {
        userId: req.body.userId,
        sessionId: crypto.randomBytes(18).toString('base64'),
        expires: new Date(Date.now() + 30 * 60 * 1000)
      }
    },
    (err, session) => {
      if (err) {
        return next(
          'Error in sessionController.startSession: ' + JSON.stringify(err)
        );
      }

      res.cookie('session', session.sessionId);
      return next();
    }
  );
};

module.exports = sessionController;

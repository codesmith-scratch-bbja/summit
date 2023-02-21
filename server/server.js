//Express boilerplate
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const prisma = require('./db.js');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

const goalRouter = require('./routers/goalRouter');
// const authRouter = require('./routers/authRouter');

const CLIENT_ID = '2fd7a075b391b262d9e5';
const CLIENT_SECRET = '42b4c16c612d473ec86b48e1cd94d07de235262b';
const GITHUB_URL = 'https://github.com/login/oauth/access_token';

const sessions = new Map();

//Serve the static files from the React app
app.use('/build', express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(cookieParser());

// -------------------------------------------------
// ---                                           ---
// ---                                           ---
// ---        ATTENTION FUTURE ITERATORS:        ---
// ---               (see below:)                ---
// ---                                           ---
// -------------------------------------------------

// We apologize for the messy code. A router could be created for any routes following the /api/auth route.
// We have created some middleware functions and routers for accessing goals and tasks, but have not implemented them much in this server.js file.

app.get('/api/auth', async (req, res) => {
  const authlink = `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;

  // initializing a variable for a current user id for auth.
  let currentUserId;

  // fetching to the Github auth link for the user data.
  const response = await fetch(authlink, {
    method: 'POST',
    headers: {
      accept: 'application/json'
    }
  });

  // parsing Github account data
  const json = await response.json();

  // error handler for json response.
  if (json.error) {
    res.redirect('/?error=' + json.error);
  }

  // search for the account by each account's Github access token.
  const search = await prisma.account.findUnique({ 
    where: {
      access_token: json.access_token
    } 
  });

  // if the search for the user is NOT null, set the found userId equal to the current user id.
  if (search !== null) currentUserId = search.userId;

  // if the search for the user is null, create a new user via their Github data.
  if (search === null) {

    // fetch the Github access token.
    const gitResponse = await fetch(`https://api.github.com/user`, {
      headers: {
        Authorization: `token ${json.access_token}`
      }
    });

    // parse the Gitgub retrieved data.
    const user = await gitResponse.json();
    console.log('DATA', user);

    // create a new user based on the Prisma schema.
    const newUser = await prisma.account.create({
      data: {
        provider: 'Github',
        providerAccountId: user.id,
        userId: {
          create: {
            name: user.login,
            image: user.avatar_url
          }
        },
        access_token: user.access_token,
      }
    });

    // set current userId equal to the newly created user's userId.
    currentUserId = newUser.userId;
  }

  // Create session
  const session = {
    sessionId: crypto.randomBytes(18).toString('base64'),
    accesstoken: json.access_token,
    userId: currentUserId
  };

  sessions.set(session.sessionId, session);
  console.log(sessions);
  res.cookie('session', session.sessionId);
  res.redirect(`http://localhost:8080/profile`);
});

// route for posting a new goal.
app.post('/api/goal', async (req, res) => {
  // Post to prisma db
  console.log(req.body);
  const newGoal = await prisma.goal.create({
    data: {
      title: req.body.title,
      userId: Number(req.body.userId)
    }
  });
  res.send(newGoal);
});

// get an individual goal and all associated data.
app.get('/api/goal', async (req, res) => {
  // Check if session is valid and associated with user
  console.log(sessions);
  const session = sessions.get(req.cookies.session);
  const userId = req.query.user_id;
  console.log({ session, userId });
  if (!session) {
    res.status(401).send('Unauthorized');
    return;
  }

  if (session.userId !== Number(userId)) {
    res.status(403).send('Forbidden');
    return;
  }

  const userGoals = await prisma.goal.findMany({
    where: {
      userId: Number(session.userId)
    }
  });
  res.send(userGoals);
});

// NOTE: We have not completely modularized our code. A lot of methods above can be modularized into the created routers and controllers.
app.use('/api', goalRouter);

//Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// general error handler.
app.use((err, req, res, next) => {
  const defErr = {
    log: 'Express caught unknown middleware error.',
    status: 500,
    message: { err: 'An error occurred' }
  };
});

app.listen(port, () => console.log(`Listening on port ${port}`));

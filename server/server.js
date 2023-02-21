//Express boilerplate
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const prisma = require('./db.js');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

const goalRouter = require('./routers/goalRouter');

const CLIENT_ID = '2fd7a075b391b262d9e5';
const CLIENT_SECRET = '42b4c16c612d473ec86b48e1cd94d07de235262b';
const GITHUB_URL = 'https://github.com/login/oauth/access_token';

const sessions = new Map();

//Serve the static files from the React app
app.use('/build', express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(cookieParser());

//An api endpoint that returns a short list of items
app.use('/api', goalRouter);

app.get('/api/auth', async (req, res) => {
  const authlink = `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;

  const response = await fetch(authlink, {
    method: 'POST',
    headers: {
      accept: 'application/json'
    }
  });

  const json = await response.json();

  if (json.error) {
    res.redirect('/?error=' + json.error);
  }

  const gitResponse = await fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${json.access_token}`
    }
  });
  const user = await gitResponse.json();
  console.log('DATA', user);

  // Create session
  const session = {
    sessionId: crypto.randomBytes(18).toString('base64'),
    accesstoken: json.access_token,
    userId: 23
  };

  sessions.set(session.sessionId, session);
  console.log(sessions);
  res.cookie('session', session.sessionId);
  res.redirect(`http://localhost:8080/profile`);
});

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

//Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((err, req, res, next) => {
  const defErr = {
    log: 'Express caught unknown middleware error.',
    status: 500,
    message: { err: 'An error occurred' }
  };
});

app.listen(port, () => console.log(`Listening on port ${port}`));

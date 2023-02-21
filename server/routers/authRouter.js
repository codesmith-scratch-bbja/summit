const express = require('express');
const authRouter = express.Router();
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

const CLIENT_ID = '2fd7a075b391b262d9e5';
const CLIENT_SECRET = '42b4c16c612d473ec86b48e1cd94d07de235262b';
const GITHUB_URL = 'https://github.com/login/oauth/access_token';

const sessions = new Map();

authRouter.get('/', async (req, res) => {
  const authlink = `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;
  
  const response = await fetch(authlink, {
    method: 'POST',
    headers: {
      accept: 'application/JSON'
    }
  });

  const json = await response.json();

  if (json.error) res.redirect('/?error=' + json.error);

  const gitResponse = await fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${json.access_token}`
    }
  });

  const user = await gitResponse.json();
  console.log('DATA', user);

  // create new session:
  const session = {
    sessionId: crypto.randomBytes(18).toString('base64'),
    accessToken: json.access_token,
    userId: 23
  };

  sessions.set(session.sessionId, session);
  console.log(sessions);
  res.cookie('session', session.sessionId);
  res.redirect(`http://localhost:8080/profile`);
})

module.exports = authRouter;
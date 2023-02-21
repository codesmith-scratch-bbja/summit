const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const prisma = require('../db.js');

const CLIENT_ID = '2fd7a075b391b262d9e5';
const CLIENT_SECRET = '42b4c16c612d473ec86b48e1cd94d07de235262b';
const GITHUB_URL = 'https://github.com/login/oauth/access_token';

router.get('/', async (req, res, next) => {
  console.log('In the auth callback');
  const authlink = `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;

  // initializing a variable for a current user id for auth.
  let currentUserId;

  // fetching to the Github auth link for the access_token
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
    console.log('Error', json.error);
    return next(json.error);
  }

  const accessToken = json.access_token;

  if (!accessToken) {
    console.log('No access token');
    return next('No access token');
  }

  // fetch the Github user data using the access token
  const gitResponse = await fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${accessToken}`
    }
  });

  // parse the Gitgub retrieved data.
  const userData = await gitResponse.json();

  // search for the account by each account's Github access token.
  const foundUser = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: 'github',
        providerAccountId: String(userData.id)
      }
    }
  });

  // if the search for the user is NOT null, set the found userId equal to the current user id.
  if (foundUser) currentUserId = foundUser.userId;

  // if the search for the user is null, create a new user via their Github data.
  if (!foundUser) {
    // create a new user based on the Prisma schema.
    const newUser = await prisma.account.create({
      data: {
        provider: 'github',
        providerAccountId: String(userData.id),
        user: {
          create: {
            name: userData.login,
            image: userData.avatar_url
          }
        },
        access_token: accessToken,
        type: 'oauth'
      }
    });

    // set current userId equal to the newly created user's userId.
    currentUserId = newUser.userId;
  }

  const session = await prisma.session.create({
    data: {
      userId: currentUserId,
      expires: new Date(Date.now() + 30 * 60 * 1000),
      sessionToken: crypto.randomBytes(18).toString('base64')
    }
  });

  res.cookie('session', session.sessionToken);
  res.redirect(`http://localhost:8080/profile`);
});

module.exports = router;

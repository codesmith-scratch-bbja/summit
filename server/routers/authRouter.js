const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const prisma = require('../db.js');
const { access } = require('fs');

const GITHUB_CLIENT_ID = '2fd7a075b391b262d9e5';
const GITHUB_CLIENT_SECRET = '42b4c16c612d473ec86b48e1cd94d07de235262b';
const GITHUB_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_DATA = `https://api.github.com/user`;

const DISCORD_URL = 'https://discord.com/api/oauth2/token';
const DISCORD_ID = '1077746000585838644';
const DISCORD_SECRET = 'vK6SXbzkJ_BdsTC7MtNDX9-eCKJWIp-s';
const DISCORD_USER_DATA = `https://discord.com/api/users/@me`;

const DISCORD_OAUTH =
  'https://discord.com/api/oauth2/authorize?client_id=1077746000585838644&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify';

const GITHUB_OAUTH = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=http://localhost:8080/api/auth/callback/github`;

// Redirect login request to selected provider
router.get('/login/:provider', (req, res) => {
  switch (req.params.provider) {
    case 'github':
      res.redirect(GITHUB_OAUTH);
      break;
    case 'discord':
      res.redirect(DISCORD_OAUTH);
      break;
    default:
      res.redirect('/');
      break;
  }
});

// Callback route after succesful authentication
router.get('/callback/:provider', async (req, res, next) => {
  const provider = req.params.provider;
  let providerURL;
  let providerParams;
  let userDataURL;
  let usernameAccessString;
  let avatarURL;

  console.log('CODE', req.query.code);

  switch (provider) {
    case 'discord': {
      // Construct GitHub params
      const discordParams = new URLSearchParams({
        client_id: DISCORD_ID,
        client_secret: DISCORD_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: `http://localhost:8080/api/auth/callback/discord`,
        scope: 'identify',
        code: req.query.code
      });

      providerURL = DISCORD_URL;
      providerParams = discordParams;
      userDataURL = DISCORD_USER_DATA;
      usernameAccessString = 'username';
      break;
    }
    case 'github': {
      // Construct GitHub params
      const githubParams = new URLSearchParams({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: req.query.code
      });

      providerURL = GITHUB_URL;
      providerParams = githubParams;
      userDataURL = GITHUB_USER_DATA;
      usernameAccessString = 'login';
      break;
    }
    default: {
      res.redirect('/');
      break;
    }
  }
  console.log(providerParams);
  const response = await fetch(providerURL, {
    method: 'POST',
    headers: {
      content_type: 'application/x-www-form-urlencoded',
      accept: 'application/json'
    },
    body: providerParams
  });

  const data = await response.json();

  if (data.error) {
    console.log('Error', data.error);
    return next(data.error);
  }

  const accessToken = data.access_token;

  if (!accessToken) {
    console.log('No access token');
    return next('No access token');
  }
  console.log(accessToken);

  const userDataResponse = await fetch(userDataURL, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const userData = await userDataResponse.json();
  console.log(userData);

  const foundUser = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider,
        providerAccountId: String(userData.id)
      }
    },
    include: {
      user: true
    }
  });

  // if the search for the user is NOT null, set the found userId equal to the current user id.
  if (foundUser) {
    console.log(foundUser);
    avatarURL = foundUser.user.image;
    currentUserId = foundUser.userId;
  }

  // if the search for the user is null, create a new user via their Github data.
  if (!foundUser) {
    console.log('Creating new user');

    avatarURL =
      userData.avatar_url ||
      `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
    // create a new user based on the Prisma schema.
    const newUser = await prisma.account.create({
      data: {
        provider,
        providerAccountId: String(userData.id),
        user: {
          create: {
            name: userData[usernameAccessString],
            image: avatarURL
          }
        },
        access_token: accessToken,
        type: 'oauth'
      }
    });
    console.log(newUser);
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
  res.cookie('userId', currentUserId);
  res.redirect(`http://localhost:8080/profile?avatar=${avatarURL}`);
});

module.exports = router;

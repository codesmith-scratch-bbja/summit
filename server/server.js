import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import redis from 'connect-redis';
import { createClient } from 'redis';

const app = express();
const port = 3000;

// Routers
import apiRouter from './routers/apiRouter.js';
import sessionController from './controllers/sessionController.js';

const RedisStore = redis(session);

const redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

// Serve the static files from the React app
// app.use('/', express.static(path.join(__dirname, 'client/build')));

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24, httpOnly: true }
  })
);

app.use(sessionController.isAuthenticated);

app.use('/api', apiRouter);

// Handles any requests that don't match the ones above
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

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const session = require('express-session');

const apiRouter = require('./routers/apiRouter');

// Serve the static files from the React app
//app.use('/', express.static(path.join(__dirname, 'client/build')));

app.use(express.json());
app.use(cookieParser());

// app.use(
//   session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24, httpOnly: true }
//   })
// );

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

//Express boilerplate
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const apiRouter = require('./routers/apiRouter');

//Serve the static files from the React app
app.use('/build', express.static(path.join(__dirname, 'client/build')));

//An api endpoint that returns a short list of items
app.use('/api', apiRouter);

//Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

'use strict';

const path = require('path');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/public')));

app.use(cors());
app.use(routes);

const server = app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log('The app is running on http://localhost:%s', server.address().port);
});

'use strict';

const path = require('path');
const express = require('express');

const app = express();

app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/api/whoami', (req, res) => {
  res.contentType('application/json');
  res.status(200).json({
    ipaddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    language: req.headers['accept-language'].match(/^(.*?),/)[1],
    software: req.headers['user-agent'].match(/\((.*?)\)/)[1],
  });
});

app.get('/', (req, res) => {
  const sample = {
    ipaddress: '86.205.25.192',
    language: 'en-GB',
    software: 'Macintosh; Intel Mac OS X 10_11_4',
  };
  const data = {
    sample: JSON.stringify(sample, null, 2),
  };
  res.render('index', data);
});

const server = app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log('The app is running on http://localhost:%s', server.address().port);
});

'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const data = {
    example: JSON.stringify({
      ipaddress: '86.205.25.192',
      language: 'en-GB',
      software: 'Macintosh; Intel Mac OS X 10_11_4',
    }, null, 2),
  };
  res.render('index', data);
});

router.get('/api/whoami', (req, res) => {
  res.contentType('application/json');
  res.status(200).json({
    ipaddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    language: req.headers['accept-language'].match(/^(.*?),/)[1],
    software: req.headers['user-agent'].match(/\((.*?)\)/)[1],
  });
});

module.exports = router;

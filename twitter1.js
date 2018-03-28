require('dotenv').config();
const express = require('express');
const request = require('request');
const app = express();
const twitter = require('./api/twitter');

const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;
const credentials =  `${CONSUMER_KEY}:${CONSUMER_SECRET}`;
base64Credentials = new Buffer(credentials).toString('base64');

app.get('/tweets', function(req, res) {
  if (!req.query.q) {
    res.status(422).json({
      error: 'Please specify the "q" query string parameter'
    })
    return;
  }
    let q = req.query.q;
  request({
      url: 'https://api.twitter.com/oauth2/token',
      method: 'POST',
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: 'grant_type=client_credentials'
    }, function(error, response, body) {
      let token = JSON.parse(body).access_token;
      twitter
        .get(`https://api.twitter.com/1.1/search/tweets.json?q=${q}`, token)
        .then(function(tweets) {
          res.json(tweets);
        });
    /*  request({
        url: `https://api.twitter.com/1.1/search/tweets.json?q=${q}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }, function(error, response, body) {
        console.log(`body ${body}`);
        res.json(JSON.parse(body));
      });*/
    });
});

const port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
})

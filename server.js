const express = require('express');
const app = express();
const fetch = require('isomorphic-unfetch');
const spellcheck = require('./utils/spellcheck');
const path = require('path');
require('dotenv').config(); 

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/photos', (req, res, next) => {
  fetch(`https://api.unsplash.com/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&per_page=28`).then((response) => {
    return response.json();
  }).then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err)
  })
});

app.get('/photos/search', (req, res, next) => {
  const { query } = req.query;
  fetch(`https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${query}&per_page=28`).then((response) => {
    return response.json();
  }).then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err)
  })
});

app.get('/spellcheck', (req, res, next) => {
  const { query } = req.query;
  const suggestions = [];
  const suggestion = spellcheck(query);

  if (query.toLowerCase() != suggestion) {
    suggestions.push(suggestion)
  }

  res.json({
    suggestions: suggestions
  });
});

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);

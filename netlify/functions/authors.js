'use strict';
const express = require('express');
const serverless = require('serverless-http');
const exp = express();
const bodyParser = require('body-parser');
let authors =
[
  {
    "id": 1,
    "name": "Abraham Silberschatz",
    "nationality": "American",
    "occupation": "Computer Scientist",
    "pseudonym": "None"
  },
  {
    "id": 2,
    "name": "Andrew S. Tanenbaum",
    "nationality": "Dutch",
    "occupation": "Professor and Computer Scientist",
    "pseudonym": "None"
  }
];


const app = express.Router();
app.get('/', (req, res) => {
  res.json(authors);
});
app.get('/:id', (req, res) => {
  let author = authors.find(i => i.id == req.params.id);
  if (author == undefined)
    res.status(404).send('Author not found');
  else
    res.json(author);
});
exp.use(bodyParser.json());
exp.use('/.netlify/functions/authors', app);
module.exports = exp;
module.exports.handler = serverless(exp);
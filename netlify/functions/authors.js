'use strict';
const express = require('express');
const serverless = require('serverless-http');
const exp = express();
const bodyParser = require('body-parser');
let authors = [
  {
    "id": 1,
    "name": "Abraham Silberschatz",
    "nationality": "American",
    "occupation": "Computer Scientist",
    "pseudonym": "None",
    "book_ids": ["1", "2"]
  },
  {
    "id": 2,
    "name": "Andrew S. Tanenbaum",
    "nationality": "Dutch",
    "occupation": "Professor and Computer Scientist",
    "pseudonym": "None",
    "book_ids": ["3", "4"]
  },
  {
    "id": 3,
    "name": "Donald Knuth",
    "nationality": "American",
    "occupation": "Mathematician and Computer Scientist",
    "pseudonym": "None",
    "book_ids": ["5", "6"]
  },
  {
    "id": 4,
    "name": "Robert C. Martin",
    "nationality": "American",
    "occupation": "Software Engineer",
    "pseudonym": "Uncle Bob",
    "book_ids": ["7", "8"]
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
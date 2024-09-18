'use strict';
const express = require('express');
const serverless = require('serverless-http');
const exp = express();
const bodyParser = require('body-parser');
let publishers = [
  {
    "id": 1,
    "name": "John Wiley & Sons",
    "country": "United States",
    "founded": 1807,
    "publisher_name": "John Wiley",
    "book_ids": ["1", "2"],
    "author_ids": ["1", "2"]
  },
  {
    "id": 2,
    "name": "Pearson Education",
    "country": "United Kingdom",
    "founded": 1844,
    "publisher_name": "Samuel Pearson",
    "book_ids": ["3", "4"],
    "author_ids": ["2"]
  },
  {
    "id": 3,
    "name": "Addison-Wesley",
    "country": "United States",
    "founded": 1942,
    "publisher_name": "Melbourne Wesley",
    "book_ids": ["5", "6"],
    "author_ids": ["3"]
  },
  {
    "id": 4,
    "name": "Prentice Hall",
    "country": "United States",
    "founded": 1913,
    "publisher_name": "Charles Gerstenberg",
    "book_ids": ["7", "8"],
    "author_ids": ["4"]
  }
];

const app = express.Router();
app.get('/', (req, res) => {
  res.json(publishers);
});
app.get('/:id', (req, res) => {
  let publisher = publishers.find(i => i.id == req.params.id);
  if (publisher == undefined)
    res.status(404).send('Publisher not found');
  else
    res.json(publisher);
});

exp.use(bodyParser.json());
exp.use('/.netlify/functions/publishers', app);
module.exports = exp;
module.exports.handler = serverless(exp);
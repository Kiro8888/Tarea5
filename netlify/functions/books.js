'use strict';
const express = require('express');
const serverless = require('serverless-http');
const exp = express();
const bodyParser = require('body-parser');
let books =
[{
  "id": "1",
  "title": "Operating System Concepts",
  "edition": "9th",
  "copyright": 2012,
  "language": "ENGLISH",
  "pages": 976,
  "author": "Abraham Silberschatz",
  "author_id": 1,
  "publisher": "John Wiley & Sons",
  "publisher_id": 1
},
{
  "id": "2",
  "title": "Database System Concepts",
  "edition": "6th",
  "copyright": 2010,
  "language": "ENGLISH",
  "pages": 1376,
  "author": "Abraham Silberschatz",
  "author_id": 1,
  "publisher": "John Wiley & Sons",
  "publisher_id": 1
},
{
  "id": "3",
  "title": "Computer Networks",
  "edition": "5th",
  "copyright": 2010,
  "language": "ENGLISH",
  "pages": 960,
  "author": "Andrew S. Tanenbaum",
  "author_id": 2,
  "publisher": "Pearson Education",
  "publisher_id": 2
},
{
  "id": "4",
  "title": "Modern Operating Systems",
  "edition": "4th",
  "copyright": 2014,
  "language": "ENGLISH",
  "pages": 1136,
  "author": "Andrew S. Tanenbaum",
  "author_id": 2,
  "publisher": "Pearson Education",
  "publisher_id": 2
}
];

const app = express.Router();
app.get('/', (req, res) => {
  res.json(books);
});
app.get('/:id', (req, res) => {
  let book = books.find(i => i.id == req.params.id);
  if (book == undefined) {
    res.status(404).send('Book not found');
  } else {
    // Suponiendo que cada libro tiene `authorId` y `publisherId`
    let author = authors.find(a => a.id === book.authorId);
    let publisher = publishers.find(p => p.id === book.publisherId);
    book.author = author;
    book.publisher = publisher;
    res.json(book);
  }
});

exp.use(bodyParser.json());
exp.use('/.netlify/functions/books', app);
module.exports = exp;
module.exports.handler = serverless(exp);
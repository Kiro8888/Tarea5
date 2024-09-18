'use strict';
const express = require('express');
const serverless = require('serverless-http');
const exp = express();
const bodyParser = require('body-parser');
let books = [
  {
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
  },
  {
    "id": "5",
    "title": "The Art of Computer Programming",
    "edition": "3rd",
    "copyright": 1997,
    "language": "ENGLISH",
    "pages": 3168,
    "author": "Donald Knuth",
    "author_id": 3,
    "publisher": "Addison-Wesley",
    "publisher_id": 3
  },
  {
    "id": "6",
    "title": "Concrete Mathematics",
    "edition": "2nd",
    "copyright": 1994,
    "language": "ENGLISH",
    "pages": 672,
    "author": "Donald Knuth",
    "author_id": 3,
    "publisher": "Addison-Wesley",
    "publisher_id": 3
  },
  {
    "id": "7",
    "title": "Clean Code",
    "edition": "1st",
    "copyright": 2008,
    "language": "ENGLISH",
    "pages": 464,
    "author": "Robert C. Martin",
    "author_id": 4,
    "publisher": "Prentice Hall",
    "publisher_id": 4
  },
  {
    "id": "8",
    "title": "The Clean Coder",
    "edition": "1st",
    "copyright": 2011,
    "language": "ENGLISH",
    "pages": 256,
    "author": "Robert C. Martin",
    "author_id": 4,
    "publisher": "Prentice Hall",
    "publisher_id": 4
  }
];


const app = express.Router();
app.get('/', (req, res) => {
  res.json(books);
});
app.get('/:id', (req, res) => {
  let book = books.find(i => i.id == req.params.id);
  if (book == undefined)
    res.status(404).send('Book not found');
  else
    res.json(book);
});

exp.use(bodyParser.json());
exp.use('/.netlify/functions/books', app);
module.exports = exp;
module.exports.handler = serverless(exp);
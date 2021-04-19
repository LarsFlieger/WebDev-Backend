const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const DATA = [
  { id: 1, name: 'Apfel', color: 'gelb,rot' },
  { id: 2, name: 'Birne', color: 'gelb,grün' },
  { id: 3, name: 'Banane', color: 'gelb' },
];

app.get('/fruits', (req, res) => {
  res.render('all', { fruits: DATA });
});

app.get('/fruits/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const fruit = DATA.find((o) => o.id === id);

  res.render('fruit', fruit);
});

app.listen(3000);
console.log('EJS server running on localhost:3000');
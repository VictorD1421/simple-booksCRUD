const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM books ORDER BY id DESC', (err, rows) => {
    if (err) throw err;
    res.render('books/index', { data: rows });
  });
});

router.get('/add', (req, res) => {
  res.render('books/add', { name: '', author: '', publisher: '', date_publish: '' });
});


router.post('/add', (req, res) => {
  const { name, author, publisher, date_publish } = req.body;
  db.query('INSERT INTO books SET ?', { name, author, publisher, date_publish }, (err) => {
    if (err) throw err;
    res.redirect('/books');
  });
});

router.get('/edit/:id', (req, res) => {
  db.query('SELECT * FROM books WHERE id = ?', [req.params.id], (err, rows) => {
    if (err) throw err;
    res.render('books/edit', rows[0]);
  });
});


router.post('/update/:id', (req, res) => {
  const { name, author, publisher, date_publish } = req.body;
  db.query('UPDATE books SET ? WHERE id = ?', [{ name, author, publisher, date_publish }, req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/books');
  });
});

router.get('/delete/:id', (req, res) => {
  db.query('DELETE FROM books WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/books');
  });
});

module.exports = router;
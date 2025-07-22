const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
const booksRouter = require('./routes/books');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(flash());
app.use(methodOverride('_method'));
app.use('/books', booksRouter);
app.get('/', (req, res) => {
  res.redirect('/books');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
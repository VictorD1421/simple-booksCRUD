const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // default for XAMPP
  database: 'bookdb'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = connection;
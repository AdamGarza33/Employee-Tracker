const mysql = require('mysql2');
require('dotenv').config();
// connect db
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_USER,
      // MySQL password
      password: process.env.DB_PW,
      database: 'employee'
    },
    console.log('Connected to the employee database.')
);
db.connect(err => {
    if (err) throw err;
  });

module.exports = db;
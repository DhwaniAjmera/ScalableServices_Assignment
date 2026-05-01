const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: 'root',
  password: 'root',
  database: process.env.DB_NAME
});

module.exports = pool;
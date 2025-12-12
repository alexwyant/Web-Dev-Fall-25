// server/models/db_connect.js

const mysql = require('mysql2');

// Create a connection pool using values from .env
const pool = mysql.createPool({
  host: process.env.DB_HOST,     // e.g. localhost
  user: process.env.DB_USER,     // e.g. root
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME  // e.g. budget_app
});

// Export a promise-based pool so we can use async/await
module.exports = pool.promise();
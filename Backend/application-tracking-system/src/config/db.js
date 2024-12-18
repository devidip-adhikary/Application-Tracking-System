const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables from .env file

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER, // e.g., 'postgres'
  host: process.env.DB_HOST, // e.g., 'localhost'
  database: process.env.DB_NAME, // e.g., 'your_database'
  password: process.env.DB_PASS, // e.g., 'your_password'
  port: process.env.DB_PORT, // e.g., 5432
});

// Test the connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err.stack);
  } else {
    console.log("Connected to database at:", res.rows[0].now);
  }
});

module.exports = pool;

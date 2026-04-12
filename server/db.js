const { Pool } = require("pg");

const host = process.env.DB_HOST || "localhost";
const user = process.env.DB_USER || "postgres";
const database = process.env.DB_NAME || "myapp";
const password = process.env.DB_PASSWORD || "yourpassword";
const port = process.env.DB_PORT || 5432;

const pool = new Pool({
  user,
  host,
  database,
  password,
  port: parseInt(port, 10)
});

module.exports = pool;
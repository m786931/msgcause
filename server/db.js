const { Pool } = require("pg");

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }  // required for Railway Postgres
    })
  : new Pool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "postgres",
      database: process.env.DB_NAME || "myapp",
      password: process.env.DB_PASSWORD || "yourpassword",
      port: parseInt(process.env.DB_PORT || "5432", 10)
    });

module.exports = pool;
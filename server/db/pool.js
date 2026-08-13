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

// Log connection info
console.log("Database Connection Info:");
console.log("  Host:", process.env.DB_HOST || "localhost");
console.log("  User:", process.env.DB_USER || "postgres");
console.log("  Password:", process.env.DB_PASSWORD ? "***" : "NOT SET");


// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false }  // required for Railway Postgres
// });

module.exports = pool;
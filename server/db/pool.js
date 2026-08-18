const { Pool } = require("pg");

const connectionConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : {
      host: process.env.PGHOST || process.env.DB_HOST || "localhost",
      user: process.env.PGUSER || process.env.DB_USER || "postgres",
      database: process.env.PGDATABASE || process.env.DB_NAME || "myapp",
      password: process.env.PGPASSWORD || process.env.DB_PASSWORD || "yourpassword",
      port: parseInt(process.env.PGPORT || process.env.DB_PORT || "5432", 10),
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
    };

const pool = new Pool(connectionConfig);

// Log connection info
console.log("Database Connection Info:");
console.log("  Host:", process.env.PGHOST || process.env.DB_HOST || "localhost");
console.log("  User:", process.env.PGUSER || process.env.DB_USER || "postgres");
console.log("  Password:", process.env.PGPASSWORD || process.env.DB_PASSWORD ? "***" : "NOT SET");
console.log("  Database:", process.env.PGDATABASE || process.env.DB_NAME || "myapp");
console.log("  Source:", process.env.DATABASE_URL ? "DATABASE_URL" : process.env.PGHOST || process.env.PGUSER ? "PG* env vars" : "DB_* defaults");


// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false }  // required for Railway Postgres
// });

module.exports = pool;
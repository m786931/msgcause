const { Pool } = require("pg");

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
const hasExplicitPgHost = Boolean(process.env.PGHOST || process.env.DB_HOST);

if (process.env.NODE_ENV === "production" && !hasDatabaseUrl && !hasExplicitPgHost) {
  throw new Error(
    "Missing database configuration: set DATABASE_URL (preferred) or PGHOST/PGUSER/PGPASSWORD/PGDATABASE in production."
  );
}

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

const dbSource = process.env.DATABASE_URL
  ? "DATABASE_URL"
  : process.env.PGHOST || process.env.PGUSER
    ? "PG* env vars"
    : "DB_* defaults";

const effectiveHost = process.env.DATABASE_URL
  ? "(from DATABASE_URL)"
  : (connectionConfig.host || "localhost");

// Log connection info
console.log("Database Connection Info:");
console.log("  Host:", effectiveHost);
console.log("  User:", process.env.PGUSER || process.env.DB_USER || "(from DATABASE_URL)");
console.log("  Password:", process.env.PGPASSWORD || process.env.DB_PASSWORD ? "***" : "NOT SET");
console.log("  Database:", process.env.PGDATABASE || process.env.DB_NAME || "(from DATABASE_URL)");
console.log("  Source:", dbSource);


// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false }  // required for Railway Postgres
// });

module.exports = pool;
const pool = require("../db/pool");

exports.createUser = ({ ministryName, personName, email, phone, ein, passwordHash }) => {
  return pool.query(
    `INSERT INTO users (ministry_name, person_name, email, phone, ein, password_hash)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [ministryName, personName, email, phone, ein, passwordHash]
  );
};

exports.getUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  return result.rows[0];
};

exports.storeRefreshToken = (userId, token) => {
  return pool.query(
    "INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2)",
    [userId, token]
  );
};

exports.findRefreshToken = async (token) => {
  const result = await pool.query(
    "SELECT * FROM refresh_tokens WHERE token=$1",
    [token]
  );
  return result.rows[0];
};

exports.getAccountByGuid = async (guid) => {
  const result = await pool.query(
    "SELECT * FROM accounts WHERE guid=$1",
    [guid]
  );
  return result.rows[0];
};

exports.getAccountByGuid = async (guid) => {
  const result = await pool.query(
    "SELECT first_name, last_name, email, phone FROM accounts WHERE guid=$1",
    [guid]
  );
  return result.rows[0];
};

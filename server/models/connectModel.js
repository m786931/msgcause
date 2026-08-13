const pool = require("../db/pool");

exports.getMinistryByGuid = async (guid) => {
  console.log("Querying ministry for guid:", guid);
  const result = await pool.query(
    "SELECT id, accountkey, orgname AS name FROM accounts WHERE accountkey = $1 LIMIT 1",
    [guid]
  );
  console.log("Query result:", result.rows);
  return result.rows[0] || null;
};

exports.insertConnectCard = async ({ ministryId, firstName, lastName, email, phone }) => {
  return pool.query(
    `INSERT INTO connect_cards (ministry_id, first_name, last_name, email, phone)
     VALUES ($1, $2, $3, $4, $5)`,
    [ministryId, firstName, lastName, email, phone]
  );
};

// Upsert a connect_cards row by visitor_key and return identity details.
exports.upsertConnectCardByVisitorKey = async ({ visitorKey, ministryId, firstName, lastName }) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const updateResult = await client.query(
      `UPDATE connect_cards
       SET first_name = CASE WHEN $3 <> '' THEN $3 ELSE first_name END,
           last_name = CASE WHEN $4 <> '' THEN $4 ELSE last_name END,
           ministry_id = COALESCE($2, ministry_id)
       WHERE visitor_key = $1
       RETURNING id, visitor_key, first_name, last_name, created_at`,
      [visitorKey, ministryId || null, firstName || "", lastName || ""]
    );

    if (updateResult.rows[0]) {
      await client.query("COMMIT");
      return { ...updateResult.rows[0], isNew: false };
    }

    const insertResult = await client.query(
      `INSERT INTO connect_cards (ministry_id, visitor_key, first_name, last_name, email, phone)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, visitor_key, first_name, last_name, created_at`,
      [
        ministryId || null,
        visitorKey,
        firstName || "",
        lastName || "",
        "",
        null,
      ]
    );

    await client.query("COMMIT");
    return { ...insertResult.rows[0], isNew: true };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

// Record one attendance row per week (upsert — safe to call multiple times).
exports.upsertAttendance = async ({ connectCardId, ministryId, weekStart }) => {
  const result = await pool.query(
    `INSERT INTO attendance (connect_card_id, ministry_id, week_start)
     VALUES ($1, $2, $3)
     ON CONFLICT (connect_card_id, week_start) DO UPDATE
       SET scanned_at = NOW(),
           ministry_id = COALESCE(EXCLUDED.ministry_id, attendance.ministry_id)
     RETURNING id, week_start, scanned_at`,
    [connectCardId, ministryId || null, weekStart]
  );
  return result.rows[0] || null;
};

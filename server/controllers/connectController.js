const connectModel = require("../models/connectModel");

exports.getConnectCardInfo = async (req, res) => {
  const { guid } = req.params;
  console.log("getConnectCardInfo called with guid:", guid);

  try {
    const ministry = await connectModel.getMinistryByGuid(guid);
    console.log("ministry result from db:", ministry);

    if (!ministry) {
      console.log("No ministry found for guid:", guid);
      return res.status(404).json({ valid: false });
    }

    console.log("Returning ministry:", ministry);
    res.json({
      valid: true,
      ministryId: ministry.id,
      ministryName: ministry.name
    });
  } catch (error) {
    console.error("Error in getConnectCardInfo:", error);
    res.status(500).json({ error: error.message });
  }
};

// POST /connect/:guid/attendance
exports.recordAttendance = async (req, res) => {
  const { guid } = req.params;
  const { visitorKey, firstName, lastName } = req.body;

  if (!visitorKey) {
    return res.status(400).json({ error: "visitorKey is required" });
  }

  try {
    // Resolve the ministry (optional — attendance is still recorded if guid is unknown)
    const ministry = await connectModel.getMinistryByGuid(guid);
    const ministryId = ministry ? ministry.accountkey : null;

    // Upsert identity directly on connect_cards via visitor_key
    const connectCard = await connectModel.upsertConnectCardByVisitorKey({
      visitorKey,
      ministryId,
      firstName,
      lastName,
    });
    if (!connectCard) throw new Error("Failed to upsert connect card by visitor key");

    // Determine ISO week start (Monday)
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now);
    monday.setDate(diff);
    monday.setHours(0, 0, 0, 0);
    const weekStart = monday.toISOString().slice(0, 10);

    const record = await connectModel.upsertAttendance({
      connectCardId: connectCard.id,
      ministryId,
      weekStart,
    });

    res.json({
      success: true,
      connectCardId: connectCard.id,
      visitorKey: connectCard.visitor_key,
      weekStart: record.week_start,
      scannedAt: record.scanned_at,
      returning: !connectCard.isNew,
    });
  } catch (error) {
    console.error("Error recording attendance:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.submitConnectCard = async (req, res) => {
  const { guid } = req.params;
  const { firstName, lastName, email, phone } = req.body;

  const ministry = await connectModel.getMinistryByGuid(guid);
  if (!ministry) return res.status(404).json({ error: "Invalid link" });

  await connectModel.insertConnectCard({
    ministryId: ministry.accountkey,
    firstName,
    lastName,
    email,
    phone
  });

  res.json({ success: true });
};

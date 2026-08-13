const express = require("express");
const router = express.Router();
const connectController = require("../controllers/connectController");

router.post("/:guid/attendance", connectController.recordAttendance);
router.get("/:guid", connectController.getConnectCardInfo);
router.post("/:guid", connectController.submitConnectCard);

module.exports = router;

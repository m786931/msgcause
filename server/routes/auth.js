const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);

router.get("/validate/:guid", authController.validateGuid);

router.get("/public/lookup/:guid", authController.lookupByGuid);


module.exports = router;

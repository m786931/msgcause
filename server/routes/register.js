const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const pool = require("../db");
const validate = require("../middleware/validate");
const register_model = require("../models/registerModel");

const userValidationRules = [
  body("orgName")
    .trim()
    .notEmpty().withMessage("Organizational Name is required")
    .isLength({ min: 2, max: 50 }).withMessage("OrganizationalName must be 2–50 characters"),

  body("contact")
    .trim()
    .notEmpty().withMessage("contact Name is required")
    .isLength({ min: 2, max: 50 }).withMessage("contact must be 2–50 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Must be a valid email address")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty().withMessage("Phone is required")
    .isMobilePhone("en-US").withMessage("Must be a valid US phone number"),

  body("ein")
    .trim()
    .optional({ checkFalsy: true })
    .matches(/^\d{2}-\d{7}$/).withMessage("EIN must be in the format XX-XXXXXXX"),

  body("agree")
    .custom((value) => value === true || value === "true")
    .withMessage("You must agree to the terms"),
];

router.post("/", ...userValidationRules, validate, async (req, res) => {
  const { orgName, contact, email, phone, ein, agree } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO accounts (orgname, contact, email, phone, ein, agree, freeaccount) VALUES ($1, $2, $3, $4, $5, $6, true) RETURNING *",
      [orgName, contact, email, phone, ein, agree]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save user" });
  }
});

module.exports = router;
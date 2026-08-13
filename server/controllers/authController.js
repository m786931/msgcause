const userModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { createAccessToken, createRefreshToken } = require("../utils/generateTokens");
// const pool = require("../db/pool");

exports.register = async (req, res) => {
  const { ministryName, personName, email, phone, ein, password } = req.body;

  const hashed = await hashPassword(password);
  await userModel.createUser({
    ministryName,
    personName,
    email,
    phone,
    ein,
    passwordHash: hashed
  });

  res.json({ message: "User registered" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.getUserByEmail(email);
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const valid = await comparePassword(password, user.password_hash);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  const payload = {
    id: user.id,
    ministryName: user.ministry_name,
    personName: user.person_name,
    email: user.email
  };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  await userModel.storeRefreshToken(user.id, refreshToken);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
  });

  res.json({
    accessToken,
    ministryName: user.ministry_name,
    personName: user.person_name
  });
};

exports.refresh = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  const user = await userModel.findRefreshToken(token);
  if (!user) return res.sendStatus(403);

  const jwt = require("jsonwebtoken");
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    const accessToken = createAccessToken({ id: decoded.id, email: decoded.email });
    res.json({ accessToken });
  });
};

exports.validateGuid = async (req, res) => {
  const { guid } = req.params;

  const account = await userModel.getAccountByGuid(guid);

  if (!account) {
    return res.status(404).json({ valid: false });
  }

  res.json({
    valid: true,
    accountId: account.id,
    ministryName: account.ministry_name
  });
};

exports.lookupByGuid = async (req, res) => {
  const { guid } = req.params;

  const account = await userModel.getAccountByGuid(guid);

  if (!account) {
    return res.status(404).json({ valid: false });
  }

  res.json({
    valid: true,
    firstName: account.first_name,
    lastName: account.last_name,
    email: account.email,
    phone: account.phone || null
  });
};

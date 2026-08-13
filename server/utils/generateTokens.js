const jwt = require("jsonwebtoken");

exports.createAccessToken = (user) =>
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

exports.createRefreshToken = (user) =>
  jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

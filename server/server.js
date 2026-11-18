const envName = (process.env.NODE_ENV || 'development').toLowerCase();
require('dotenv').config({ path: `.env.${envName}` });
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');

//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");

const authRoutes = require("./routes/auth");
const connectRoutes = require("./routes/connect");
const accountRegisterRoutes = require("./routes/accountRegister");


//const usersRouter = require("./routes/register");
const app = express();

// Read port and allowed origins from env
const port = process.env.PORT || 3000;
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(o => o.trim());

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/connect", connectRoutes);
app.use("/api/register", accountRegisterRoutes);

console.log('PORT env var is:', process.env.PORT);

app.listen(port, () => {
  const isHosted = Boolean(process.env.RAILWAY_PUBLIC_DOMAIN || process.env.RAILWAY_STATIC_URL || process.env.RENDER || process.env.VERCEL);
  const startupTarget = isHosted
    ? `0.0.0.0:${port} (container bind; public URL is provided by the host platform)`
    : `http://localhost:${port}`;

  console.log(`Server listening on ${startupTarget}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Allowed origins: ${allowedOrigins.join(', ') || '(none set)'}`);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usersRouter = require("./routes/register");
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
app.use("/api/register", usersRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
});



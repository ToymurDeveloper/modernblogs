//server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");
const connectDatabase = require("./config/database");

// Connect to database
connectDatabase();

// Initialize express
const app = express();

// Middleware
app.use(express.json({ limit: "50mb" }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  }),
);
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Passport middleware
app.use(passport.initialize());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

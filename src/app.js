const express = require('express');
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const logger = require("./utils/logger.js");
const appLogs = logger.getLogger("app");
const compression = require("compression");
const app = express();

// Import routes
const commonRouter = require("./routes/common.routes.js");

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

app.use(compression());

// ROUTES TEST
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Welcome to To Do app apis",
  });
});

app.use("/api/v1/common", commonRouter);

process.on("uncaughtException", (err) => {
  appLogs.error(err);
  console.error("UNCAUGHT EXCEPTION 🔥 Shutting down...");
  console.error("Error🔥", err.message);
  process.exit(1);
});

module.exports = app;
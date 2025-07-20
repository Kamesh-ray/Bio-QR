const express = require("express");
const router = express.Router();

require("dotenv").config();

router.get("/info", (req, res) => {
  res.json({
    appName: "Bio QR Generator",
    createdBy: process.env.APP_CREATOR || "Unknown",
    message: "Welcome to our app!",
  });
});

module.exports = router;

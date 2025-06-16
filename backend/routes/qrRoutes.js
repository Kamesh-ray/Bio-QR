const express = require("express");
const router = express.Router();
const { generateQr } = require("../controllers/qrController");
const verifyToken = require("../middleware/verifyToken");

router.post("/generate-qrcode", generateQr);
router.post("/generate-qrcode", verifyToken, generateQr);

const bios = [];
router.get("/bios", (req, res) => {
  res.json(bios);
});

module.exports = router;

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const qrRoutes = require("./routes/qrRoutes");
const authRoutes = require("./routes/authRoutes");
const verifyToken = require('./middleware/verifyToken');
const { generateQr } = require('./controllers/qrController');

const app = express();
app.use(cors());
app.use(express.json());

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api", qrRoutes);
router.post('/generate-qrcode', verifyToken, generateQr);

// Optional base route to check if server is working
app.get("/", (req, res) => {
  res.send("QR API is working 🚀");
});   

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

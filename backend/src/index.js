const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});

app.post("/voice/chat", upload.single("audio"), (req, res) => {
  const elderId = req.body.elderId;
  const audioFile = req.file;

  console.log("Elder ID:", elderId);
  console.log("Audio received:", audioFile ? audioFile.mimetype : "none");

  res.json({
    transcript: "dummy transcript",
    detectedLanguage: "en",
    replyText: "Hi! I’m BridgeCare. I’m here with you.",
    esi: 92,
    explanationForFamily: "Stable today: normal engagement and positive tone.",
  });
});




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

app.post("/voice/chat", (req, res) => {
  const { elderId, text } = req.body;

  if (!elderId || !text) {
    return res.status(400).json({ error: "elderId and text are required" });
  }

  console.log("Elder ID:", elderId);
  console.log("Text received:", text);

  res.json({
    transcript: text,
    replyText: "Hi! I’m BridgeCare. I’m here with you. 💛",
    usedMemories: [],
    esi: 92,
    explanationForFamily: "Stable today: normal engagement and positive tone.",
    riskLevel: "low",
  });
});


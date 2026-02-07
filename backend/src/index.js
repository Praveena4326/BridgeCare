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
  // later this will accept audio + elderId
  // for now, just return a predictable dummy response
  res.json({
    transcript: "dummy transcript",
    detectedLanguage: "en",
    replyText: "Hi! I’m BridgeCare. I’m here with you!",
    esi: 92,
    explanationForFamily: "Stable today: normal engagement and positive tone.",
  });
});

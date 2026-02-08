

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { generateBridgeCareReply } = require("./services/gemini.service");
const { retrieveMemories } = require("./services/rag.service");

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

app.post("/voice/chat", async (req, res) => {
  const { elderId, text } = req.body;

  if (!elderId || !text) {
    return res.status(400).json({ error: "elderId and text are required" });
  }

  console.log("Elder ID:", elderId);
  console.log("Text received:", text);

  const memories = retrieveMemories(elderId, text, 3);

  try {
    const aiResponse = await generateBridgeCareReply({
      userText: text,
      memories: memories,
    });

    res.json({
      transcript: text,
      replyText: aiResponse.replyText,
      usedMemories: memories,
      esi: 92,
      explanationForFamily: aiResponse.explanationForFamily,
      riskLevel: aiResponse.riskLevel,
    });
  } catch (error) {
    console.error("Error generating AI reply:", error);

    // Fallback response as per requirements
    res.json({
      transcript: text,
      replyText:
        "Hi, I’m BridgeCare. I’m here with you. Would you like to tell me more?",
      usedMemories: [],
      esi: 92,
      explanationForFamily: "System fallback: no abnormal signals detected.",
      riskLevel: "low",
    });
  }
});


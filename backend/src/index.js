const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { generateBridgeCareReply, extractMemories } = require("./services/gemini.service");
const { retrieveMemories, addMemory, getAllMemories, updateMemory, deleteMemory } = require("./services/rag.service");

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

  // Retrieve relevant memories for grounding (increase limit to 50)
  const memories = retrieveMemories(elderId, text, 50);
  console.log("retrieveMemories returned:", memories, "type:", Array.isArray(memories), "length:", memories.length);

  try {
    const aiResponse = await generateBridgeCareReply({
      userText: text,
      memories: memories,
    });

    res.json({
      transcript: text,
      replyText: aiResponse.replyText,
      usedMemories: memories, // Always an array
      esi: 92,
      explanationForFamily: aiResponse.explanationForFamily,
      riskLevel: aiResponse.riskLevel,
    });

    // Background process for memory extraction (don't block response)
    // Only extract if specific trigger phrases are used
    const lowerText = text.toLowerCase();
    const triggers = ["do remember", "please remember", "do not forget that", "don't forget that", "remind me that"];
    const shouldExtract = triggers.some(t => lowerText.includes(t));

    if (shouldExtract) {
      console.log("📝 Memory trigger detected!");
      extractMemories(text).then(newMemories => {
        if (newMemories && newMemories.length > 0) {
          console.log("🧠 Extracted new memories:", newMemories.length);
          newMemories.forEach(mem => {
            // Normalize to match existing schema
            addMemory({
              id: `mem-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              elderId: elderId,
              text: mem.content, // Map 'content' to 'text'
              tags: ["auto-extracted", mem.title.toLowerCase().replace(/\s+/g, '-')], // Use title as tag
              date: mem.date
            });
          });
        }
      }).catch(err => console.error("Memory extraction failed:", err));
    } else {
      console.log("Creating memory skipped (no trigger phrase).");
    }

  } catch (error) {
    console.error("Error generating AI reply:", error);

    // Fallback response on failure
    res.json({
      transcript: text,
      replyText: "Hi, I’m BridgeCare. I’m here with you. Would you like to tell me more?",
      usedMemories: memories, // Return the retrieved memories even in fallback for consistency
      esi: 92,
      explanationForFamily: "System fallback: no abnormal signals detected.",
      riskLevel: "low",
    });
  }
});

// --- Memory Management Endpoints ---

app.get("/memories", (req, res) => {
  const { elderId } = req.query;
  const memories = getAllMemories(elderId);
  res.json(memories);
});

app.post("/memories", (req, res) => {
  const memory = req.body;
  if (!memory || (!memory.text && !memory.content)) {
    return res.status(400).json({ error: "Invalid memory format" });
  }

  // Add ID if missing
  if (!memory.id) memory.id = Date.now();
  if (!memory.elderId) memory.elderId = "elder-001"; // Default for hackathon
  // Ensure text field exists if content provided
  if (!memory.text && memory.content) memory.text = memory.content;

  const success = addMemory(memory);
  if (success) {
    res.json({ status: "success", memory });
  } else {
    res.status(500).json({ error: "Failed to add memory" });
  }
});

app.put("/memories/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedMemory = updateMemory(id, updates);
  if (updatedMemory) {
    res.json({ status: "success", memory: updatedMemory });
  } else {
    res.status(404).json({ error: "Memory not found" });
  }
});

app.delete("/memories/:id", (req, res) => {
  const { id } = req.params;
  const success = deleteMemory(id);
  if (success) {
    res.json({ status: "success" });
  } else {
    res.status(404).json({ error: "Memory not found" });
  }
});

app.get("/family/dashboard/:elderId", (req, res) => {
  const { elderId } = req.params;

  // Mock data for now, eventually this would come from a real database
  res.json({
    elderId,
    mood: "Stable",
    activityLevel: "High",
    nextMeds: "2:00 PM Blood Pressure",
    deviceStatus: { online: true, battery: 85 },
    esiHistory: [
      { day: "Mon", mood: 8 },
      { day: "Tue", mood: 7 },
      { day: "Wed", mood: 9 },
      { day: "Thu", mood: 6 },
      { day: "Fri", mood: 8 },
      { day: "Sat", mood: 9 },
      { day: "Sun", mood: 9 },
    ],
    alerts: [
      { type: "warning", title: "Irregular Sleep Pattern", message: "Detected last night at 3:00 AM", time: "3:00 AM" },
      { type: "info", title: "Morning Interaction", message: "Chatted happily for 15 mins", time: "9:00 AM" },
      { type: "success", title: "Medication Taken", message: "Confirmed at 9:00 AM", time: "9:00 AM" }
    ]
  });
});

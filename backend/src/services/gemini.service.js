const { GoogleGenerativeAI } = require("@google/generative-ai");

// List of models to try in order of preference
// "gemini-2.5-flash" might be a typo for 2.0-flash or a specific preview, 
// using standard identifiers + 2.0-flash-exp
const MODELS = [
    "gemini-2.0-flash",
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash-tts",
    "gemma-3-12b",
    "gemini-embedding-1",
    "gemini-1.5-pro"
];

/**
 * Helper to call Gemini with fallback support
 * @param {Object} payload - The JSON payload for the REST API
 * @param {string} actionName - Name of the action for logging
 * @returns {Promise<Object>} - The API response JSON
 */
async function callGeminiWithFallback(payload, actionName) {
    const apiKey = process.env.GEMINI_API_KEY;

    for (const modelId of MODELS) {
        try {
            console.log(`🚀 [${actionName}] Trying model: ${modelId}`);
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.status === 404) {
                console.warn(`⚠️ Model ${modelId} not found (404). Skipping.`);
                continue;
            }

            if (!response.ok) {
                const errorData = await response.json();
                // If rate limited (429) or overloaded (503), try next
                console.warn(`⚠️ [${actionName}] ${modelId} failed (${response.status}):`, errorData.error?.message || response.statusText);
                continue;
            }

            const result = await response.json();
            console.log(`✅ [${actionName}] Success with ${modelId}`);
            return result; // Success!

        } catch (error) {
            console.warn(`❌ [${actionName}] Error with ${modelId}:`, error.message);
            // Continue to next model
        }
    }
    throw new Error(`All models failed for ${actionName}. Please check your API key and quotas.`);
}

/**
 * Generates a real AI response using Gemini with fallback.
 */
async function generateBridgeCareReply({ userText, memories }) {
    const prompt = `
    You are "BridgeCare", a compassionate, patient, and helpful AI assistant designed specifically for elderly care.
    Your goal is to provide genuine companionship, support, and a sense of being understood.

    GROUNDING CONTEXT (Memories):
    The following are specific, real-life memories or preferences belonging to the user:
    ${memories.length > 0 ? JSON.stringify(memories) : "No specific memories available for this query."}

    CONSTRAINTS:
    1. Identity: Always identify as BridgeCare and as an AI assistant if asked.
    2. Medical Safety: DO NOT provide any medical advice, diagnoses, or medication recommendations.
    3. Emergency Protocol: If the user expresses physical danger, extreme confusion, or severe emotional distress, gently suggest they check in with a human caregiver or family member.
    4. Memory Usage: 
       - ONLY reference the provided "Memories" if they are directly relevant to the user's current text.
       - Use memories naturally to provide comfort or answer questions (e.g., mentioning family names like Sarah or Michael).
       - DO NOT invent, hallucinate, or assume any facts about the user's life that are not explicitly stated in the "Memories" section above.
    5. Formatting: Output MUST be a valid JSON object only.

    OUTPUT STRUCTURE (JSON):
    {
      "replyText": "The warm, conversational response to the user",
      "sentiment": number (0-100, where 100 is very positive),
      "riskFlags": string[] (any safety concerns identified, otherwise empty),
      "explanationForFamily": "A brief note summarizing the user's state for their family",
      "riskLevel": "low" | "medium" | "high"
    }

    USER INPUT: "${userText}"

    Provide the JSON response now:
  `;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: 0.3,
            responseMimeType: "application/json",
        },
    };

    try {
        const result = await callGeminiWithFallback(payload, "generateBridgeCareReply");

        // Safety check for candidates
        if (!result.candidates || result.candidates.length === 0) {
            throw new Error("No candidates returned from Gemini");
        }

        const text = result.candidates[0].content.parts[0].text;
        // Clean markdown code blocks if present
        const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Final Gemini Service Error:", error.message);
        throw error;
    }
}

/**
 * Extracts new memories/facts from the user's text.
 */
async function extractMemories(userText) {
    const prompt = `
    You are a helpful assistant that extracts personal facts and memories from text.
    Analyze the following USER INPUT and extract any new, permanent facts about the user's life, preferences, family, or history.
    
    CRITERIA:
    - Only extract EXPLICIT facts (e.g., "I love roses", "My daughter is Sarah").
    - Ignore transient states (e.g., "I am hungry", "I am going to the store").
    - Ignore questions (e.g., "What time is it?").
    - If no relevant facts are found, return an empty array [].
    
    USER INPUT: "${userText}"
    
    OUTPUT FORMAT:
    Return ONLY a raw JSON array of objects, where each object has:
    - "title": A short title for the memory.
    - "content": The memory content.
    - "date": Today's date (YYYY-MM-DD).
    
    Example:
    [
      { "title": "Favorite Flower", "content": "The user loves roses.", "date": "2024-01-01" },
      { "title": "Daughter's Name", "content": "The user's daughter is named Sarah.", "date": "2024-01-01" }
    ]
    `;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: 0.1,
            responseMimeType: "application/json",
        },
    };

    try {
        const result = await callGeminiWithFallback(payload, "extractMemories");
        if (!result.candidates || result.candidates.length === 0) {
            return [];
        }
        const text = result.candidates[0].content.parts[0].text;
        const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Memory Extraction Error:", error.message);
        return [];
    }
}

module.exports = {
    generateBridgeCareReply,
    extractMemories,
};

/**
 * Generates a real AI response using Gemini 3.0 Flash via REST API.
 * @param {Object} params
 * @param {string} params.userText - The user's input text.
 * @param {Array} params.memories - Grounding memories retrieved for the elder.
 * @returns {Promise<Object>}
 */
async function generateBridgeCareReply({ userText, memories }) {
    const apiKey = process.env.GEMINI_API_KEY;
    const modelId = "gemini-3-flash-preview";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

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
        contents: [
            {
                parts: [{ text: prompt }],
            },
        ],
        generationConfig: {
            temperature: 0.3,
            responseMimeType: "application/json",
        },
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Gemini API Error (${response.status}): ${JSON.stringify(errorData)}`);
        }

        const result = await response.json();
        const text = result.candidates[0].content.parts[0].text;
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini Service Error:", error.message);
        throw error;
    }
}

module.exports = {
    generateBridgeCareReply,
};

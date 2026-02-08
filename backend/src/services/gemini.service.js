/**
 * Generates a real AI response using Gemini 3.0 Flash via REST API.
 * @param {Object} params
 * @param {string} params.userText - The user's input text.
 * @param {Array} params.memories - Previous conversation context.
 * @returns {Promise<Object>}
 */
async function generateBridgeCareReply({ userText, memories }) {
    console.log("generateBridgeCareReply called with:", { userText });
    const apiKey = process.env.GEMINI_API_KEY;
    const modelId = "gemini-3-flash-preview"; // Confirmed as available
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;
    console.log("Calling Gemini URL:", url.replace(apiKey, "REDACTED"));

    const prompt = `
    You are "BridgeCare", a compassionate and helpful AI assistant for elderly care.
    Your goal is to provide companionship and support.

    CONSTRAINTS:
    1. Identify yourself as BridgeCare and as an AI assistant.
    2. DO NOT provide medical advice, diagnosis, or medication suggestions.
    3. If the user seems to be at risk (e.g., physical danger, extreme confusion, severe distress), suggest a human check-in or contact with their family.
    4. Provide your output in JSON format only.

    OUTPUT STRUCTURE (JSON):
    {
      "replyText": "The actual response to the user",
      "sentiment": number (between 0 and 100, where 100 is very positive),
      "riskFlags": string[] (list of potential risks identified, or empty array),
      "explanationForFamily": "A brief, professional note to the family about the user's state",
      "riskLevel": "low" | "medium" | "high"
    }

    User text: "${userText}"
    Memories provided: ${JSON.stringify(memories)}

    Return the JSON object now.
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
            throw new Error(
                `Gemini API Error (${response.status}): ${JSON.stringify(errorData)}`
            );
        }

        const result = await response.json();

        // The output from Gemini with responseMimeType: "application/json"
        // will be in result.candidates[0].content.parts[0].text
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

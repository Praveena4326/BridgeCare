require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        // Note: The SDK doesn't have a direct listModels on genAI in all versions, 
        // but we can try to access the standard client or use a fetch.
        // However, the standard way in the official SDK to list models is not always through GoogleGenerativeAI.
        // Let's try to see if we can find it or just try common names.

        // Alternative: Try to call a very common model to see if the API key is valid.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("test");
        console.log("Gemini 1.5 Flash OK");

        // If 1.5 flash works, then the API key is fine, meaning 3.0 or 3 is the problem.
    } catch (error) {
        console.error("Model Test Error:", error.message);
        if (error.response) {
            console.error("Response:", error.response);
        }
    }
}

listModels();

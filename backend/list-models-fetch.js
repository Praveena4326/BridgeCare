require("dotenv").config();

async function getModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.models) {
            data.models.forEach(m => console.log(`${m.name} - ${m.displayName}`));
        } else {
            console.log("No models found or error response:", JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
}

getModels();

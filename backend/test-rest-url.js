require("dotenv").config();

async function testGenerate() {
    const apiKey = process.env.GEMINI_API_KEY;
    // Try different URL structures
    const modelsToTry = ["gemini-3-flash-preview", "gemini-1.5-flash"];

    for (const modelId of modelsToTry) {
        const urls = [
            `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`,
            `https://generativelanguage.googleapis.com/v1/models/${modelId}:generateContent?key=${apiKey}`
        ];

        for (const url of urls) {
            console.log(`Testing URL: ${url.replace(apiKey, "REDACTED")}`);
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: "hi" }] }]
                    })
                });
                console.log(`Status: ${response.status} ${response.statusText}`);
                if (response.ok) {
                    console.log("SUCCESS!");
                    return;
                } else {
                    const err = await response.json();
                    console.log("Error:", JSON.stringify(err));
                }
            } catch (e) {
                console.log("Fetch error:", e.message);
            }
        }
    }
}

testGenerate();

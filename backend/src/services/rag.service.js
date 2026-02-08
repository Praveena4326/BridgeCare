const fs = require('fs');
const path = require('path');

const MEMORIES_PATH = path.resolve(__dirname, "../data/memories.json");
console.log("✅ RAG SERVICE LOADED - DEMO PATCH ACTIVE");
console.log("MEMORIES_PATH =", MEMORIES_PATH);


/**
 * Retrieves top-k memories for a given elder to guarantee demo visibility.
 * @param {string} elderId - The ID of the elder.
 * @param {string} queryText - The text to match against (ignored in this simplified version).
 * @param {number} k - Number of memories to return.
 * @returns {string[]} Array of memory text strings.
 */
function retrieveMemories(elderId, queryText, k = 3) {
    try {
        if (!fs.existsSync(MEMORIES_PATH)) {
            console.warn("Memories file not found at", MEMORIES_PATH);
            return [];
        }

        const data = fs.readFileSync(MEMORIES_PATH, 'utf-8');
        const memories = JSON.parse(data);

        const effectiveElderId = elderId || "elder-001";
        const elderMemories = memories.filter(m => m.elderId === effectiveElderId);

        if (elderMemories.length > 0) {
            return elderMemories.slice(0, k).map(m => m.text);
        }

        return [];
    } catch (error) {
        console.error("Error in retrieveMemories:", error);
        return [];
    }
}

module.exports = {
    retrieveMemories
};

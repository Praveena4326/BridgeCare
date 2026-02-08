const fs = require('fs');
const path = require('path');

const MEMORIES_PATH = path.join(__dirname, '../data/memories.json');

/**
 * Retrieves top-k relevant memories for a given elder and query using simple keyword/tag matching.
 * @param {string} elderId - The ID of the elder.
 * @param {string} queryText - The text to match against.
 * @param {number} k - Number of memories to return.
 * @returns {string[]} Array of memory text strings.
 */
function retrieveMemories(elderId, queryText, k = 3) {
    try {
        if (!fs.existsSync(MEMORIES_PATH)) {
            console.warn("Memories file not found at", MEMORIES_PATH);
            return [];
        }

        const data = fs.readFileSync(MEMORIES_PATH, 'utf8');
        const memories = JSON.parse(data);

        // Filter by elderId
        const elderMemories = memories.filter(m => m.elderId === elderId);
        if (elderMemories.length === 0) return [];

        const queryLower = queryText.toLowerCase();
        const queryWords = queryLower.split(/\W+/).filter(word => word.length > 2);

        // Score memories
        const scoredMemories = elderMemories.map(memory => {
            let score = 0;

            // 1. Tag matching (highest weight)
            memory.tags.forEach(tag => {
                if (queryLower.includes(tag.toLowerCase())) {
                    score += 10;
                }
            });

            // 2. Exact text inclusion
            if (memory.text.toLowerCase().includes(queryLower)) {
                score += 5;
            }

            // 3. Keyword matching
            queryWords.forEach(word => {
                if (memory.text.toLowerCase().includes(word)) {
                    score += 2;
                }
            });

            return { text: memory.text, score };
        });

        // Sort by score (descending) and filter out zero scores
        return scoredMemories
            .filter(m => m.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, k)
            .map(m => m.text);
    } catch (error) {
        console.error("Error in retrieveMemories:", error);
        return [];
    }
}

module.exports = {
    retrieveMemories
};

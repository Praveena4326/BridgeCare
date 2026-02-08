const fs = require('fs');
const path = require('path');

const MEMORIES_PATH = path.join(__dirname, '../data/memories.json');

/**
 * Retrieves top-k relevant memories for a given elder and query.
 * @param {string} elderId - The ID of the elder.
 * @param {string} queryText - The text to match against.
 * @param {number} k - Number of memories to return.
 * @returns {string[]} Array of memory text strings.
 */
function retrieveMemories(elderId, queryText, k = 3) {
    try {
        const data = fs.readFileSync(MEMORIES_PATH, 'utf8');
        const memories = JSON.parse(data);

        const elderMemories = memories.filter(m => m.elderId === elderId);
        if (elderMemories.length === 0) return [];

        const queryLower = queryText.toLowerCase();

        // Simple keyword/tag matching scoring
        const scoredMemories = elderMemories.map(memory => {
            let score = 0;

            // Match against tags
            memory.tags.forEach(tag => {
                if (queryLower.includes(tag.toLowerCase())) {
                    score += 2;
                }
            });

            // Match against text
            if (memory.text.toLowerCase().includes(queryLower)) {
                score += 1;
            }

            // Check for words in query that appear in text
            const queryWords = queryLower.split(/\W+/).filter(word => word.length > 3);
            queryWords.forEach(word => {
                if (memory.text.toLowerCase().includes(word)) {
                    score += 0.5;
                }
            });

            return { text: memory.text, score };
        });

        // Sort by score and return top k
        return scoredMemories
            .filter(m => m.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, k)
            .map(m => m.text);
    } catch (error) {
        console.error("Error retrieving memories:", error);
        return [];
    }
}

module.exports = {
    retrieveMemories
};

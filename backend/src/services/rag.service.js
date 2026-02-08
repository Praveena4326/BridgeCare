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
function retrieveMemories(elderId, queryText, k = 50) {
    try {
        if (!fs.existsSync(MEMORIES_PATH)) {
            console.warn("Memories file not found at", MEMORIES_PATH);
            return [];
        }

        const data = fs.readFileSync(MEMORIES_PATH, 'utf-8');
        const memories = JSON.parse(data);

        const effectiveElderId = elderId || "elder-001";
        const elderMemories = memories.filter(m => m.elderId === effectiveElderId).reverse();

        if (elderMemories.length > 0) {
            return elderMemories.slice(0, k).map(m => m.text || m.content);
        }

        return [];
    } catch (error) {
        console.error("Error in retrieveMemories:", error);
        return [];
    }
}

/**
 * Adds a new memory to the store.
 * @param {Object} memory - The memory object to add.
 * @returns {boolean} True if successful, false otherwise.
 */
function addMemory(memory) {
    try {
        let memories = [];
        if (fs.existsSync(MEMORIES_PATH)) {
            const data = fs.readFileSync(MEMORIES_PATH, 'utf-8');
            memories = JSON.parse(data);
        }

        // Ensure array
        if (!Array.isArray(memories)) {
            memories = [];
        }

        memories.push(memory);
        fs.writeFileSync(MEMORIES_PATH, JSON.stringify(memories, null, 2), 'utf-8');
        console.log("✅ Memory added:", memory.id);
        return true;
    } catch (error) {
        console.error("Error adding memory:", error);
        return false;
    }
}

/**
 * Retrieves all memories for a specific elder (for management).
 * @param {string} elderId 
 * @returns {Array} List of memories
 */
function getAllMemories(elderId) {
    try {
        if (!fs.existsSync(MEMORIES_PATH)) return [];
        const data = fs.readFileSync(MEMORIES_PATH, 'utf-8');
        const memories = JSON.parse(data);
        const effectiveElderId = elderId || "elder-001";
        // Return latest first
        return memories.filter(m => m.elderId === effectiveElderId).reverse();
    } catch (error) {
        console.error("Error getting all memories:", error);
        return [];
    }
}

/**
 * Updates a memory by ID.
 * @param {string|number} id - Memory ID
 * @param {Object} updates - Fields to update
 * @returns {Object|null} Updated memory or null if not found
 */
function updateMemory(id, updates) {
    try {
        if (!fs.existsSync(MEMORIES_PATH)) return null;
        let memories = JSON.parse(fs.readFileSync(MEMORIES_PATH, 'utf-8'));

        const index = memories.findIndex(m => m.id == id); // Loose equality for string/number IDs
        if (index === -1) return null;

        memories[index] = { ...memories[index], ...updates };
        fs.writeFileSync(MEMORIES_PATH, JSON.stringify(memories, null, 2), 'utf-8');
        console.log("✅ Memory updated:", id);
        return memories[index];
    } catch (error) {
        console.error("Error updating memory:", error);
        return null;
    }
}

/**
 * Deletes a memory by ID.
 * @param {string|number} id 
 * @returns {boolean} True if deleted
 */
function deleteMemory(id) {
    try {
        if (!fs.existsSync(MEMORIES_PATH)) return false;
        let memories = JSON.parse(fs.readFileSync(MEMORIES_PATH, 'utf-8'));

        const initialLength = memories.length;
        memories = memories.filter(m => m.id != id); // Loose equality

        if (memories.length === initialLength) return false;

        fs.writeFileSync(MEMORIES_PATH, JSON.stringify(memories, null, 2), 'utf-8');
        console.log("✅ Memory deleted:", id);
        return true;
    } catch (error) {
        console.error("Error deleting memory:", error);
        return false;
    }
}

module.exports = {
    retrieveMemories,
    addMemory,
    getAllMemories,
    updateMemory,
    deleteMemory
};

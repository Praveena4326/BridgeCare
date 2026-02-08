# BridgeCare - AI Companion for Elderly Care

**BridgeCare** is an advanced AI-powered assistant designed to provide companionship, memory support, and family connectivity for the elderly. By leveraging Google's Gemini models and Web Speech API, it offers a natural voice interface that learns and remembers personal details to create meaningful conversations.

---

## 🌟 Key Features

### 1. 🗣️ Natural Voice Interaction
*   **Real-time Speech-to-Text (STT)**: Uses the browser's Web Speech API for low-latency, accurate voice transcription.
*   **Smart Silence Detection**: The microphone listens continuously and only stops after **12 seconds** of silence, allowing for natural pauses in conversation without cutting the user off.
*   **Text-to-Speech (TTS)**: The AI reads responses aloud, making it accessible for users with visual impairments.

### 2. 🧠 Long-Term Memory & Context
*   **Automatic Memory Extraction**: The system analyzes every conversation. If the user mentions a specific key phrase (e.g., *"Please remember..."*, *"Don't forget that..."*), the backend extracts the fact and saves it permanently to `memories.json`.
*   **Context-Aware Responses**: Before answering, the AI retrieves the **most recent 50 memories**. If you taught it your name or favorite food yesterday, it will remember it today.
*   **Grounding**: Responses are grounded in these personal memories to prevent hallucinations and ensure personalized care.

### 3. 🛡️ Robust Architecture & Reliability
*   **Multi-Model Fallback System**: To prevent downtime from API rate limits, the backend automatically cycles through multiple Google Gemini models if one fails:
    1.  `gemini-2.0-flash` (Primary, Multimodal)
    2.  `gemini-1.5-flash` (Fast Fallback)
    3.  `gemini-1.5-flash-8b` (Lightweight)
    4.  `gemini-1.5-pro` (High Capacity)
*   **Data Persistence**: Memories are stored locally in a JSON store (hackathon-ready), easily upgradeable to a database.

### 4. 👨‍👩‍👧 Family Dashboard
*   **Real-time Insights**: Family members can view the elder's mood, activity levels, and medication adherence.
*   **Alerts**: The system flags potential risks (e.g., "Irregular Sleep Pattern") based on conversation analysis.

---

## 🚀 How to Run

### Prerequisites
*   Node.js (v18 or higher)
*   npm

### Installation
Run this single command from the **root** folder to install dependencies for the root, frontend, and backend:

```bash
npm run install-all
```

### Development Mode (Recommended)
Start both the Frontend (Vite) and Backend (Express) concurrently:

```bash
npm run dev
```
*   **Frontend**: http://localhost:5173
*   **Backend**: http://localhost:3000

### Production Logic
To build the frontend and serve it alongside the backend:

```bash
npm run build
npm run start
```

---

## ⚙️ Configuration

Create a `.env` file in the `backend/` directory with the following keys:

```ini
# Required for AI generation
GEMINI_API_KEY=your_google_ai_studio_key_here

# Optional (Defaults to 3000)
PORT=3000
```

---

## 🔮 Future Roadmap

### Phase 1: Native Multimodal Interaction
*   **Speech-to-Speech**: Upgrade to Gemini 2.0 Flash's native audio streaming via **WebSockets**. This will allow for sub-second latency and the ability to interrupt the AI naturally.
*   **Vision Support**: Allow the elder to show objects (e.g., medication bottles) to the camera for identification.

### Phase 2: Enhanced Intelligence
*   **Proactive Engagement**: The AI will initiate conversations if it detects inactivity ("Good morning, Martha! Did you sleep well?").
*   **Emotion Tracking**: Analyze voice tone (using native audio features) to detect distress even if the words are neutral.

### Phase 3: Hardware Integration
*   **IoT Support**: Connect to smart home devices (lights, thermostat) for voice control.
*   **Wearable Sync**: Import health data (heart rate, steps) from FitBit/Apple Watch.

---
*Built with ❤️ for the Google AI Hackathon*

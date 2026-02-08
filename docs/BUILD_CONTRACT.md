# BridgeCare – Build Contract

## Goal
Voice-first emotional support AI for elderly users with:
1. Speech input (frontend)
2. AI-generated empathetic reply
3. Memory-grounded response
4. Emotional Stability Index (ESI)
5. Family dashboard with explanation

## Backend endpoints
POST /voice/chat
Body:
{
  "elderId": "string",
  "text": "string"
}

Response:
{
  "transcript": "string",
  "replyText": "string",
  "usedMemories": ["string"],
  "esi": number,
  "explanationForFamily": "string",
  "riskLevel": "low|medium|high"
}

GET /dashboard/:elderId
Returns:
{
  "currentEsi": number,
  "history": [],
  "recentTranscripts": []
}

## Constraints
- AI must identify itself as AI.
- No medical advice.
- Escalation only suggests human check-in.
- No automatic emergency actions.

## Storage (hackathon version)
- In-memory or local JSON only.
- No complex database setup.
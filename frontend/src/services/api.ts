const API_BASE_URL = "http://localhost:3000";

export interface VoiceChatResponse {
    transcript: string;
    replyText: string;
    usedMemories: string[];
    esi: number;
    explanationForFamily: string;
    riskLevel: "low" | "medium" | "high";
}

export interface Memory {
    id: number;
    title: string;
    date: string;
    content: string;
    image?: string;
    elderId?: string;
}

export interface FamilyDashboardData {
    elderId: string;
    mood: string;
    activityLevel: string;
    nextMeds: string;
    deviceStatus: { online: boolean; battery: number };
    esiHistory: { day: string; mood: number }[];
    alerts: { type: string; title: string; message: string; time: string }[];
}

export const api = {
    async sendVoiceChat(elderId: string, text: string): Promise<VoiceChatResponse> {
        const response = await fetch(`${API_BASE_URL}/voice/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ elderId, text }),
        });
        if (!response.ok) throw new Error("Voice chat failed");
        return response.json();
    },

    async uploadMemory(memory: Partial<Memory>): Promise<{ status: string; memory: Memory }> {
        const response = await fetch(`${API_BASE_URL}/memories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(memory),
        });
        if (!response.ok) throw new Error("Memory upload failed");
        return response.json();
    },

    async getFamilyData(elderId: string): Promise<FamilyDashboardData> {
        const response = await fetch(`${API_BASE_URL}/family/dashboard/${elderId}`);
        if (!response.ok) throw new Error("Failed to fetch family data");
        return response.json();
    }
};

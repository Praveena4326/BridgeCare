import { useEffect, useRef, useState } from "react";

type ApiResponse = {
    transcript?: string;
    detectedLanguage?: string;
    replyText: string;
    esi: number;
    explanationForFamily: string;
};

declare global {
    interface Window {
        webkitSpeechRecognition: any;
        SpeechRecognition: any;
    }
}

export default function VoiceChat() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [replyText, setReplyText] = useState("");
    const [loading, setLoading] = useState(false);

    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition not supported. Use Chrome 😭");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US"; // later you can switch this or auto-detect
        recognition.interimResults = true;
        recognition.continuous = false;

        recognition.onresult = (event: any) => {
            let fullText = "";
            for (let i = 0; i < event.results.length; i++) {
                fullText += event.results[i][0].transcript;
            }
            setTranscript(fullText.trim());
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (e: any) => {
            console.log("speech error:", e);
            setIsListening(false);
        };

        recognitionRef.current = recognition;
    }, []);

    const startListening = () => {
        setTranscript("");
        setReplyText("");
        setIsListening(true);
        recognitionRef.current?.start();
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
        setIsListening(false);
    };

    const speak = (text: string) => {
        const u = new SpeechSynthesisUtterance(text);
        // You can set u.lang = "en-US" or "hi-IN" or "ta-IN" later
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
    };

    const sendToBackend = async () => {
        if (!transcript) return;

        // Stop listening if active
        if (isListening && recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }

        setLoading(true);
        try {
            const res = await fetch("http://127.0.0.1:3000/voice/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    elderId: "elder-001",
                    text: transcript,
                }),
            });

            const data: ApiResponse = await res.json();
            setReplyText(data.replyText);
            speak(data.replyText);
            setTranscript(""); // Clear input after sending
        } catch (err) {
            console.log(err);
            alert("Backend call failed 😭");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 space-y-4">
            <div className="text-sm text-gray-500">
                Hi, I’m <span className="font-semibold">BridgeCare</span> (AI). I don’t
                give medical advice.
            </div>

            <div className="border rounded-xl p-4 space-y-3">
                <div className="flex gap-2">
                    {!isListening ? (
                        <button
                            onClick={startListening}
                            className="px-4 py-2 rounded-lg bg-black text-white"
                        >
                            🎤 Start
                        </button>
                    ) : (
                        <button
                            onClick={stopListening}
                            className="px-4 py-2 rounded-lg bg-gray-200"
                        >
                            🛑 Stop
                        </button>
                    )}

                    <button
                        onClick={sendToBackend}
                        disabled={!transcript || loading}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>
                </div>

                <div>
                    <div className="text-xs text-gray-500 mb-1">You said:</div>
                    <div className="min-h-[48px] p-2 bg-gray-50 rounded-lg">
                        {transcript || <span className="text-gray-400">...</span>}
                    </div>
                </div>

                <div>
                    <div className="text-xs text-gray-500 mb-1">BridgeCare:</div>
                    <div className="min-h-[48px] p-2 bg-gray-50 rounded-lg">
                        {replyText || <span className="text-gray-400">...</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
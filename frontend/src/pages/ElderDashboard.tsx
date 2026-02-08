import { useState, useEffect, useRef } from "react"
import { Button } from "../components/ui/Button"
// import { Card } from "../components/ui/Card"
import { Mic, Send, Volume2, User, Bot } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../lib/utils"
import { api, type VoiceChatResponse } from "../services/api"

declare global {
    interface Window {
        webkitSpeechRecognition: any;
        SpeechRecognition: any;
    }
}

interface Message {
    id: number
    text: string
    sender: "user" | "ai"
    timestamp: Date
}

export function ElderDashboard() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Good morning, Martha! How are you feeling today?",
            sender: "ai",
            timestamp: new Date(),
        },
    ])
    const [inputValue, setInputValue] = useState("")
    const [isListening, setIsListening] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const recognitionRef = useRef<any>(null)
    const silenceTimerRef = useRef<NodeJS.Timeout | null>(null)

    const handleSend = async () => {
        if (!inputValue.trim()) return

        const newMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: "user",
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, newMessage])
        setInputValue("")
        setIsLoading(true)

        try {
            const data: VoiceChatResponse = await api.sendVoiceChat("elder-001", newMessage.text)

            const aiResponse: Message = {
                id: Date.now() + 1,
                text: data.replyText,
                sender: "ai",
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, aiResponse])
        } catch (error) {
            console.error("Failed to get response:", error)
            const errorResponse: Message = {
                id: Date.now() + 1,
                text: "I'm having a little trouble hearing you. Could you say that again?",
                sender: "ai",
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, errorResponse])
        } finally {
            setIsLoading(false)
        }
    }

    // --- Speech Recognition Setup ---
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition()
            recognition.lang = "en-US"
            recognition.interimResults = true
            recognition.continuous = true // Keep listening until silence timeout

            recognition.onstart = () => {
                // Reset silence timer on start
                if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current)
                silenceTimerRef.current = setTimeout(() => {
                    recognition.stop()
                }, 12000) // 12 seconds
            }

            recognition.onresult = (event: any) => {
                // Reset silence timer on user speech
                if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current)
                silenceTimerRef.current = setTimeout(() => {
                    recognition.stop()
                }, 12000) // 12 seconds

                let fullText = ""
                for (let i = 0; i < event.results.length; i++) {
                    fullText += event.results[i][0].transcript
                }
                setInputValue(fullText)
            }

            recognition.onend = () => {
                setIsListening(false)
                if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current)
            }

            recognition.onerror = (event: any) => {
                console.error("Speech recognition error", event.error)
                setIsListening(false)
                if (event.error === 'not-allowed') {
                    alert("Microphone access denied. Please check your browser settings.")
                } else if (event.error === 'audio-capture') {
                    alert("No microphone found or audio capture failed. Ensure your microphone is plugged in.")
                }
            }

            recognitionRef.current = recognition
        }
    }, [])

    const toggleListening = async () => {
        if (!recognitionRef.current) {
            alert("Speech recognition not supported in this browser.")
            return
        }

        if (isListening) {
            recognitionRef.current.stop()
            setIsListening(false)
            return
        }

        // Request microphone permission explicitly
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });

            // If we get here, permission is granted
            setInputValue("")
            setIsListening(true)
            recognitionRef.current.start()
        } catch (err) {
            console.error("Microphone permission denied:", err);
            alert("Please allow microphone access to use voice chat.");
            setIsListening(false);
        }
    }

    return (
        <div className="flex h-[calc(100vh-64px)] flex-col bg-neutral-50">
            {/* Header */}
            <header className="bg-white px-6 py-4 shadow-sm flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Welcome, Martha</h1>
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-primary-50 text-primary-600">
                    <Volume2 className="h-6 w-6" />
                </Button>
            </header>

            {/* Main Content - Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6" id="chat-container">
                <div className="mx-auto max-w-3xl space-y-6">
                    <AnimatePresence>
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "flex w-full",
                                    message.sender === "user" ? "justify-end" : "justify-start"
                                )}
                            >
                                <div className={cn(
                                    "flex max-w-[85%] items-end gap-3 md:max-w-[70%]",
                                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                                )}>
                                    <div className={cn(
                                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                                        message.sender === "user" ? "bg-primary-100 text-primary-700" : "bg-white border border-neutral-200 text-primary-600"
                                    )}>
                                        {message.sender === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                                    </div>
                                    <div
                                        className={cn(
                                            "rounded-3xl px-6 py-4 text-lg md:text-xl shadow-sm",
                                            message.sender === "user"
                                                ? "bg-primary-600 text-white rounded-br-none"
                                                : "bg-white text-neutral-900 border border-neutral-100 rounded-bl-none"
                                        )}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>

            {/* Input Area */}
            <footer className="bg-white p-4 md:p-6 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)] z-10">
                <div className="mx-auto max-w-3xl">
                    <div className="flex flex-col gap-4 md:flex-row items-center">
                        {/* Quick Actions */}
                        <div className="flex w-full gap-2 overflow-x-auto pb-2 md:pb-0 md:w-auto">
                            <Button size="sm" variant="outline" onClick={() => setInputValue("Yes, I have.")} className="whitespace-nowrap rounded-full">
                                Yes, I have
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setInputValue("Not yet.")} className="whitespace-nowrap rounded-full">
                                Not yet
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setInputValue("Call my daughter")} className="whitespace-nowrap rounded-full">
                                Call Help
                            </Button>
                        </div>

                        <div className="relative flex w-full flex-1 items-center gap-3">
                            <Button
                                size="icon"
                                onClick={toggleListening}
                                className={cn(
                                    "h-14 w-14 shrink-0 rounded-full transition-all text-white shadow-lg",
                                    isListening ? "bg-red-500 animate-pulse scale-110" : "bg-primary-500 hover:bg-primary-600"
                                )}
                            >
                                <Mic className="h-6 w-6" />
                            </Button>

                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Type or say something..."
                                    className="w-full rounded-full border border-neutral-300 bg-neutral-50 px-6 py-4 text-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                                />
                            </div>

                            <Button
                                size="icon"
                                onClick={handleSend}
                                disabled={!inputValue.trim() || isLoading}
                                className="h-14 w-14 shrink-0 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 disabled:opacity-50"
                            >
                                <Send className="h-6 w-6 ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

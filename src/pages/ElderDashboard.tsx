import { useState } from "react"
import { Button } from "../components/ui/Button"
// import { Card } from "../components/ui/Card"
import { Mic, Send, Volume2, User, Bot } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../lib/utils"

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

    const handleSend = () => {
        if (!inputValue.trim()) return

        const newMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: "user",
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, newMessage])
        setInputValue("")

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: Date.now() + 1,
                text: "I'm glad to hear from you. Have you taken your morning medication yet?",
                sender: "ai",
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, aiResponse])
        }, 1500)
    }

    const toggleListening = () => {
        setIsListening(!isListening)
        if (!isListening) {
            // Simulate speech recognition
            setTimeout(() => {
                setInputValue("I am feeling great today, thank you.")
                setIsListening(false)
            }, 2000)
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
                                disabled={!inputValue.trim()}
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

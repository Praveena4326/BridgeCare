import { Button } from "../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Heart, Shield, Brain, Clock, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export function LandingPage() {
    const features = [
        {
            title: "Emotional Support",
            description: "24/7 empathetic AI companion that provides comfort and meaningful conversation.",
            icon: Heart,
            color: "text-red-500",
            bg: "bg-red-50",
        },
        {
            title: "Health Monitoring",
            description: "Real-time tracking of emotional well-being and daily routine patterns.",
            icon: Shield,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
        {
            title: "Memory Preservation",
            description: "Store and revisit cherished memories, photos, and stories with ease.",
            icon: Brain,
            color: "text-purple-500",
            bg: "bg-purple-50",
        },
        {
            title: "Family Updates",
            description: "Keep family members informed with automated digests and alerts.",
            icon: Clock,
            color: "text-green-500",
            bg: "bg-green-50",
        },
    ]

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-primary-50 px-4 py-20 md:py-32">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid gap-12 md:grid-cols-2 md:items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-primary-700 shadow-sm">
                                <span className="mr-2 h-2 w-2 rounded-full bg-primary-500 animate-pulse"></span>
                                Now available in beta
                            </div>
                            <h1 className="text-5xl font-bold tracking-tight text-neutral-900 md:text-7xl">
                                Connecting Hearts Through <span className="text-primary-600">Intelligent Care</span>
                            </h1>
                            <p className="text-xl text-neutral-600 md:text-2xl leading-relaxed">
                                BridgeCare provides an AI-powered companion for your loved ones, ensuring they feel heard, supported, and connected every day.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Link to="/elder">
                                    <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                                        Get Started
                                        <ChevronRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link to="/about">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8">
                                        Learn More
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative mx-auto aspect-square w-full max-w-md rounded-full bg-white p-8 shadow-2xl"
                        >
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-100 to-secondary-100 opacity-50 blur-3xl"></div>
                            <img
                                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop"
                                alt="Elderly care"
                                className="relative h-full w-full rounded-full object-cover shadow-soft border-8 border-white"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-24">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-neutral-900">Why Choose BridgeCare?</h2>
                        <p className="mx-auto max-w-2xl text-xl text-neutral-600">
                            Designed with seniors in mind, built for peace of mind.
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="h-full border-none shadow-soft hover:shadow-lg transition-shadow duration-300">
                                    <CardHeader>
                                        <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg}`}>
                                            <feature.icon className={`h-7 w-7 ${feature.color}`} />
                                        </div>
                                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-neutral-500 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="bg-neutral-50 py-24">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-12 text-3xl font-bold text-neutral-900">Trusted by Families</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="border-none p-6 shadow-sm">
                                <div className="mb-4 flex justify-center text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                                <p className="mb-6 text-lg italic text-neutral-600">"BridgeCare has completely transformed how we connect with grandma. She feels less lonely and we feel more assured."</p>
                                <div className="font-semibold text-neutral-900">- Sarah Jenkins</div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

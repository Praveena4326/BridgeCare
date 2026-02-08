import { Shield, Lock, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"

export function AboutPage() {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-neutral-50 py-12 px-4 md:px-8">
            <div className="mx-auto max-w-4xl space-y-12">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-neutral-900 md:text-5xl">Our Commitment to Care</h1>
                    <p className="mt-4 text-xl text-neutral-600">Building trust through transparency and ethical AI.</p>
                </div>

                {/* AI Disclaimer */}
                <div className="rounded-3xl bg-blue-50 p-8 md:p-12">
                    <div className="flex items-start gap-4">
                        <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <Shield className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-blue-900">We are an AI Assistant</h2>
                            <p className="mt-4 text-lg text-blue-800 leading-relaxed">
                                BridgeCare uses artificial intelligence to act as a companion. While we strive to be helpful and empathetic, we are not a replacement for human care or medical professionals. All conversations are analyzed to provide insights to family members, but your loved one is always speaking with an AI, not a human operator.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Ethics & Privacy */}
                <div className="grid gap-8 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                                <Lock className="h-6 w-6" />
                            </div>
                            <CardTitle>Privacy First</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-600">
                                Your data is encrypted end-to-end. We strictly adhere to HIPAA and GDPR guidelines to ensure that sensitive health and emotional data remains confidential and secure. Only authorized family members can access detailed reports.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                <Eye className="h-6 w-6" />
                            </div>
                            <CardTitle>Transparency</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-600">
                                We believe in full transparency. Users are always informed that they are interacting with an AI. We do not store voice recordings permanently, only the text transcripts and emotional analysis derived from them.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Consent Section */}
                <div className="border-t border-neutral-200 pt-12">
                    <h2 className="mb-6 text-2xl font-bold text-neutral-900">Consent & Control</h2>
                    <div className="prose prose-neutral max-w-none text-neutral-600">
                        <p>
                            Usage of BridgeCare requires explicit consent from the primary user or their legal guardian. Participants can opt-out of data collection at any time, or request the deletion of their entire history.
                        </p>
                        <p className="mt-4">
                            Our AI models are regularly audited for bias and safety to ensure they provide equitable and safe support for all seniors, regardless of background or cognitive ability.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Bell, Volume2, Shield, Moon } from "lucide-react"

export function Settings() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-neutral-900">Settings</h2>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                        <Bell className="mr-2 h-5 w-5 text-neutral-600" />
                        Notifications
                    </CardTitle>
                    <CardDescription>Manage how you receive alerts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-neutral-700">Email Alerts</span>
                        <div className="h-6 w-11 bg-blue-600 rounded-full cursor-pointer relative">
                            <div className="absolute top-1 right-1 h-4 w-4 bg-white rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-neutral-700">SMS Alerts</span>
                        <div className="h-6 w-11 bg-neutral-200 rounded-full cursor-pointer relative">
                            <div className="absolute top-1 left-1 h-4 w-4 bg-white rounded-full"></div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                        <Volume2 className="mr-2 h-5 w-5 text-neutral-600" />
                        AI Preferences
                    </CardTitle>
                    <CardDescription>Customize BridgeCare's voice and personality.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-neutral-700">Voice Speed</span>
                        <select className="border rounded p-1 text-sm bg-white">
                            <option>Slow</option>
                            <option selected>Normal</option>
                            <option>Fast</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-neutral-700">Conversation Style</span>
                        <select className="border rounded p-1 text-sm bg-white">
                            <option>Formal</option>
                            <option selected>Compassionate</option>
                            <option>Cheerful</option>
                        </select>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

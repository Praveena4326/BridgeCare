import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { User, Activity, HeartPulse, Brain } from "lucide-react"

export function ElderView() {
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-neutral-200 flex items-center justify-center">
                    <User className="h-10 w-10 text-neutral-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-neutral-900">Martha Jenkins</h2>
                    <p className="text-neutral-500">78 Years Old • Assisted Living</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                            <HeartPulse className="mr-2 h-5 w-5 text-red-500" />
                            Health Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-neutral-600">Blood Pressure</span>
                            <span className="font-medium">120/80</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-neutral-600">Heart Rate</span>
                            <span className="font-medium">72 bpm</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-600">Weight</span>
                            <span className="font-medium">145 lbs</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                            <Brain className="mr-2 h-5 w-5 text-purple-500" />
                            Cognitive Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-neutral-600">Memory Score</span>
                            <span className="font-medium text-green-600">Stable</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-neutral-600">Last Assessment</span>
                            <span className="font-medium">2 weeks ago</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-600">Mood Trend</span>
                            <span className="font-medium text-blue-600">Positive</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                        <Activity className="mr-2 h-5 w-5 text-blue-500" />
                        Daily Routine
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        <li className="flex items-center text-neutral-700">
                            <span className="w-20 font-bold text-neutral-400">08:00 AM</span>
                            <span>Breakfast & Medication</span>
                        </li>
                        <li className="flex items-center text-neutral-700">
                            <span className="w-20 font-bold text-neutral-400">10:30 AM</span>
                            <span>Morning Walk</span>
                        </li>
                        <li className="flex items-center text-neutral-700">
                            <span className="w-20 font-bold text-neutral-400">01:00 PM</span>
                            <span>Lunch</span>
                        </li>
                        <li className="flex items-center text-neutral-700">
                            <span className="w-20 font-bold text-neutral-400">03:00 PM</span>
                            <span>Social Hour</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}

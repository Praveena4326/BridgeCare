import { Sidebar } from "../components/layout/Sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { AlertTriangle, CheckCircle, Smartphone, Clock } from "lucide-react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

const data = [
    { day: "Mon", mood: 8 },
    { day: "Tue", mood: 7 },
    { day: "Wed", mood: 9 },
    { day: "Thu", mood: 6 },
    { day: "Fri", mood: 8 },
    { day: "Sat", mood: 9 },
    { day: "Sun", mood: 9 },
]

export function FamilyDashboard() {
    return (
        <div className="flex bg-neutral-50 h-[calc(100vh-64px)]">
            <div className="hidden md:block h-full">
                <Sidebar />
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-5xl space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-neutral-900">Family Overview</h1>
                            <p className="text-neutral-500">Monitoring for: <span className="font-medium text-neutral-900">Martha Jenkins</span></p>
                        </div>
                        <Button>Check-in Now</Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {/* KPI Cards */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-neutral-500">Current Mood</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-neutral-900">Stable</div>
                                <p className="text-xs text-green-600 flex items-center mt-1">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Updating live
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-neutral-500">Activity Level</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-neutral-900">High</div>
                                <p className="text-xs text-neutral-500 mt-1">Last active 5m ago</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-neutral-500">Next Meds</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-neutral-900">2:00 PM</div>
                                <p className="text-xs text-neutral-500 mt-1">Blood Pressure</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-neutral-500">Device Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-neutral-900">Online</div>
                                <p className="text-xs text-green-600 flex items-center mt-1">
                                    <Smartphone className="h-3 w-3 mr-1" />
                                    Battery 85%
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Chart */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Emotional Stability Index (ESI)</CardTitle>
                                <CardDescription>Weekly mood trends based on voice analysis</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 10]} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                cursor={{ stroke: '#cbd5e1' }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="mood"
                                                stroke="#0ea5e9"
                                                strokeWidth={3}
                                                dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4, stroke: '#fff' }}
                                                activeDot={{ r: 6, strokeWidth: 0 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Alerts & Notifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3 rounded-lg bg-orange-50 p-3">
                                        <AlertTriangle className="mt-0.5 h-5 w-5 text-orange-500 shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-orange-800">Irregular Sleep Pattern</p>
                                            <p className="text-xs text-orange-600">Detected last night at 3:00 AM</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 p-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 shrink-0">
                                            <Clock className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-neutral-900">Morning Interaction</p>
                                            <p className="text-xs text-neutral-500">Chatted happily for 15 mins</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 p-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 shrink-0">
                                            <CheckCircle className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-neutral-900">Medication Taken</p>
                                            <p className="text-xs text-neutral-500">Confirmed at 9:00 AM</p>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full mt-4" size="sm">View Full History</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

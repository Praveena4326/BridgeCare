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
import { api, type FamilyDashboardData } from "../services/api"
import { useEffect, useState } from "react"


export function FamilyDashboard() {
    const [dashboardData, setDashboardData] = useState<FamilyDashboardData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await api.getFamilyData("elder-001")
                setDashboardData(data)
            } catch (error) {
                console.error("Failed to load family data", error)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [])

    if (loading) return <div className="p-8">Loading dashboard...</div>
    if (!dashboardData) return <div className="p-8">Failed to load dashboard data.</div>

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
                                <div className="text-2xl font-bold text-neutral-900">{dashboardData.mood}</div>
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
                                <div className="text-2xl font-bold text-neutral-900">{dashboardData.activityLevel}</div>
                                <p className="text-xs text-neutral-500 mt-1">Last active 5m ago</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-neutral-500">Next Meds</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-neutral-900">{dashboardData.nextMeds.split(' ').slice(0, 2).join(' ')}</div>
                                <p className="text-xs text-neutral-500 mt-1">{dashboardData.nextMeds.split(' ').slice(2).join(' ')}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-neutral-500">Device Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-neutral-900">{dashboardData.deviceStatus.online ? "Online" : "Offline"}</div>
                                <p className="text-xs text-green-600 flex items-center mt-1">
                                    <Smartphone className="h-3 w-3 mr-1" />
                                    Battery {dashboardData.deviceStatus.battery}%
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
                                        <LineChart data={dashboardData.esiHistory}>
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
                                    {dashboardData.alerts.map((alert, i) => (
                                        <div key={i} className={`flex items-start space-x-3 p-2 rounded-lg ${alert.type === 'warning' ? 'bg-orange-50' : ''}`}>
                                            {alert.type === 'warning' && <AlertTriangle className="mt-0.5 h-5 w-5 text-orange-500 shrink-0" />}
                                            {alert.type === 'info' && (
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 shrink-0">
                                                    <Clock className="h-4 w-4" />
                                                </div>
                                            )}
                                            {alert.type === 'success' && (
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 shrink-0">
                                                    <CheckCircle className="h-4 w-4" />
                                                </div>
                                            )}
                                            <div>
                                                <p className={`text-sm font-medium ${alert.type === 'warning' ? 'text-orange-800' : 'text-neutral-900'}`}>{alert.title}</p>
                                                <p className={`text-xs ${alert.type === 'warning' ? 'text-orange-600' : 'text-neutral-500'}`}>{alert.message}</p>
                                            </div>
                                        </div>
                                    ))}
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

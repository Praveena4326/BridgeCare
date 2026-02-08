import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"
import { Button } from "../ui/Button"
import { Home, Heart, Users, BookOpen, Info, LogOut } from "lucide-react"

export function Sidebar() {
    const location = useLocation()

    const links = [
        { name: "Overview", href: "/family", icon: Home },
        { name: "Elder View", href: "/elder", icon: Heart },
        { name: "Care Team", href: "/family/team", icon: Users },
        { name: "Memories", href: "/memory", icon: BookOpen },
        { name: "Settings", href: "/family/settings", icon: Info },
    ]

    const isActive = (path: string) => location.pathname === path

    return (
        <div className="flex h-full w-64 flex-col border-r border-neutral-200 bg-white">
            <div className="flex h-16 items-center px-6">
                <span className="text-lg font-bold text-neutral-900">Family Portal</span>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-3">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={cn(
                                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isActive(link.href)
                                    ? "bg-primary-50 text-primary-700"
                                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                            )}
                        >
                            <link.icon className="h-5 w-5" />
                            <span>{link.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="border-t border-neutral-200 p-4">
                <Button variant="ghost" className="w-full justify-start text-neutral-600 hover:text-red-600 hover:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    )
}

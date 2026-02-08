import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"
import { Button } from "../ui/Button"
import { Heart, Menu, X, Home, Users, BookOpen, Info, LogOut } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Elder Mode", href: "/elder" },
        { name: "Family Dashboard", href: "/family" },
        { name: "Memories", href: "/memory" },
        { name: "About", href: "/about" },
    ]

    const isActive = (path: string) => location.pathname === path

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white">
                            <Heart className="h-4 w-4 fill-current" />
                        </div>
                        <span className="text-xl font-bold text-neutral-900">BridgeCare</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex md:items-center md:space-x-1">
                        <Link to="/family" className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors">
                            <Home className="h-4 w-4" />
                            <span>Overview</span>
                        </Link>
                        <Link to="/family/elder" className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors">
                            <Heart className="h-4 w-4" />
                            <span>Elder View</span>
                        </Link>
                        <Link to="/family/team" className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors">
                            <Users className="h-4 w-4" />
                            <span>Care Team</span>
                        </Link>
                        <Link to="/memory" className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors">
                            <BookOpen className="h-4 w-4" />
                            <span>Memories</span>
                        </Link>
                        <Link to="/family/settings" className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors">
                            <Info className="h-4 w-4" />
                            <span>Settings</span>
                        </Link>
                        <div className="ml-2 pl-2 border-l border-neutral-200 flex items-center space-x-2">
                            <Link to="/elder" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                                Elder Demo
                            </Link>
                            <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-red-600 hover:bg-red-50">
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign Out
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-neutral-200 bg-white overflow-hidden"
                    >
                        <div className="flex flex-col space-y-1 p-4">
                            <Link to="/family" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 px-4 py-3 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-colors">
                                <Home className="h-5 w-5" />
                                <span>Overview</span>
                            </Link>
                            <Link to="/family/elder" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 px-4 py-3 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-colors">
                                <Heart className="h-5 w-5" />
                                <span>Elder View</span>
                            </Link>
                            <Link to="/family/team" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 px-4 py-3 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-colors">
                                <Users className="h-5 w-5" />
                                <span>Care Team</span>
                            </Link>
                            <Link to="/memory" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 px-4 py-3 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-colors">
                                <BookOpen className="h-5 w-5" />
                                <span>Memories</span>
                            </Link>
                            <Link to="/family/settings" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 px-4 py-3 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-colors">
                                <Info className="h-5 w-5" />
                                <span>Settings</span>
                            </Link>

                            <div className="pt-4 mt-2 border-t border-neutral-100 space-y-2">
                                <Link to="/elder" onClick={() => setIsOpen(false)} className="flex items-center justify-center space-x-2 px-4 py-3 text-base font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-xl transition-colors w-full">
                                    <span>Elder Dashboard Demo</span>
                                </Link>
                                <Button variant="ghost" size="lg" className="w-full justify-start text-neutral-600 hover:text-red-600 hover:bg-red-50">
                                    <LogOut className="mr-2 h-5 w-5" />
                                    Sign Out
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

import { Heart } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-neutral-200 bg-white py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white">
                                <Heart className="h-4 w-4 fill-current" />
                            </div>
                            <span className="text-xl font-bold text-neutral-900">BridgeCare</span>
                        </div>
                        <p className="text-sm text-neutral-500 leading-relaxed">
                            Connecting hearts through intelligent care. An AI-powered emotional support platform for reliable elderly care monitoring.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-neutral-900">Product</h3>
                        <ul className="space-y-3 text-sm text-neutral-600">
                            <li><a href="#" className="hover:text-primary-600">Features</a></li>
                            <li><a href="#" className="hover:text-primary-600">For Families</a></li>
                            <li><a href="#" className="hover:text-primary-600">For Caregivers</a></li>
                            <li><a href="#" className="hover:text-primary-600">Pricing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-neutral-900">Company</h3>
                        <ul className="space-y-3 text-sm text-neutral-600">
                            <li><a href="#" className="hover:text-primary-600">About Us</a></li>
                            <li><a href="#" className="hover:text-primary-600">Careers</a></li>
                            <li><a href="#" className="hover:text-primary-600">Blog</a></li>
                            <li><a href="#" className="hover:text-primary-600">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-neutral-900">Legal</h3>
                        <ul className="space-y-3 text-sm text-neutral-600">
                            <li><a href="#" className="hover:text-primary-600">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary-600">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary-600">Cookie Policy</a></li>
                            <li><a href="#" className="hover:text-primary-600">Ethics</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 flex flex-col items-center justify-between border-t border-neutral-100 pt-8 md:flex-row">
                    <p className="text-xs text-neutral-400">
                        &copy; {new Date().getFullYear()} BridgeCare Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

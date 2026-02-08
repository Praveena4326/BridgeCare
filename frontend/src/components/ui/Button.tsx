import * as React from "react"
import { cn } from "../../lib/utils"
import { Loader2 } from "lucide-react"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
    size?: "sm" | "md" | "lg" | "icon"
    isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
        const variants = {
            primary: "bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-lg",
            secondary: "bg-secondary-300 text-neutral-900 hover:bg-secondary-400 shadow-sm",
            outline: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50",
            ghost: "hover:bg-neutral-100 text-neutral-700",
            danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
        }

        const sizes = {
            sm: "h-9 px-3 text-sm rounded-lg",
            md: "h-11 px-6 text-base rounded-xl",
            lg: "h-14 px-8 text-lg rounded-2xl",
            icon: "h-10 w-10",
        }

        return (
            <button
                ref={ref}
                disabled={isLoading || disabled}
                className={cn(
                    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        )
    }
)
Button.displayName = "Button"

export { Button }

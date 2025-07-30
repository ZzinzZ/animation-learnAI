import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Glassmorphism
          "flex h-10 w-full rounded-md border border-white/20 bg-white/10 backdrop-blur-md shadow-md px-3 py-2 text-base placeholder:text-black/50 text-black/70",
          // Interaction
          "focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Responsive
          "md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }

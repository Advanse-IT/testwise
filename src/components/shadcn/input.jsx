import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type} ref={ref}
    className={cn(
      'flex h-12 w-full rounded-[10px] border border-input bg-[hsl(220_25%_14%)] px-4 py-3 text-[15px] text-foreground',
      'placeholder:text-muted-foreground/40',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors duration-150',
      className
    )}
    {...props}
  />
))
Input.displayName = 'Input'
export { Input }

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-[15px] font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:   'bg-brand-teal text-[#0C1220] hover:bg-[#2DE8D6] hover:-translate-y-px hover:shadow-glow',
        secondary: 'bg-white/5 text-foreground border border-white/12 hover:border-brand-teal/40 hover:bg-brand-teal/7 hover:-translate-y-px',
        ghost:     'text-muted-foreground hover:text-foreground hover:bg-accent',
        outline:   'border border-border bg-transparent hover:bg-accent hover:text-foreground',
        destructive:'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link:      'text-brand-teal underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-11 px-7 py-2.5',
        sm:      'h-9 px-4 py-2 text-[13px]',
        lg:      'h-12 px-8 py-3 text-[16px]',
        icon:    'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}/>
})
Button.displayName = 'Button'

export { Button, buttonVariants }

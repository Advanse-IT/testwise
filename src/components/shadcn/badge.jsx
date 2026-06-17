import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.08em] uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:  'border-brand-teal/30 bg-brand-teal/10 text-brand-teal',
        secondary:'border-border bg-secondary text-secondary-foreground',
        amber:    'border-brand-amber/30 bg-brand-amber/10 text-brand-amber',
        outline:  'border-border text-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props}/>
}

export { Badge, badgeVariants }

import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { LogoFull } from '@/components/ui/Logo'
import { Button } from '@/components/shadcn/button'
import { cn } from '@/lib/utils'

const LINKS = [
  { to: '/pipeline',      label: 'Pipeline'     },
  { to: '/how-it-works',  label: 'How it works' },
  { to: '/industries',    label: 'Industries'   },
  { to: '/pricing',       label: 'Pricing'      },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 inset-x-0 z-50 h-[72px] flex items-center px-6 lg:px-12 transition-all duration-300',
          scrolled
            ? 'bg-[hsl(220_30%_8%/0.95)] backdrop-blur-xl border-b border-white/[0.07] shadow-[0_1px_0_rgba(255,255,255,0.04)]'
            : 'bg-transparent'
        )}
      >
        {/* Logo */}
        <Link to="/" aria-label="Testwise home" className="flex-shrink-0">
          <LogoFull size={34} interactive />
        </Link>

        {/* Desktop nav — centred */}
        <nav
          className="hidden md:flex items-center gap-1 mx-auto"
          aria-label="Main navigation"
        >
          {LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => cn(
                'relative px-4 py-2 rounded-lg text-[15px] font-medium transition-colors duration-150',
                isActive
                  ? 'text-brand-teal bg-brand-teal/8'
                  : 'text-white/65 hover:text-white hover:bg-white/5'
              )}
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-brand-teal"/>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button asChild className="hidden sm:inline-flex" size="sm">
            <Link to="/contact">Book a call</Link>
          </Button>
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/8 transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed top-[72px] inset-x-0 z-40 bg-[hsl(220_28%_10%)] border-b border-white/[0.07] shadow-xl px-6 py-6 flex flex-col gap-1 md:hidden">
          {LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) => cn(
                'px-4 py-3 rounded-lg text-[16px] font-medium transition-colors',
                isActive ? 'text-brand-teal bg-brand-teal/8' : 'text-white/65 hover:text-white hover:bg-white/5'
              )}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="pt-3 mt-1 border-t border-white/[0.07]">
            <Button asChild className="w-full">
              <Link to="/contact" onClick={() => setOpen(false)}>Book a call</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

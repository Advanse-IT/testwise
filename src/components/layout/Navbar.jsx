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
  { to: '/demo',          label: 'Demo'         },
  { to: 'https://advanseit.com.au/blog?category=Testwise', label: 'Blog', external: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close drawer on resize to desktop
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 inset-x-0 z-50 h-[72px] flex items-center justify-between gap-4 px-5 sm:px-8 lg:px-12 transition-all duration-300',
          scrolled
            ? 'bg-[#0C1220]/95 backdrop-blur-xl border-b border-white/[0.07]'
            : 'bg-transparent'
        )}
      >
        {/* ── Logo ── */}
        <Link to="/" aria-label="Testwise home" className="flex-shrink-0">
          <LogoFull size={44} interactive />
        </Link>

        {/* ── Desktop nav — centred ── */}
        <nav
          className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
          aria-label="Main navigation"
        >
          {LINKS.map(l => l.external ? (
            <a
              key={l.to}
              href={l.to}
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-4 py-2 rounded-lg text-[15px] font-medium transition-colors duration-150 whitespace-nowrap text-white/60 hover:text-white hover:bg-white/[0.05]"
            >
              {l.label}
            </a>
          ) : (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => cn(
                'relative px-4 py-2 rounded-lg text-[15px] font-medium transition-colors duration-150 whitespace-nowrap',
                isActive
                  ? 'text-brand-teal bg-brand-teal/[0.08]'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
              )}
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-brand-teal" aria-hidden="true"/>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ── Right side: CTA + hamburger ── */}
        <div className="flex items-center gap-3 flex-shrink-0 ml-auto md:ml-0">
          {/* CTA — hidden on mobile to keep hamburger prominent */}
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/contact">Book a call</Link>
          </Button>

          {/* Hamburger — mobile only, large tap target */}
          <button
            onClick={() => setOpen(v => !v)}
            className={cn(
              'md:hidden flex items-center justify-center rounded-lg transition-colors',
              'w-11 h-11 text-white/80 hover:text-white hover:bg-white/[0.07] active:bg-white/[0.12]'
            )}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {open && (
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className="fixed top-[72px] inset-x-0 z-40 md:hidden bg-[#111827] border-b border-white/[0.07] shadow-2xl"
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {LINKS.map(l => l.external ? (
              <a
                key={l.to}
                href={l.to}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="px-4 py-3.5 rounded-xl text-[17px] font-medium transition-colors text-white/65 hover:text-white hover:bg-white/[0.05]"
              >
                {l.label}
              </a>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => cn(
                  'px-4 py-3.5 rounded-xl text-[17px] font-medium transition-colors',
                  isActive
                    ? 'text-brand-teal bg-brand-teal/[0.08]'
                    : 'text-white/65 hover:text-white hover:bg-white/[0.05]'
                )}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
          <div className="px-4 pb-5 border-t border-white/[0.07] pt-4">
            <Button asChild className="w-full" size="lg">
              <Link to="/contact" onClick={() => setOpen(false)}>Book a call</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

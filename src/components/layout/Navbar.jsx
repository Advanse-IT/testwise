import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { LogoFull, LogoMark } from '@/components/ui/Logo'

const LINKS = [
  { to: '/pipeline',      label: 'Pipeline' },
  { to: '/how-it-works',  label: 'How it works' },
  { to: '/industries',    label: 'Industries' },
  { to: '/pricing',       label: 'Pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 inset-x-0 z-50 h-[72px] flex items-center justify-between px-6 lg:px-12 transition-all duration-300 ${
          scrolled
            ? 'bg-base/95 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
      >
        {/* Logo — SVG mark + wordmark, transparent bg */}
        <Link to="/" aria-label="Testwise home">
          <LogoFull size={34}/>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-[15px] font-medium transition-colors duration-150 ${
                  isActive ? 'text-teal' : 'text-mist hover:text-snow'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="hidden sm:inline-flex btn-primary">
            Book a call
          </Link>
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden text-snow p-1.5 rounded-lg hover:bg-raised transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed top-[72px] inset-x-0 z-40 bg-surface border-b border-border px-6 py-6 flex flex-col gap-5 md:hidden">
          {LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-[17px] font-medium ${isActive ? 'text-teal' : 'text-mist'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="btn-primary justify-center mt-2 text-[15px]"
          >
            Book a call
          </Link>
        </div>
      )}
    </>
  )
}

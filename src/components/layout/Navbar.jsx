import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { SITE } from '@/lib/data'

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
      <header className={`fixed top-0 inset-x-0 z-50 h-16 flex items-center justify-between px-6 lg:px-10 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D1B2E]/95 backdrop-blur-xl border-b border-white/[0.07]'
          : 'bg-transparent'
      }`}>
        <Link to="/" className="flex items-center gap-3">
          <img src="/icon-192.png" alt="Testwise Logo" className="w-8 h-8 rounded-lg object-cover" />
          <div>
            <div className="text-[15px] font-semibold tracking-tight leading-none text-snow">
              Test<span className="text-teal">wise</span>
            </div>
            <div className="text-[10px] text-fog tracking-[0.1em] uppercase leading-none mt-0.5">
              by {SITE.parent}
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="Main">
          {LINKS.map(l => (
            <NavLink key={l.to} to={l.to}
              className={({ isActive }) =>
                `text-[13px] font-medium transition-colors duration-150 ${isActive ? 'text-teal' : 'text-mist hover:text-snow'}`
              }>{l.label}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="hidden sm:inline-flex btn-primary text-[13px] py-2 px-5">
            Book a call
          </Link>
          <button onClick={() => setOpen(v => !v)} className="md:hidden text-snow p-1" aria-label="Toggle menu">
            {open ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed top-16 inset-x-0 z-40 bg-surface border-b border-white/[0.07] px-6 py-5 flex flex-col gap-4 md:hidden">
          {LINKS.map(l => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-[15px] font-medium ${isActive ? 'text-teal' : 'text-mist'}`
              }>{l.label}</NavLink>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary justify-center mt-1 text-[14px]">
            Book a call
          </Link>
        </div>
      )}
    </>
  )
}

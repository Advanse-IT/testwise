import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import InteractiveTestIcon from '@/components/ui/InteractiveTestIcon'
import { SITE } from '@/lib/data'

const LINKS = [
  { to: '/pipeline', label: 'Pipeline' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/industries', label: 'Industries' },
  { to: '/pricing', label: 'Pricing' },
]

export default function NavbarNew() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal to-cyan-500 p-1 flex items-center justify-center">
                <InteractiveTestIcon className="w-8 h-8" />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold tracking-tight text-slate-50 group-hover:text-teal transition-colors">
                  Testwise
                </div>
                <div className="text-xs text-slate-400 tracking-wider uppercase">
                  by {SITE.parent}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'text-teal bg-teal/10'
                        : 'text-slate-300 hover:text-slate-50 hover:bg-slate-800/50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* CTA and Mobile Menu Button */}
            <div className="flex items-center gap-3">
              <Link to="/contact" className="hidden sm:block">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-teal hover:bg-teal/90 text-slate-950 font-semibold"
                >
                  Book a call
                </Button>
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-md text-slate-300 hover:text-slate-50 hover:bg-slate-800/50 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 inset-x-0 z-40 bg-slate-950 border-b border-slate-800 md:hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-teal bg-teal/10'
                        : 'text-slate-300 hover:text-slate-50 hover:bg-slate-800/50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full"
              >
                <Button
                  variant="default"
                  size="sm"
                  className="w-full bg-teal hover:bg-teal/90 text-slate-950 font-semibold"
                >
                  Book a call
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

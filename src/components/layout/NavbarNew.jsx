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

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
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
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo and Brand */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-teal to-cyan-500 p-1 flex items-center justify-center flex-shrink-0">
                <InteractiveTestIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm sm:text-base font-bold tracking-tight text-slate-50 group-hover:text-teal transition-colors">
                  Testwise
                </div>
                <div className="text-xs text-slate-400 tracking-wider uppercase font-medium">
                  by {SITE.parent}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2 lg:gap-4">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 lg:px-4 py-2 text-sm lg:text-base font-medium rounded-md transition-all duration-200 ${
                      isActive
                        ? 'text-teal bg-teal/10 border border-teal/30'
                        : 'text-slate-300 hover:text-slate-50 hover:bg-slate-800/50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* CTA and Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 ml-auto">
              <Link to="/contact" className="hidden sm:block">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-teal hover:bg-teal/90 text-slate-950 font-semibold text-xs sm:text-sm"
                >
                  Book a call
                </Button>
              </Link>
              {/* Mobile Menu Button - Larger and positioned to the right */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2.5 sm:p-3 rounded-lg text-slate-300 hover:text-slate-50 hover:bg-slate-800/80 transition-all duration-200 flex-shrink-0"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X size={28} strokeWidth={2} />
                ) : (
                  <Menu size={28} strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Improved Design */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-16 left-0 right-0 z-40 bg-slate-950 border-b border-slate-800 md:hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-3">
                {/* Navigation Links */}
                {LINKS.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 ${
                          isActive
                            ? 'text-teal bg-teal/15 border border-teal/40'
                            : 'text-slate-200 hover:text-slate-50 hover:bg-slate-800/60'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}

                {/* Divider */}
                <div className="my-2 border-t border-slate-800" />

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: LINKS.length * 0.05, duration: 0.2 }}
                >
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full"
                  >
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full bg-teal hover:bg-teal/90 text-slate-950 font-bold text-base py-3"
                    >
                      Book a discovery call
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

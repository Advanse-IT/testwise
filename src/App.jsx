import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import NavbarNew from '@/components/layout/NavbarNew'
import ScrollToTop from '@/components/ui/ScrollToTop'
import { trackPageView } from '@/lib/analytics'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import Pipeline from '@/pages/Pipeline'
import HowItWorks from '@/pages/HowItWorks'
import Industries from '@/pages/Industries'
import Pricing from '@/pages/Pricing'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans flex flex-col">
      <ScrollToTop />
      <NavbarNew />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

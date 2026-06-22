import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { TooltipProvider } from '@/components/shadcn/tooltip'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import Pipeline from '@/pages/Pipeline'
import HowItWorks from '@/pages/HowItWorks'
import Industries from '@/pages/Industries'
import Pricing from '@/pages/Pricing'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics'
import { useScrollToTop } from '@/hooks/useScrollToTop'

export default function App() {
  const location = useLocation()

  useScrollToTop()
  useGoogleAnalytics()

  return (
    <TooltipProvider delayDuration={300}>
      <div className="min-h-screen bg-background text-foreground font-sans flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">
          {/* mode="sync" prevents blank page crash when state updates during exit animation */}
          <AnimatePresence mode="sync">
            <Routes location={location} key={location.pathname}>
              <Route path="/"             element={<Home />} />
              <Route path="/pipeline"     element={<Pipeline />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/industries"   element={<Industries />} />
              <Route path="/pricing"      element={<Pricing />} />
              <Route path="/contact"      element={<Contact />} />
              <Route path="*"             element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  )
}

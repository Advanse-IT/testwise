import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Replace G-XXXXXXXXXX with your actual GA4 measurement ID from advanseit.com.au
const GA_ID = 'G-XXXXXXXXXX'

export function useGoogleAnalytics() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window.gtag !== 'function') return
    window.gtag('config', GA_ID, { page_path: location.pathname + location.search })
  }, [location])
}

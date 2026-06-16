import ReactGA from 'react-ga4'

const GA_ID = 'G-XXXXXXXXXX' // Replace with actual GA ID for advanseit.com.au

export const initializeGA = () => {
  ReactGA.initialize(GA_ID, {
    gtagOptions: {
      cookie_flags: 'SameSite=None;Secure',
    },
  })
}

export const trackPageView = (path) => {
  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: document.title,
  })
}

export const trackEvent = (category, action, label, value) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  })
}

export const trackFormSubmission = (formName) => {
  trackEvent('engagement', 'form_submit', formName)
}

export const trackCTAClick = (ctaName) => {
  trackEvent('engagement', 'cta_click', ctaName)
}

import { useEffect } from 'react'

const BASE_TITLE = 'Testwise — Autonomous QA Pipeline | by Advanse IT'
const BASE_DESC  = 'Testwise delivers a fully autonomous AI QA pipeline engineered for your stack — from requirements to signed-off report, zero manual effort. Bespoke for every client.'

export function usePageMeta({ title, description, canonical } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Testwise by Advanse IT` : BASE_TITLE
    document.title = fullTitle

    const setMeta = (selector, content) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute('content', content)
    }

    const desc = description || BASE_DESC
    setMeta('meta[name="description"]',         desc)
    setMeta('meta[property="og:title"]',        fullTitle)
    setMeta('meta[property="og:description"]',  desc)
    setMeta('meta[name="twitter:title"]',       fullTitle)
    setMeta('meta[name="twitter:description"]', desc)

    const canon = document.querySelector('link[rel="canonical"]')
    if (canon && canonical) {
      canon.setAttribute('href', `https://testwise.advanseit.com.au${canonical}`)
    }
  }, [title, description, canonical])
}

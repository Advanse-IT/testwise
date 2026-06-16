import { useEffect } from 'react'

const BASE = 'Testwise — Autonomous QA | by Advanse-IT'
const BASE_DESC = 'Testwise delivers a fully autonomous AI QA pipeline engineered for your stack — from requirements to signed-off report, zero manual effort. Bespoke for every client.'

export function usePageMeta({ title, description, canonical } = {}) {
  useEffect(() => {
    // Title
    document.title = title ? `${title} | Testwise by Advanse-IT` : BASE

    // Description
    const desc = description || BASE_DESC
    let metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', desc)

    // OG title
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', document.title)

    // OG description
    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', desc)

    // Canonical
    let canon = document.querySelector('link[rel="canonical"]')
    if (canon && canonical) canon.setAttribute('href', `https://testwise.advanseit.com.au${canonical}`)

    // Twitter
    let twTitle = document.querySelector('meta[name="twitter:title"]')
    if (twTitle) twTitle.setAttribute('content', document.title)
    let twDesc = document.querySelector('meta[name="twitter:description"]')
    if (twDesc) twDesc.setAttribute('content', desc)
  }, [title, description, canonical])
}

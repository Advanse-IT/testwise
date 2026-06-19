/**
 * Testwise Contact Form — Cloudflare Worker
 *
 * Receives POST /submit from the React contact form.
 * Generates a reference number, then sends TWO emails concurrently:
 *   1. Branded internal notification  → admin@advanseit.com.au
 *   2. Branded client confirmation    → the enquirer (with reference number)
 *
 * Email delivery via MailChannels HTTP API (free for Cloudflare Workers).
 *
 * ── ONE-TIME SETUP ──────────────────────────────────────────
 *
 * 1. Install Wrangler:
 *      npm install -g wrangler
 *      wrangler login
 *
 * 2. Create KV namespace (rate limiting):
 *      wrangler kv namespace create CONTACT_KV
 *      → Copy the "id" value into wrangler.toml (see below)
 *
 * 3. Set secrets (stored encrypted in Cloudflare, never in code):
 *      wrangler secret put SMTP_USER   → admin@advanseit.com.au
 *      wrangler secret put NOTIFY_TO   → admin@advanseit.com.au
 *      (SMTP_PASS stored but not used by MailChannels path)
 *
 * 4. Add DNS record so MailChannels can send from your domain:
 *      Type:  TXT
 *      Name:  _mailchannels.advanseit.com.au
 *      Value: v=mc1
 *    (This authorises MailChannels to send as @advanseit.com.au)
 *
 * 5. Deploy:
 *      cd worker
 *      npm install
 *      wrangler deploy
 *
 * 6. Copy the Worker URL (e.g. https://testwise-contact.xxx.workers.dev)
 *    Add to Cloudflare Pages → Settings → Environment variables:
 *      VITE_CONTACT_API_URL = https://testwise-contact.xxx.workers.dev/submit
 *
 * ── wrangler.toml (create this file in /worker) ─────────────
 *
 *   name = "testwise-contact"
 *   main = "index.js"
 *   compatibility_date = "2024-01-01"
 *
 *   [[kv_namespaces]]
 *   binding = "CONTACT_KV"
 *   id = "PASTE_YOUR_KV_ID_HERE"
 */

import { generateRef, buildInternalEmail, buildConfirmationEmail } from './email.js'

const ALLOWED_ORIGINS = [
  'https://testwise.advanseit.com.au',
  'https://www.testwise.advanseit.com.au',
]

function corsHeaders(origin) {
  const ok = ALLOWED_ORIGINS.includes(origin) || /^http:\/\/localhost/.test(origin)
  return {
    'Access-Control-Allow-Origin':  ok ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age':       '86400',
  }
}

function respond(data, status, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  })
}

function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e ?? ''))
}

async function sendEmail(env, { to, toName, replyToEmail, replyToName, subject, html, text }) {
  const body = {
    personalizations: [{
      to:       [{ email: to, name: toName || to }],
      ...(replyToEmail ? { reply_to: { email: replyToEmail, name: replyToName || replyToEmail } } : {}),
      dkim_domain:      'advanseit.com.au',
      dkim_selector:    'mailchannels',
    }],
    from: {
      email: env.SMTP_USER,
      name:  'Testwise by Advanse-IT',
    },
    subject,
    content: [
      { type: 'text/plain', value: text },
      { type: 'text/html',  value: html },
    ],
  }

  const res = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  })

  if (res.status !== 202 && !res.ok) {
    let msg = 'unknown error'
    try {
      const errorData = await res.json()
      msg = JSON.stringify(errorData)
    } catch {
      msg = await res.text().catch(() => 'unknown error')
    }
    throw new Error(`MailChannels ${res.status}: ${msg.slice(0, 200)}`)
  }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''
    const cors   = corsHeaders(origin)

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
    if (request.method === 'GET')     return respond({ ok: true, service: 'testwise-contact' }, 200, cors)
    if (request.method !== 'POST')    return respond({ error: 'Method not allowed' }, 405, cors)

    let body
    try { body = await request.json() }
    catch { return respond({ error: 'Invalid JSON body' }, 400, cors) }

    const { name, email, company, service, message, botcheck } = body

    // Honeypot — bots fill this hidden field, humans don't
    if (botcheck) return respond({ success: true }, 200, cors)

    // Validation
    const errs = {}
    if (!String(name    ?? '').trim()) errs.name    = 'Your name is required'
    if (!String(email   ?? '').trim()) errs.email   = 'Your email is required'
    else if (!isValidEmail(email))     errs.email   = 'Please enter a valid email address'
    if (!String(message ?? '').trim()) errs.message = 'Please describe your project'

    if (Object.keys(errs).length) {
      return respond({ error: 'Please correct the highlighted fields', fields: errs }, 422, cors)
    }

    // Rate limiting — 1 submission per IP per 60 seconds
    if (env.CONTACT_KV) {
      const ip  = request.headers.get('CF-Connecting-IP') || 'unknown'
      const key = `rl:${ip}`
      if (await env.CONTACT_KV.get(key)) {
        return respond({ error: 'Please wait a moment before submitting again.' }, 429, cors)
      }
      await env.CONTACT_KV.put(key, '1', { expirationTtl: 60 })
    }

    // Build clean data + reference number
    const data = {
      name:        String(name).trim(),
      email:       String(email).trim().toLowerCase(),
      company:     String(company ?? '').trim(),
      service:     String(service ?? '').trim(),
      message:     String(message).trim(),
      ref:         generateRef(),
      submittedAt: new Date().toISOString(),
    }

    // Build both emails
    const internal     = buildInternalEmail(data)
    const confirmation = buildConfirmationEmail(data)

    // Plain text fallbacks
    const internalText = [
      `[${data.ref}] New Testwise enquiry`,
      ``,
      `Name:     ${data.name}`,
      `Email:    ${data.email}`,
      `Company:  ${data.company || '—'}`,
      `Service:  ${data.service || '—'}`,
      ``,
      `Message:`,
      data.message,
      ``,
      `Submitted: ${data.submittedAt}`,
    ].join('\n')

    const confirmText = [
      `Hi ${data.name.split(' ')[0]},`,
      ``,
      `Your Testwise enquiry has been received.`,
      `Reference number: ${data.ref}`,
      ``,
      `We will be in touch within 24 hours to arrange your discovery call.`,
      `Please quote reference ${data.ref} in all correspondence.`,
      ``,
      `What happens next:`,
      `01 — We review your enquiry`,
      `02 — We send you a calendar link for a 30-minute discovery call`,
      `03 — We map your environment and design your bespoke pipeline`,
      ``,
      `Reach us directly: admin@advanseit.com.au`,
      ``,
      `Testwise by Advanse-IT`,
      `testwise.advanseit.com.au`,
      `Brisbane, Queensland, Australia`,
    ].join('\n')

    try {
      await Promise.all([
        sendEmail(env, {
          to:           env.NOTIFY_TO,
          toName:       'Testwise Enquiries',
          replyToEmail: data.email,
          replyToName:  data.name,
          subject:      internal.subject,
          html:         internal.html,
          text:         internalText,
        }),
        sendEmail(env, {
          to:      data.email,
          toName:  data.name,
          subject: confirmation.subject,
          html:    confirmation.html,
          text:    confirmText,
        }),
      ])

      return respond({ success: true, ref: data.ref }, 200, cors)

    } catch (err) {
      console.error('Send error:', err.message)
      return respond({
        error: `Error: ${err.message}. Please email us at admin@advanseit.com.au`,
      }, 500, cors)
    }
  },
}

import { generateRef, buildInternalEmail, buildConfirmationEmail } from './email.js'

const ALLOWED_ORIGINS = [
  'https://testwise.advanseit.com.au',
  'https://www.testwise.advanseit.com.au',
  // Cloudflare Pages preview deployments — allows testing before custom domain
  // Add your specific Pages URL if needed, e.g:
  // 'https://testwise.pages.dev',
  // 'https://abc123.testwise.pages.dev',
]

function isAllowedOrigin(origin) {
  if (!origin) return false
  if (ALLOWED_ORIGINS.includes(origin)) return true
  if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return true
  // Allow any Cloudflare Pages preview URL for this project
  if (/^https:\/\/[a-z0-9-]+\.testwise\.pages\.dev$/.test(origin)) return true
  return false
}

function corsHeaders(origin) {
  const ok = isAllowedOrigin(origin)
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

// ── Send via Resend API ────────────────────────────────────
// MailChannels free tier was discontinued August 31 2024.
// Resend: https://resend.com — free plan = 3,000 emails/month
async function sendEmail(env, { to, toName, replyTo, subject, html, text }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify({
      from:     `Testwise by Advanse-IT <${env.FROM_EMAIL}>`,
      to:       [toName ? `${toName} <${to}>` : to],
      subject,
      html,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${data.message || data.name || JSON.stringify(data)}`)
  }
  return data
}

// ── Main handler ───────────────────────────────────────────
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''
    const cors   = corsHeaders(origin)

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
    if (request.method === 'GET')     return respond({ ok: true, service: 'testwise-contact', provider: 'resend' }, 200, cors)
    if (request.method !== 'POST')    return respond({ error: 'Method not allowed' }, 405, cors)

    let body
    try { body = await request.json() }
    catch { return respond({ error: 'Invalid request body' }, 400, cors) }

    const { name, email, company, service, message, botcheck } = body

    // Honeypot
    if (botcheck) return respond({ success: true }, 200, cors)

    // Validate
    const errs = {}
    if (!String(name    ?? '').trim()) errs.name    = 'Your name is required'
    if (!String(email   ?? '').trim()) errs.email   = 'Your email is required'
    else if (!isValidEmail(email))     errs.email   = 'Please enter a valid email address'
    if (!String(message ?? '').trim()) errs.message = 'Please describe your project'
    if (Object.keys(errs).length) {
      return respond({ error: 'Please correct the highlighted fields', fields: errs }, 422, cors)
    }

    // Rate limiting
    if (env.CONTACT_KV) {
      const ip  = request.headers.get('CF-Connecting-IP') || 'unknown'
      const key = `rl:${ip}`
      if (await env.CONTACT_KV.get(key)) {
        return respond({ error: 'Please wait a moment before submitting again.' }, 429, cors)
      }
      await env.CONTACT_KV.put(key, '1', { expirationTtl: 60 })
    }

    const data = {
      name:        String(name).trim(),
      email:       String(email).trim().toLowerCase(),
      company:     String(company ?? '').trim(),
      service:     String(service ?? '').trim(),
      message:     String(message).trim(),
      ref:         generateRef(),
      submittedAt: new Date().toISOString(),
    }

    const internal     = buildInternalEmail(data)
    const confirmation = buildConfirmationEmail(data)

    const internalText = [
      `[${data.ref}] New Testwise enquiry`,
      '', `Name:    ${data.name}`, `Email:   ${data.email}`,
      `Company: ${data.company || '—'}`, `Service: ${data.service || '—'}`,
      '', 'Message:', data.message, '', `Submitted: ${data.submittedAt}`,
    ].join('\n')

    const confirmText = [
      `Hi ${data.name.split(' ')[0]},`,
      '', `Your Testwise enquiry has been received.`,
      `Reference: ${data.ref}`,
      '', `We'll be in touch within 24 hours.`,
      '', `hello@advanseit.com.au`,
      'testwise.advanseit.com.au',
    ].join('\n')

    try {
      await Promise.all([
        sendEmail(env, {
          to:      env.NOTIFY_TO,
          toName:  'Testwise Enquiries',
          replyTo: `${data.name} <${data.email}>`,
          subject: internal.subject,
          html:    internal.html,
          text:    internalText,
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
      console.error('Email error:', err.message)
      return respond({
        error: 'Could not send your message right now. Please email hello@advanseit.com.au directly.',
      }, 500, cors)
    }
  },
}

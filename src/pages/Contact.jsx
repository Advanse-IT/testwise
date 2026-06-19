import { useState } from 'react'
import { MapPin, Mail, Phone, CheckCircle, Send, AlertCircle, Copy, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/shadcn/button'
import { Badge } from '@/components/shadcn/badge'
import { Card, CardContent } from '@/components/shadcn/card'
import { Input } from '@/components/shadcn/input'
import { Textarea } from '@/components/shadcn/textarea'
import { Label } from '@/components/shadcn/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'
import { Separator } from '@/components/shadcn/separator'
import PageWrapper from '@/components/ui/PageWrapper'
import Reveal from '@/components/ui/Reveal'
import { usePageMeta } from '@/hooks/usePageMeta'
import { SITE } from '@/lib/data'

/**
 * VITE_CONTACT_API_URL — set this in Cloudflare Pages environment variables
 * pointing to your deployed Cloudflare Worker URL.
 *
 * Example:
 *   VITE_CONTACT_API_URL=https://testwise-contact.your-account.workers.dev/submit
 *
 * During local development, create a .env.local file in the project root:
 *   VITE_CONTACT_API_URL=http://localhost:8787/submit
 */
const API_URL = import.meta.env.VITE_CONTACT_API_URL || ''

const SERVICES = [
  'QA Maturity Audit — $3,500',
  'Full Pipeline Implementation — from $20,000',
  'Advisory Retainer — $4,000/month',
  'Discovery call — not sure yet',
]

const PROMISE = [
  'Response within 24 hours',
  'Free initial discovery call',
  'No obligation engagement',
  'Transparent, fixed pricing',
]

const CONTACT_INFO = [
  { Icon: MapPin, label: 'Headquarters', value: 'Brisbane, Queensland, Australia', href: null },
  { Icon: Mail,   label: 'Email',        value: SITE.email,   href: `mailto:${SITE.email}` },
  { Icon: Phone,  label: 'Phone',        value: '0481 261 679', href: 'tel:+61481261679' },
]

// ── Reference number copy button ────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-[12px] font-medium text-white/35 hover:text-white/65 transition-colors"
      aria-label="Copy reference number"
    >
      {copied
        ? <><Check size={12} className="text-brand-teal"/> Copied</>
        : <><Copy size={12}/> Copy</>
      }
    </button>
  )
}

// ── Success state ────────────────────────────────────────────────
function SuccessPanel({ ref: refNum, name }) {
  const firstName = name?.split(' ')[0] || 'there'
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center py-10 text-center"
    >
      {/* Glow circle + tick */}
      <div
        className="w-18 h-18 rounded-full flex items-center justify-center mb-6"
        style={{
          width: 72, height: 72,
          background: 'radial-gradient(circle, rgba(34,211,195,0.18) 0%, transparent 70%)',
          border: '2px solid rgba(34,211,195,0.35)',
        }}
      >
        <CheckCircle size={30} className="text-brand-teal"/>
      </div>

      <h3 className="text-[24px] font-bold text-white mb-2 tracking-tight">
        You're all set, {firstName}.
      </h3>
      <p className="text-[15px] text-white/50 font-light max-w-xs leading-relaxed mb-8">
        Your enquiry is confirmed. We'll be in touch within 24 hours to arrange your discovery call.
        Check your email for a confirmation with all the details.
      </p>

      {/* Reference number — prominent */}
      <div
        className="w-full max-w-xs rounded-xl px-6 py-5 mb-6"
        style={{
          background: 'rgba(245,158,11,0.08)',
          border: '1.5px solid rgba(245,158,11,0.3)',
        }}
      >
        <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-amber-400/70 mb-2">
          Your Reference Number
        </div>
        <div className="text-[32px] font-extrabold tracking-[0.06em] text-amber-400 leading-none mb-2">
          {refNum}
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[12px] text-white/25 font-light">
            Quote this in all correspondence
          </span>
          <CopyButton text={refNum}/>
        </div>
      </div>

      <p className="text-[13px] text-white/25">
        Didn't receive an email?{' '}
        <a href={`mailto:${SITE.email}`} className="text-brand-teal hover:opacity-80 transition-opacity">
          Contact us directly
        </a>
      </p>
    </motion.div>
  )
}

// ── Main component ───────────────────────────────────────────────
export default function Contact() {
  usePageMeta({
    title: 'Contact',
    description: 'Book a free discovery call with Testwise. We will map your QA environment and show you exactly what a bespoke autonomous pipeline would involve.',
    canonical: '/contact',
  })

  const [form, setForm]         = useState({ name:'', email:'', company:'', service:'', message:'' })
  const [sending, setSending]   = useState(false)
  const [result, setResult]     = useState(null)   // { ref: 'TW-2026-X4K9M', name: '...' }
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitError, setSubmitError] = useState('')

  function setField(field) {
    return (value) => {
      const val = typeof value === 'string' ? value : value.target.value
      setForm(prev => ({ ...prev, [field]: val }))
      if (fieldErrors[field]) setFieldErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  function validate() {
    const e = {}
    if (!form.name.trim())    e.name    = 'Your name is required'
    if (!form.email.trim())   e.email   = 'Your email address is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email address'
    if (!form.message.trim()) e.message = 'Please tell us about your project'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setFieldErrors(errs); return }
    setFieldErrors({})
    setSubmitError('')
    setSending(true)

    try {
      if (!API_URL) {
        throw new Error('CONTACT_API_NOT_CONFIGURED')
      }

      const res = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          name:     form.name.trim(),
          email:    form.email.trim(),
          company:  form.company.trim(),
          service:  form.service,
          message:  form.message.trim(),
          botcheck: '',  // honeypot — leave empty
        }),
      })

      const data = await res.json()

      if (res.status === 422 && data.fields) {
        setFieldErrors(data.fields)
        return
      }

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Submission failed')
      }

      // Success — data.ref contains e.g. "TW-2026-A4K9M"
      setResult({ ref: data.ref, name: form.name })

    } catch (err) {
      if (err.message === 'CONTACT_API_NOT_CONFIGURED') {
        setSubmitError(
          `Contact API not configured. Set VITE_CONTACT_API_URL in your environment variables, or email us directly at ${SITE.email}`
        )
      } else {
        setSubmitError(
          err.message || `Something went wrong. Please email us at ${SITE.email}`
        )
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="pt-24 pb-14 px-5 sm:px-8 lg:px-12 text-center relative overflow-hidden">
        <div className="bg-depth-subtle absolute inset-0 pointer-events-none" aria-hidden="true"/>
        <Reveal className="relative z-10 max-w-2xl mx-auto">
          <Badge variant="default" className="mb-6 gap-2 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse-slow" aria-hidden="true"/>
            Let's Talk
          </Badge>
          <h1 className="text-hero text-white mb-5 font-bold">
            Ready to advance<br/>
            <span className="gradient-text">your QA?</span>
          </h1>
          <p className="text-[16px] sm:text-body-xl text-white/55 font-light">
            Book a free discovery call. We respond within 24 hours.
          </p>
        </Reveal>
      </section>

      <div className="tw-divider-glow"/>

      {/* ── Main ── */}
      <section className="py-12 sm:py-16 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-10 items-start">

          {/* Left column */}
          <div className="flex flex-col gap-4">
            <Reveal>
              <h2 className="text-[20px] font-semibold text-white mb-1">Get in Touch</h2>
            </Reveal>

            {CONTACT_INFO.map(({ Icon, label, value, href }, i) => (
              <Reveal key={i} delay={i * 0.07}>
                {href ? (
                  <a href={href} className="block group">
                    <Card className="border-white/[0.07] transition-all duration-200 group-hover:border-brand-teal/25 group-hover:-translate-y-0.5">
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center flex-shrink-0">
                          <Icon size={15} className="text-brand-teal"/>
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-0.5">{label}</div>
                          <div className="text-[14px] text-white/75">{value}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ) : (
                  <Card className="border-white/[0.07]">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                        <Icon size={15} className="text-white/35"/>
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-0.5">{label}</div>
                        <div className="text-[14px] text-white/75">{value}</div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </Reveal>
            ))}

            {/* Our Promise */}
            <Reveal delay={0.25}>
              <Card className="border-brand-teal/15">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle size={16} className="text-brand-teal"/>
                    <span className="text-[15px] font-semibold text-white">Our Promise</span>
                  </div>
                  <Separator className="bg-white/[0.06] mb-4"/>
                  <ul className="space-y-3">
                    {PROMISE.map((p, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[14px] text-white/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-teal flex-shrink-0"/>
                        {p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          {/* Right column — form */}
          <Reveal delay={0.1}>
            <Card className="border-white/[0.07]">
              <CardContent className="p-6 sm:p-8">
                <AnimatePresence mode="wait">

                  {/* ── SUCCESS ── */}
                  {result ? (
                    <SuccessPanel ref={result.ref} name={result.name}/>
                  ) : (

                  /* ── FORM ── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    {/* Honeypot — hidden, catches bots */}
                    <input
                      type="text"
                      name="botcheck"
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                      readOnly
                    />

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Full Name <span className="text-brand-teal">*</span>
                        </Label>
                        <Input
                          id="name" type="text" placeholder="John Smith"
                          value={form.name} onChange={setField('name')}
                          autoComplete="name"
                          className={fieldErrors.name ? 'border-red-500/60 focus-visible:ring-red-500/30' : ''}
                        />
                        {fieldErrors.name && (
                          <p className="text-[12px] text-red-400 flex items-center gap-1.5">
                            <AlertCircle size={11}/> {fieldErrors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email Address <span className="text-brand-teal">*</span>
                        </Label>
                        <Input
                          id="email" type="email" placeholder="john@company.com"
                          value={form.email} onChange={setField('email')}
                          autoComplete="email"
                          className={fieldErrors.email ? 'border-red-500/60 focus-visible:ring-red-500/30' : ''}
                        />
                        {fieldErrors.email && (
                          <p className="text-[12px] text-red-400 flex items-center gap-1.5">
                            <AlertCircle size={11}/> {fieldErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Company + Service */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company" type="text" placeholder="Your Company Pty Ltd"
                          value={form.company} onChange={setField('company')}
                          autoComplete="organization"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service">Service Interested In</Label>
                        <Select onValueChange={setField('service')}>
                          <SelectTrigger id="service">
                            <SelectValue placeholder="Select a service..."/>
                          </SelectTrigger>
                          <SelectContent>
                            {SERVICES.map(s => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Tell Us About Your Project <span className="text-brand-teal">*</span>
                      </Label>
                      <Textarea
                        id="message" rows={5}
                        placeholder="Describe your current QA setup, team size, tools you use, and what you are hoping to achieve..."
                        value={form.message} onChange={setField('message')}
                        className={fieldErrors.message ? 'border-red-500/60 focus-visible:ring-red-500/30' : ''}
                      />
                      {fieldErrors.message && (
                        <p className="text-[12px] text-red-400 flex items-center gap-1.5">
                          <AlertCircle size={11}/> {fieldErrors.message}
                        </p>
                      )}
                    </div>

                    {/* API / submission error */}
                    {submitError && (
                      <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3.5">
                        <AlertCircle size={15} className="text-red-400 mt-0.5 flex-shrink-0"/>
                        <p className="text-[13px] text-red-400 leading-relaxed">{submitError}</p>
                      </div>
                    )}

                    {/* Submit */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={sending}
                    >
                      {sending ? (
                        <>
                          <svg className="animate-spin h-4 w-4 mr-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                          </svg>
                          Sending your message...
                        </>
                      ) : (
                        <>Send Message <Send size={15}/></>
                      )}
                    </Button>

                    <p className="text-[12px] text-white/20 text-center">
                      We respond to every enquiry within 24 hours.
                    </p>
                  </motion.form>
                  )}

                </AnimatePresence>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </PageWrapper>
  )
}

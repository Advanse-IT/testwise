import { useState } from 'react'
import { MapPin, Mail, Phone, CheckCircle, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '@/components/ui/PageWrapper'
import Reveal from '@/components/ui/Reveal'
import { SITE } from '@/lib/data'

const SERVICES = [
  'QA Maturity Audit ($3,500)',
  'Full Pipeline Implementation (from $20,000)',
  'Advisory Retainer ($4,000/month)',
  'Discovery call — not sure yet',
]

const PROMISE = [
  'Response within 24 hours',
  'Free initial discovery call',
  'No obligation engagement',
  'Transparent, fixed pricing',
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', service: '', message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.')
      return
    }
    setError('')
    setSending(true)
    // Simulate submission — replace with your form handler (Formspree, Netlify Forms, etc.)
    await new Promise(r => setTimeout(r, 1400))
    setSending(false)
    setSent(true)
  }

  return (
    <PageWrapper>
      {/* Page top */}
      <section className="pt-24 pb-12 px-6 lg:px-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{background:'radial-gradient(ellipse 70% 55% at 50% 0%,rgba(34,186,178,0.1) 0%,transparent 60%)'}} aria-hidden="true"/>
        <div className="grid-watermark" aria-hidden="true"/>
        <Reveal className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-teal/25 rounded-full px-4 py-1.5 mb-6 bg-teal/5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-slow" aria-hidden="true"/>
            <span className="text-[11px] font-semibold text-teal tracking-widest uppercase">Let&apos;s Talk</span>
          </div>
          <h1 className="text-hero text-snow mb-4">
            Ready to Advance<br/>
            <span className="gradient-text">Your QA?</span>
          </h1>
          <p className="text-body-lg text-mist font-light">
            Book a free discovery call. We will respond within 24 hours.
          </p>
        </Reveal>
      </section>

      {/* Main layout */}
      <section className="pb-24 px-6 lg:px-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[340px_1fr] gap-8 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-5">
            <Reveal>
              <h2 className="text-[18px] font-bold text-snow mb-4">Get in Touch</h2>
            </Reveal>

            {/* Contact info cards */}
            <Reveal delay={0.05}>
              <div className="flex items-start gap-4 card p-4">
                <div className="w-10 h-10 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-teal"/>
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-snow mb-0.5">Headquarters</div>
                  <div className="text-[13px] text-mist leading-relaxed">Brisbane, Queensland<br/>Australia</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <a href={`mailto:${SITE.email}`}
                className="flex items-start gap-4 card card-hover p-4 group">
                <div className="w-10 h-10 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center flex-shrink-0 group-hover:border-teal/40 transition-colors">
                  <Mail size={16} className="text-teal"/>
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-snow mb-0.5">Email Us</div>
                  <div className="text-[13px] text-mist">{SITE.email}</div>
                </div>
              </a>
            </Reveal>

            <Reveal delay={0.15}>
              <a href="tel:+61481261679"
                className="flex items-start gap-4 card card-hover p-4 group">
                <div className="w-10 h-10 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center flex-shrink-0 group-hover:border-teal/40 transition-colors">
                  <Phone size={16} className="text-teal"/>
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-snow mb-0.5">Call Us</div>
                  <div className="text-[13px] text-mist">0481 261 679</div>
                </div>
              </a>
            </Reveal>

            {/* Our Promise box */}
            <Reveal delay={0.2}>
              <div className="card p-5 border-teal/15 relative overflow-hidden">
                <div className="grid-watermark opacity-50" aria-hidden="true"/>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle size={16} className="text-teal"/>
                    <span className="text-[14px] font-semibold text-snow">Our Promise</span>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {PROMISE.map((p, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[13px] text-mist">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-bright flex-shrink-0"/>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT COLUMN — FORM ── */}
          <Reveal delay={0.1}>
            <div className="card p-8 relative overflow-hidden">
              <div className="grid-watermark opacity-40" aria-hidden="true"/>
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-teal/15 border border-teal/30 flex items-center justify-center mb-5">
                        <CheckCircle size={28} className="text-teal"/>
                      </div>
                      <h3 className="text-[20px] font-bold text-snow mb-2">Message sent!</h3>
                      <p className="text-[14px] text-mist max-w-xs">
                        Thanks for reaching out. We will be in touch within 24 hours to arrange a discovery call.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5"
                      noValidate
                    >
                      {/* Row 1 */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="form-label" htmlFor="name">Full Name *</label>
                          <input
                            id="name" name="name" type="text" required
                            placeholder="John Smith"
                            value={form.name} onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label className="form-label" htmlFor="email">Email Address *</label>
                          <input
                            id="email" name="email" type="email" required
                            placeholder="john@company.com"
                            value={form.email} onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="form-label" htmlFor="company">Company</label>
                          <input
                            id="company" name="company" type="text"
                            placeholder="Your Company Pty Ltd"
                            value={form.company} onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label className="form-label" htmlFor="service">Service Interested In</label>
                          <select
                            id="service" name="service"
                            value={form.service} onChange={handleChange}
                            className="form-select"
                          >
                            <option value="">Select a service...</option>
                            {SERVICES.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="form-label" htmlFor="message">Tell Us About Your Project *</label>
                        <textarea
                          id="message" name="message" required rows={5}
                          placeholder="Describe your current QA setup, team size, tools you use, and what you are hoping to achieve..."
                          value={form.message} onChange={handleChange}
                          className="form-input resize-none"
                        />
                      </div>

                      {/* Error */}
                      {error && (
                        <p className="text-[13px] text-red-400 -mt-2">{error}</p>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={sending}
                        className="btn-primary w-full justify-center py-4 text-[15px] font-semibold mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {sending ? (
                          <>
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>Send Message <Send size={15}/></>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageWrapper>
  )
}

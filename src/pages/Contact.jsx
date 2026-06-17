import { useState } from 'react'
import { MapPin, Mail, Phone, CheckCircle, Send } from 'lucide-react'
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
  { Icon: Mail,   label: 'Email',        value: SITE.email,                          href: `mailto:${SITE.email}` },
  { Icon: Phone,  label: 'Phone',        value: '0481 261 679',                      href: 'tel:+61481261679' },
]

export default function Contact() {
  usePageMeta({
    title: 'Contact',
    description: 'Book a free discovery call with Testwise. We will map your QA environment and show you exactly what a bespoke autonomous pipeline would involve.',
    canonical: '/contact',
  })

  const [form, setForm]     = useState({ name:'', email:'', company:'', service:'', message:'' })
  const [sending, setSending] = useState(false)
  const [sent, setSent]     = useState(false)
  const [errors, setErrors]  = useState({})

  function validate() {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    if (!form.message.trim()) e.message = 'Please describe your project'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setErrors({})
    setSending(true)
    await new Promise(r => setTimeout(r, 1500)) // Replace with real API call
    setSending(false)
    setSent(true)
  }

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-24 pb-16 px-6 lg:px-12 text-center relative overflow-hidden">
        <div className="bg-depth-subtle absolute inset-0 pointer-events-none" aria-hidden="true"/>
        <Reveal className="relative z-10 max-w-2xl mx-auto">
          <Badge variant="default" className="mb-6 gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse-slow"/>
            Let's Talk
          </Badge>
          <h1 className="text-hero text-white mb-5 font-bold">
            Ready to advance<br/>
            <span className="gradient-text">your QA?</span>
          </h1>
          <p className="text-body-xl text-white/55 font-light">
            Book a free discovery call. We respond within 24 hours.
          </p>
        </Reveal>
      </section>

      <div className="tw-divider-glow"/>

      {/* Main */}
      <section className="py-16 px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[320px_1fr] gap-10 items-start">

          {/* Left */}
          <div className="space-y-4">
            <Reveal>
              <h2 className="text-[20px] font-semibold text-white mb-5">Get in Touch</h2>
            </Reveal>

            {CONTACT_INFO.map(({ Icon, label, value, href }, i) => (
              <Reveal key={i} delay={i * 0.07}>
                {href ? (
                  <a href={href} className="block group">
                    <Card className="border-white/[0.07] transition-colors duration-200 group-hover:border-brand-teal/25">
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center flex-shrink-0">
                          <Icon size={16} className="text-brand-teal"/>
                        </div>
                        <div>
                          <div className="text-[13px] font-semibold text-white/80 mb-0.5">{label}</div>
                          <div className="text-[14px] text-white/45">{value}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ) : (
                  <Card className="border-white/[0.07]">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-white/40"/>
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-white/80 mb-0.5">{label}</div>
                        <div className="text-[14px] text-white/45">{value}</div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </Reveal>
            ))}

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

          {/* Right — form */}
          <Reveal delay={0.1}>
            <Card className="border-white/[0.07]">
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center mb-5">
                        <CheckCircle size={28} className="text-brand-teal"/>
                      </div>
                      <h3 className="text-[22px] font-bold text-white mb-2">Message sent</h3>
                      <p className="text-[15px] text-white/45 max-w-xs font-light">
                        Thanks for reaching out. We will be in touch within 24 hours to arrange your discovery call.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} noValidate className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name" name="name" type="text" required
                            placeholder="John Smith"
                            value={form.name}
                            onChange={e => setForm(p=>({...p,name:e.target.value}))}
                            className={errors.name ? 'border-red-500/50 focus-visible:ring-red-500/30' : ''}
                          />
                          {errors.name && <p className="text-[12px] text-red-400">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email" name="email" type="email" required
                            placeholder="john@company.com"
                            value={form.email}
                            onChange={e => setForm(p=>({...p,email:e.target.value}))}
                            className={errors.email ? 'border-red-500/50 focus-visible:ring-red-500/30' : ''}
                          />
                          {errors.email && <p className="text-[12px] text-red-400">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company" name="company" type="text"
                            placeholder="Your Company Pty Ltd"
                            value={form.company}
                            onChange={e => setForm(p=>({...p,company:e.target.value}))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="service">Service Interested In</Label>
                          <Select onValueChange={v => setForm(p=>({...p,service:v}))}>
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

                      <div className="space-y-2">
                        <Label htmlFor="message">Tell Us About Your Project *</Label>
                        <Textarea
                          id="message" name="message" required rows={5}
                          placeholder="Describe your current QA setup, team size, tools you use, and what you are hoping to achieve..."
                          value={form.message}
                          onChange={e => setForm(p=>({...p,message:e.target.value}))}
                          className={errors.message ? 'border-red-500/50 focus-visible:ring-red-500/30' : ''}
                        />
                        {errors.message && <p className="text-[12px] text-red-400">{errors.message}</p>}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full mt-1"
                        disabled={sending}
                      >
                        {sending ? (
                          <>
                            <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>Send Message <Send size={15}/></>
                        )}
                      </Button>
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

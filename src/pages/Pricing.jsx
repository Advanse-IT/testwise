import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import PageWrapper from '@/components/ui/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { Divider } from '@/components/ui/Divider'
import { PRICING, FAQS } from '@/lib/data'

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  return (
    <Reveal delay={index*0.04}>
      <div className="border-b border-border">
        <button onClick={() => setOpen(v=>!v)} className="w-full text-left flex items-center justify-between gap-4 py-5" aria-expanded={open}>
          <span className="text-[16px] font-medium text-snow leading-snug">{q}</span>
          <span className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-[16px] font-light transition-all duration-200 ${
            open ? 'rotate-45 border-teal/40 bg-teal/10 text-teal' : 'border-border text-fog'
          }`}>+</span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}
              transition={{duration:0.3}} className="overflow-hidden">
              <p className="text-body-lg text-mist font-light leading-relaxed pb-5">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

export default function Pricing() {
  return (
    <PageWrapper>
      <section className="pt-32 pb-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <SectionHeader center
          eyebrow="Pricing"
          title="Start with an audit. Scale to autonomy."
          body="Every engagement delivers measurable value in the first week. The first call is a discovery session — no sales deck, no obligation."
        />
      </section>

      <div className="divider-glow"/>

      <section className="py-20 px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-5">
          {PRICING.map((plan, i) => (
            <Reveal key={i} delay={i*0.1}>
              <div className={`${plan.featured ? 'card-featured' : 'card'} p-8 flex flex-col relative h-full`}>
                {plan.badge && (
                  <div className="absolute top-5 right-5 text-label text-teal border border-teal/25 px-3 py-1 rounded-full bg-teal/10">
                    {plan.badge}
                  </div>
                )}
                <div className="text-label text-teal mb-2">{plan.tier}</div>
                <h3 className="text-title-md text-snow mb-3">{plan.name}</h3>
                <p className="text-body-lg text-mist font-light leading-relaxed mb-6">{plan.desc}</p>
                <div className="mb-1">
                  <span className="text-[14px] text-fog align-super">$</span>
                  <span className="text-5xl font-bold text-snow tracking-tight">{plan.price}</span>
                </div>
                <div className="text-body-md text-fog mb-8">{plan.cadence}</div>
                <ul className="flex flex-col gap-3 mb-9 flex-1">
                  {plan.features.map((f,fi) => (
                    <li key={fi} className="flex items-start gap-3 text-body-lg text-mist font-light">
                      <Check size={15} className="text-teal mt-0.5 flex-shrink-0"/>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact"
                  className={`w-full text-center py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                    plan.featured ? 'btn-primary justify-center' : 'btn-secondary justify-center'
                  }`}>
                  {plan.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3} className="text-center mt-7">
          <p className="text-body-md text-fog">All engagements are scoped after a discovery call. Implementation pricing varies based on environment complexity and integration requirements.</p>
        </Reveal>
      </section>

      <Divider />

      <section className="py-20 px-6 lg:px-12 max-w-3xl mx-auto">
        <SectionHeader center eyebrow="FAQ" title="Common questions"/>
        <div className="mt-10">
          {FAQS.map((f,i) => <FaqItem key={i} {...f} index={i}/>)}
        </div>
      </section>

      <Divider />

      <section className="py-16 px-6 text-center max-w-xl mx-auto">
        <Reveal>
          <h2 className="text-title-lg text-snow mb-4">Not sure which engagement is right?</h2>
          <p className="text-body-xl text-mist font-light mb-7">The QA Maturity Audit is the natural starting point. It gives you a clear picture before any commitment to implementation.</p>
          <Link to="/contact" className="btn-primary inline-flex">Book a discovery call <ArrowRight size={16}/></Link>
        </Reveal>
      </section>
    </PageWrapper>
  )
}

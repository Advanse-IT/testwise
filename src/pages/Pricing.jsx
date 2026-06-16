import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import PageWrapper from '@/components/ui/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { Divider } from '@/components/ui/Divider'
import { PRICING, FAQS } from '@/lib/data'

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  return (
    <Reveal delay={index * 0.04}>
      <div className="border-b border-border">
        <button
          onClick={() => setOpen(v => !v)}
          className="w-full text-left flex items-center justify-between gap-4 py-5"
          aria-expanded={open}
        >
          <span className="text-[15px] font-medium text-snow leading-snug">{q}</span>
          <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-mist transition-all duration-200 ${open ? 'rotate-45 border-teal/40 bg-teal-dim text-teal-bright' : ''}`}>
            +
          </span>
        </button>
        {open && (
          <div className="pb-5 text-[14px] text-mist leading-relaxed font-light">{a}</div>
        )}
      </div>
    </Reveal>
  )
}

export default function Pricing() {
  return (
    <PageWrapper>
      <section className="pt-32 pb-16 px-6 lg:px-10 max-w-6xl mx-auto">
        <SectionHeader
          center
          eyebrow="Pricing"
          title="Start with an audit. Scale to autonomy."
          body="Every engagement delivers measurable value in the first week. No long procurement cycles — the first call is a discovery session."
        />
      </section>

      <Divider />

      {/* Pricing cards */}
      <section className="py-20 px-6 lg:px-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-5">
          {PRICING.map((plan, i) => (
            <Reveal key={i} delay={i * 0.1} className={`rounded-xl border p-8 flex flex-col relative overflow-hidden ${
              plan.featured
                ? 'border-teal/35 bg-gradient-card'
                : 'card'
            }`}>
              <div className="grid-watermark opacity-30" aria-hidden="true"/>
              <div className="relative z-10 flex flex-col flex-1">
                {plan.badge && (
                  <div className="absolute top-5 right-5 text-[10px] font-semibold tracking-widest uppercase text-teal-bright border border-teal/30 px-3 py-1 rounded-full bg-teal-dim">
                    {plan.badge}
                  </div>
                )}
                <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-teal-bright mb-2">{plan.tier}</div>
                <h3 className="text-[20px] font-semibold text-snow tracking-tight mb-2">{plan.name}</h3>
                <p className="text-[13px] text-mist leading-relaxed mb-6 font-light">{plan.desc}</p>

                <div className="mb-1">
                  <span className="text-[13px] text-fog align-top mt-2 inline-block mr-1">$</span>
                  <span className="text-4xl font-bold text-snow tracking-tight">{plan.price}</span>
                </div>
                <div className="text-[12px] text-fog mb-7">{plan.cadence}</div>

                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-[13px] text-mist font-light">
                      <Check size={13} className="text-teal-bright mt-0.5 flex-shrink-0"/>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`w-full text-center py-3 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                    plan.featured
                      ? 'btn-primary justify-center'
                      : 'btn-secondary justify-center'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Note */}
        <Reveal delay={0.3} className="mt-8 text-center">
          <p className="text-[12px] text-fog">
            All engagements are scoped after a discovery call. Implementation pricing varies based on environment complexity and integration requirements.
          </p>
        </Reveal>
      </section>

      <Divider />

      {/* FAQ */}
      <section className="py-20 px-6 lg:px-10 max-w-3xl mx-auto">
        <SectionHeader
          center
          eyebrow="FAQ"
          title="Common questions"
        />
        <div className="mt-10">
          {FAQS.map((f, i) => <FaqItem key={i} {...f} index={i}/>)}
        </div>
      </section>

      <Divider />

      <section className="py-16 px-6 lg:px-10 text-center max-w-lg mx-auto">
        <Reveal>
          <h2 className="text-display-md text-snow mb-4">Not sure which engagement is right?</h2>
          <p className="text-body-md text-mist font-light mb-6">The QA Maturity Audit is the natural starting point for most organisations. It gives you a clear picture of where you are and what a pipeline would involve before any commitment to implementation.</p>
          <Link to="/contact" className="btn-primary inline-flex">Book a discovery call <ArrowRight size={15}/></Link>
        </Reveal>
      </section>
    </PageWrapper>
  )
}

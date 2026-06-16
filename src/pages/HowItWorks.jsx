import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageWrapper from '@/components/ui/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'
import { Divider } from '@/components/ui/Divider'
import { HOW_STEPS } from '@/lib/data'

export default function HowItWorks() {
  return (
    <PageWrapper>
      <section className="pt-32 pb-16 px-6 lg:px-10 max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Implementation"
          title="Up and running in one sprint."
          body="No rip-and-replace. No new tools mandated. Testwise is designed and integrated into your existing environment — typically reaching a first autonomous sprint within two to three weeks."
        />
      </section>

      <Divider />

      {/* Steps */}
      <section className="py-20 px-6 lg:px-10 max-w-5xl mx-auto">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden md:block" aria-hidden="true"/>

          <div className="flex flex-col gap-0">
            {HOW_STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="relative flex gap-8 md:gap-12 pb-14 last:pb-0">
                  {/* Step node */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border border-teal/30 bg-teal-dim flex items-center justify-center z-10">
                    <Icon name={step.icon} size={16} className="text-teal-bright"/>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1.5">
                    <div className="text-[10px] font-bold tracking-[0.14em] text-fog uppercase mb-2">{step.num}</div>
                    <h3 className="text-display-sm text-snow mb-3">{step.title}</h3>
                    <p className="text-body-md text-mist font-light leading-relaxed max-w-lg">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* Assurance section */}
      <section className="py-20 px-6 lg:px-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: 'Clock', title: 'No big-bang deployment', body: 'Implementation is phased — integration first, calibration second, autonomous sprint third. Each phase has a clear sign-off before the next begins.' },
            { icon: 'ShieldCheck', title: 'Fully supervised first run', body: 'Your first autonomous sprint is run with your team observing every stage. We review, adjust, and validate before handing control to the pipeline.' },
            { icon: 'RefreshCw', title: 'Ongoing support included', body: 'The implementation engagement includes a period of supervised operation. We do not hand over and disappear — the retainer keeps the system calibrated as your product evolves.' },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1} className="card card-hover p-7 relative overflow-hidden">
              <div className="grid-watermark opacity-40" aria-hidden="true"/>
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-teal-dim border border-teal/20 flex items-center justify-center mb-4">
                  <Icon name={item.icon} size={17} className="text-teal-bright"/>
                </div>
                <h3 className="text-[15px] font-semibold text-snow mb-2 tracking-tight">{item.title}</h3>
                <p className="text-[13px] text-mist leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Divider />

      <section className="py-16 px-6 lg:px-10 text-center max-w-lg mx-auto">
        <Reveal>
          <h2 className="text-display-md text-snow mb-4">Ready to map out your implementation?</h2>
          <p className="text-body-md text-mist font-light mb-6">The first call is a discovery session — no sales pitch. We walk through your environment and show you exactly what the pipeline would look like for your team.</p>
          <Link to="/contact" className="btn-primary inline-flex">Book a discovery call <ArrowRight size={15}/></Link>
        </Reveal>
      </section>
    </PageWrapper>
  )
}

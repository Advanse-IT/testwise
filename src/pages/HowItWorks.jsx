import { Link } from 'react-router-dom'
import { ArrowRight, Search, PlugZap, SlidersHorizontal, Rocket, TrendingUp, Clock, ShieldCheck, RefreshCw } from 'lucide-react'
import PageWrapper from '@/components/ui/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { Divider } from '@/components/ui/Divider'
import { HOW_STEPS } from '@/lib/data'

const STEP_ICONS = [Search, PlugZap, SlidersHorizontal, Rocket, TrendingUp]
const ASSURANCE_ICONS = [Clock, ShieldCheck, RefreshCw]
const ASSURANCE = [
  { title:'No big-bang deployment', body:'Implementation is phased — integration first, calibration second, autonomous sprint third. Each phase has a clear sign-off before the next begins.' },
  { title:'Fully supervised first run', body:'Your first autonomous sprint runs with your team observing every stage. We review, adjust, and validate before handing control to the pipeline.' },
  { title:'Ongoing calibration included', body:'The implementation engagement includes a period of supervised operation. We do not hand over and disappear — the retainer keeps the system calibrated as your product evolves.' },
]

export default function HowItWorks() {
  return (
    <PageWrapper>
      <section className="pt-32 pb-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Implementation"
          title="Up and running in one sprint."
          body="No rip-and-replace. No new tools mandated. Testwise integrates into your existing environment — typically reaching a first autonomous sprint within two to three weeks."
        />
      </section>

      <div className="divider-glow"/>

      <section className="py-20 px-6 lg:px-12 max-w-4xl mx-auto">
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-5 top-8 bottom-8 w-px bg-gradient-to-b from-teal/40 via-teal/20 to-transparent hidden md:block" aria-hidden="true"/>
          <div className="flex flex-col gap-0">
            {HOW_STEPS.map((step, i) => {
              const StepIcon = STEP_ICONS[i]
              return (
                <Reveal key={i} delay={i*0.1}>
                  <div className="relative flex gap-8 md:gap-12 pb-14 last:pb-0">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full border border-teal/30 bg-teal/10 flex items-center justify-center z-10">
                      <StepIcon size={16} className="text-teal"/>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="text-label text-fog uppercase mb-2">{step.num}</div>
                      <h3 className="text-title-md text-snow mb-3">{step.title}</h3>
                      <p className="text-body-xl text-mist font-light leading-relaxed max-w-lg">{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <Divider />

      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <Reveal className="mb-12">
          <div className="eyebrow">What you can expect</div>
          <h2 className="text-title-xl text-snow max-w-xl">Built to give you confidence at every step.</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {ASSURANCE.map((item, i) => {
            const AIcon = ASSURANCE_ICONS[i]
            return (
              <Reveal key={i} delay={i*0.1}>
                <div className="card-accent p-8 h-full flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-teal/10 border border-teal/15 flex items-center justify-center mb-5">
                    <AIcon size={19} className="text-teal"/>
                  </div>
                  <h3 className="text-title-md text-snow mb-3">{item.title}</h3>
                  <p className="text-body-lg text-mist leading-relaxed flex-1">{item.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <Divider />

      <section className="py-16 px-6 text-center max-w-xl mx-auto">
        <Reveal>
          <h2 className="text-title-lg text-snow mb-4">Ready to map out your implementation?</h2>
          <p className="text-body-xl text-mist font-light mb-7">The first call is a discovery session. We walk through your environment and show you exactly what the pipeline would look like for your team.</p>
          <Link to="/contact" className="btn-primary inline-flex">Book a discovery call <ArrowRight size={16}/></Link>
        </Reveal>
      </section>
    </PageWrapper>
  )
}

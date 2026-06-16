import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageWrapper from '@/components/ui/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'
import { Divider } from '@/components/ui/Divider'
import { VERTICALS } from '@/lib/data'

export default function Industries() {
  return (
    <PageWrapper>
      <section className="pt-32 pb-16 px-6 lg:px-10 max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Industries"
          title="Built for teams that cannot slow down for QA."
          body="Testwise adapts to your risk profile and compliance obligations. The same autonomous pipeline — configured differently for every client and every sector."
        />
      </section>

      <Divider />

      {/* Verticals */}
      <section className="py-20 px-6 lg:px-10 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VERTICALS.map((v, i) => (
            <Reveal key={i} delay={i * 0.07} className="card card-hover p-7 relative overflow-hidden flex flex-col">
              <div className="grid-watermark opacity-40" aria-hidden="true"/>
              <div className="relative z-10 flex flex-col flex-1">
                <div className="w-10 h-10 rounded-lg border border-border bg-raised flex items-center justify-center mb-4">
                  <Icon name={v.icon} size={17} className="text-teal-bright"/>
                </div>
                <h3 className="text-[17px] font-semibold text-snow mb-2 tracking-tight">{v.name}</h3>
                <div className={`inline-flex items-center gap-1.5 text-[11px] font-medium mb-3 ${
                  v.gateType === 'amber' ? 'text-amber' : 'text-teal-bright'
                }`}>
                  <Icon name={v.gateType === 'amber' ? 'ShieldAlert' : 'ShieldCheck'} size={11}/>
                  {v.gates}
                </div>
                <p className="text-[13px] text-mist leading-relaxed flex-1">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Divider />

      {/* Compliance note */}
      <section className="py-20 px-6 lg:px-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="eyebrow">Compliance & governance</div>
            <h2 className="text-display-md text-snow mb-4">Configurable to your obligations — not a generic framework.</h2>
            <p className="text-body-md text-mist font-light leading-relaxed mb-4">
              Every regulated environment has different requirements. Testwise does not apply a generic compliance template — gate configuration, audit trail format, and approval chain are all designed to match your specific obligations.
            </p>
            <p className="text-body-md text-mist font-light leading-relaxed">
              Whether you are operating under APRA CPS 234, DTA delivery standards, TGA clinical software validation, or an internal ISO 27001 framework — the pipeline is configured accordingly, with your risk and legal team involved in the gate design.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3">
              {[
                { label: 'APRA CPS 234', desc: 'Financial services cyber and change risk governance' },
                { label: 'DTA Standards',desc: 'Australian Government digital delivery standards' },
                { label: 'TGA Validation',desc: 'Clinical software and MedTech validation trails' },
                { label: 'ISO 27001',     desc: 'Information security management system alignment' },
                { label: 'Custom',        desc: 'Bespoke gate design for internal governance frameworks' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 card p-4">
                  <div className="w-1 h-full self-stretch bg-teal/40 rounded-full min-h-[36px]"/>
                  <div>
                    <div className="text-[13px] font-semibold text-snow">{item.label}</div>
                    <div className="text-[12px] text-mist mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      <section className="py-16 px-6 lg:px-10 text-center max-w-lg mx-auto">
        <Reveal>
          <h2 className="text-display-md text-snow mb-4">Not sure which configuration applies to your sector?</h2>
          <p className="text-body-md text-mist font-light mb-6">We map your compliance obligations in the first discovery session and design the gate architecture accordingly.</p>
          <Link to="/contact" className="btn-primary inline-flex">Book a discovery call <ArrowRight size={15}/></Link>
        </Reveal>
      </section>
    </PageWrapper>
  )
}

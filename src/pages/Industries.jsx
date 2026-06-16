import { Link } from 'react-router-dom'
import { ArrowRight, Landmark, Building2, HeartPulse, Warehouse, Rocket, Layers, ShieldAlert, ShieldCheck } from 'lucide-react'
import PageWrapper from '@/components/ui/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { Divider } from '@/components/ui/Divider'
import { VERTICALS } from '@/lib/data'
import { usePageMeta } from '@/hooks/usePageMeta'

const V_ICONS = { Landmark, Building2, HeartPulse, Warehouse, Rocket, Layers }

const COMPLIANCE = [
  { label:'APRA CPS 234',  desc:'Financial services cyber and change risk governance' },
  { label:'DTA Standards', desc:'Australian Government digital delivery standards' },
  { label:'TGA Validation',desc:'Clinical software and MedTech validation trails' },
  { label:'ISO 27001',     desc:'Information security management system alignment' },
  { label:'Custom',        desc:'Bespoke gate design for internal governance frameworks' },
]

export default function Industries() {
  usePageMeta({ title:'Industries', description:'Testwise serves government, financial services, healthcare, logistics, digital agencies, and SaaS teams. Configurable for any compliance framework.', canonical:'/industries' })
  return (
    <PageWrapper>
      <section className="pt-32 pb-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Industries"
          title="Built for teams that cannot slow down for QA."
          body="Testwise adapts to your risk profile and compliance obligations. The same autonomous pipeline — configured differently for every client and every sector."
        />
      </section>

      <div className="divider-glow"/>

      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VERTICALS.map((v, i) => {
            const VIcon = V_ICONS[v.icon]
            const isAmber = v.gateType === 'amber'
            usePageMeta({ title:'Industries', description:'Testwise serves government, financial services, healthcare, logistics, digital agencies, and SaaS teams. Configurable for any compliance framework.', canonical:'/industries' })
  return (
              <Reveal key={i} delay={i*0.07}>
                <div className="card-accent p-8 h-full flex flex-col">
                  <div className="w-11 h-11 rounded-xl border border-border bg-raised flex items-center justify-center mb-5">
                    <VIcon size={19} className="text-teal"/>
                  </div>
                  <h3 className="text-h3 text-snow mb-2">{v.name}</h3>
                  <div className={`flex items-center gap-1.5 text-[12px] font-semibold mb-4 ${isAmber ? 'text-amber' : 'text-teal'}`}>
                    {isAmber ? <ShieldAlert size={12}/> : <ShieldCheck size={12}/>}
                    {v.gates}
                  </div>
                  <p className="text-body-lg text-mist leading-relaxed flex-1">{v.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <Divider />

      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          <Reveal>
            <div className="eyebrow">Compliance & governance</div>
            <h2 className="text-h1 text-snow mb-5">Configured to your obligations — not a generic template.</h2>
            <p className="text-body-xl text-mist font-light leading-relaxed mb-5">
              Every regulated environment has different requirements. Gate configuration, audit trail format, and approval chain are all designed to match your specific obligations — with your risk and legal team involved in the design.
            </p>
            <p className="text-body-lg text-mist font-light leading-relaxed">
              Whether you operate under APRA CPS 234, DTA delivery standards, TGA clinical software validation, or an internal ISO 27001 framework — the pipeline is configured accordingly.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3">
              {COMPLIANCE.map((item, i) => (
                <div key={i} className="card p-5 flex items-start gap-4">
                  <div className="w-1 self-stretch bg-teal/35 rounded-full flex-shrink-0 min-h-[44px]"/>
                  <div>
                    <div className="text-[15px] font-semibold text-snow mb-1">{item.label}</div>
                    <div className="text-body-md text-mist">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      <section className="py-16 px-6 text-center max-w-xl mx-auto">
        <Reveal>
          <h2 className="text-h2 text-snow mb-4">Not sure which configuration applies to your sector?</h2>
          <p className="text-body-xl text-mist font-light mb-7">We map your compliance obligations in the first discovery session and design the gate architecture accordingly.</p>
          <Link to="/contact" className="btn-primary inline-flex">Book a discovery call <ArrowRight size={16}/></Link>
        </Reveal>
      </section>
    </PageWrapper>
  )
}

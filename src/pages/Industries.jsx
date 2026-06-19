import { Link } from 'react-router-dom'
import { ArrowRight, Landmark, Building2, HeartPulse, Warehouse, Rocket, Layers, ShieldAlert, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/shadcn/button'
import { Card, CardContent } from '@/components/shadcn/card'
import { Separator } from '@/components/shadcn/separator'
import PageWrapper from '@/components/ui/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { Divider } from '@/components/ui/Divider'
import { usePageMeta } from '@/hooks/usePageMeta'
import { VERTICALS } from '@/lib/data'
import { cn } from '@/lib/utils'

const V_ICONS = { Landmark, Building2, HeartPulse, Warehouse, Rocket, Layers }

const COMPLIANCE = [
  { label:'APRA CPS 234',  desc:'Financial services cyber and change risk governance' },
  { label:'DTA Standards', desc:'Australian Government digital delivery standards' },
  { label:'TGA Validation',desc:'Clinical software and MedTech validation trails' },
  { label:'ISO 27001',     desc:'Information security management system alignment' },
  { label:'Custom',        desc:'Bespoke gate design for internal governance frameworks' },
]

export default function Industries() {
  usePageMeta({
    title: 'Industries',
    description: 'Testwise serves government, financial services, healthcare, logistics, digital agencies, and SaaS teams across Australia.',
    canonical: '/industries',
  })

  return (
    <PageWrapper>
      <section className="pt-32 pb-16 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Industries"
          title="Built for teams that cannot slow down for QA."
          body="Testwise adapts to your risk profile and compliance obligations. The same autonomous pipeline — configured differently for every client and every sector."
        />
      </section>

      <div className="tw-divider-glow"/>

      <section className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VERTICALS.map((v, i) => {
            const VIcon = V_ICONS[v.icon]
            const isAmber = v.gateType === 'amber'
            return (
              <Reveal key={i} delay={i * 0.07}>
                <div className="feature-card p-8 h-full flex flex-col">
                  <div className="w-11 h-11 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center mb-5">
                    <VIcon size={19} className="text-brand-teal"/>
                  </div>
                  <h3 className="text-[19px] font-semibold text-white mb-2 tracking-tight">{v.name}</h3>
                  <div className={cn(
                    'flex items-center gap-1.5 text-[12px] font-semibold mb-4',
                    isAmber ? 'text-brand-amber' : 'text-brand-teal'
                  )}>
                    {isAmber ? <ShieldAlert size={12}/> : <ShieldCheck size={12}/>}
                    {v.gates}
                  </div>
                  <p className="text-[15px] text-white/50 leading-relaxed flex-1 font-light">{v.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <Divider/>

      <section className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          <Reveal>
            <div className="eyebrow-label">Compliance & governance</div>
            <h2 className="text-title-xl text-white mb-5">Configured to your obligations — not a generic template.</h2>
            <p className="text-body-xl text-white/55 font-light leading-relaxed mb-4">
              Every regulated environment has different requirements. Gate configuration, audit trail format, and approval chain are all designed to match your specific obligations — with your risk and legal team involved in the design.
            </p>
            <p className="text-[15px] text-white/40 font-light leading-relaxed">
              Whether you operate under APRA CPS 234, DTA delivery standards, TGA validation, or an internal ISO 27001 framework — the pipeline is configured accordingly.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-3">
              {COMPLIANCE.map((item, i) => (
                <Card key={i} className="border-white/[0.07]">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-1 self-stretch bg-brand-teal/35 rounded-full flex-shrink-0 min-h-[44px]"/>
                    <div>
                      <div className="text-[15px] font-semibold text-white mb-1">{item.label}</div>
                      <div className="text-[14px] text-white/45 font-light">{item.desc}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Divider/>

      <section className="py-16 px-5 text-center max-w-xl mx-auto">
        <Reveal>
          <h2 className="text-title-lg text-white mb-4">Not sure which configuration applies to your sector?</h2>
          <p className="text-body-xl text-white/55 font-light mb-8">
            We map your compliance obligations in the first discovery session and design the gate architecture accordingly.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Book a discovery call <ArrowRight size={16}/></Link>
          </Button>
        </Reveal>
      </section>
    </PageWrapper>
  )
}

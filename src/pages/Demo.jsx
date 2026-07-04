import { Link } from 'react-router-dom'
import { ArrowRight, PlayCircle, CheckCircle2, Building2, Warehouse, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/shadcn/button'
import { Badge } from '@/components/shadcn/badge'
import { Card, CardContent } from '@/components/shadcn/card'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/shadcn/accordion'
import PageWrapper from '@/components/ui/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { Divider } from '@/components/ui/Divider'
import { usePageMeta } from '@/hooks/usePageMeta'
import { DEMO_VIDEO, CASE_STUDY, FAQS } from '@/lib/data'

const PLATFORM_ICONS = { LayoutGrid, Warehouse, Building2 }

export default function Demo() {
  usePageMeta({
    title: 'Demo',
    description: 'Watch Testwise run autonomously against a Microsoft Dynamics 365 Sales implementation — requirements to signed-off QA report, zero manual effort.',
    canonical: '/demo',
  })

  return (
    <PageWrapper>
      <section className="pt-32 pb-16 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <SectionHeader
          center
          eyebrow="Demo"
          title="See the pipeline run, end to end."
          body="No slides, no simulated screenshots — a real walkthrough of Testwise executing a full QA cycle inside a live business system."
        />
      </section>

      <div className="tw-divider-glow"/>

      {/* VIDEO */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto">
        <Reveal>
          <Card className="overflow-hidden border-brand-teal/15">
            <div className="relative bg-black aspect-video">
              <video
                className="w-full h-full"
                controls
                preload="metadata"
                playsInline
              >
                <source src={DEMO_VIDEO.src} type="video/mp4"/>
                Your browser does not support embedded video. You can download the demo instead.
              </video>
            </div>
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-2">
                <PlayCircle size={18} className="text-brand-teal mt-0.5 flex-shrink-0"/>
                <h3 className="text-[16px] sm:text-[17px] font-semibold text-white leading-snug">{DEMO_VIDEO.title}</h3>
              </div>
              <p className="text-[14px] sm:text-[15px] text-white/50 font-light leading-relaxed pl-[30px]">
                {DEMO_VIDEO.desc}
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </section>

      <Divider/>

      {/* CASE STUDY */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto">
        <Reveal>
          <div className="eyebrow-label">{CASE_STUDY.eyebrow}</div>
          <Badge variant="default" className="mb-5 mt-3">{CASE_STUDY.platform}</Badge>
          <h2 className="text-title-xl text-white mb-5 max-w-2xl">{CASE_STUDY.title}</h2>
          <p className="text-[16px] sm:text-body-xl text-white/55 font-light max-w-2xl mb-14 leading-relaxed">
            {CASE_STUDY.summary}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <Reveal delay={0.1}>
            <div className="feature-card p-7 sm:p-8 h-full">
              <div className="eyebrow-label mb-4">The challenge</div>
              <p className="text-[15px] text-white/55 font-light leading-relaxed">{CASE_STUDY.challenge}</p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="feature-card p-7 sm:p-8 h-full">
              <div className="eyebrow-label mb-4">What the demo shows</div>
              <ul className="space-y-3">
                {CASE_STUDY.approach.map((line, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-white/55 font-light leading-snug">
                    <CheckCircle2 size={15} className="text-brand-teal mt-0.5 flex-shrink-0"/>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <Divider/>

      {/* MULTI-PLATFORM */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <Reveal>
          <div className="eyebrow-label">Works wherever you run</div>
          <h2 className="text-title-xl text-white mb-4">One pipeline, every platform.</h2>
          <p className="text-[16px] sm:text-body-xl text-white/55 font-light max-w-xl mb-10 sm:mb-14">
            The D365 Sales demo shows one deployment of Testwise — the same pipeline runs seamlessly across custom digital applications, warehouse management systems, and Microsoft Dynamics 365.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {CASE_STUDY.platforms.map((p, i) => {
            const PlatformIcon = PLATFORM_ICONS[p.icon]
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="feature-card p-6 sm:p-7 h-full flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-brand-teal/10 border border-brand-teal/15 flex items-center justify-center mb-5">
                    <PlatformIcon size={19} className="text-brand-teal"/>
                  </div>
                  <h3 className="text-[16px] sm:text-[17px] font-semibold text-white mb-3 tracking-tight leading-snug">{p.name}</h3>
                  <p className="text-[14px] sm:text-[15px] text-white/50 leading-relaxed flex-1 font-light">{p.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <Divider/>

      <section className="py-20 px-5 sm:px-8 lg:px-12 max-w-3xl mx-auto">
        <SectionHeader center eyebrow="FAQ" title="Common questions"/>
        <Reveal delay={0.1} className="mt-10">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-[16px] font-medium text-white/85 text-left">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] text-white/50 font-light leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      <Divider/>

      <section className="py-16 px-5 text-center max-w-xl mx-auto">
        <Reveal>
          <h2 className="text-title-lg text-white mb-4">Want to see this running on your stack?</h2>
          <p className="text-body-xl text-white/55 font-light mb-8">
            Book a discovery call and we'll map what a bespoke Testwise pipeline looks like for your environment — D365, WMS, or a custom application.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Book a discovery call <ArrowRight size={16}/></Link>
          </Button>
        </Reveal>
      </section>
    </PageWrapper>
  )
}

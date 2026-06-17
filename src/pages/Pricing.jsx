import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/shadcn/button'
import { Badge } from '@/components/shadcn/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shadcn/card'
import { Separator } from '@/components/shadcn/separator'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/shadcn/accordion'
import PageWrapper from '@/components/ui/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { Divider } from '@/components/ui/Divider'
import { usePageMeta } from '@/hooks/usePageMeta'
import { PRICING, FAQS } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function Pricing() {
  usePageMeta({
    title: 'Pricing',
    description: 'Testwise pricing: QA Maturity Audit from $3,500, Full Pipeline Implementation from $20,000, Advisory Retainer $4,000/month.',
    canonical: '/pricing',
  })

  return (
    <PageWrapper>
      <section className="pt-32 pb-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <SectionHeader
          center
          eyebrow="Pricing"
          title="Start with an audit. Scale to autonomy."
          body="Every engagement delivers measurable value in the first week. The first call is a discovery session — no sales deck, no obligation."
        />
      </section>

      <div className="tw-divider-glow"/>

      <section className="py-20 px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-5">
          {PRICING.map((plan, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className={cn(
                'relative flex flex-col h-full border',
                plan.featured
                  ? 'border-brand-teal/25 bg-gradient-to-b from-brand-teal/[0.06] to-card shadow-glow'
                  : 'border-white/[0.07]'
              )}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="default" className="shadow-glow px-4 py-1">{plan.badge}</Badge>
                  </div>
                )}
                <CardHeader className="p-8 pb-0">
                  <div className="eyebrow-label mb-3">{plan.tier}</div>
                  <CardTitle className="text-[22px] text-white mb-3">{plan.name}</CardTitle>
                  <CardDescription className="text-[15px] text-white/45 leading-relaxed font-light">
                    {plan.desc}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-8 flex flex-col flex-1">
                  <div className="mb-1">
                    <span className="text-[15px] text-white/35 align-super">$</span>
                    <span className="text-[48px] font-bold text-white tracking-tight leading-none">{plan.price}</span>
                  </div>
                  <div className="text-[13px] text-white/30 mb-8">{plan.cadence}</div>

                  <ul className="space-y-3 mb-9 flex-1">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-3 text-[15px] text-white/55 font-light leading-snug">
                        <Check size={15} className="text-brand-teal mt-0.5 flex-shrink-0"/>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant={plan.featured ? 'default' : 'secondary'}
                    className="w-full"
                    size="lg"
                  >
                    <Link to="/contact">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-8 text-center">
          <p className="text-[14px] text-white/25">
            All engagements are scoped after a discovery call. Implementation pricing varies based on environment complexity.
          </p>
        </Reveal>
      </section>

      <Divider/>

      {/* FAQ with shadcn Accordion */}
      <section className="py-20 px-6 lg:px-12 max-w-3xl mx-auto">
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

      <section className="py-16 px-6 text-center max-w-xl mx-auto">
        <Reveal>
          <h2 className="text-title-lg text-white mb-4">Not sure which engagement is right?</h2>
          <p className="text-body-xl text-white/55 font-light mb-8">
            The QA Maturity Audit is the natural starting point. It gives you a clear picture before any commitment to implementation.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Book a discovery call <ArrowRight size={16}/></Link>
          </Button>
        </Reveal>
      </section>
    </PageWrapper>
  )
}

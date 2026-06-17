import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Wrench, Fingerprint, ShieldCheck, GitBranch,
         FileText, ListChecks, Code2, Play, BugOff, TicketCheck, BarChart3, FileCheck2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/shadcn/button'
import { Badge } from '@/components/shadcn/badge'
import { Card, CardContent } from '@/components/shadcn/card'
import { Separator } from '@/components/shadcn/separator'
import PageWrapper from '@/components/ui/PageWrapper'
import ParticleCanvas from '@/components/ui/ParticleCanvas'
import QAVisualiser from '@/components/ui/QAVisualiser'
import Reveal from '@/components/ui/Reveal'
import { Divider } from '@/components/ui/Divider'
import { useCountUp } from '@/hooks/useCountUp'
import { useTypewriter } from '@/hooks/useTypewriter'
import { useInView } from '@/hooks/useInView'
import { usePageMeta } from '@/hooks/usePageMeta'
import { PROOF, BESPOKE_PILLARS } from '@/lib/data'

const TYPED = [
  'built around your stack.',
  'calibrated to your domain.',
  'matched to your risk profile.',
  'engineered for your team.',
  'zero manual effort.',
]

const STATS = [
  { value:8,  suffix:'',   label:'Automated pipeline stages' },
  { value:0,  suffix:'',   label:'Manual touchpoints by default' },
  { value:80, suffix:'%+', label:'Automation coverage achieved' },
  { value:1,  suffix:'',   label:'Sprint to first autonomous run', isOne:true },
]

const PIPELINE = [
  { Icon:FileText,    label:'Requirements', sub:'Your project tool'   },
  { Icon:ListChecks,  label:'Test Cases',   sub:'Claude AI'           },
  { Icon:Code2,       label:'Automation',   sub:'Your framework'      },
  { Icon:Play,        label:'Execution',    sub:'Your CI/CD'          },
  { Icon:BugOff,      label:'Triage',       sub:'Claude AI'           },
  { Icon:TicketCheck, label:'Issue Logging',sub:'Your issue tracker'  },
  { Icon:BarChart3,   label:'Reporting',    sub:'Your TM platform'    },
  { Icon:FileCheck2,  label:'Sign-off',     sub:'Auto-delivered'      },
]

const PILLAR_ICONS = [Wrench, Fingerprint, ShieldCheck, GitBranch]

function StatCard({ value, suffix, label, index, isOne }) {
  const [ref, inView] = useInView()
  const count = useCountUp(value, 1400, inView)
  return (
    <Reveal delay={index * 0.07}>
      <Card className="stat-card border-0 text-center p-6">
        <div ref={ref} className="text-[36px] font-bold text-brand-teal tracking-tight leading-none mb-2 text-glow">
          {isOne ? `${count} sprint` : `${count}${suffix}`}
        </div>
        <div className="text-[14px] text-white/50 leading-snug">{label}</div>
      </Card>
    </Reveal>
  )
}

export default function Home() {
  usePageMeta({ canonical: '/' })
  const typed = useTypewriter(TYPED, { speed:55, pause:2400, deleteSpeed:28 })

  return (
    <PageWrapper>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-12 pt-20 pb-16 overflow-hidden">
        <ParticleCanvas/>
        <div className="bg-depth absolute inset-0 pointer-events-none" aria-hidden="true"/>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-[1fr_540px] gap-16 items-center">

            {/* Copy */}
            <div>
              <motion.div
                initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
                className="mb-8"
              >
                <Badge variant="default" className="gap-2 py-1.5 px-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse-slow flex-shrink-0" aria-hidden="true"/>
                  Running live in enterprise production
                </Badge>
              </motion.div>

              <motion.h1
                initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:0.65,delay:0.1}}
                className="text-hero text-white mb-3 font-bold"
              >
                Autonomous QA,
              </motion.h1>

              <motion.div
                initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:0.65,delay:0.2}}
                className="text-hero mb-7 font-bold"
                style={{ minHeight:'1.1em' }}
              >
                <span className="gradient-text">{typed}</span>
                <span
                  className="inline-block w-[3px] bg-brand-teal ml-1 align-middle animate-pulse-slow rounded-full"
                  style={{ height:'0.82em' }}
                  aria-hidden="true"
                />
              </motion.div>

              <motion.p
                initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.35}}
                className="text-body-xl text-white/55 font-light max-w-lg leading-relaxed mb-3"
              >
                A fully autonomous AI QA pipeline — from requirements intake to signed-off report — engineered specifically for your tools, your team, and your compliance requirements.
              </motion.p>

              <motion.p
                initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5,delay:0.5}}
                className="text-[14px] text-white/30 mb-10 flex items-center gap-2"
              >
                <span className="w-5 h-px bg-brand-teal/40 flex-shrink-0"/>
                No standard product. Every pipeline is designed from scratch for each client.
              </motion.p>

              <motion.div
                initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.58}}
                className="flex flex-wrap gap-3"
              >
                <Button asChild size="lg">
                  <Link to="/contact">Start a conversation <ArrowRight size={16}/></Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link to="/pipeline">Explore the pipeline <ChevronRight size={16}/></Link>
                </Button>
              </motion.div>
            </div>

            {/* QA Visualiser */}
            <motion.div
              initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} transition={{duration:0.9,delay:0.3}}
              className="hidden lg:block"
            >
              <QAVisualiser/>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.75}}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16"
          >
            {STATS.map((s,i) => <StatCard key={i} {...s} index={i}/>)}
          </motion.div>
        </div>
      </section>

      <div className="tw-divider-glow"/>

      {/* ── PIPELINE STRIP ──────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <Reveal>
          <div className="eyebrow-label">What Testwise automates</div>
          <h2 className="text-title-xl text-white mb-4">
            Every stage of QA. End to end. Autonomously.
          </h2>
          <p className="text-body-xl text-white/55 font-light max-w-xl mb-14">
            From the moment a requirement appears in your project management tool to the moment a sign-off report reaches your stakeholders — no human intervention required unless you configure one.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="beam-container rounded-2xl border border-white/[0.07] bg-card overflow-hidden">
            <div className="beam-line" aria-hidden="true"/>
            <div className="flex overflow-x-auto scrollbar-hide">
              {PIPELINE.map(({ Icon, label, sub }, i) => (
                <div key={i} className="flex items-center flex-shrink-0">
                  <div className="group flex flex-col items-center px-7 py-10 transition-colors duration-200 hover:bg-brand-teal/[0.04] cursor-default">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 group-hover:border-brand-teal/30 group-hover:shadow-glow transition-all duration-300">
                      <Icon size={20} className="text-white/35 group-hover:text-brand-teal transition-colors duration-200"/>
                    </div>
                    <span className="text-[13px] font-semibold text-white/70 whitespace-nowrap mb-1">{label}</span>
                    <span className="text-[11px] text-white/25 whitespace-nowrap">{sub}</span>
                  </div>
                  {i < PIPELINE.length - 1 && (
                    <div className="flex-shrink-0 flex items-center gap-0.5 opacity-20">
                      <div className="w-4 h-px bg-brand-teal"/>
                      <div className="w-1 h-1 rounded-full bg-brand-teal"/>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Separator className="bg-white/[0.06]"/>
            <div className="px-7 py-4 flex items-center justify-between bg-white/[0.015]">
              <span className="text-[14px] text-white/30">All stages connected. Human approval gates configurable at any point.</span>
              <Button asChild variant="link" size="sm" className="text-[14px]">
                <Link to="/pipeline">Configure gates <ArrowRight size={13}/></Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      <Divider/>

      {/* ── BESPOKE PILLARS ─────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <Reveal>
          <div className="eyebrow-label">The Testwise approach</div>
          <h2 className="text-title-xl text-white mb-4">Every pipeline is unique to its client.</h2>
          <p className="text-body-xl text-white/55 font-light max-w-lg mb-14">
            There is no off-the-shelf product. Every Testwise engagement is designed from discovery — built around your stack, your team, and your processes.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BESPOKE_PILLARS.map((p, i) => {
            const PillarIcon = PILLAR_ICONS[i]
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="feature-card p-7 h-full flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-brand-teal/10 border border-brand-teal/15 flex items-center justify-center mb-5">
                    <PillarIcon size={19} className="text-brand-teal"/>
                  </div>
                  <h3 className="text-[17px] font-semibold text-white mb-3 tracking-tight leading-snug">{p.title}</h3>
                  <p className="text-[15px] text-white/50 leading-relaxed flex-1 font-light">{p.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <Divider/>

      {/* ── PROOF ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <Reveal>
          <Card className="overflow-hidden border-brand-teal/15">
            <CardContent className="p-12 md:p-16 relative">
              <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
                style={{background:'radial-gradient(circle,rgba(34,211,195,0.07) 0%,transparent 65%)',transform:'translate(30%,-30%)'}}
                aria-hidden="true"
              />
              <div className="relative z-10">
                <Badge variant="default" className="mb-6">Production evidence</Badge>
                <blockquote className="text-title-lg text-white mb-12 max-w-3xl leading-snug font-semibold">
                  "{PROOF.quote}"
                </blockquote>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                  {PROOF.metrics.map((m,i) => (
                    <div key={i}>
                      <div className="text-[40px] font-bold text-brand-teal tracking-tight leading-none mb-2 text-glow">{m.value}</div>
                      <div className="text-[14px] text-white/45 font-light leading-snug">{m.label}</div>
                    </div>
                  ))}
                </div>
                <Separator className="bg-white/[0.07] mb-6"/>
                <p className="text-[14px] text-white/30 max-w-2xl leading-relaxed">{PROOF.source}</p>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </section>

      <Divider/>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6 lg:px-12 text-center relative overflow-hidden">
        <div className="bg-depth-subtle absolute inset-0 pointer-events-none" aria-hidden="true"/>
        <Reveal className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-title-xl text-white mb-5">
            Ready to see what autonomous QA looks like for your stack?
          </h2>
          <p className="text-body-xl text-white/55 font-light mb-10">
            Book a 30-minute discovery call. We map your environment and show you exactly what a bespoke implementation would involve.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Book a discovery call <ArrowRight size={16}/></Link>
          </Button>
        </Reveal>
      </section>
    </PageWrapper>
  )
}

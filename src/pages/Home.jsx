import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Wrench, Fingerprint, ShieldCheck, GitBranch,
         FileText, ListChecks, Code2, Play, BugOff, TicketCheck, BarChart3, FileCheck2 } from 'lucide-react'
import { motion } from 'framer-motion'
import PageWrapper from '@/components/ui/PageWrapper'
import ParticleCanvas from '@/components/ui/ParticleCanvas'
import Reveal from '@/components/ui/Reveal'
import NeuralNet from '@/components/ui/NeuralNet'
import { Divider } from '@/components/ui/Divider'
import { useCountUp } from '@/hooks/useCountUp'
import { useTypewriter } from '@/hooks/useTypewriter'
import { useInView } from '@/hooks/useInView'
import { PROOF, BESPOKE_PILLARS } from '@/lib/data'

const TYPED = [
  'built around your stack.',
  'calibrated to your domain.',
  'matched to your risk profile.',
  'engineered for your team.',
  'zero manual effort.',
]

const STATS = [
  { value: 8,   suffix: '',   label: 'Automated pipeline stages' },
  { value: 0,   suffix: '',   label: 'Manual touchpoints by default' },
  { value: 80,  suffix: '%+', label: 'Automation coverage achieved' },
  { value: 1,   suffix: '',   label: 'Sprint to first autonomous run', isOne: true },
]

const PIPELINE = [
  { Icon: FileText,   label: 'Requirements',  sub: 'Your project tool' },
  { Icon: ListChecks, label: 'Test Cases',     sub: 'Claude AI' },
  { Icon: Code2,      label: 'Automation',    sub: 'Your framework' },
  { Icon: Play,       label: 'Execution',     sub: 'Your CI/CD' },
  { Icon: BugOff,     label: 'Triage',        sub: 'Claude AI' },
  { Icon: TicketCheck,label: 'Issue Logging', sub: 'Your issue tracker' },
  { Icon: BarChart3,  label: 'Reporting',     sub: 'Your TM platform' },
  { Icon: FileCheck2, label: 'Sign-off',      sub: 'Auto-delivered' },
]

const PILLAR_ICONS = [Wrench, Fingerprint, ShieldCheck, GitBranch]

function StatCard({ value, suffix, label, index, isOne }) {
  const [ref, inView] = useInView()
  const count = useCountUp(value, 1400, inView)
  return (
    <Reveal delay={index * 0.07}>
      <div ref={ref} className="card card-interactive p-6 text-center">
        <div className="text-4xl font-bold text-teal tracking-tight mb-2 text-glow">
          {isOne ? `${count} sprint` : `${count}${suffix}`}
        </div>
        <div className="text-body-md text-mist">{label}</div>
      </div>
    </Reveal>
  )
}

export default function Home() {
  const typed = useTypewriter(TYPED, { speed:55, pause:2400, deleteSpeed:28 })

  return (
    <PageWrapper>
      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-12 pt-20 pb-16 overflow-hidden">
        <ParticleCanvas />
        <div className="bg-depth absolute inset-0 pointer-events-none" aria-hidden="true"/>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-[1fr_520px] gap-16 items-center">

            {/* Copy */}
            <div>
              <motion.div
                initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
                className="inline-flex items-center gap-2 border border-teal/20 rounded-full px-4 py-1.5 mb-8 bg-teal/5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-slow" aria-hidden="true"/>
                <span className="text-label text-teal">Running live in enterprise production</span>
              </motion.div>

              <motion.h1 initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:0.65,delay:0.1}}
                className="text-hero text-snow mb-3">
                Autonomous QA,
              </motion.h1>

              <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:0.65,delay:0.2}}
                className="text-hero mb-7" style={{minHeight:'1.1em'}}>
                <span className="gradient-text">{typed}</span>
                <span className="inline-block w-0.5 bg-teal ml-1 align-middle animate-pulse-slow" style={{height:'0.85em'}} aria-hidden="true"/>
              </motion.div>

              <motion.p initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.35}}
                className="text-body-xl text-mist font-light max-w-lg leading-relaxed mb-3">
                A fully autonomous AI QA pipeline — from requirements intake to signed-off report — engineered specifically for your tools, your team, and your compliance requirements.
              </motion.p>

              <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5,delay:0.5}}
                className="text-body-md text-fog mb-10 flex items-center gap-2">
                <span className="w-5 h-px bg-teal/40 flex-shrink-0"/>
                No standard product. Every pipeline is designed from scratch for each client.
              </motion.p>

              <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.58}}
                className="flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">
                  Start a conversation <ArrowRight size={16}/>
                </Link>
                <Link to="/pipeline" className="btn-secondary">
                  Explore the pipeline <ChevronRight size={16}/>
                </Link>
              </motion.div>
            </div>

            {/* Neural network */}
            <motion.div
              initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{duration:0.9,delay:0.3}}
              className="hidden lg:block relative"
            >
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-2xl"
                style={{background:'radial-gradient(ellipse at center, rgba(34,211,195,0.07) 0%, transparent 70%)'}}
                aria-hidden="true"/>
              <NeuralNet className="relative z-10 h-[460px]"/>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.75}}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
            {STATS.map((s,i) => <StatCard key={i} {...s} index={i}/>)}
          </motion.div>
        </div>
      </section>

      <div className="divider-glow"/>

      {/* ─── PIPELINE STRIP ────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <Reveal>
          <div className="eyebrow">What Testwise automates</div>
          <h2 className="text-title-xl text-snow mb-4 max-w-2xl">
            Every stage of QA. End to end. Autonomously.
          </h2>
          <p className="text-body-xl text-mist font-light max-w-xl mb-14">
            From the moment a requirement appears in your project management tool to the moment a sign-off report reaches your stakeholders — no human intervention required, unless you configure one.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
            {/* Beam sweep — subtle, on the top edge only */}
            <div className="absolute top-0 left-0 right-0 h-px overflow-hidden pointer-events-none" aria-hidden="true">
              <div className="absolute h-full w-24 animate-beam"
                style={{background:'linear-gradient(90deg,transparent,rgba(34,211,195,0.6),transparent)'}}/>
            </div>

            <div className="flex overflow-x-auto scrollbar-hide">
              {PIPELINE.map(({ Icon, label, sub }, i) => (
                <div key={i} className="flex items-center flex-shrink-0">
                  <div className="group flex flex-col items-center px-7 py-10 transition-colors duration-200 hover:bg-teal/5">
                    <div className="w-12 h-12 rounded-xl bg-raised border border-border flex items-center justify-center mb-4
                      group-hover:border-teal/30 group-hover:shadow-glow-teal transition-all duration-300">
                      <Icon size={20} className="text-teal/60 group-hover:text-teal transition-colors duration-200"/>
                    </div>
                    <span className="text-[13px] font-semibold text-snow whitespace-nowrap mb-1">{label}</span>
                    <span className="text-[11px] text-fog whitespace-nowrap">{sub}</span>
                  </div>
                  {i < PIPELINE.length - 1 && (
                    <div className="flex-shrink-0 flex items-center gap-0.5 opacity-30">
                      <div className="w-4 h-px bg-teal"/>
                      <div className="w-1 h-1 rounded-full bg-teal"/>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-border px-7 py-4 flex items-center justify-between bg-base/30">
              <span className="text-body-md text-fog">All stages run in sequence — configurable human gates at any point.</span>
              <Link to="/pipeline" className="btn-ghost text-[14px]">
                Configure gates <ArrowRight size={13}/>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Divider />

      {/* ─── BESPOKE PILLARS ───────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <Reveal>
          <div className="eyebrow">The Testwise approach</div>
          <h2 className="text-title-xl text-snow mb-4 max-w-xl">Every pipeline is unique to its client.</h2>
          <p className="text-body-xl text-mist font-light max-w-lg mb-14">
            There is no off-the-shelf product. Every Testwise engagement is designed from discovery — built around your stack, your team, and your processes.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BESPOKE_PILLARS.map((p, i) => {
            const PillarIcon = PILLAR_ICONS[i]
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card-accent p-7 h-full flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-teal/10 border border-teal/15 flex items-center justify-center mb-5">
                    <PillarIcon size={19} className="text-teal"/>
                  </div>
                  <h3 className="text-title-md text-snow mb-3">{p.title}</h3>
                  <p className="text-body-lg text-mist leading-relaxed flex-1">{p.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <Divider />

      {/* ─── PROOF ─────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <Reveal>
          <div className="relative card overflow-hidden p-12 md:p-16">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
              style={{background:'radial-gradient(circle,rgba(34,211,195,0.07) 0%,transparent 65%)',transform:'translate(30%,-30%)'}}
              aria-hidden="true"/>
            <div className="relative z-10">
              <div className="eyebrow mb-6">Production evidence</div>
              <blockquote className="text-title-lg text-snow mb-12 max-w-3xl leading-snug">
                "{PROOF.quote}"
              </blockquote>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                {PROOF.metrics.map((m,i) => (
                  <div key={i}>
                    <div className="text-4xl font-bold text-teal tracking-tight mb-2 text-glow">{m.value}</div>
                    <div className="text-body-md text-mist">{m.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-body-md text-fog border-t border-border pt-6 max-w-2xl leading-relaxed">
                {PROOF.source}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <Divider />

      {/* ─── CTA ───────────────────────────────────────────── */}
      <section className="py-28 px-6 lg:px-12 text-center relative overflow-hidden">
        <div className="bg-depth-subtle absolute inset-0 pointer-events-none" aria-hidden="true"/>
        <Reveal className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-title-xl text-snow mb-5">
            Ready to see what autonomous QA looks like for your stack?
          </h2>
          <p className="text-body-xl text-mist font-light mb-10">
            Book a 30-minute discovery call. We map your environment and show you exactly what a bespoke implementation would involve — no obligation.
          </p>
          <Link to="/contact" className="btn-primary inline-flex">
            Book a discovery call <ArrowRight size={16}/>
          </Link>
        </Reveal>
      </section>
    </PageWrapper>
  )
}

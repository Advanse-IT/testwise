import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Zap, Shield, GitBranch, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'
import PageWrapper from '@/components/ui/PageWrapper'
import ParticleCanvas from '@/components/ui/ParticleCanvas'
import Reveal from '@/components/ui/Reveal'
import AIOrb from '@/components/ui/AIOrb'
import { Divider } from '@/components/ui/Divider'
import { useCountUp } from '@/hooks/useCountUp'
import { useTypewriter } from '@/hooks/useTypewriter'
import { useInView } from '@/hooks/useInView'
import { STATS, PROOF, BESPOKE_PILLARS } from '@/lib/data'

const TYPED_PHRASES = [
  'built around your stack.',
  'calibrated to your domain.',
  'matched to your risk profile.',
  'engineered for your team.',
  'zero manual effort.',
]

const PIPELINE_MINI = [
  { icon: '📋', label: 'Requirements' },
  { icon: '✅', label: 'Test Cases' },
  { icon: '⚙️', label: 'Automation' },
  { icon: '▶', label: 'Execution' },
  { icon: '🔍', label: 'Triage' },
  { icon: '📊', label: 'Reporting' },
  { icon: '🔏', label: 'Sign-off' },
]

function StatCard({ value, suffix, label, index }) {
  const [ref, inView] = useInView()
  const count = useCountUp(typeof value === 'number' ? value : 0, 1400, inView)
  return (
    <Reveal delay={index * 0.07}>
      <div ref={ref} className="card p-5 text-center relative overflow-hidden card-hover">
        <div className="grid-watermark opacity-60" aria-hidden="true"/>
        <div className="relative z-10">
          <div className="text-3xl font-bold text-teal-bright tracking-tight mb-1.5 text-shadow-glow">
            {typeof value === 'number' ? `${count}${suffix}` : value}
          </div>
          <div className="text-[12px] text-mist leading-snug">{label}</div>
        </div>
      </div>
    </Reveal>
  )
}

export default function Home() {
  const typed = useTypewriter(TYPED_PHRASES, { speed: 55, pause: 2200, deleteSpeed: 30 })

  return (
    <PageWrapper>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 lg:px-10 pt-24 pb-20 overflow-hidden">
        <ParticleCanvas />
        <div className="hero-mesh" aria-hidden="true"/>
        <div className="grid-watermark" aria-hidden="true"/>
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent animate-scan pointer-events-none" aria-hidden="true"/>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <div>
              <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
                className="inline-flex items-center gap-2 border border-teal/25 rounded-full px-4 py-1.5 mb-7 bg-teal/5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-bright animate-pulse-dot" aria-hidden="true"/>
                <span className="text-[11px] font-semibold text-teal-bright tracking-widest uppercase">Live in enterprise production</span>
              </motion.div>

              <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.1}}
                className="text-display-xl text-snow mb-2 leading-[1.02]">
                Autonomous QA,
              </motion.h1>

              <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.2}}
                className="text-display-xl mb-6 leading-[1.02] min-h-[1.1em]">
                <span className="gradient-text">{typed}</span>
                <span className="cursor" aria-hidden="true"/>
              </motion.div>

              <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.35}}
                className="text-body-lg text-mist font-light max-w-lg leading-relaxed mb-3">
                Testwise is a fully autonomous AI QA pipeline — from requirements intake to signed-off report — engineered specifically for your tools, your team, and your compliance requirements.
              </motion.p>

              <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5,delay:0.5}}
                className="text-[13px] text-fog mb-9 flex items-center gap-1.5">
                <span className="w-4 h-px bg-teal/40 inline-block"/>
                No standard product. Every pipeline is built from scratch for each client.
              </motion.p>

              <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.55}}
                className="flex flex-wrap items-center gap-3">
                <Link to="/contact" className="btn-primary">Start a conversation <ArrowRight size={15}/></Link>
                <Link to="/pipeline" className="btn-secondary">See the pipeline <ChevronRight size={15}/></Link>
              </motion.div>
            </div>

            {/* Orb */}
            <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{duration:0.8,delay:0.3}}
              className="hidden lg:flex items-center justify-center relative h-80">
              <AIOrb className="w-72 h-72"/>
              <div className="absolute top-0 right-0 animate-float-slow">
                <div className="card px-4 py-3 text-[12px] font-medium border-teal/20 shadow-card-lg whitespace-nowrap">
                  <span className="text-teal-bright font-bold">8</span> stages automated
                </div>
              </div>
              <div className="absolute bottom-4 left-0 animate-float-med">
                <div className="card px-4 py-3 text-[12px] font-medium border-teal/20 shadow-card-lg whitespace-nowrap">
                  <span className="text-teal-bright font-bold">0</span> manual touchpoints
                </div>
              </div>
              <div className="absolute top-12 left-4 animate-float-slow" style={{animationDelay:'-2s'}}>
                <div className="card px-4 py-3 text-[12px] font-medium border-teal/20 shadow-card-lg whitespace-nowrap">
                  <span className="text-teal-bright font-bold">80%+</span> coverage achieved
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.7}}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-14">
            {STATS.map((s,i) => <StatCard key={i} {...s} index={i}/>)}
          </motion.div>
        </div>
      </section>

      <div className="divider-glow"/>

      {/* PIPELINE EXPLAINER */}
      <section className="py-20 px-6 lg:px-10 max-w-6xl mx-auto">
        <Reveal>
          <div className="eyebrow">What Testwise automates</div>
          <h2 className="text-display-lg text-snow mb-4 max-w-2xl">Every stage of QA. End to end. Autonomously.</h2>
          <p className="text-body-lg text-mist font-light max-w-xl mb-12">
            From the moment a requirement lands in your project management tool to the moment a sign-off report reaches your stakeholders — with no human in between, unless you want one.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative overflow-hidden rounded-xl border border-border bg-surface">
          <div className="grid-watermark" aria-hidden="true"/>
          <div className="absolute top-0 bottom-0 w-20 pointer-events-none z-10 animate-beam"
            style={{background:'linear-gradient(90deg,transparent,rgba(34,186,178,0.12),transparent)'}} aria-hidden="true"/>
          <div className="relative z-5 flex items-stretch overflow-x-auto scrollbar-hide">
            {PIPELINE_MINI.map((stage,i) => (
              <div key={i} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center px-6 py-8 group">
                  <div className="w-11 h-11 rounded-xl bg-raised border border-border flex items-center justify-center mb-3 text-lg group-hover:border-teal/30 transition-colors">
                    {stage.icon}
                  </div>
                  <span className="text-[11px] font-medium text-mist whitespace-nowrap">{stage.label}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-teal/40 mt-2"/>
                </div>
                {i < PIPELINE_MINI.length - 1 && (
                  <div className="flex-shrink-0 flex items-center">
                    <div className="w-6 h-px bg-teal/20"/>
                    <div className="w-1 h-1 rounded-full bg-teal/30"/>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="border-t border-border px-6 py-4 flex items-center justify-between">
            <span className="text-[12px] text-fog">All stages connected. All stages configurable.</span>
            <Link to="/pipeline" className="btn-ghost text-[12px]">Explore the pipeline <ArrowRight size={12}/></Link>
          </div>
        </Reveal>
      </section>

      <Divider />

      {/* BESPOKE PILLARS */}
      <section className="py-20 px-6 lg:px-10 max-w-6xl mx-auto">
        <Reveal>
          <div className="eyebrow">The Testwise approach</div>
          <h2 className="text-display-lg text-snow mb-4 max-w-xl">Every pipeline is unique to its client.</h2>
          <p className="text-body-lg text-mist font-light max-w-lg mb-12">
            There is no standard product to install. Testwise is architected from discovery, built around your environment, and calibrated to how your team works.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BESPOKE_PILLARS.map((p,i) => (
            <Reveal key={i} delay={i*0.08}>
              <div className="card card-hover p-6 relative overflow-hidden h-full flex flex-col group">
                <div className="grid-watermark opacity-40" aria-hidden="true"/>
                <div className="relative z-10 flex flex-col flex-1">
                  <div className="w-10 h-10 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center mb-4">
                    {i===0 && <Zap size={17} className="text-teal-bright"/>}
                    {i===1 && <BarChart3 size={17} className="text-teal-bright"/>}
                    {i===2 && <Shield size={17} className="text-teal-bright"/>}
                    {i===3 && <GitBranch size={17} className="text-teal-bright"/>}
                  </div>
                  <h3 className="text-[15px] font-semibold text-snow mb-2 tracking-tight">{p.title}</h3>
                  <p className="text-[13px] text-mist leading-relaxed flex-1">{p.body}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal/0 via-teal/40 to-teal/0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"/>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Divider />

      {/* PROOF */}
      <section className="py-20 px-6 lg:px-10 max-w-6xl mx-auto">
        <Reveal className="relative card overflow-hidden p-10 md:p-14">
          <div className="grid-watermark" aria-hidden="true"/>
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            style={{background:'radial-gradient(circle,rgba(34,186,178,0.08) 0%,transparent 65%)'}} aria-hidden="true"/>
          <div className="relative z-10">
            <div className="eyebrow mb-6">Production evidence</div>
            <blockquote className="text-display-md text-snow mb-10 max-w-3xl leading-snug">"{PROOF.quote}"</blockquote>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {PROOF.metrics.map((m,i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-teal-bright tracking-tight mb-1 text-shadow-glow">{m.value}</div>
                  <div className="text-[12px] text-mist">{m.label}</div>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-fog border-t border-border pt-5 max-w-2xl leading-relaxed italic">{PROOF.source}</p>
          </div>
        </Reveal>
      </section>

      <Divider />

      {/* CTA */}
      <section className="py-24 px-6 lg:px-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{background:'radial-gradient(ellipse 55% 65% at 50% 50%,rgba(34,186,178,0.07) 0%,transparent 65%)'}} aria-hidden="true"/>
        <Reveal className="relative z-10 max-w-xl mx-auto">
          <h2 className="text-display-lg text-snow mb-4">Ready to see what autonomous QA looks like for your stack?</h2>
          <p className="text-body-lg text-mist font-light mb-8">Book a 30-minute discovery call. We map your environment and show you exactly what a bespoke implementation would involve.</p>
          <Link to="/contact" className="btn-primary inline-flex">Book a discovery call <ArrowRight size={15}/></Link>
        </Reveal>
      </section>
    </PageWrapper>
  )
}

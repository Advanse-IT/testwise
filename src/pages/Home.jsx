import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import PageWrapper from '@/components/ui/PageWrapper'
import ParticleCanvas from '@/components/ui/ParticleCanvas'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'
import { Divider } from '@/components/ui/Divider'
import { useCountUp } from '@/hooks/useCountUp'
import { useInView } from '@/hooks/useInView'
import { SITE, STATS, PROOF, BESPOKE_PILLARS } from '@/lib/data'

function StatCard({ value, suffix, label, index }) {
  const [ref, inView] = useInView()
  const count = useCountUp(typeof value === 'number' ? value : 0, 1200, inView)
  return (
    <Reveal delay={index * 0.08} className="card p-6 text-center">
      <div ref={ref} className="text-3xl font-bold text-teal-bright tracking-tight mb-1.5">
        {typeof value === 'number' ? `${count}${suffix}` : value}
      </div>
      <div className="text-[12px] text-mist leading-snug">{label}</div>
    </Reveal>
  )
}

export default function Home() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 lg:px-10 pt-24 pb-20 overflow-hidden text-center">
        <ParticleCanvas />
        <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse 70% 55% at 50% 0%,rgba(28,140,120,0.09) 0%,transparent 65%)'}} aria-hidden="true"/>
        <div className="grid-watermark opacity-60" aria-hidden="true"/>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-teal/30 rounded-full px-4 py-1.5 mb-8 bg-teal-glow">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-bright animate-pulse-dot"/>
            <span className="text-[11px] font-medium text-teal-bright tracking-wide uppercase">Running in enterprise production</span>
          </div>

          <h1 className="text-display-xl text-snow mb-6 max-w-3xl mx-auto">
            Autonomous QA,<br/>
            <span className="gradient-text">built around your stack.</span>
          </h1>

          <p className="text-body-lg text-mist font-light max-w-2xl mx-auto mb-3 leading-relaxed">
            Testwise is an end-to-end autonomous QA pipeline — from requirements intake to signed-off test report — engineered specifically for your tools, your team, and your compliance requirements.
          </p>
          <p className="text-[13px] text-fog mb-10">
            No standard product. Every engagement is designed from scratch.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <Link to="/contact" className="btn-primary">
              Start a conversation <ArrowRight size={15}/>
            </Link>
            <Link to="/pipeline" className="btn-secondary">
              See the pipeline <ChevronRight size={15}/>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {STATS.map((s, i) => <StatCard key={i} {...s} index={i}/>)}
          </div>
        </motion.div>
      </section>

      <Divider glow />

      {/* Bespoke pillars */}
      <section className="py-24 px-6 lg:px-10 max-w-6xl mx-auto">
        <Reveal>
          <div className="eyebrow">The Testwise approach</div>
          <h2 className="text-display-lg text-snow mb-4 max-w-xl">Every pipeline is unique to its client.</h2>
          <p className="text-body-lg text-mist font-light max-w-lg mb-14">
            There is no standard installation. Testwise is architected from discovery, built around your environment, and calibrated to how your team works.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BESPOKE_PILLARS.map((p, i) => (
            <Reveal key={i} delay={i * 0.09} className="card card-hover p-6 relative overflow-hidden">
              <div className="grid-watermark opacity-50" aria-hidden="true"/>
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-teal-dim border border-teal/20 flex items-center justify-center mb-4">
                  <Icon name={p.icon} size={17} className="text-teal-bright"/>
                </div>
                <h3 className="text-[15px] font-semibold text-snow mb-2 tracking-tight">{p.title}</h3>
                <p className="text-[13px] text-mist leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Divider />

      {/* Proof strip */}
      <section className="py-24 px-6 lg:px-10 max-w-6xl mx-auto">
        <Reveal className="relative card overflow-hidden p-10 md:p-14">
          <div className="grid-watermark" aria-hidden="true"/>
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(28,140,120,0.07) 0%,transparent 70%)'}} aria-hidden="true"/>

          <div className="relative z-10">
            <div className="eyebrow mb-5">Production proof</div>
            <blockquote className="text-display-md text-snow mb-10 max-w-3xl leading-snug">
              "{PROOF.quote}"
            </blockquote>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {PROOF.metrics.map((m, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-teal-bright tracking-tight mb-1">{m.value}</div>
                  <div className="text-[12px] text-mist">{m.label}</div>
                </div>
              ))}
            </div>

            <p className="text-[12px] text-fog border-t border-border pt-5 max-w-2xl leading-relaxed">{PROOF.source}</p>
          </div>
        </Reveal>
      </section>

      <Divider />

      {/* CTA band */}
      <section className="py-24 px-6 lg:px-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse 60% 70% at 50% 50%,rgba(28,140,120,0.06) 0%,transparent 65%)'}} aria-hidden="true"/>
        <Reveal className="relative z-10 max-w-xl mx-auto">
          <h2 className="text-display-lg text-snow mb-4">Ready to see what autonomous QA looks like for your stack?</h2>
          <p className="text-body-lg text-mist font-light mb-8">Book a 30-minute discovery call. We map your environment and show you exactly what a bespoke implementation would involve.</p>
          <Link to="/contact" className="btn-primary inline-flex">
            Book a discovery call <ArrowRight size={15}/>
          </Link>
        </Reveal>
      </section>
    </PageWrapper>
  )
}

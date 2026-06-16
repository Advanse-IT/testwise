import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Lock, Unlock, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '@/components/ui/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'
import { Divider } from '@/components/ui/Divider'
import { STAGES, GATE_MODES } from '@/lib/data'

function GateStage({ stage, isGated, onToggle, index }) {
  const [hover, setHover] = useState(false)
  return (
    <Reveal delay={index * 0.05}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`w-full text-left rounded-xl border p-4 transition-all duration-200 relative overflow-hidden group ${
          isGated
            ? 'border-amber/30 bg-amber-dim'
            : 'border-border bg-surface hover:border-teal/25 hover:bg-teal-glow'
        }`}
        aria-pressed={isGated}
        aria-label={`${stage.name} — ${isGated ? 'human gate active, click to remove' : 'automated, click to add gate'}`}
      >
        <div className="grid-watermark opacity-40" aria-hidden="true"/>
        <div className="relative z-10">
          {/* Stage number + gate indicator */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold tracking-widest text-fog uppercase">Stage {stage.id.toString().padStart(2,'0')}</span>
            <div className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border transition-all ${
              isGated ? 'border-amber/40 text-amber bg-amber-dim' : 'border-border text-fog'
            }`}>
              {isGated ? <><Lock size={9}/> Gate active</> : <><Unlock size={9}/> Automated</>}
            </div>
          </div>

          {/* Icon + name */}
          <div className="flex items-start gap-3">
            <div className={`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center border transition-all ${
              isGated ? 'border-amber/30 bg-amber-dim text-amber' : 'border-border bg-raised text-teal-bright'
            }`}>
              <Icon name={stage.icon} size={15}/>
            </div>
            <div>
              <div className="text-[13px] font-semibold text-snow mb-0.5 leading-tight">{stage.name}</div>
              <div className="text-[11px] text-fog">{stage.tool}</div>
            </div>
          </div>

          {/* Description on hover */}
          <AnimatePresence>
            {hover && (
              <motion.p
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="text-[12px] text-mist leading-relaxed overflow-hidden"
              >
                {stage.desc}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </button>
    </Reveal>
  )
}

export default function Pipeline() {
  const [activeMode, setActiveMode] = useState('full')
  const [gates, setGates] = useState([])

  function applyMode(key) {
    setActiveMode(key)
    setGates([...GATE_MODES[key].gates])
  }

  function toggleGate(stageId) {
    setActiveMode(null)
    setGates(prev =>
      prev.includes(stageId) ? prev.filter(g => g !== stageId) : [...prev, stageId]
    )
  }

  const gateCount = gates.length
  const autoCount = STAGES.length - gateCount
  const autoPct   = Math.round((autoCount / STAGES.length) * 100)
  const activeDesc = activeMode ? GATE_MODES[activeMode].desc : `Custom — ${gateCount} gate${gateCount !== 1 ? 's' : ''} active.`

  return (
    <PageWrapper>
      {/* Page hero */}
      <section className="pt-32 pb-16 px-6 lg:px-10 max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="The pipeline"
          title="Eight stages. Fully autonomous."
          body="Every stage can be configured with a human approval gate — active or inactive — giving your team complete control over how much autonomy the AI operates with at each point in the QA cycle."
        />
      </section>

      <Divider />

      {/* Interactive configurator */}
      <section className="py-16 px-6 lg:px-10 max-w-6xl mx-auto">
        <Reveal className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[13px] font-medium text-snow mb-1">Preset configurations</p>
              <p className="text-[12px] text-mist">Select a preset or click any stage to toggle its gate individually</p>
            </div>
            {/* Stats */}
            <div className="flex items-center gap-5 text-[12px]">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-bright"/><span className="text-mist">{autoCount} automated</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber"/><span className="text-mist">{gateCount} gate{gateCount !== 1 ? 's' : ''}</span></div>
              <div className="font-semibold text-teal-bright">{autoPct}% autonomous</div>
            </div>
          </div>
        </Reveal>

        {/* Mode pills */}
        <Reveal delay={0.05} className="flex flex-wrap gap-2 mb-6">
          {Object.entries(GATE_MODES).map(([key, mode]) => (
            <button
              key={key}
              onClick={() => applyMode(key)}
              className={`text-[12px] font-medium px-4 py-2 rounded-full border transition-all duration-150 ${
                activeMode === key
                  ? 'border-teal/40 bg-teal-dim text-teal-bright'
                  : 'border-border text-mist hover:border-teal/25 hover:text-snow'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </Reveal>

        {/* Mode description */}
        <Reveal delay={0.08}>
          <div className="flex items-start gap-2 mb-8 p-3 rounded-lg bg-surface border border-border">
            <Info size={13} className="text-teal-bright mt-0.5 flex-shrink-0"/>
            <p className="text-[12px] text-mist leading-relaxed">{activeDesc}</p>
          </div>
        </Reveal>

        {/* Pipeline grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {STAGES.map((stage, i) => (
            <GateStage
              key={stage.id}
              stage={stage}
              index={i}
              isGated={gates.includes(stage.id)}
              onToggle={() => toggleGate(stage.id)}
            />
          ))}
        </div>

        {/* Legend */}
        <Reveal className="flex flex-wrap gap-5 text-[12px] text-fog mt-4">
          <span className="flex items-center gap-1.5"><Unlock size={11}/> Teal = automated, no human required</span>
          <span className="flex items-center gap-1.5"><Lock size={11} className="text-amber"/><span className="text-amber">Amber = human approval gate active</span></span>
          <span>Hover any stage for detail · Click to toggle gate</span>
        </Reveal>
      </section>

      <Divider />

      {/* Tool compatibility note */}
      <section className="py-16 px-6 lg:px-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Reveal>
            <div className="eyebrow">Tool compatibility</div>
            <h2 className="text-display-md text-snow mb-4">Works with your existing stack — not ours.</h2>
            <p className="text-body-md text-mist font-light leading-relaxed mb-4">
              Testwise does not mandate new tools. The pipeline integrates with whatever you already run — your project management platform, your CI/CD system, your issue tracker, and your test management platform.
            </p>
            <p className="text-body-md text-mist font-light leading-relaxed">
              During discovery, we map your full environment and build the integrations accordingly. If you run Xray, Zephyr, TestRail, qTest, Azure Test Plans, or a bespoke internal platform — the pipeline connects to it.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Project management', examples: 'JIRA · Linear · Azure DevOps · GitHub Issues' },
                { label: 'CI/CD',              examples: 'GitHub Actions · Azure Pipelines · Jenkins · Bamboo' },
                { label: 'Issue tracking',     examples: 'JIRA · Linear · GitHub · ServiceNow' },
                { label: 'Test management',    examples: 'Xray · Zephyr · TestRail · qTest · Azure Test Plans · any platform' },
              ].map((item, i) => (
                <div key={i} className="card p-4">
                  <div className="text-[11px] font-semibold text-teal-bright mb-2 tracking-wide uppercase">{item.label}</div>
                  <div className="text-[12px] text-mist leading-relaxed">{item.examples}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      <section className="py-16 px-6 lg:px-10 text-center max-w-lg mx-auto">
        <Reveal>
          <h2 className="text-display-md text-snow mb-4">Want to see how this maps to your stack?</h2>
          <p className="text-body-md text-mist font-light mb-6">We walk through your environment in the first call and show you exactly what the pipeline would look like.</p>
          <Link to="/contact" className="btn-primary inline-flex">Book a discovery call <ArrowRight size={15}/></Link>
        </Reveal>
      </section>
    </PageWrapper>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Lock, Unlock, Info,
         FileText, ListChecks, Code2, Play, BugOff, TicketCheck, BarChart3, FileCheck2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/shadcn/button'
import { Badge } from '@/components/shadcn/badge'
import { Card, CardContent } from '@/components/shadcn/card'
import { Separator } from '@/components/shadcn/separator'
import PageWrapper from '@/components/ui/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { Divider } from '@/components/ui/Divider'
import { usePageMeta } from '@/hooks/usePageMeta'
import { GATE_MODES } from '@/lib/data'
import { cn } from '@/lib/utils'

const STAGE_ICONS = [FileText, ListChecks, Code2, Play, BugOff, TicketCheck, BarChart3, FileCheck2]
const STAGES = [
  { id:1, name:'Requirement Analysis', tool:'Your project management tool',
    desc:'Reads sprint stories and acceptance criteria. Maps test scope, identifies gaps, and flags ambiguities before a single test is written.' },
  { id:2, name:'Test Case Generation',  tool:'Claude AI',
    desc:'Generates structured test cases covering happy paths, edge cases, negative scenarios, and boundary conditions — calibrated to your domain.' },
  { id:3, name:'Test Automation',       tool:'Your test framework',
    desc:'Writes executable automation scripts in your chosen framework and language. No new tooling imposed — works with what your team already uses.' },
  { id:4, name:'Test Execution',        tool:'Your CI/CD pipeline',
    desc:'Triggers and manages the full test run inside your existing CI/CD infrastructure. Captures results, screenshots, and trace logs across all environments.' },
  { id:5, name:'Defect Triage',         tool:'Claude AI',
    desc:'Analyses every failure. Classifies defects by severity and root cause. Links each issue directly to the originating requirement.' },
  { id:6, name:'Issue Logging',         tool:'Your issue tracker',
    desc:'Creates fully-formed defect tickets — populated with steps to reproduce, severity, screenshots, environment details, and build references.' },
  { id:7, name:'Test Reporting',        tool:'Your test management platform',
    desc:'Syncs results to your existing test management platform of choice: Xray, Zephyr, TestRail, qTest, Azure Test Plans, or any other.' },
  { id:8, name:'Sign-off & Delivery',   tool:'Auto-delivered',
    desc:'Generates an auditable test summary adapted to your reporting standards and delivers it to the right stakeholders. Sprint QA closed.' },
]

const COMPAT = [
  { label:'Project management',  examples:'JIRA · Linear · Azure DevOps · GitHub Issues · Shortcut' },
  { label:'CI/CD',               examples:'GitHub Actions · Azure Pipelines · Jenkins · Bamboo · CircleCI' },
  { label:'Issue tracking',      examples:'JIRA · Linear · GitHub · ServiceNow · Azure DevOps' },
  { label:'Test management',     examples:'Xray · Zephyr · TestRail · qTest · Azure Test Plans — or your own platform' },
  { label:'Test frameworks',     examples:'Playwright · Selenium · Cypress · RestAssured · Pytest — any framework' },
]

function StageCard({ stage, StageIcon, isGated, onToggle, index }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <Reveal delay={index * 0.04}>
      <Card className={cn(
        'overflow-hidden transition-all duration-250',
        isGated ? 'border-brand-amber/25 bg-brand-amber/[0.04]' : 'border-white/[0.07] hover:border-brand-teal/20'
      )}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="text-[10px] font-semibold tracking-[0.14em] text-white/25 uppercase">
              Stage {String(stage.id).padStart(2,'0')}
            </div>
            <button
              onClick={() => onToggle(stage.id)}
              className={cn(
                'flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all',
                isGated
                  ? 'border-brand-amber/35 text-brand-amber bg-brand-amber/10 hover:bg-brand-amber/15'
                  : 'border-white/[0.08] text-white/30 hover:border-brand-teal/30 hover:text-brand-teal'
              )}
              aria-pressed={isGated}
              aria-label={`${stage.name}: ${isGated ? 'gate active' : 'automated'}`}
            >
              {isGated ? <><Lock size={9}/> Gate on</> : <><Unlock size={9}/> Auto</>}
            </button>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className={cn(
              'w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center border transition-colors',
              isGated
                ? 'border-brand-amber/25 bg-brand-amber/10 text-brand-amber'
                : 'border-white/[0.08] bg-white/[0.03] text-brand-teal'
            )}>
              <StageIcon size={15}/>
            </div>
            <div>
              <div className="text-[14px] font-semibold text-white leading-tight">{stage.name}</div>
              <div className="text-[11px] text-white/30 mt-0.5">{stage.tool}</div>
            </div>
          </div>

          <button
            onClick={() => setExpanded(v => !v)}
            className="text-[12px] text-white/30 hover:text-brand-teal transition-colors"
          >
            {expanded ? 'Less detail ↑' : 'What happens here ↓'}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.p
                initial={{ height:0, opacity:0, marginTop:0 }}
                animate={{ height:'auto', opacity:1, marginTop:10 }}
                exit={{ height:0, opacity:0, marginTop:0 }}
                className="text-[13px] text-white/45 leading-relaxed overflow-hidden font-light"
              >
                {stage.desc}
              </motion.p>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </Reveal>
  )
}

export default function Pipeline() {
  usePageMeta({
    title: 'The Pipeline',
    description: 'Explore the Testwise 8-stage autonomous QA pipeline. Configure human approval gates per stage to match your risk profile.',
    canonical: '/pipeline',
  })

  const [activeMode, setActiveMode] = useState('full')
  const [gates, setGates]           = useState([])

  function applyMode(key) { setActiveMode(key); setGates([...GATE_MODES[key].gates]) }
  function toggleGate(id) {
    setActiveMode(null)
    setGates(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id])
  }

  const gateCount = gates.length
  const autoPct   = Math.round(((8 - gateCount) / 8) * 100)

  return (
    <PageWrapper>
      <section className="pt-32 pb-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="The pipeline"
          title="Eight stages. Fully autonomous."
          body="Every stage can carry a human approval gate — active or off. Click any stage card to expand detail, toggle its gate, or choose a preset configuration."
        />
      </section>

      <div className="tw-divider-glow"/>

      <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Controls */}
        <Reveal className="flex flex-wrap items-center justify-between gap-5 mb-6">
          <div className="flex flex-wrap gap-2">
            {Object.entries(GATE_MODES).map(([key, mode]) => (
              <button key={key} onClick={() => applyMode(key)}
                className={cn(
                  'text-[13px] font-medium px-4 py-2 rounded-full border transition-all duration-150',
                  activeMode === key
                    ? 'border-brand-teal/40 bg-brand-teal/10 text-brand-teal'
                    : 'border-white/[0.08] text-white/45 hover:border-brand-teal/25 hover:text-white/80'
                )}
              >
                {mode.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-5 text-[14px]">
            <span className="flex items-center gap-2 text-white/45">
              <span className="w-2 h-2 rounded-full bg-brand-teal"/>
              {8 - gateCount} automated
            </span>
            <span className="flex items-center gap-2 text-white/45">
              <span className="w-2 h-2 rounded-full bg-brand-amber"/>
              {gateCount} gate{gateCount !== 1 ? 's' : ''}
            </span>
            <span className="font-semibold text-brand-teal">{autoPct}% autonomous</span>
          </div>
        </Reveal>

        {activeMode && (
          <Reveal className="mb-7">
            <Card className="border-white/[0.07]">
              <CardContent className="p-4 flex items-start gap-3">
                <Info size={14} className="text-brand-teal mt-0.5 flex-shrink-0"/>
                <p className="text-[14px] text-white/50 leading-relaxed">{GATE_MODES[activeMode].desc}</p>
              </CardContent>
            </Card>
          </Reveal>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STAGES.map((stage, i) => (
            <StageCard
              key={stage.id} stage={stage} index={i}
              StageIcon={STAGE_ICONS[i]}
              isGated={gates.includes(stage.id)}
              onToggle={toggleGate}
            />
          ))}
        </div>

        <Reveal className="mt-5 flex flex-wrap gap-6 text-[13px] text-white/25">
          <span className="flex items-center gap-1.5"><Unlock size={11}/> Teal = automated</span>
          <span className="flex items-center gap-1.5"><Lock size={11} className="text-brand-amber"/><span className="text-brand-amber">Amber = human gate active</span></span>
        </Reveal>
      </section>

      <Divider/>

      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div className="eyebrow-label">Tool compatibility</div>
            <h2 className="text-title-xl text-white mb-5">Works with your existing stack — not ours.</h2>
            <p className="text-body-xl text-white/55 font-light leading-relaxed mb-4">
              Testwise integrates with whatever you already run across every stage. Nothing is ripped out. No new platforms mandated.
            </p>
            <p className="text-[15px] text-white/45 font-light leading-relaxed">
              Stage 7 — test reporting — is a common question. We work with any test management platform your team uses. The examples shown are illustrative only. If you use a bespoke or internal system, we build the integration accordingly.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-3">
              {COMPAT.map((item, i) => (
                <Card key={i} className="border-white/[0.07]">
                  <CardContent className="p-5">
                    <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-brand-teal mb-2">{item.label}</div>
                    <div className="text-[14px] text-white/45 leading-relaxed">{item.examples}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Divider/>

      <section className="py-16 px-6 text-center max-w-xl mx-auto">
        <Reveal>
          <h2 className="text-title-lg text-white mb-4">Want to see how this maps to your stack?</h2>
          <p className="text-body-xl text-white/55 font-light mb-8">
            The first call is a discovery session. We walk through your environment and show you exactly what the pipeline would look like.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Book a discovery call <ArrowRight size={16}/></Link>
          </Button>
        </Reveal>
      </section>
    </PageWrapper>
  )
}

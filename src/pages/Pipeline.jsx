import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Lock, Unlock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ListChecks, Code2, Play, BugOff, TicketCheck, BarChart3, FileCheck2 } from 'lucide-react'
import PageWrapper from '@/components/ui/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { Divider } from '@/components/ui/Divider'
import { GATE_MODES } from '@/lib/data'
import { usePageMeta } from '@/hooks/usePageMeta'

const STAGE_ICONS = [FileText, ListChecks, Code2, Play, BugOff, TicketCheck, BarChart3, FileCheck2]

const STAGES = [
  { id:1, name:'Requirement Analysis', tool:'Your project management tool' },
  { id:2, name:'Test Case Generation', tool:'Claude AI' },
  { id:3, name:'Test Automation',      tool:'Your test framework' },
  { id:4, name:'Test Execution',       tool:'Your CI/CD pipeline' },
  { id:5, name:'Defect Triage',        tool:'Claude AI' },
  { id:6, name:'Issue Logging',        tool:'Your issue tracker' },
  { id:7, name:'Test Reporting',       tool:'Your test management platform' },
  { id:8, name:'Sign-off & Delivery',  tool:'Auto-delivered' },
]

const STAGE_DESC = [
  'Reads sprint stories and acceptance criteria from your existing project management platform. Maps test scope and flags ambiguities before a single test is written.',
  'Generates comprehensive test cases covering happy paths, edge cases, negative scenarios, and boundary conditions — calibrated to your domain and test conventions.',
  'Writes executable automation scripts in your chosen framework and language. No new tooling imposed. Works with what your team already uses.',
  'Triggers and manages the full test run inside your existing CI/CD infrastructure. Captures results, screenshots, and trace logs across all environments.',
  'Analyses every failure. Classifies defects by severity and root cause. Links each issue back to the originating requirement automatically.',
  'Creates fully-formed defect tickets in your issue tracker — populated with steps to reproduce, severity, screenshots, and build references.',
  'Syncs results to your existing test management platform of choice. Works with Xray, Zephyr, TestRail, qTest, Azure Test Plans, or any other platform.',
  'Generates a clear, auditable test summary adapted to your reporting standards and delivers it to the right stakeholders. Sprint QA closed.',
]

function StageCard({ stage, desc, isGated, onToggle, index }) {
  const [open, setOpen] = useState(false)
  const StageIcon = STAGE_ICONS[index]
  return (
    <Reveal delay={index * 0.05}>
      <div
        className={`rounded-xl border transition-all duration-250 overflow-hidden ${
          isGated
            ? 'border-amber/25 bg-amber/5'
            : 'border-border bg-surface hover:border-teal/20 hover:bg-teal/5'
        }`}
      >
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-start gap-3 flex-1">
              <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center border transition-all ${
                isGated ? 'border-amber/25 bg-amber/10 text-amber' : 'border-border bg-raised text-teal'
              }`}>
                <StageIcon size={17}/>
              </div>
              <div>
                <div className="text-[10px] font-semibold tracking-widest text-fog uppercase mb-1">
                  Stage {String(stage.id).padStart(2,'0')}
                </div>
                <div className="text-[15px] font-semibold text-snow leading-tight">{stage.name}</div>
                <div className="text-[12px] text-fog mt-0.5">{stage.tool}</div>
              </div>
            </div>
            <button
              onClick={() => onToggle(stage.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all ${
                isGated ? 'border-amber/35 text-amber bg-amber/10 hover:bg-amber/15' : 'border-border text-fog hover:border-teal/30 hover:text-teal'
              }`}
              aria-pressed={isGated}
            >
              {isGated ? <><Lock size={10}/> Gate on</> : <><Unlock size={10}/> Automated</>}
            </button>
          </div>

          <button
            onClick={() => setOpen(v => !v)}
            className="text-[12px] text-fog hover:text-mist transition-colors flex items-center gap-1"
          >
            {open ? 'Hide detail ↑' : 'What happens here ↓'}
          </button>

          <AnimatePresence>
            {open && (
              <motion.p
                initial={{height:0,opacity:0,marginTop:0}}
                animate={{height:'auto',opacity:1,marginTop:12}}
                exit={{height:0,opacity:0,marginTop:0}}
                className="text-body-md text-mist leading-relaxed overflow-hidden"
              >
                {desc}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  )
}

export default function Pipeline() {
  usePageMeta({ title:'The Pipeline', description:'Explore the Testwise 8-stage autonomous QA pipeline. Configure human approval gates per stage to match your risk profile and compliance requirements.', canonical:'/pipeline' })
  const [activeMode, setActiveMode] = useState('full')
  const [gates, setGates] = useState([])

  function applyMode(key) {
    setActiveMode(key)
    setGates([...GATE_MODES[key].gates])
  }

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
          body="Every stage can be configured with a human approval gate. Click any stage card to toggle it, or choose a preset configuration below."
        />
      </section>

      <div className="divider-glow"/>

      <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Controls */}
        <Reveal className="flex flex-wrap items-center justify-between gap-5 mb-6">
          <div className="flex flex-wrap gap-2">
            {Object.entries(GATE_MODES).map(([key,mode]) => (
              <button key={key} onClick={() => applyMode(key)}
                className={`text-[13px] font-medium px-4 py-2 rounded-full border transition-all ${
                  activeMode===key ? 'border-teal/40 bg-teal/10 text-teal' : 'border-border text-mist hover:border-teal/25 hover:text-snow'
                }`}>
                {mode.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-5 text-body-md">
            <span className="flex items-center gap-2 text-mist">
              <span className="w-2 h-2 rounded-full bg-teal"/>
              {8 - gateCount} automated
            </span>
            <span className="flex items-center gap-2 text-mist">
              <span className="w-2 h-2 rounded-full bg-amber"/>
              {gateCount} gate{gateCount !== 1 ? 's' : ''}
            </span>
            <span className="font-semibold text-teal">{autoPct}% autonomous</span>
          </div>
        </Reveal>

        {/* Mode description */}
        {activeMode && (
          <Reveal className="mb-7">
            <div className="rounded-xl border border-border bg-surface px-5 py-4 text-body-md text-mist">
              {GATE_MODES[activeMode].desc}
            </div>
          </Reveal>
        )}

        {/* Stage grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STAGES.map((stage, i) => (
            <StageCard key={stage.id} stage={stage} desc={STAGE_DESC[i]} index={i}
              isGated={gates.includes(stage.id)} onToggle={toggleGate}/>
          ))}
        </div>
      </section>

      <Divider />

      {/* Tool compatibility */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div className="eyebrow">Tool compatibility</div>
            <h2 className="text-h1 text-snow mb-5">Works with your existing stack — not ours.</h2>
            <p className="text-body-xl text-mist font-light leading-relaxed mb-5">
              Testwise does not mandate new tools. The pipeline integrates with whatever you already run across every stage.
            </p>
            <p className="text-body-lg text-mist font-light leading-relaxed">
              Stage 7 — test reporting — is a common question. We work with any test management platform your team already uses. The examples shown are illustrative only. If you use a bespoke or internal system, we build the integration accordingly.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3">
              {[
                { label:'Project management',  examples:'JIRA · Linear · Azure DevOps · GitHub Issues · Shortcut' },
                { label:'CI/CD',               examples:'GitHub Actions · Azure Pipelines · Jenkins · Bamboo · CircleCI' },
                { label:'Issue tracking',      examples:'JIRA · Linear · GitHub · ServiceNow · Azure DevOps' },
                { label:'Test management',     examples:'Xray · Zephyr · TestRail · qTest · Azure Test Plans — or your own platform' },
                { label:'Test frameworks',     examples:'Playwright · Selenium · Cypress · RestAssured · Pytest · any framework' },
              ].map((item,i) => (
                <div key={i} className="card p-5">
                  <div className="text-label text-teal mb-2">{item.label}</div>
                  <div className="text-body-md text-mist">{item.examples}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      <section className="py-16 px-6 text-center max-w-xl mx-auto">
        <Reveal>
          <h2 className="text-h2 text-snow mb-4">Want to see how this maps to your stack?</h2>
          <p className="text-body-xl text-mist font-light mb-7">The first call is a discovery session — we walk through your environment and show you exactly what the pipeline would look like.</p>
          <Link to="/contact" className="btn-primary inline-flex">Book a discovery call <ArrowRight size={16}/></Link>
        </Reveal>
      </section>
    </PageWrapper>
  )
}

// SEO — added at module level via side-effect, component calls hook internally

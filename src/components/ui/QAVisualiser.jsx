import { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

const STAGES = [
  { id: 0, label: 'Requirements', short: 'REQ' },
  { id: 1, label: 'Test Cases',   short: 'TC'  },
  { id: 2, label: 'Automation',   short: 'AUT' },
  { id: 3, label: 'Execution',    short: 'EXE' },
  { id: 4, label: 'Triage',       short: 'TRI' },
  { id: 5, label: 'Sign-off',     short: 'SIG' },
]

// Simulated test runs with results
const INITIAL_RUNS = [
  { id: 1, name: 'Sprint 47 · Regression', stage: 5, status: 'passed', coverage: 94, tests: 312, time: '4m 12s' },
  { id: 2, name: 'Sprint 47 · Smoke',      stage: 4, status: 'running', coverage: 88, tests: 48,  time: '1m 03s' },
  { id: 3, name: 'Sprint 47 · API Suite',  stage: 3, status: 'running', coverage: 91, tests: 204, time: '2m 37s' },
  { id: 4, name: 'Feature/auth-flow',       stage: 2, status: 'queued',  coverage: 0,  tests: 67,  time: '—' },
]

function StatusDot({ status }) {
  if (status === 'passed')  return <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"/>
  if (status === 'failed')  return <span className="inline-block w-2 h-2 rounded-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.7)]"/>
  if (status === 'running') return <span className="inline-block w-2 h-2 rounded-full bg-brand-teal animate-pulse shadow-[0_0_6px_rgba(34,211,195,0.7)]"/>
  return <span className="inline-block w-2 h-2 rounded-full bg-white/20"/>
}

function StatusLabel({ status }) {
  const map = {
    passed:  'text-emerald-400',
    failed:  'text-red-400',
    running: 'text-brand-teal',
    queued:  'text-white/35',
  }
  return (
    <span className={cn('text-[11px] font-semibold tracking-widest uppercase', map[status] || 'text-white/35')}>
      {status}
    </span>
  )
}

export default function QAVisualiser({ className = '' }) {
  const [runs, setRuns]         = useState(INITIAL_RUNS)
  const [activeRun, setActiveRun] = useState(1)
  const [tick, setTick]         = useState(0)
  const intervalRef             = useRef(null)

  // Animate runs progressing through stages
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTick(t => t + 1)
      setRuns(prev => prev.map(run => {
        if (run.status === 'running' && Math.random() > 0.65) {
          const next = run.stage + 1
          if (next >= STAGES.length) return { ...run, status: 'passed', stage: STAGES.length - 1 }
          return { ...run, stage: next }
        }
        if (run.status === 'queued' && Math.random() > 0.7) {
          return { ...run, status: 'running' }
        }
        return run
      }))
    }, 1800)
    return () => clearInterval(intervalRef.current)
  }, [])

  // Occasionally inject a new run
  useEffect(() => {
    if (tick > 0 && tick % 8 === 0) {
      setRuns(prev => {
        const filtered = prev.slice(-3)
        return [
          ...filtered,
          { id: Date.now(), name: `Feature/${['login','checkout','search','api'][tick % 4]}-tests`, stage: 0, status: 'queued', coverage: 0, tests: Math.floor(Math.random() * 120) + 20, time: '—' },
        ]
      })
    }
  }, [tick])

  const selected = runs.find(r => r.id === activeRun) || runs[0]

  return (
    <div className={cn('relative rounded-2xl overflow-hidden', className)}>
      {/* Terminal chrome bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0a1525] border-b border-white/[0.07]">
        <div className="w-3 h-3 rounded-full bg-red-500/60"/>
        <div className="w-3 h-3 rounded-full bg-yellow-500/60"/>
        <div className="w-3 h-3 rounded-full bg-emerald-500/60"/>
        <span className="ml-3 text-[11px] text-white/25 font-mono tracking-widest">TESTWISE · AUTONOMOUS PIPELINE</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse"/>
          <span className="text-[10px] text-brand-teal/70 font-mono">LIVE</span>
        </div>
      </div>

      <div className="bg-[#0d1b2e] p-5 space-y-4">
        {/* Pipeline stage track */}
        <div>
          <div className="text-[10px] text-white/25 font-mono tracking-[0.15em] uppercase mb-3">Pipeline Stages</div>
          <div className="flex items-center gap-0">
            {STAGES.map((stage, i) => {
              const stageActive = selected && selected.stage >= i
              const stageCurrent = selected && selected.stage === i && selected.status === 'running'
              return (
                <div key={stage.id} className="flex items-center flex-1">
                  <div className="flex-1 flex flex-col items-center gap-1.5">
                    <div className={cn(
                      'w-full h-1.5 rounded-full transition-all duration-700',
                      stageActive
                        ? stageCurrent
                          ? 'bg-brand-teal shadow-[0_0_8px_rgba(34,211,195,0.5)]'
                          : 'bg-brand-teal/60'
                        : 'bg-white/8'
                    )}/>
                    <span className={cn(
                      'text-[9px] font-mono tracking-widest uppercase transition-colors duration-300',
                      stageActive ? 'text-brand-teal/80' : 'text-white/20'
                    )}>{stage.short}</span>
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className={cn(
                      'w-2 h-px mx-0.5 transition-all duration-700',
                      selected && selected.stage > i ? 'bg-brand-teal/50' : 'bg-white/8'
                    )}/>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Run list */}
        <div>
          <div className="text-[10px] text-white/25 font-mono tracking-[0.15em] uppercase mb-2">Active Runs</div>
          <div className="space-y-1.5">
            {runs.slice(-4).map(run => (
              <button
                key={run.id}
                onClick={() => setActiveRun(run.id)}
                className={cn(
                  'w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200',
                  activeRun === run.id
                    ? 'bg-brand-teal/10 border border-brand-teal/20'
                    : 'bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06]'
                )}
              >
                <StatusDot status={run.status}/>
                <span className="flex-1 text-[12px] text-white/70 font-mono truncate">{run.name}</span>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-[10px] text-white/30 font-mono hidden sm:block">
                    {STAGES[run.stage].short}
                  </span>
                  <StatusLabel status={run.status}/>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected run detail */}
        {selected && (
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[12px] font-semibold text-white/80 font-mono mb-0.5">{selected.name}</div>
                <div className="text-[10px] text-white/30 font-mono">
                  Stage: {STAGES[selected.stage]?.label} · {selected.time}
                </div>
              </div>
              <StatusDot status={selected.status}/>
            </div>

            {/* Coverage bar */}
            <div>
              <div className="flex justify-between text-[10px] text-white/30 font-mono mb-1.5">
                <span>Coverage</span>
                <span className="text-brand-teal/80">{selected.coverage}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-teal transition-all duration-1000 shadow-[0_0_6px_rgba(34,211,195,0.5)]"
                  style={{ width: `${selected.coverage}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-0.5">
              <div className="text-[10px] font-mono">
                <span className="text-white/30">Tests </span>
                <span className="text-white/70">{selected.tests}</span>
              </div>
              <div className="text-[10px] font-mono">
                <span className="text-white/30">Gate </span>
                <span className="text-brand-teal/80">Autonomous</span>
              </div>
              <div className="ml-auto">
                {selected.status === 'passed' && (
                  <span className="text-[10px] font-semibold text-emerald-400 font-mono tracking-wider">✓ SIGNED OFF</span>
                )}
                {selected.status === 'running' && (
                  <span className="text-[10px] text-brand-teal/70 font-mono animate-pulse">Running...</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bottom stats row */}
        <div className="flex items-center justify-between pt-1 border-t border-white/[0.05]">
          <div className="flex items-center gap-4">
            <div className="text-[10px] font-mono">
              <span className="text-white/25">Total runs </span>
              <span className="text-white/60">{runs.length}</span>
            </div>
            <div className="text-[10px] font-mono">
              <span className="text-white/25">Passed </span>
              <span className="text-emerald-400">{runs.filter(r=>r.status==='passed').length}</span>
            </div>
            <div className="text-[10px] font-mono">
              <span className="text-white/25">Running </span>
              <span className="text-brand-teal">{runs.filter(r=>r.status==='running').length}</span>
            </div>
          </div>
          <span className="text-[9px] text-white/15 font-mono tracking-widest">ZERO HUMAN TOUCHPOINTS</span>
        </div>
      </div>
    </div>
  )
}

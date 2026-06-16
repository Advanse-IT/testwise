import { useRef, useEffect, useState, useCallback } from 'react'

// Node positions arranged as a brain-like neural network
const BASE_NODES = [
  // Input layer
  { id:0,  x:60,  y:120, layer:0 },
  { id:1,  x:60,  y:200, layer:0 },
  { id:2,  x:60,  y:280, layer:0 },
  { id:3,  x:60,  y:360, layer:0 },
  // Hidden layer 1
  { id:4,  x:180, y:80,  layer:1 },
  { id:5,  x:180, y:170, layer:1 },
  { id:6,  x:180, y:250, layer:1 },
  { id:7,  x:180, y:330, layer:1 },
  { id:8,  x:180, y:400, layer:1 },
  // Hidden layer 2
  { id:9,  x:300, y:100, layer:2 },
  { id:10, x:300, y:200, layer:2 },
  { id:11, x:300, y:300, layer:2 },
  { id:12, x:300, y:380, layer:2 },
  // Hidden layer 3
  { id:13, x:420, y:80,  layer:3 },
  { id:14, x:420, y:170, layer:3 },
  { id:15, x:420, y:260, layer:3 },
  { id:16, x:420, y:350, layer:3 },
  { id:17, x:420, y:420, layer:3 },
  // Output layer
  { id:18, x:540, y:140, layer:4 },
  { id:19, x:540, y:240, layer:4 },
  { id:20, x:540, y:340, layer:4 },
]

// Edges between adjacent layers only
const EDGES = [
  // 0→1 layer
  [0,4],[0,5],[1,4],[1,5],[1,6],[2,5],[2,6],[2,7],[3,6],[3,7],[3,8],
  // 1→2 layer
  [4,9],[4,10],[5,9],[5,10],[5,11],[6,10],[6,11],[6,12],[7,11],[7,12],[8,11],[8,12],
  // 2→3 layer
  [9,13],[9,14],[10,13],[10,14],[10,15],[11,14],[11,15],[11,16],[12,15],[12,16],[12,17],
  // 3→4 layer
  [13,18],[13,19],[14,18],[14,19],[15,19],[15,20],[16,19],[16,20],[17,20],
]

function getColor(t) {
  // t: 0 = dim, 1 = fully active teal glow
  const r = Math.round(34 * t)
  const g = Math.round(211 * t)
  const b = Math.round(195 * t)
  return `rgb(${r},${g},${b})`
}

export default function NeuralNet({ className = '' }) {
  const [nodeActivity, setNodeActivity] = useState(() => BASE_NODES.map(() => 0))
  const [edgeActivity, setEdgeActivity] = useState(() => EDGES.map(() => 0))
  const [hoveredNode, setHoveredNode] = useState(null)
  const animRef = useRef(null)
  const frameRef = useRef(0)

  // Propagate a signal pulse through the network
  const pulse = useCallback((startNode = null) => {
    const src = startNode ?? Math.floor(Math.random() * 4) // random input node
    const visited = new Set()
    const waves = [[src]]
    // BFS through layers
    let current = [src]
    for (let layer = 0; layer < 4; layer++) {
      const next = []
      current.forEach(nid => {
        EDGES.forEach(([a, b]) => {
          if (a === nid && !visited.has(b)) { visited.add(b); next.push(b) }
        })
      })
      if (next.length) waves.push(next)
      current = next
    }

    waves.forEach((wave, wi) => {
      setTimeout(() => {
        setNodeActivity(prev => {
          const next = [...prev]
          wave.forEach(id => { next[id] = 1 })
          return next
        })
        // Light up edges in this wave
        setEdgeActivity(prev => {
          const next = [...prev]
          if (wi > 0) {
            waves[wi-1].forEach(a => {
              wave.forEach(b => {
                const ei = EDGES.findIndex(([ea,eb]) => ea===a && eb===b)
                if (ei !== -1) next[ei] = 1
              })
            })
          }
          return next
        })
        // Fade out
        setTimeout(() => {
          setNodeActivity(prev => { const n=[...prev]; wave.forEach(id=>{n[id]=0}); return n })
          setEdgeActivity(prev => {
            const n=[...prev]
            if (wi > 0) {
              waves[wi-1].forEach(a => {
                wave.forEach(b => {
                  const ei = EDGES.findIndex(([ea,eb])=>ea===a&&eb===b)
                  if (ei !== -1) n[ei] = 0
                })
              })
            }
            return n
          })
        }, 500)
      }, wi * 160)
    })
  }, [])

  // Auto-pulse on interval
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => pulse(), 1800)
    pulse()
    return () => clearInterval(id)
  }, [pulse])

  function handleNodeHover(id) {
    setHoveredNode(id)
    pulse(id)
  }

  return (
    <div className={`relative select-none ${className}`}>
      <svg
        viewBox="0 50 600 430"
        className="w-full h-full"
        aria-label="Interactive neural network visualisation"
        role="img"
      >
        <defs>
          <radialGradient id="node-active" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22D3C3" stopOpacity="1"/>
            <stop offset="100%" stopColor="#22D3C3" stopOpacity="0"/>
          </radialGradient>
          <filter id="glow-strong">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
          <filter id="glow-soft">
            <feGaussianBlur stdDeviation="1.5" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        {/* Edges */}
        {EDGES.map(([a, b], i) => {
          const na = BASE_NODES[a]; const nb = BASE_NODES[b]
          const active = edgeActivity[i]
          const hovered = hoveredNode !== null && (a === hoveredNode || b === hoveredNode)
          return (
            <line
              key={i}
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke={active || hovered ? '#22D3C3' : 'rgba(34,211,195,0.12)'}
              strokeWidth={active ? 1.5 : hovered ? 1 : 0.75}
              opacity={active ? 0.9 : hovered ? 0.6 : 1}
              style={{ transition: 'stroke 0.25s, stroke-width 0.25s, opacity 0.25s' }}
              filter={active ? 'url(#glow-soft)' : undefined}
            />
          )
        })}

        {/* Nodes */}
        {BASE_NODES.map(node => {
          const active = nodeActivity[node.id] > 0
          const hovered = hoveredNode === node.id
          const r = active || hovered ? 7 : 5
          return (
            <g
              key={node.id}
              onMouseEnter={() => handleNodeHover(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Glow halo */}
              {(active || hovered) && (
                <circle
                  cx={node.x} cy={node.y} r={r + 10}
                  fill="rgba(34,211,195,0.12)"
                  style={{ transition: 'all 0.25s' }}
                />
              )}
              {/* Node circle */}
              <circle
                cx={node.x} cy={node.y}
                r={r}
                fill={active || hovered ? '#22D3C3' : '#1A2740'}
                stroke={active || hovered ? '#22D3C3' : 'rgba(34,211,195,0.3)'}
                strokeWidth={active ? 0 : 1}
                filter={active ? 'url(#glow-strong)' : hovered ? 'url(#glow-soft)' : undefined}
                style={{ transition: 'fill 0.2s, r 0.2s, stroke 0.2s' }}
              />
            </g>
          )
        })}
      </svg>

      {/* Floating label */}
      <div className="absolute bottom-0 left-0 right-0 text-center">
        <span className="text-[11px] text-teal/60 tracking-widest uppercase font-medium">
          Hover any node to trigger a signal
        </span>
      </div>
    </div>
  )
}

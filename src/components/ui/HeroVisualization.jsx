import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function HeroVisualization() {
  const [activeStage, setActiveStage] = useState(0)

  const stages = [
    { name: 'Analyze', color: '#22D3C3', x: 10 },
    { name: 'Design', color: '#06B6D4', x: 30 },
    { name: 'Execute', color: '#0891B2', x: 50 },
    { name: 'Validate', color: '#06B6D4', x: 70 },
    { name: 'Report', color: '#22D3C3', x: 90 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22D3C3" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#22D3C3" stopOpacity="0.3" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background grid (subtle) */}
      <g opacity="0.05" stroke="#22D3C3" strokeWidth="0.5">
        {[...Array(6)].map((_, i) => (
          <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="60" />
        ))}
        {[...Array(4)].map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 15} x2="100" y2={i * 15} />
        ))}
      </g>

      {/* Flow line */}
      <motion.path
        d="M 5 30 Q 25 10, 50 30 T 95 30"
        stroke="url(#flowGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'loop' }}
      />

      {/* Stage nodes */}
      {stages.map((stage, idx) => (
        <g key={`stage-${idx}`}>
          {/* Connection line to flow */}
          <line
            x1={stage.x}
            y1="30"
            x2={stage.x}
            y2={idx % 2 === 0 ? 15 : 45}
            stroke={stage.color}
            strokeWidth="0.5"
            opacity={activeStage === idx ? 1 : 0.3}
          />

          {/* Node */}
          <motion.circle
            cx={stage.x}
            cy={idx % 2 === 0 ? 15 : 45}
            r="2.5"
            fill={stage.color}
            filter="url(#glow)"
            animate={activeStage === idx ? { r: 4, opacity: 1 } : { r: 2.5, opacity: 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* Label */}
          <motion.text
            x={stage.x}
            y={idx % 2 === 0 ? 8 : 52}
            textAnchor="middle"
            fontSize="2"
            fill={stage.color}
            fontWeight="600"
            opacity={activeStage === idx ? 1 : 0.4}
            animate={{ opacity: activeStage === idx ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
          >
            {stage.name}
          </motion.text>

          {/* Pulse on active */}
          {activeStage === idx && (
            <motion.circle
              cx={stage.x}
              cy={idx % 2 === 0 ? 15 : 45}
              r="2.5"
              fill="none"
              stroke={stage.color}
              strokeWidth="0.5"
              animate={{ r: [2.5, 6] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </g>
      ))}

      {/* Progress indicator */}
      <motion.rect
        x="5"
        y="55"
        width="90"
        height="1"
        fill="rgba(34, 211, 195, 0.2)"
        rx="0.5"
      />
      <motion.rect
        x="5"
        y="55"
        width={18 + activeStage * 18}
        height="1"
        fill="#22D3C3"
        rx="0.5"
        animate={{ width: 18 + activeStage * 18 }}
        transition={{ duration: 0.5 }}
      />
    </svg>
  )
}

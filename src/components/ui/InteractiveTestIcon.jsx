import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function InteractiveTestIcon({ className = 'w-12 h-12' }) {
  const [isHovered, setIsHovered] = useState(false)
  const [activeNode, setActiveNode] = useState(null)

  const nodes = [
    { id: 1, x: 50, y: 20, label: 'Requirements' },
    { id: 2, x: 80, y: 40, label: 'Test Cases' },
    { id: 3, x: 85, y: 70, label: 'Execution' },
    { id: 4, x: 50, y: 85, label: 'Results' },
    { id: 5, x: 15, y: 70, label: 'Validation' },
    { id: 6, x: 20, y: 40, label: 'Analysis' },
  ]

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]
  ]

  useEffect(() => {
    if (!isHovered) {
      setActiveNode(null)
    }
  }, [isHovered])

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={`${className} cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background */}
      <defs>
        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3C3" stopOpacity="1" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Animated connections */}
      {connections.map((conn, idx) => {
        const [start, end] = conn
        const startNode = nodes[start]
        const endNode = nodes[end]
        return (
          <motion.line
            key={`conn-${idx}`}
            x1={startNode.x}
            y1={startNode.y}
            x2={endNode.x}
            y2={endNode.y}
            stroke="#22D3C3"
            strokeWidth="1.5"
            opacity={isHovered ? 0.8 : 0.4}
            animate={isHovered ? { strokeWidth: 2.5 } : { strokeWidth: 1.5 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          />
        )
      })}

      {/* Nodes */}
      {nodes.map((node, idx) => (
        <motion.g
          key={`node-${node.id}`}
          onMouseEnter={() => setActiveNode(node.id)}
          onMouseLeave={() => setActiveNode(null)}
        >
          {/* Outer glow on hover */}
          {(isHovered || activeNode === node.id) && (
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="6"
              fill="none"
              stroke="#22D3C3"
              strokeWidth="1"
              opacity="0.3"
              animate={{ r: [6, 9] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}

          {/* Main node */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="4"
            fill="url(#nodeGradient)"
            animate={activeNode === node.id ? { r: 5.5 } : { r: 4 }}
            transition={{ duration: 0.3 }}
          />

          {/* Center dot */}
          <circle
            cx={node.x}
            cy={node.y}
            r="1.5"
            fill="#0C1220"
          />
        </motion.g>
      ))}

      {/* Center checkmark (quality assurance symbol) */}
      <motion.g
        animate={isHovered ? { scale: 1.1, rotate: 360 } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.6 }}
      >
        <path
          d="M 35 50 L 45 60 L 65 40"
          stroke="#22D3C3"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
    </motion.svg>
  )
}

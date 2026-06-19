import { useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Testwise logomark — software testing domain icon.
 * Three pipeline nodes with a checkmark on the final node = automated sign-off.
 * Transparent background. Glows interactively on hover.
 */
export function LogoMark({ size = 44, className = '', interactive = false }) {
  const [hovered, setHovered] = useState(false)
  const active = interactive ? hovered : false

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('transition-all duration-300 flex-shrink-0', className)}
      style={{ filter: active ? 'drop-shadow(0 0 8px rgba(34,211,195,0.65))' : undefined }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Testwise logo"
      role="img"
    >
      {/* Pipeline track */}
      <line x1="8" y1="20" x2="26" y2="20"
        stroke="#22D3C3" strokeWidth="1.5" strokeLinecap="round"
        opacity={active ? 0.9 : 0.4}
        style={{ transition: 'opacity 0.3s' }}
      />

      {/* Node 1 — input stage */}
      <circle cx="8" cy="20" r="4"
        fill={active ? '#22D3C3' : 'transparent'}
        stroke="#22D3C3" strokeWidth="1.75"
        opacity={active ? 1 : 0.7}
        style={{ transition: 'all 0.3s' }}
      />

      {/* Node 2 — mid stage */}
      <circle cx="20" cy="20" r="4"
        fill={active ? '#22D3C3' : 'transparent'}
        stroke="#22D3C3" strokeWidth="1.75"
        opacity={active ? 1 : 0.7}
        style={{ transition: 'all 0.3s 0.06s' }}
      />

      {/* Node 3 — sign-off: always filled */}
      <circle cx="32" cy="20" r="6"
        fill="#22D3C3"
        opacity={active ? 1 : 0.9}
        style={{ transition: 'all 0.3s 0.12s' }}
      />

      {/* Checkmark inside final node */}
      <path
        d="M29.5 20.2 L31.3 22 L34.8 18.4"
        stroke="#0C1220" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round"
      />

      {/* Vertical branches from node 2 — test case branching */}
      <line x1="20" y1="16" x2="20" y2="11"
        stroke="#22D3C3" strokeWidth="1.5" strokeLinecap="round"
        opacity={active ? 0.75 : 0.28}
        style={{ transition: 'opacity 0.3s 0.09s' }}
      />
      <line x1="20" y1="24" x2="20" y2="29"
        stroke="#22D3C3" strokeWidth="1.5" strokeLinecap="round"
        opacity={active ? 0.75 : 0.28}
        style={{ transition: 'opacity 0.3s 0.09s' }}
      />

      {/* Branch endpoint nodes */}
      <circle cx="20" cy="10" r="2"
        fill="transparent" stroke="#22D3C3" strokeWidth="1.5"
        opacity={active ? 0.85 : 0.28}
        style={{ transition: 'all 0.3s 0.15s' }}
      />
      <circle cx="20" cy="30" r="2"
        fill="transparent" stroke="#22D3C3" strokeWidth="1.5"
        opacity={active ? 0.85 : 0.28}
        style={{ transition: 'all 0.3s 0.15s' }}
      />
    </svg>
  )
}

export function LogoFull({ size = 44, className = '', interactive = false }) {
  return (
    <div className={cn('flex items-center gap-3 select-none', className)}>
      <LogoMark size={size} interactive={interactive} />
      <div className="leading-none">
        <div
          className="font-semibold tracking-tight leading-tight"
          style={{ fontSize: '20px', color: '#EEF2F7' }}
        >
          Test<span style={{ color: '#22D3C3' }}>wise</span>
        </div>
        <div
          className="font-medium tracking-[0.14em] uppercase mt-[4px]"
          style={{ fontSize: '11px', color: 'rgba(238,242,247,0.38)' }}
        >
          by Advanse IT
        </div>
      </div>
    </div>
  )
}

/**
 * Testwise logomark — neural circuit node motif.
 * Fully transparent background. Works on any bg colour.
 * The SVG strokes are teal; the wordmark uses inherited colour.
 */
export function LogoMark({ size = 36, className = '' }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 48 48" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Central filled node */}
      <circle cx="24" cy="24" r="5" fill="#22D3C3"/>
      {/* Dashed orbit ring */}
      <circle cx="24" cy="24" r="9.5" stroke="#22D3C3" strokeWidth="1.5"
        strokeDasharray="3.5 2.5" opacity="0.45"/>
      {/* Cardinal connection arms */}
      <line x1="24" y1="14.5" x2="24" y2="6"  stroke="#22D3C3" strokeWidth="1.75" strokeLinecap="round"/>
      <line x1="24" y1="33.5" x2="24" y2="42" stroke="#22D3C3" strokeWidth="1.75" strokeLinecap="round"/>
      <line x1="14.5" y1="24" x2="6"  y2="24" stroke="#22D3C3" strokeWidth="1.75" strokeLinecap="round"/>
      <line x1="33.5" y1="24" x2="42" y2="24" stroke="#22D3C3" strokeWidth="1.75" strokeLinecap="round"/>
      {/* Diagonal arms */}
      <line x1="17.5" y1="17.5" x2="10" y2="10" stroke="#22D3C3" strokeWidth="1.1" strokeLinecap="round" opacity="0.4"/>
      <line x1="30.5" y1="30.5" x2="38" y2="38" stroke="#22D3C3" strokeWidth="1.1" strokeLinecap="round" opacity="0.4"/>
      <line x1="30.5" y1="17.5" x2="38" y2="10" stroke="#22D3C3" strokeWidth="1.1" strokeLinecap="round" opacity="0.4"/>
      <line x1="17.5" y1="30.5" x2="10" y2="38" stroke="#22D3C3" strokeWidth="1.1" strokeLinecap="round" opacity="0.4"/>
      {/* Cardinal outer nodes */}
      <circle cx="24" cy="6"  r="2.8" fill="#22D3C3"/>
      <circle cx="24" cy="42" r="2.8" fill="#22D3C3"/>
      <circle cx="6"  cy="24" r="2.8" fill="#22D3C3"/>
      <circle cx="42" cy="24" r="2.8" fill="#22D3C3"/>
      {/* Diagonal outer nodes */}
      <circle cx="10" cy="10" r="2" fill="#22D3C3" opacity="0.4"/>
      <circle cx="38" cy="38" r="2" fill="#22D3C3" opacity="0.4"/>
      <circle cx="38" cy="10" r="2" fill="#22D3C3" opacity="0.4"/>
      <circle cx="10" cy="38" r="2" fill="#22D3C3" opacity="0.4"/>
    </svg>
  )
}

export function LogoFull({ size = 36, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={size}/>
      <div>
        <div className="text-[17px] font-semibold tracking-tight leading-none text-snow">
          Test<span style={{color:'#22D3C3'}}>wise</span>
        </div>
        <div className="text-[10px] tracking-[0.12em] uppercase leading-none mt-1"
          style={{color:'rgba(238,242,247,0.32)'}}>
          by Advanse-IT
        </div>
      </div>
    </div>
  )
}

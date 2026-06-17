import Reveal from './Reveal'

export default function SectionHeader({ eyebrow, title, body, center = false, className = '' }) {
  return (
    <Reveal className={[center ? 'text-center mx-auto' : '', className].filter(Boolean).join(' ')}>
      {eyebrow && <div className="eyebrow-label">{eyebrow}</div>}
      <h2 className="text-[clamp(26px,4vw,52px)] font-bold text-white tracking-tight leading-[1.08] mb-5" style={{letterSpacing:'-0.03em'}}>
        {title}
      </h2>
      {body && (
        <p className={['text-[16px] sm:text-body-xl text-white/55 font-light leading-relaxed', center ? 'max-w-xl mx-auto' : 'max-w-lg'].join(' ')}>
          {body}
        </p>
      )}
    </Reveal>
  )
}

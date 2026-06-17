import Reveal from './Reveal'

export default function SectionHeader({ eyebrow, title, body, center = false, className = '' }) {
  return (
    <Reveal className={[center ? 'text-center mx-auto' : '', className].filter(Boolean).join(' ')}>
      {eyebrow && (
        <div className="eyebrow-label">{eyebrow}</div>
      )}
      <h2 className="text-title-xl text-white mb-5">{title}</h2>
      {body && (
        <p className={['text-body-xl text-white/55 font-light leading-relaxed', center ? 'max-w-xl mx-auto' : 'max-w-lg'].join(' ')}>
          {body}
        </p>
      )}
    </Reveal>
  )
}

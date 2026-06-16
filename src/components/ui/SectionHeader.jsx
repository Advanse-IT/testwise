import Reveal from './Reveal'
export default function SectionHeader({ eyebrow, title, body, center = false, className = '' }) {
  return (
    <Reveal className={`${center ? 'text-center mx-auto' : ''} ${className}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="text-display-lg text-snow mb-4">{title}</h2>
      {body && <p className={`text-body-lg text-mist font-light leading-relaxed ${center ? 'max-w-xl mx-auto' : 'max-w-lg'}`}>{body}</p>}
    </Reveal>
  )
}

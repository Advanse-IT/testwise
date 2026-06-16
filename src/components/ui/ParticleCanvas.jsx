import { useParticleCanvas } from '@/hooks/useParticleCanvas'

export default function ParticleCanvas({ className = '' }) {
  const canvasRef = useParticleCanvas()
  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}

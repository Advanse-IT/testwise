import { useEffect, useRef } from 'react'

export function useParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, particles = []

    function resize() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      createParticles()
    }

    function createParticles() {
      const count = Math.floor((canvas.width * canvas.height) / 13000)
      particles = Array.from({ length: count }, () => ({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    (Math.random() - 0.5) * 0.2,
        vy:    (Math.random() - 0.5) * 0.2,
        r:     Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.4 + 0.1,
      }))
    }

    function draw() {
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x
          const dy   = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0,229,200,${0.055 * (1 - dist / 110)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,229,200,${p.alpha})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)
    resize()
    draw()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return canvasRef
}

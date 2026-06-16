import { useEffect, useRef, useState } from 'react'

export function useCountUp(target, duration = 1400, start = false) {
  const [value, setValue] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    if (!start || isNaN(target)) return
    let startTime = null

    function step(ts) {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf.current = requestAnimationFrame(step)
    }

    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [target, duration, start])

  return value
}

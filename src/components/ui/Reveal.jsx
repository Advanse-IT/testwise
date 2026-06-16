import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
export default function Reveal({ children, delay = 0, className = '', y = 24 }) {
  const [ref, inView] = useInView()
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  )
}

import { motion } from 'framer-motion'

export default function AIOrb({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} aria-hidden="true">
      {/* Outer orbit ring */}
      <div className="absolute w-72 h-72 rounded-full border border-teal/10 animate-orbit" style={{borderStyle:'dashed'}}/>
      {/* Second ring, counter */}
      <div className="absolute w-52 h-52 rounded-full border border-teal/15" style={{animation:'orbit 9s linear infinite reverse'}}/>
      {/* Glow core */}
      <div className="absolute w-32 h-32 rounded-full" style={{background:'radial-gradient(circle,rgba(34,186,178,0.18) 0%,transparent 70%)'}}/>
      {/* Pulse rings */}
      {[0,1,2].map(i => (
        <div key={i} className="absolute rounded-full border border-teal/10"
          style={{
            width:`${96 + i*36}px`, height:`${96 + i*36}px`,
            animation:`pulse-ring ${2.4 + i*0.6}s ease-out ${i*0.5}s infinite`,
          }}/>
      ))}
      {/* Core */}
      <div className="relative z-10 w-20 h-24 rounded-full gradient-brand flex items-center justify-center shadow-glow">
        <span className="text-[#0D1B2E] font-bold text-lg tracking-tight">AI</span>
      </div>
      {/* Orbiting dots */}
      {[0,72,144,216,288].map((deg,i) => (
        <div key={i} className="absolute w-full h-full animate-orbit" style={{animationDelay:`${i * -2.8}s`}}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal-bright opacity-60"/>
        </div>
      ))}
    </div>
  )
}

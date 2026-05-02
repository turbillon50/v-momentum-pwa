'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface PremiumSplashProps {
  onComplete: () => void
}

// Servicios que ofrece V Momentum - del contenido real
const services = ['APPS', 'AUTOMATION', 'IA', 'CLOUD', 'PERFORMANCE']

export function PremiumSplash({ onComplete }: PremiumSplashProps) {
  const [currentService, setCurrentService] = useState(0)
  const [phase, setPhase] = useState<'logo' | 'services' | 'tagline' | 'done'>('logo')

  useEffect(() => {
    // Fase 1: Logo (1s)
    const timer1 = setTimeout(() => setPhase('services'), 1000)
    
    // Fase 2: Servicios rotando
    const timer2 = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentService(prev => {
          if (prev >= services.length - 1) {
            clearInterval(interval)
            setPhase('tagline')
            return prev
          }
          return prev + 1
        })
      }, 400)
    }, 1000)

    // Fase 3: Tagline y salida
    const timer3 = setTimeout(() => setPhase('done'), 4000)
    const timer4 = setTimeout(onComplete, 4800)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-black" />
      
      {/* Ambient glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <motion.img
            src="/brand-logo.jpeg"
            alt="V Momentum"
            className="h-20 md:h-28 w-auto"
            animate={{
              filter: phase === 'logo' 
                ? ['drop-shadow(0 0 30px rgba(59,130,246,0.4))', 'drop-shadow(0 0 50px rgba(59,130,246,0.6))', 'drop-shadow(0 0 30px rgba(59,130,246,0.4))']
                : 'drop-shadow(0 0 20px rgba(59,130,246,0.3))'
            }}
            transition={{ duration: 2, repeat: phase === 'logo' ? Infinity : 0 }}
          />
        </motion.div>

        {/* Services rotation */}
        <AnimatePresence mode="wait">
          {phase === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 h-8 flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentService}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-blue-400 font-mono text-sm tracking-[0.4em]"
                >
                  {services[currentService]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tagline - from the real content */}
        <AnimatePresence>
          {(phase === 'tagline' || phase === 'done') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <motion.p
                className="text-white/60 text-sm md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Escalamos ideas. Construimos productos.
              </motion.p>
              <motion.p
                className="text-blue-400 text-sm md:text-base font-medium mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Generamos momentum.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading indicator */}
        <motion.div
          className="mt-12 flex gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-500"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppShell } from '@/components/app-shell'

// Premium Splash - Shows brand with showcase of what we build
function PremiumSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'logo' | 'showcase' | 'ready'>('logo')

  useEffect(() => {
    // Phase 1: Show logo (1s)
    const timer1 = setTimeout(() => setPhase('showcase'), 1000)
    // Phase 2: Show showcase (1.5s)  
    const timer2 = setTimeout(() => setPhase('ready'), 2500)
    // Complete
    const timer3 = setTimeout(onComplete, 3000)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, transparent 60%)',
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <AnimatePresence mode="wait">
        {phase === 'logo' && (
          <motion.div
            key="logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Rotating energy ring */}
            <div className="relative">
              <motion.div
                className="absolute inset-[-12px] rounded-2xl"
                style={{
                  background: 'conic-gradient(from 0deg, #3b82f6 0%, #60a5fa 25%, transparent 50%, #60a5fa 75%, #3b82f6 100%)',
                  padding: '2px',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full rounded-2xl bg-black" />
              </motion.div>
              <motion.img
                src="/brand-logo.jpeg"
                alt="V Momentum"
                className="relative z-10 h-28 w-auto"
                animate={{
                  filter: [
                    'drop-shadow(0 0 30px rgba(59,130,246,0.5))',
                    'drop-shadow(0 0 50px rgba(59,130,246,0.7))',
                    'drop-shadow(0 0 30px rgba(59,130,246,0.5))',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}

        {phase === 'showcase' && (
          <motion.div
            key="showcase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center px-6 max-w-lg"
          >
            {/* Hero showcase image - shows what we build */}
            <motion.img
              src="/hero-showcase.jpeg"
              alt="V Momentum - Apps que construimos"
              className="w-full max-w-md rounded-xl"
              animate={{
                filter: [
                  'drop-shadow(0 0 20px rgba(59,130,246,0.3))',
                  'drop-shadow(0 0 40px rgba(59,130,246,0.5))',
                  'drop-shadow(0 0 20px rgba(59,130,246,0.3))',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}

        {phase === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <motion.img
              src="/v-ai-icon.jpeg"
              alt="V AI"
              className="w-20 h-20 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(59,130,246,0.5)',
                  '0 0 50px rgba(59,130,246,0.8)',
                  '0 0 30px rgba(59,130,246,0.5)',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-sm text-blue-400 tracking-wider"
            >
              SISTEMA LISTO
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-black" />
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <PremiumSplash onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!showSplash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AppShell />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

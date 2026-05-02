'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppShell } from '@/components/app-shell'

// Deterministic particle positions to avoid hydration mismatch
const SPLASH_PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: (i * 31.7 + 13) % 100,
  top: (i * 23.9 + 7) % 100,
  delay: (i * 0.08) % 2,
  duration: 3 + (i % 3),
}))

// Premium Splash Screen
function PremiumSplash({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 40)

    const timer = setTimeout(onComplete, 2200)
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Particles */}
      <div className="absolute inset-0">
        {SPLASH_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-blue-500/40 rounded-full"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Logo and Loading */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Real Brand Logo with glow */}
        <motion.div
          className="relative"
          animate={{
            filter: [
              'drop-shadow(0 0 40px rgba(59,130,246,0.6))',
              'drop-shadow(0 0 60px rgba(139,92,246,0.6))',
              'drop-shadow(0 0 40px rgba(6,182,212,0.6))',
              'drop-shadow(0 0 40px rgba(59,130,246,0.6))',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Rotating energy ring around logo */}
          <motion.div
            className="absolute inset-[-6px] rounded-2xl"
            style={{
              background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
              padding: '2px',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-full h-full rounded-2xl bg-black" />
          </motion.div>
          <img
            src="/images/v-momentum-logo.jpeg"
            alt="V Momentum"
            className="relative z-10 h-24 w-auto rounded-2xl"
          />
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-white/40 tracking-[0.3em] uppercase mt-1">SaaS Technology Apps Design</p>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 160 }}
          transition={{ delay: 0.5 }}
          className="mt-8 h-1 bg-white/10 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        {/* Status */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 text-xs text-white/30 tracking-wider"
        >
          {progress < 100 ? 'INITIALIZING SYSTEM' : 'READY'}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black" />
    )
  }

  return (
    <>
      {/* Splash Screen */}
      <AnimatePresence mode="wait">
        {showSplash && <PremiumSplash onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {/* Main App */}
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

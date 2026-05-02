'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppShell } from '@/components/app-shell'

// Elegant minimal splash - just brand + subtle animation
function PremiumSplash({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Subtle ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        {/* Brand logo with energy ring */}
        <div className="relative">
          {/* Rotating energy ring */}
          <motion.div
            className="absolute inset-[-8px] rounded-xl opacity-60"
            style={{
              background: 'conic-gradient(from 0deg, #3b82f6 0%, #60a5fa 20%, transparent 40%, transparent 60%, #60a5fa 80%, #3b82f6 100%)',
              padding: '1.5px',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-full h-full rounded-xl bg-black" />
          </motion.div>
          
          <motion.img
            src="/brand-logo.jpeg"
            alt="V Momentum"
            className="relative z-10 h-24 sm:h-32 w-auto"
            animate={{
              filter: [
                'drop-shadow(0 0 20px rgba(59,130,246,0.4))',
                'drop-shadow(0 0 35px rgba(59,130,246,0.6))',
                'drop-shadow(0 0 20px rgba(59,130,246,0.4))',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Loading indicator */}
        <motion.div
          className="mt-8 w-32 h-[2px] bg-white/10 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
        </motion.div>
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

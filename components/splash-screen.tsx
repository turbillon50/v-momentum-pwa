'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VAILogo } from './v-ai-button'

interface SplashScreenProps {
  onComplete: () => void
}

const loadingMessages = [
  'Inicializando V Momentum…',
  'Cargando integraciones…',
  'Preparando arquitectura…',
  'Activando asistente V…',
  'Sistema listo.'
]

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 600)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 4
      })
    }, 100)

    const completeTimeout = setTimeout(() => {
      onComplete()
    }, 3500)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
      clearTimeout(completeTimeout)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* Ambient background glow */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, transparent 60%)'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* V Momentum Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center gap-6"
        >
          {/* Brand Logo - Chrome V */}
          <div className="flex items-center gap-3">
            <span className="text-5xl md:text-6xl font-bold chrome-text tracking-tight">V</span>
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-border to-transparent" />
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-light text-foreground/90 tracking-wide">Momentum</span>
              <span className="text-[10px] md:text-xs text-primary tracking-[0.3em] uppercase">SaaS Technology Apps Design</span>
            </div>
          </div>

          {/* V AI Logo */}
          <VAILogo size={100} />
        </motion.div>

        {/* Loading message */}
        <motion.div
          className="h-6 flex items-center justify-center"
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-sm text-muted-foreground font-mono">
            {loadingMessages[messageIndex]}
          </span>
        </motion.div>

        {/* Progress bar */}
        <div className="w-48 h-0.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-blue-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
            style={{ boxShadow: '0 0 10px rgba(59,130,246,0.8)' }}
          />
        </div>
      </div>

      {/* Bottom reflection */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(59,130,246,0.5) 0%, transparent 70%)'
        }}
      />
    </motion.div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VAICoreProps {
  onClick: () => void
  state?: 'idle' | 'thinking' | 'executing' | 'success'
  size?: 'sm' | 'md' | 'lg'
}

export function VAICore({ onClick, state = 'idle', size = 'md' }: VAICoreProps) {
  const [isBlinking, setIsBlinking] = useState(false)
  const [rotationAngle, setRotationAngle] = useState(0)

  const sizes = {
    sm: { container: 48, ring: 44, eye: 3 },
    md: { container: 64, ring: 58, eye: 4 },
    lg: { container: 80, ring: 72, eye: 5 },
  }

  const s = sizes[size]

  // Random blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 150)
      }
    }, 2000)

    return () => clearInterval(blinkInterval)
  }, [])

  // Subtle rotation
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotationAngle(prev => prev + 0.5)
    }, 50)

    return () => clearInterval(rotationInterval)
  }, [])

  const ringVariants = {
    idle: {
      scale: 1,
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.2)',
    },
    thinking: {
      scale: [1, 1.1, 1],
      boxShadow: [
        '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
        '0 0 40px rgba(139, 92, 246, 0.8), 0 0 80px rgba(139, 92, 246, 0.5)',
        '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
      ],
    },
    executing: {
      scale: [1, 1.05, 1],
      boxShadow: '0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(6, 182, 212, 0.4)',
    },
    success: {
      scale: 1,
      boxShadow: '0 0 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.4)',
    },
  }

  const stateColors = {
    idle: '#3b82f6',
    thinking: '#8b5cf6',
    executing: '#06b6d4',
    success: '#22c55e',
  }

  return (
    <motion.button
      onClick={onClick}
      className="relative flex items-center justify-center"
      style={{ width: s.container, height: s.container }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer glow pulse */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: s.ring + 20,
          height: s.ring + 20,
          background: `radial-gradient(circle, ${stateColors[state]}20 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rotating outer ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: s.ring + 8,
          height: s.ring + 8,
          border: `1px solid ${stateColors[state]}30`,
          rotate: rotationAngle,
        }}
      >
        {/* Ring segments */}
        {[0, 90, 180, 270].map((angle) => (
          <motion.div
            key={angle}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: stateColors[state],
              top: '50%',
              left: '50%',
              transform: `rotate(${angle}deg) translateY(-${s.ring / 2 + 4}px) translateX(-50%)`,
              boxShadow: `0 0 10px ${stateColors[state]}`,
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: angle / 360 }}
          />
        ))}
      </motion.div>

      {/* Main ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: s.ring,
          height: s.ring,
          border: `2px solid ${stateColors[state]}`,
          background: `radial-gradient(circle at 30% 30%, ${stateColors[state]}15 0%, transparent 60%)`,
        }}
        variants={ringVariants}
        animate={state}
        transition={{ duration: state === 'thinking' ? 1 : 0.5, repeat: state === 'thinking' || state === 'executing' ? Infinity : 0 }}
      />

      {/* Inner dark circle */}
      <motion.div
        className="absolute rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center"
        style={{
          width: s.ring - 8,
          height: s.ring - 8,
        }}
      >
        {/* Eyes */}
        <div className="flex items-center gap-3">
          {/* Left eye */}
          <motion.div
            className="rounded-full"
            style={{
              width: s.eye,
              height: isBlinking ? 1 : s.eye * 2.5,
              background: stateColors[state],
              boxShadow: `0 0 10px ${stateColors[state]}, 0 0 20px ${stateColors[state]}50`,
            }}
            animate={state === 'thinking' ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
            transition={{ duration: 0.5, repeat: state === 'thinking' ? Infinity : 0 }}
          />
          {/* Right eye */}
          <motion.div
            className="rounded-full"
            style={{
              width: s.eye,
              height: isBlinking ? 1 : s.eye * 2.5,
              background: stateColors[state],
              boxShadow: `0 0 10px ${stateColors[state]}, 0 0 20px ${stateColors[state]}50`,
            }}
            animate={state === 'thinking' ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
            transition={{ duration: 0.5, repeat: state === 'thinking' ? Infinity : 0, delay: 0.1 }}
          />
        </div>
      </motion.div>

      {/* Scanning line effect for thinking state */}
      <AnimatePresence>
        {state === 'thinking' && (
          <motion.div
            className="absolute rounded-full overflow-hidden"
            style={{ width: s.ring - 4, height: s.ring - 4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute w-full h-1"
              style={{
                background: `linear-gradient(90deg, transparent, ${stateColors[state]}, transparent)`,
              }}
              animate={{ top: ['-10%', '110%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// Floating V AI Button for bottom navigation
export function VAICoreFloat({ onClick, state = 'idle' }: { onClick: () => void; state?: 'idle' | 'thinking' | 'executing' | 'success' }) {
  return (
    <motion.div
      className="relative"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {/* Floating platform glow */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full bg-blue-500/20 blur-xl"
        animate={{
          scaleX: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Elevated platform */}
      <motion.div
        className="relative -mt-6 p-1 rounded-full bg-gradient-to-b from-white/10 to-transparent"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="p-1 rounded-full bg-black/80 backdrop-blur-xl border border-white/10">
          <VAICore onClick={onClick} state={state} size="lg" />
        </div>
      </motion.div>
    </motion.div>
  )
}

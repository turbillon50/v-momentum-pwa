'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type AIState = 'idle' | 'thinking' | 'executing' | 'success'

interface VAIButtonProps {
  state?: AIState
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  className?: string
}

export function VAIButton({ 
  state = 'idle', 
  size = 'md',
  onClick,
  className = ''
}: VAIButtonProps) {
  const [eyeBlink, setEyeBlink] = useState(false)
  
  // Occasional eye micro-movements
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setEyeBlink(true)
        setTimeout(() => setEyeBlink(false), 150)
      }
    }, 3000)
    return () => clearInterval(blinkInterval)
  }, [])

  const sizes = {
    sm: { container: 40, ring: 36, eye: 3 },
    md: { container: 56, ring: 48, eye: 4 },
    lg: { container: 72, ring: 64, eye: 5 },
  }

  const s = sizes[size]

  const ringVariants = {
    idle: {
      rotate: 360,
      transition: { duration: 8, repeat: Infinity, ease: 'linear' }
    },
    thinking: {
      rotate: 360,
      transition: { duration: 2, repeat: Infinity, ease: 'linear' }
    },
    executing: {
      scale: [1, 1.1, 1],
      rotate: 360,
      transition: { 
        scale: { duration: 0.5, repeat: Infinity },
        rotate: { duration: 1.5, repeat: Infinity, ease: 'linear' }
      }
    },
    success: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 }
    }
  }

  const glowIntensity = {
    idle: 'shadow-[0_0_20px_rgba(59,130,246,0.5),0_0_40px_rgba(59,130,246,0.3)]',
    thinking: 'shadow-[0_0_30px_rgba(59,130,246,0.7),0_0_60px_rgba(59,130,246,0.4)]',
    executing: 'shadow-[0_0_40px_rgba(59,130,246,0.8),0_0_80px_rgba(59,130,246,0.5)]',
    success: 'shadow-[0_0_50px_rgba(34,197,94,0.8),0_0_100px_rgba(34,197,94,0.5)]'
  }

  return (
    <motion.button
      onClick={onClick}
      className={`relative flex items-center justify-center rounded-full cursor-pointer ${className}`}
      style={{ width: s.container, height: s.container }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer glow */}
      <div 
        className={`absolute inset-0 rounded-full transition-shadow duration-500 ${glowIntensity[state]}`}
      />
      
      {/* Animated ring */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: s.ring, height: s.ring }}
        variants={ringVariants}
        animate={state}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.8))' }}
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          
          {/* Main ring */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#neonGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={state === 'idle' ? '200 80' : state === 'thinking' ? '100 50' : '150 30'}
          />
          
          {/* Inner subtle ring */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="rgba(59,130,246,0.3)"
            strokeWidth="1"
          />
        </svg>
      </motion.div>

      {/* Center face with eyes */}
      <div 
        className="relative rounded-full bg-gradient-to-b from-[#0a1628] to-[#0f172a] flex items-center justify-center gap-2"
        style={{ 
          width: s.ring - 16, 
          height: s.ring - 16,
          boxShadow: 'inset 0 2px 10px rgba(59,130,246,0.2)'
        }}
      >
        {/* Left eye */}
        <motion.div
          className="rounded-full bg-gradient-to-b from-blue-400 to-blue-600"
          style={{ 
            width: s.eye, 
            height: eyeBlink ? 1 : s.eye * 3,
            boxShadow: '0 0 8px rgba(59,130,246,0.8), 0 0 16px rgba(59,130,246,0.5)'
          }}
          animate={{ 
            height: eyeBlink ? 1 : s.eye * 3,
            y: state === 'thinking' ? [0, -1, 0, 1, 0] : 0
          }}
          transition={{ 
            height: { duration: 0.1 },
            y: { duration: 1, repeat: state === 'thinking' ? Infinity : 0 }
          }}
        />
        
        {/* Right eye */}
        <motion.div
          className="rounded-full bg-gradient-to-b from-blue-400 to-blue-600"
          style={{ 
            width: s.eye, 
            height: eyeBlink ? 1 : s.eye * 3,
            boxShadow: '0 0 8px rgba(59,130,246,0.8), 0 0 16px rgba(59,130,246,0.5)'
          }}
          animate={{ 
            height: eyeBlink ? 1 : s.eye * 3,
            y: state === 'thinking' ? [0, -1, 0, 1, 0] : 0
          }}
          transition={{ 
            height: { duration: 0.1 },
            y: { duration: 1, repeat: state === 'thinking' ? Infinity : 0, delay: 0.1 }
          }}
        />
      </div>
    </motion.button>
  )
}

// Larger version for splash screen and hero
export function VAILogo({ size = 120, animated = true }: { size?: number; animated?: boolean }) {
  const [eyeBlink, setEyeBlink] = useState(false)
  
  useEffect(() => {
    if (!animated) return
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setEyeBlink(true)
        setTimeout(() => setEyeBlink(false), 150)
      }
    }, 3000)
    return () => clearInterval(blinkInterval)
  }, [animated])

  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer glow */}
      <div 
        className="absolute inset-0 rounded-full animate-pulse-glow"
        style={{ 
          background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)'
        }}
      />
      
      {/* Animated ring */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: size * 0.85, height: size * 0.85 }}
        animate={animated ? { rotate: 360 } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 0 12px rgba(59,130,246,0.8))' }}
        >
          <defs>
            <linearGradient id="neonGradientLarge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="30%" stopColor="#60a5fa" />
              <stop offset="70%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          
          {/* Main ring */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#neonGradientLarge)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="200 80"
          />
          
          {/* Inner ring */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(59,130,246,0.2)"
            strokeWidth="1"
          />
        </svg>
      </motion.div>

      {/* Center face */}
      <div 
        className="relative rounded-full bg-gradient-to-b from-[#0a1628] to-[#0f172a] flex items-center justify-center gap-3"
        style={{ 
          width: size * 0.55, 
          height: size * 0.55,
          boxShadow: 'inset 0 4px 20px rgba(59,130,246,0.3), 0 0 30px rgba(59,130,246,0.2)'
        }}
      >
        {/* Left eye */}
        <motion.div
          className="rounded-full bg-gradient-to-b from-blue-400 to-blue-600"
          style={{ 
            width: size * 0.06,
            boxShadow: '0 0 12px rgba(59,130,246,0.9), 0 0 24px rgba(59,130,246,0.6)'
          }}
          animate={{ height: eyeBlink ? 2 : size * 0.18 }}
          transition={{ duration: 0.1 }}
        />
        
        {/* Right eye */}
        <motion.div
          className="rounded-full bg-gradient-to-b from-blue-400 to-blue-600"
          style={{ 
            width: size * 0.06,
            boxShadow: '0 0 12px rgba(59,130,246,0.9), 0 0 24px rgba(59,130,246,0.6)'
          }}
          animate={{ height: eyeBlink ? 2 : size * 0.18 }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  )
}

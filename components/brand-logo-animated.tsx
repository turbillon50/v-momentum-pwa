'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface BrandLogoAnimatedProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  showTagline?: boolean
  className?: string
}

const sizes = {
  sm: { logo: 'h-12', ring: 80, ringWidth: 2 },
  md: { logo: 'h-20', ring: 120, ringWidth: 3 },
  lg: { logo: 'h-32', ring: 180, ringWidth: 4 },
  xl: { logo: 'h-44', ring: 240, ringWidth: 5 },
  hero: { logo: 'h-56 md:h-72', ring: 320, ringWidth: 6 },
}

// Pre-calculated particle positions for deterministic rendering
const ENERGY_PARTICLES = [
  { angle: 0, delay: 0 },
  { angle: 72, delay: 0.3 },
  { angle: 144, delay: 0.6 },
  { angle: 216, delay: 0.9 },
  { angle: 288, delay: 1.2 },
]

export function BrandLogoAnimated({ 
  size = 'lg', 
  showTagline = false,
  className = '' 
}: BrandLogoAnimatedProps) {
  const config = sizes[size]
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Outer glow pulse */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: config.ring + 60,
          height: config.ring + 60,
          background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Energy ring container */}
      <div 
        className="absolute"
        style={{ width: config.ring, height: config.ring }}
      >
        {/* Main rotating ring */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="25%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="75%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth={config.ringWidth}
            strokeLinecap="round"
            filter="url(#glow)"
            strokeDasharray="20 10 40 10"
          />
        </motion.svg>

        {/* Secondary counter-rotating ring */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          animate={{ rotate: -360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgba(59,130,246,0.3)"
            strokeWidth={1}
            strokeDasharray="5 15"
          />
        </motion.svg>

        {/* Energy particles on ring */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-400"
            style={{
              left: '50%',
              top: '50%',
              marginLeft: -4,
              marginTop: -4,
              boxShadow: '0 0 10px #3b82f6, 0 0 20px #3b82f6',
            }}
            animate={{
              x: [
                Math.cos((angle * Math.PI) / 180) * (config.ring / 2 - 10),
                Math.cos(((angle + 360) * Math.PI) / 180) * (config.ring / 2 - 10),
              ],
              y: [
                Math.sin((angle * Math.PI) / 180) * (config.ring / 2 - 10),
                Math.sin(((angle + 360) * Math.PI) / 180) * (config.ring / 2 - 10),
              ],
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Logo image with glow */}
      <motion.div
        className="relative z-10"
        animate={{
          filter: [
            'drop-shadow(0 0 30px rgba(59,130,246,0.5))',
            'drop-shadow(0 0 50px rgba(139,92,246,0.5))',
            'drop-shadow(0 0 30px rgba(6,182,212,0.5))',
            'drop-shadow(0 0 30px rgba(59,130,246,0.5))',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <img
          src="/images/v-momentum-logo.jpeg"
          alt="V Momentum"
          className={`${config.logo} w-auto object-contain`}
        />
      </motion.div>

      {/* Tagline */}
      {showTagline && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-white/50 text-sm tracking-[0.3em] uppercase"
        >
          SaaS Technology Apps Design
        </motion.p>
      )}
    </div>
  )
}

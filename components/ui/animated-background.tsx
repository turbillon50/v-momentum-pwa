'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      hue: number
    }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      const count = Math.floor((canvas.width * canvas.height) / 15000)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          hue: 200 + Math.random() * 40, // Blue to cyan range
        })
      }
    }

    const drawGradientOrbs = (time: number) => {
      // Large moving gradient orbs
      const orbs = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: 300, hue: 220 },
        { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: 250, hue: 260 },
        { x: canvas.width * 0.5, y: canvas.height * 0.5, radius: 350, hue: 200 },
      ]

      orbs.forEach((orb, i) => {
        const offsetX = Math.sin(time * 0.0005 + i) * 50
        const offsetY = Math.cos(time * 0.0003 + i * 2) * 50
        
        const gradient = ctx.createRadialGradient(
          orb.x + offsetX,
          orb.y + offsetY,
          0,
          orb.x + offsetX,
          orb.y + offsetY,
          orb.radius
        )
        gradient.addColorStop(0, `hsla(${orb.hue}, 100%, 50%, 0.15)`)
        gradient.addColorStop(0.5, `hsla(${orb.hue}, 100%, 40%, 0.05)`)
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })
    }

    const drawEnergyWaves = (time: number) => {
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)'
      ctx.lineWidth = 1

      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        for (let x = 0; x < canvas.width; x += 5) {
          const y = canvas.height / 2 + 
            Math.sin(x * 0.01 + time * 0.002 + i * 2) * 100 +
            Math.sin(x * 0.02 + time * 0.001) * 50
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }
    }

    const animate = (time: number) => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.95)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawGradientOrbs(time)
      drawEnergyWaves(time)

      // Draw and update particles
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Pulse opacity
        const pulse = Math.sin(time * 0.003 + p.x * 0.01) * 0.2 + 0.8

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.opacity * pulse})`
        ctx.fill()
      })

      // Draw connection lines between nearby particles
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    createParticles()
    animate(0)

    window.addEventListener('resize', () => {
      resize()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #000000 0%, #050510 50%, #000000 100%)' }}
      />
      {/* Additional gradient overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(ellipse at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </>
  )
}

export function GlowOrb({ className = '', color = 'blue' }: { className?: string; color?: 'blue' | 'purple' | 'cyan' }) {
  const colors = {
    blue: 'from-blue-500/20 via-blue-600/10 to-transparent',
    purple: 'from-purple-500/20 via-purple-600/10 to-transparent',
    cyan: 'from-cyan-500/20 via-cyan-600/10 to-transparent',
  }

  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-radial ${colors[color]} blur-3xl ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

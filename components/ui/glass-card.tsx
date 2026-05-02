'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  glowColor?: 'blue' | 'purple' | 'cyan' | 'green' | 'orange' | 'none'
  variant?: 'default' | 'elevated' | 'subtle'
  interactive?: boolean
}

const glowColors = {
  blue: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:border-blue-500/50',
  purple: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-purple-500/50',
  cyan: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:border-cyan-500/50',
  green: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:border-green-500/50',
  orange: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:border-orange-500/50',
  none: '',
}

const variants = {
  default: 'bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]',
  elevated: 'bg-white/[0.05] backdrop-blur-2xl border border-white/[0.12] shadow-2xl',
  subtle: 'bg-white/[0.02] backdrop-blur-lg border border-white/[0.05]',
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, glowColor = 'blue', variant = 'default', interactive = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-500',
          variants[variant],
          interactive && glowColors[glowColor],
          interactive && 'cursor-pointer',
          className
        )}
        whileHover={interactive ? { 
          scale: 1.02,
          y: -4,
        } : undefined}
        whileTap={interactive ? { scale: 0.98 } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
GlassCard.displayName = 'GlassCard'

export function GlassPanel({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={cn(
      'relative overflow-hidden rounded-3xl',
      'bg-gradient-to-br from-white/[0.08] to-white/[0.02]',
      'backdrop-blur-2xl',
      'border border-white/[0.1]',
      'shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
      className
    )}>
      {/* Inner glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export function GlowBorder({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('relative group', className)}>
      {/* Animated border gradient */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
          backgroundSize: '300% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      {/* Inner content */}
      <div className="relative bg-black rounded-2xl">
        {children}
      </div>
    </div>
  )
}

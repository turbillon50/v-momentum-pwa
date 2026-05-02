'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

interface HeroPremiumProps {
  onNavigate: (section: string) => void
}

export function HeroPremium({ onNavigate }: HeroPremiumProps) {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  const techKeywords = ['APPS', 'AUTOMATION', 'IA', 'CLOUD', 'PERFORMANCE', 'WEB3', 'SAAS']

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity, scale, position: 'relative' }}
    >
      {/* Floating tech keywords */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {techKeywords.map((word, i) => (
          <motion.span
            key={word}
            className="absolute text-white/[0.03] text-6xl md:text-8xl font-bold tracking-wider"
            style={{
              left: `${10 + (i * 15) % 80}%`,
              top: `${15 + (i * 20) % 70}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.02, 0.05, 0.02],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-4 text-center"
        style={{ y }}
      >
        {/* Brand logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <motion.img 
            src="/images/v-momentum-logo.jpeg" 
            alt="V Momentum" 
            className="h-24 md:h-36 lg:h-44 w-auto mx-auto object-contain"
            style={{
              filter: 'drop-shadow(0 0 60px rgba(59,130,246,0.4))',
            }}
            animate={{
              filter: [
                'drop-shadow(0 0 60px rgba(59,130,246,0.4))',
                'drop-shadow(0 0 80px rgba(59,130,246,0.6))',
                'drop-shadow(0 0 60px rgba(59,130,246,0.4))',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium
                       bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20
                       border border-white/10 backdrop-blur-xl"
            animate={{
              boxShadow: [
                '0 0 20px rgba(59,130,246,0.2)',
                '0 0 40px rgba(139,92,246,0.3)',
                '0 0 20px rgba(6,182,212,0.2)',
                '0 0 20px rgba(59,130,246,0.2)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {t.hero.badge}
            </span>
          </motion.span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="block text-balance">
            {t.hero.title.split('.').map((part, i) => (
              <motion.span
                key={i}
                className={i === 2 ? 'bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent' : 'text-white'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.2 }}
              >
                {part}{i < 2 ? '.' : ''}{' '}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <motion.button
            onClick={() => onNavigate('contacto')}
            className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden min-w-[200px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
                backgroundSize: '300% 100%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                boxShadow: '0 0 40px rgba(59,130,246,0.6), 0 0 80px rgba(139,92,246,0.4)',
              }}
            />
            <span className="relative flex items-center justify-center gap-2">
              {t.hero.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            onClick={() => onNavigate('demos')}
            className="group px-8 py-4 rounded-2xl font-semibold text-white/80 hover:text-white
                       border border-white/20 hover:border-white/40 backdrop-blur-xl
                       flex items-center gap-2 min-w-[200px] justify-center
                       hover:bg-white/5 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-5 h-5" />
            {t.hero.ctaSecondary}
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white/60"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Cinematic image showcase - floating devices */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[40vh] pointer-events-none overflow-hidden opacity-30"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 1.5, delay: 1.5 }}
      >
        <motion.img
          src="/images/gallery/hero-cinematic.jpeg"
          alt="V Momentum Showcase"
          className="w-full h-full object-cover object-top"
          style={{
            maskImage: 'linear-gradient(to top, transparent, black 50%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent, black 50%)',
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.section>
  )
}

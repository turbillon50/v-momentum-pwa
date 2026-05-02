'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'

// Premium UI Components
import { AnimatedBackground } from '@/components/ui/animated-background'

// Navigation
import { TopNav } from '@/components/navigation/top-nav'
import { BottomNav } from '@/components/navigation/bottom-nav'

// Premium Sections
import { HeroPremium } from '@/components/sections/hero-premium'
import { ProcesoSection } from '@/components/sections/proceso-section'
import { IntegrationsEcosystem } from '@/components/sections/integrations-ecosystem'
import { MarketingGallery } from '@/components/sections/marketing-gallery'
import { PricingSection } from '@/components/sections/pricing-section'
import { DemosSection } from '@/components/sections/demos-section'
import { FuenteVerdadSection } from '@/components/sections/fuente-verdad-section'
import { ContactSection } from '@/components/sections/contact-section'

// V Assistant
import { VAssistantModal } from '@/components/v-assistant-modal'

// Language
import { useLanguage } from '@/lib/i18n'

// Deterministic particle positions to avoid hydration mismatch
const SPLASH_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: (i * 31.7 + 13) % 100, // Deterministic spread
  top: (i * 23.9 + 7) % 100,
  delay: (i * 0.07) % 2,
  duration: 3 + (i % 3),
}))

const ENERGY_WAVES = [
  { size: 200, delay: 0 },
  { size: 350, delay: 0.5 },
  { size: 500, delay: 1 },
]

// Premium Splash Screen
function PremiumSplash({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2800)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Animated particles background - deterministic positions */}
      <div className="absolute inset-0">
        {SPLASH_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-blue-500/50 rounded-full"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Energy waves */}
      {ENERGY_WAVES.map((wave, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-blue-500/20"
          style={{ width: wave.size, height: wave.size }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: wave.delay,
          }}
        />
      ))}

      {/* Logo container */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: 'spring' }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 blur-[100px] -z-10"
          animate={{
            background: [
              'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Logo */}
        <motion.img
          src="/images/v-momentum-logo.jpeg"
          alt="V Momentum"
          className="h-40 md:h-56 w-auto"
          animate={{
            filter: [
              'drop-shadow(0 0 60px rgba(59,130,246,0.6))',
              'drop-shadow(0 0 80px rgba(139,92,246,0.6))',
              'drop-shadow(0 0 60px rgba(6,182,212,0.6))',
              'drop-shadow(0 0 60px rgba(59,130,246,0.6))',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Loading bar */}
        <motion.div
          className="mt-10 w-48 h-1 bg-white/10 rounded-full overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.3, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-white/40 text-sm tracking-widest"
        >
          SYSTEM INTERFACE LOADING
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [activeSection, setActiveSection] = useState('inicio')
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)
  const [aiState, setAiState] = useState<'idle' | 'thinking' | 'executing' | 'success'>('idle')
  const { theme } = useTheme()
  const { language, t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  // Smooth scroll navigation
  const handleNavigate = (section: string) => {
    setActiveSection(section)
    setIsAssistantOpen(false)
    
    const element = sectionRefs.current[section]
    if (element) {
      const offset = section === 'inicio' ? 0 : 80
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: 'smooth',
      })
    }
  }

  // V AI interaction
  const handleVClick = () => {
    setIsAssistantOpen(true)
    setAiState('thinking')
    setTimeout(() => setAiState('idle'), 1500)
  }

  // Scroll tracking
  useEffect(() => {
    if (showSplash) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3
      const sections = ['inicio', 'proceso', 'integraciones', 'galeria', 'demos', 'fuente', 'precios', 'contacto']
      
      for (const section of sections) {
        const element = sectionRefs.current[section]
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showSplash])

  return (
    <>
      {/* Premium Splash */}
      <AnimatePresence mode="wait">
        {showSplash && <PremiumSplash onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {/* System Interface */}
      <AnimatePresence>
        {!showSplash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen bg-black text-white overflow-x-hidden"
            style={{ position: 'relative' }}
          >
            {/* Living Animated Background */}
            <AnimatedBackground />

            {/* Top Navigation - Desktop */}
            <TopNav
              activeSection={activeSection}
              onNavigate={handleNavigate}
              onVClick={handleVClick}
              aiState={aiState}
            />

            {/* Main System Content */}
            <main className="relative z-10">
              {/* HERO - Full Screen Cinematic */}
              <section ref={(el) => { sectionRefs.current['inicio'] = el }} id="inicio">
                <HeroPremium onNavigate={handleNavigate} />
              </section>

              {/* PROCESO - Momentum Flow */}
              <section ref={(el) => { sectionRefs.current['proceso'] = el }} id="proceso">
                <ProcesoSection />
              </section>

              {/* INTEGRACIONES - Interactive Ecosystem */}
              <section ref={(el) => { sectionRefs.current['integraciones'] = el }} id="integraciones">
                <IntegrationsEcosystem />
              </section>

              {/* GALERIA - Marketing Materials */}
              <section ref={(el) => { sectionRefs.current['galeria'] = el }} id="galeria">
                <MarketingGallery />
              </section>

              {/* DEMOS - Case Studies */}
              <section ref={(el) => { sectionRefs.current['demos'] = el }} id="demos">
                <DemosSection onNavigate={handleNavigate} />
              </section>

              {/* FUENTE DE VERDAD */}
              <section ref={(el) => { sectionRefs.current['fuente'] = el }} id="fuente">
                <FuenteVerdadSection />
              </section>

              {/* PRECIOS */}
              <section ref={(el) => { sectionRefs.current['precios'] = el }} id="precios">
                <PricingSection onNavigate={handleNavigate} />
              </section>

              {/* CONTACTO */}
              <section ref={(el) => { sectionRefs.current['contacto'] = el }} id="contacto">
                <ContactSection />
              </section>

              {/* FOOTER */}
              <footer className="relative border-t border-white/10 py-16 px-6">
                <div className="max-w-6xl mx-auto">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo */}
                    <motion.img 
                      src="/images/v-momentum-logo.jpeg" 
                      alt="V Momentum" 
                      className="h-12 w-auto"
                      style={{ filter: 'drop-shadow(0 0 30px rgba(59,130,246,0.4))' }}
                      whileHover={{ scale: 1.05 }}
                    />

                    {/* Nav Links */}
                    <nav className="flex flex-wrap justify-center gap-6 text-sm">
                      {['proceso', 'integraciones', 'galeria', 'demos', 'precios', 'contacto'].map((section) => (
                        <motion.button
                          key={section}
                          onClick={() => handleNavigate(section)}
                          className="text-white/50 hover:text-white transition-colors capitalize"
                          whileHover={{ scale: 1.05 }}
                        >
                          {section === 'galeria' ? (language === 'es' ? 'Galería' : 'Gallery') : section}
                        </motion.button>
                      ))}
                    </nav>

                    {/* Copyright */}
                    <p className="text-sm text-white/30">
                      © {new Date().getFullYear()} V Momentum
                    </p>
                  </div>

                  {/* Tagline */}
                  <motion.div 
                    className="text-center mt-12 pt-8 border-t border-white/5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-lg text-white/40 italic">
                      {language === 'es' ? '"No es magia. Es sistema."' : '"It\'s not magic. It\'s a system."'}
                    </p>
                    <p className="mt-3 text-sm font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      V Momentum — All Global Holding
                    </p>
                  </motion.div>
                </div>
              </footer>
            </main>

            {/* Bottom Navigation - Mobile Only */}
            <div className="md:hidden">
              <BottomNav
                activeSection={activeSection}
                onNavigate={handleNavigate}
                onVClick={handleVClick}
                aiState={aiState}
              />
            </div>

            {/* V Assistant Modal */}
            <VAssistantModal
              isOpen={isAssistantOpen}
              onClose={() => setIsAssistantOpen(false)}
              onNavigate={handleNavigate}
            />

            {/* Mobile safe area */}
            <div className="h-28 md:h-0" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'

// Components
import { SplashScreen } from '@/components/splash-screen'
import { MobileNav } from '@/components/mobile-nav'
import { DesktopNav } from '@/components/desktop-nav'
import { VAssistantPanel } from '@/components/v-assistant-panel'

// Sections - Cinematic & Premium
import { HeroCinematic } from '@/components/sections/hero-cinematic'
import { ProcesoSection } from '@/components/sections/proceso-section'
import { IntegrationsGallery } from '@/components/sections/integrations-gallery'
import { MarketingShowcase } from '@/components/sections/marketing-showcase'
import { PricingSection } from '@/components/sections/pricing-section'
import { DemosSection } from '@/components/sections/demos-section'
import { ContactSection } from '@/components/sections/contact-section'

// Language
import { useLanguage } from '@/lib/i18n'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [activeSection, setActiveSection] = useState('inicio')
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)
  const [aiState, setAiState] = useState<'idle' | 'thinking' | 'executing' | 'success'>('idle')
  const { theme, setTheme } = useTheme()
  const { language, t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  
  // Section refs for scroll detection
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle splash completion
  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  // Navigate to section
  const handleNavigate = (section: string) => {
    setActiveSection(section)
    setIsAssistantOpen(false)
    
    // Scroll to section
    const element = sectionRefs.current[section]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle V AI button click
  const handleVClick = () => {
    setIsAssistantOpen(true)
    setAiState('thinking')
    setTimeout(() => setAiState('idle'), 1000)
  }

  // Toggle theme
  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  
  // Get current theme (handle SSR)
  const currentTheme = mounted ? theme : 'dark'

  // Scroll detection for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'proceso', 'integraciones', 'portfolio', 'demos', 'precios', 'contacto']
      
      for (const section of sections) {
        const element = sectionRefs.current[section]
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {/* Main App */}
      {!showSplash && (
        <div className="min-h-screen bg-background">
          {/* Desktop Navigation */}
          <DesktopNav
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onVClick={handleVClick}
            aiState={aiState}
            theme={currentTheme as 'dark' | 'light'}
            onThemeToggle={handleThemeToggle}
          />

          {/* Main Content */}
          <main className="pb-24 md:pb-0">
            {/* HERO CINEMATOGRAFICO - Full Screen */}
            <section 
              ref={(el) => { sectionRefs.current['inicio'] = el }}
              id="inicio"
            >
              <HeroCinematic onNavigate={handleNavigate} />
            </section>

            {/* PROCESO MOMENTUM */}
            <section 
              ref={(el) => { sectionRefs.current['proceso'] = el }}
              id="proceso"
            >
              <ProcesoSection />
            </section>

            {/* INTEGRACIONES GALLERY - Apple TV Style */}
            <section 
              ref={(el) => { sectionRefs.current['integraciones'] = el }}
              id="integraciones"
            >
              <IntegrationsGallery />
            </section>

            {/* MARKETING SHOWCASE - Portfolio Grid */}
            <section 
              ref={(el) => { sectionRefs.current['portfolio'] = el }}
              id="portfolio"
            >
              <MarketingShowcase />
            </section>

            {/* DEMOS / CASOS DE USO */}
            <section 
              ref={(el) => { sectionRefs.current['demos'] = el }}
              id="demos"
            >
              <DemosSection onNavigate={handleNavigate} />
            </section>

            {/* PRECIOS */}
            <section 
              ref={(el) => { sectionRefs.current['precios'] = el }}
              id="precios"
            >
              <PricingSection onNavigate={handleNavigate} />
            </section>

            {/* CONTACTO / DIAGNOSTICO */}
            <section 
              ref={(el) => { sectionRefs.current['contacto'] = el }}
              id="contacto"
            >
              <ContactSection />
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-12 px-6 md:px-12 lg:px-20">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  {/* Logo */}
                  <div className="flex items-center">
                    <img 
                      src="/images/v-momentum-logo.jpeg" 
                      alt="V Momentum" 
                      className="h-12 w-auto object-contain"
                      style={{ filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.3))' }}
                    />
                  </div>

                  {/* Links */}
                  <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
                    <button onClick={() => handleNavigate('proceso')} className="text-muted-foreground hover:text-foreground transition-colors">
                      {t.nav.process}
                    </button>
                    <button onClick={() => handleNavigate('integraciones')} className="text-muted-foreground hover:text-foreground transition-colors">
                      {t.nav.integrations}
                    </button>
                    <button onClick={() => handleNavigate('portfolio')} className="text-muted-foreground hover:text-foreground transition-colors">
                      {language === 'es' ? 'Portafolio' : 'Portfolio'}
                    </button>
                    <button onClick={() => handleNavigate('demos')} className="text-muted-foreground hover:text-foreground transition-colors">
                      {t.nav.demos}
                    </button>
                    <button onClick={() => handleNavigate('precios')} className="text-muted-foreground hover:text-foreground transition-colors">
                      {t.nav.pricing}
                    </button>
                    <button onClick={() => handleNavigate('contacto')} className="text-muted-foreground hover:text-foreground transition-colors">
                      {t.nav.contact}
                    </button>
                  </nav>

                  {/* Copyright */}
                  <div className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} V Momentum. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
                  </div>
                </div>

                {/* Tagline */}
                <div className="text-center mt-8 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground italic">
                    {language === 'es' 
                      ? '"No es magia. Es sistema."'
                      : '"It\'s not magic. It\'s a system."'}
                  </p>
                  <p className="text-xs text-primary mt-2 font-medium">
                    V Momentum — All Global Holding
                  </p>
                </div>
              </div>
            </footer>
          </main>

          {/* Mobile Navigation */}
          <MobileNav
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onVClick={handleVClick}
            aiState={aiState}
          />

          {/* V Assistant Panel */}
          <VAssistantPanel
            isOpen={isAssistantOpen}
            onClose={() => setIsAssistantOpen(false)}
            onNavigate={handleNavigate}
          />
        </div>
      )}
    </>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'

// Components
import { SplashScreen } from '@/components/splash-screen'
import { MobileNav } from '@/components/mobile-nav'
import { DesktopNav } from '@/components/desktop-nav'
import { VAssistantPanel } from '@/components/v-assistant-panel'

// Sections
import { HeroSection } from '@/components/sections/hero-section'
import { ProcesoSection } from '@/components/sections/proceso-section'
import { IntegrationsSection } from '@/components/sections/integrations-section'
import { PricingSection } from '@/components/sections/pricing-section'
import { DemosSection } from '@/components/sections/demos-section'
import { FuenteVerdadSection } from '@/components/sections/fuente-verdad-section'
import { DashboardClientSection } from '@/components/sections/dashboard-client-section'
import { DashboardAdminSection } from '@/components/sections/dashboard-admin-section'
import { ContactSection } from '@/components/sections/contact-section'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [activeSection, setActiveSection] = useState('inicio')
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)
  const [aiState, setAiState] = useState<'idle' | 'thinking' | 'executing' | 'success'>('idle')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  
  // Section refs for scroll detection
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

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
    // Simulate AI state changes
    setAiState('thinking')
    setTimeout(() => setAiState('idle'), 1000)
  }

  // Toggle theme
  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.toggle('light', newTheme === 'light')
  }

  // Scroll detection for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'proceso', 'integraciones', 'precios', 'demos', 'fuente-verdad', 'dashboard-cliente', 'dashboard-admin', 'contacto']
      
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
            theme={theme}
            onThemeToggle={handleThemeToggle}
          />

          {/* Main Content */}
          <main className="pb-24 md:pb-0">
            {/* Hero / Inicio */}
            <section 
              ref={(el) => { sectionRefs.current['inicio'] = el }}
              id="inicio"
            >
              <HeroSection onNavigate={handleNavigate} />
            </section>

            {/* Proceso Momentum */}
            <section 
              ref={(el) => { sectionRefs.current['proceso'] = el }}
            >
              <ProcesoSection />
            </section>

            {/* Integraciones */}
            <section 
              ref={(el) => { sectionRefs.current['integraciones'] = el }}
            >
              <IntegrationsSection />
            </section>

            {/* Demos / Casos de Uso */}
            <section 
              ref={(el) => { sectionRefs.current['demos'] = el }}
            >
              <DemosSection onNavigate={handleNavigate} />
            </section>

            {/* Precios */}
            <section 
              ref={(el) => { sectionRefs.current['precios'] = el }}
            >
              <PricingSection onNavigate={handleNavigate} />
            </section>

            {/* Fuente de Verdad */}
            <section 
              ref={(el) => { sectionRefs.current['fuente-verdad'] = el }}
            >
              <FuenteVerdadSection />
            </section>

            {/* Dashboard Cliente Preview */}
            <section 
              ref={(el) => { sectionRefs.current['dashboard-cliente'] = el }}
            >
              <DashboardClientSection />
            </section>

            {/* Dashboard Admin Preview */}
            <section 
              ref={(el) => { sectionRefs.current['dashboard-admin'] = el }}
            >
              <DashboardAdminSection />
            </section>

            {/* Contacto / Diagnóstico */}
            <section 
              ref={(el) => { sectionRefs.current['contacto'] = el }}
            >
              <ContactSection />
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-12 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Logo */}
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold chrome-text">V</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-light text-foreground/90">Momentum</span>
                      <span className="text-[8px] text-primary tracking-[0.2em] uppercase">SaaS Technology Apps Design</span>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                    <button onClick={() => handleNavigate('proceso')} className="hover:text-foreground transition-colors">Proceso</button>
                    <button onClick={() => handleNavigate('integraciones')} className="hover:text-foreground transition-colors">Integraciones</button>
                    <button onClick={() => handleNavigate('precios')} className="hover:text-foreground transition-colors">Precios</button>
                    <button onClick={() => handleNavigate('demos')} className="hover:text-foreground transition-colors">Demos</button>
                    <button onClick={() => handleNavigate('contacto')} className="hover:text-foreground transition-colors">Contacto</button>
                  </div>

                  {/* Copyright */}
                  <div className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} V Momentum. Todos los derechos reservados.
                  </div>
                </div>

                {/* Tagline */}
                <div className="text-center mt-8 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {"\"Esto no es una landing page. Esto es la fábrica de apps.\""}
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

'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useLanguage } from '@/lib/i18n'
import { 
  Home, Puzzle, Rocket, CreditCard, MessageCircle, 
  ChevronRight, Sun, Moon, Globe, Menu, X,
  Sparkles, Zap, Database, Bot, Shield, Cloud, Code, Wallet
} from 'lucide-react'

// Screens
import { HomeScreen } from './screens/home-screen'
import { IntegrationsScreen } from './screens/integrations-screen'
import { ProcessScreen } from './screens/process-screen'
import { PricingScreen } from './screens/pricing-screen'
import { ContactScreen } from './screens/contact-screen'

// V AI Core
import { VAIOrb } from './v-ai-orb'

type Screen = 'home' | 'integrations' | 'process' | 'pricing' | 'contact'

const screens = [
  { id: 'home' as Screen, icon: Home, label: { es: 'Inicio', en: 'Home' } },
  { id: 'integrations' as Screen, icon: Puzzle, label: { es: 'Integraciones', en: 'Integrations' } },
  { id: 'process' as Screen, icon: Rocket, label: { es: 'Proceso', en: 'Process' } },
  { id: 'pricing' as Screen, icon: CreditCard, label: { es: 'Precios', en: 'Pricing' } },
  { id: 'contact' as Screen, icon: MessageCircle, label: { es: 'Contacto', en: 'Contact' } },
]

export function AppShell() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [isVAIOpen, setIsVAIOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigateTo = useCallback((screen: Screen) => {
    setCurrentScreen(screen)
    setMenuOpen(false)
  }, [])

  const currentTheme = mounted ? theme : 'dark'

  // Screen transition variants
  const screenVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={navigateTo} />
      case 'integrations':
        return <IntegrationsScreen />
      case 'process':
        return <ProcessScreen />
      case 'pricing':
        return <PricingScreen onNavigate={navigateTo} />
      case 'contact':
        return <ContactScreen />
      default:
        return <HomeScreen onNavigate={navigateTo} />
    }
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
          style={{
            background: currentTheme === 'dark' 
              ? 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
          style={{
            background: currentTheme === 'dark'
              ? 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <motion.div 
            className="flex items-center justify-between px-4 py-3 rounded-2xl backdrop-blur-xl border"
            style={{
              background: currentTheme === 'dark' 
                ? 'rgba(0,0,0,0.6)' 
                : 'rgba(255,255,255,0.8)',
              borderColor: currentTheme === 'dark'
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.1)',
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigateTo('home')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <motion.div
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(59,130,246,0.5)',
                      '0 0 30px rgba(139,92,246,0.5)',
                      '0 0 20px rgba(6,182,212,0.5)',
                      '0 0 20px rgba(59,130,246,0.5)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-white font-bold text-xl">V</span>
                </motion.div>
              </div>
              <div className="hidden sm:block">
                <p className="font-semibold text-foreground">Momentum</p>
                <p className="text-[10px] text-muted-foreground tracking-wider">SaaS Apps Factory</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {screens.map((screen) => (
                <motion.button
                  key={screen.id}
                  onClick={() => navigateTo(screen.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    currentScreen === screen.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {screen.label[language]}
                </motion.button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <motion.button
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-medium">{language.toUpperCase()}</span>
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>

              {/* CTA Button */}
              <motion.button
                onClick={() => navigateTo('contact')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59,130,246,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-4 h-4" />
                {t.hero.cta}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mx-4 mt-2 overflow-hidden"
            >
              <div 
                className="p-4 rounded-2xl backdrop-blur-xl border"
                style={{
                  background: currentTheme === 'dark' 
                    ? 'rgba(0,0,0,0.8)' 
                    : 'rgba(255,255,255,0.9)',
                  borderColor: currentTheme === 'dark'
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(0,0,0,0.1)',
                }}
              >
                {screens.map((screen) => (
                  <motion.button
                    key={screen.id}
                    onClick={() => navigateTo(screen.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                      currentScreen === screen.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <screen.icon className="w-5 h-5" />
                    <span className="font-medium">{screen.label[language]}</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 pb-32 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* V AI Floating Orb */}
      <VAIOrb 
        isOpen={isVAIOpen} 
        onToggle={() => setIsVAIOpen(!isVAIOpen)}
        onNavigate={navigateTo}
      />

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="mx-4 mb-4">
          <motion.div
            className="flex items-center justify-around px-2 py-3 rounded-2xl backdrop-blur-xl border"
            style={{
              background: currentTheme === 'dark' 
                ? 'rgba(0,0,0,0.8)' 
                : 'rgba(255,255,255,0.9)',
              borderColor: currentTheme === 'dark'
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.1)',
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {screens.slice(0, 2).map((screen) => (
              <motion.button
                key={screen.id}
                onClick={() => navigateTo(screen.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  currentScreen === screen.id
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <screen.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{screen.label[language]}</span>
              </motion.button>
            ))}

            {/* Center V AI Button */}
            <div className="relative -mt-8">
              <motion.button
                onClick={() => setIsVAIOpen(!isVAIOpen)}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-lg"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(59,130,246,0.5)',
                    '0 0 40px rgba(139,92,246,0.5)',
                    '0 0 20px rgba(6,182,212,0.5)',
                    '0 0 20px rgba(59,130,246,0.5)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-white font-bold text-2xl">V</span>
              </motion.button>
            </div>

            {screens.slice(3, 5).map((screen) => (
              <motion.button
                key={screen.id}
                onClick={() => navigateTo(screen.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  currentScreen === screen.id
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <screen.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{screen.label[language]}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </nav>
    </div>
  )
}

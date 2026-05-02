'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Globe, User, Menu, X, ChevronDown } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useLanguage } from '@/lib/i18n'
import { VAICore } from '@/components/v-ai-core'

interface TopNavProps {
  activeSection: string
  onNavigate: (section: string) => void
  onVClick: () => void
  aiState?: 'idle' | 'thinking' | 'executing' | 'success'
}

export function TopNav({ activeSection, onNavigate, onVClick, aiState = 'idle' }: TopNavProps) {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useState(() => {
    setMounted(true)
  })

  const navLinks = [
    { id: 'inicio', label: t.nav.home },
    { id: 'proceso', label: t.nav.process },
    { id: 'integraciones', label: t.nav.integrations },
    { id: 'demos', label: t.nav.demos },
    { id: 'precios', label: t.nav.pricing },
    { id: 'contacto', label: t.nav.contact },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => onNavigate('inicio')}
              className="relative z-10 flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src="/images/v-momentum-logo.jpeg"
                alt="V Momentum"
                className="h-10 md:h-12 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.3))' }}
              />
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === link.id
                      ? 'text-white bg-white/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Language toggle */}
              <motion.button
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{language.toUpperCase()}</span>
              </motion.button>

              {/* Theme toggle */}
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mounted && theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </motion.button>

              {/* V AI Button - Desktop */}
              <div className="hidden md:block">
                <VAICore onClick={onVClick} state={aiState} size="sm" />
              </div>

              {/* Sign In */}
              <motion.button
                onClick={() => console.log('[V Momentum] Sign In - Clerk pending')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-4 h-4" />
                {t.nav.signIn}
              </motion.button>

              {/* CTA Button */}
              <motion.button
                onClick={() => onNavigate('contacto')}
                className="relative hidden sm:block px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <span className="relative">{t.hero.cta}</span>
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5"
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-black/95 border-l border-white/10"
            >
              <div className="flex flex-col h-full pt-20 pb-8 px-6">
                {/* Nav links */}
                <nav className="flex-1 space-y-2">
                  {navLinks.map((link, i) => (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => {
                        onNavigate(link.id)
                        setIsMenuOpen(false)
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                        activeSection === link.id
                          ? 'text-white bg-white/10'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </nav>

                {/* Bottom actions */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <button
                    onClick={() => {
                      onNavigate('contacto')
                      setIsMenuOpen(false)
                    }}
                    className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500"
                  >
                    {t.hero.cta}
                  </button>
                  <button
                    onClick={() => console.log('[V Momentum] Sign In - Clerk pending')}
                    className="w-full py-3 rounded-xl font-medium text-white/60 border border-white/10 hover:bg-white/5"
                  >
                    {t.nav.signIn}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

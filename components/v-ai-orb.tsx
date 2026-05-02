'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useLanguage } from '@/lib/i18n'
import { 
  X, Send, Sparkles, Home, Puzzle, Rocket, 
  CreditCard, MessageCircle, ArrowRight, Mic
} from 'lucide-react'

interface VAIOrbProps {
  isOpen: boolean
  onToggle: () => void
  onNavigate: (screen: 'home' | 'integrations' | 'process' | 'pricing' | 'contact') => void
}

const quickActions = [
  { 
    id: 'integrations', 
    icon: Puzzle, 
    label: { es: 'Ver integraciones', en: 'View integrations' },
    screen: 'integrations' as const,
  },
  { 
    id: 'process', 
    icon: Rocket, 
    label: { es: 'Conocer proceso', en: 'Learn process' },
    screen: 'process' as const,
  },
  { 
    id: 'pricing', 
    icon: CreditCard, 
    label: { es: 'Ver precios', en: 'View pricing' },
    screen: 'pricing' as const,
  },
  { 
    id: 'contact', 
    icon: MessageCircle, 
    label: { es: 'Contactar', en: 'Contact' },
    screen: 'contact' as const,
  },
]

const suggestions = {
  es: [
    '¿Cómo funciona V Momentum?',
    '¿Qué integraciones ofrecen?',
    '¿Cuánto cuesta una app?',
    'Quiero agendar una llamada',
  ],
  en: [
    'How does V Momentum work?',
    'What integrations do you offer?',
    'How much does an app cost?',
    'I want to schedule a call',
  ],
}

export function VAIOrb({ isOpen, onToggle, onNavigate }: VAIOrbProps) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const { language } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = mounted ? theme : 'dark'

  const handleQuickAction = (screen: 'home' | 'integrations' | 'process' | 'pricing' | 'contact') => {
    onNavigate(screen)
    onToggle()
  }

  const handleSuggestion = (text: string) => {
    setMessage(text)
    setIsTyping(true)
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false)
      // Navigate based on suggestion
      if (text.includes('integra')) {
        handleQuickAction('integrations')
      } else if (text.includes('precio') || text.includes('cost')) {
        handleQuickAction('pricing')
      } else if (text.includes('proceso') || text.includes('work')) {
        handleQuickAction('process')
      } else {
        handleQuickAction('contact')
      }
    }, 1500)
  }

  return (
    <>
      {/* Floating Orb - Desktop Only */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 hidden md:block"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, type: 'spring' }}
      >
        <motion.button
          onClick={onToggle}
          className="relative w-16 h-16 rounded-full flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                '0 0 30px rgba(59,130,246,0.6), 0 0 60px rgba(59,130,246,0.3)',
                '0 0 40px rgba(139,92,246,0.6), 0 0 80px rgba(139,92,246,0.3)',
                '0 0 30px rgba(6,182,212,0.6), 0 0 60px rgba(6,182,212,0.3)',
                '0 0 30px rgba(59,130,246,0.6), 0 0 60px rgba(59,130,246,0.3)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          {/* Rotating ring */}
          <motion.div
            className="absolute inset-[-4px] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
              padding: '2px',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: currentTheme === 'dark' ? '#000' : '#fff',
              }}
            />
          </motion.div>

          {/* Inner orb - Real AI Avatar */}
          <motion.div
            className="relative z-10 w-14 h-14 rounded-full overflow-hidden"
            animate={{
              scale: isOpen ? 0.9 : 1,
            }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 flex items-center justify-center"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="avatar"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="w-full h-full"
                >
                  <img
                    src="/v-ai-icon.jpeg"
                    alt="V AI Assistant"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Pulse effect */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-500/20"
              animate={{
                scale: [1, 1.5, 1.5],
                opacity: [0.5, 0, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      </motion.div>

      {/* AI Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={onToggle}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-24 md:bottom-28 right-4 md:right-8 z-50 w-[calc(100vw-2rem)] md:w-[400px] max-h-[70vh] rounded-3xl overflow-hidden"
              style={{
                background: currentTheme === 'dark' 
                  ? 'rgba(10,10,15,0.95)' 
                  : 'rgba(255,255,255,0.98)',
                border: `1px solid ${currentTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 rounded-xl overflow-hidden"
                    animate={{
                      boxShadow: [
                        '0 0 15px rgba(59,130,246,0.5)',
                        '0 0 25px rgba(139,92,246,0.5)',
                        '0 0 15px rgba(6,182,212,0.5)',
                        '0 0 15px rgba(59,130,246,0.5)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <img src="/v-ai-icon.jpeg" alt="V AI" className="w-full h-full object-cover" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-foreground">V Assistant</h3>
                    <p className="text-xs text-muted-foreground">
                      {language === 'es' ? '¿En qué puedo ayudarte?' : 'How can I help you?'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-4 space-y-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {language === 'es' ? 'Acciones rápidas' : 'Quick actions'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <motion.button
                      key={action.id}
                      onClick={() => handleQuickAction(action.screen)}
                      className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <action.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{action.label[language]}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div className="px-4 pb-4 space-y-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {language === 'es' ? 'Sugerencias' : 'Suggestions'}
                </p>
                <div className="space-y-2">
                  {suggestions[language].map((suggestion, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleSuggestion(suggestion)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors text-left group"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {suggestion}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={language === 'es' ? 'Escribe tu pregunta...' : 'Type your question...'}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none text-sm text-foreground placeholder:text-muted-foreground"
                      disabled={isTyping}
                    />
                    {isTyping && (
                      <motion.div
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="w-4 h-4 text-primary" />
                      </motion.div>
                    )}
                  </div>
                  <motion.button
                    className="p-3 rounded-xl bg-primary text-primary-foreground"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isTyping}
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

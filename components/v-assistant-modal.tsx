'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Mic, Sparkles, ArrowRight } from 'lucide-react'
import { VAICore } from './v-ai-core'
import { useLanguage } from '@/lib/i18n'

interface VAssistantModalProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (section: string) => void
}

export function VAssistantModal({ isOpen, onClose, onNavigate }: VAssistantModalProps) {
  const { language } = useLanguage()
  const [message, setMessage] = useState('')

  const quickActions = [
    { 
      label: language === 'es' ? 'Quiero mi app' : 'I want my app',
      action: () => { onNavigate('contacto'); onClose() },
      icon: Sparkles,
    },
    { 
      label: language === 'es' ? 'Ver precios' : 'View pricing',
      action: () => { onNavigate('precios'); onClose() },
      icon: ArrowRight,
    },
    { 
      label: language === 'es' ? 'Conocer proceso' : 'Know process',
      action: () => { onNavigate('proceso'); onClose() },
      icon: ArrowRight,
    },
    { 
      label: language === 'es' ? 'Ver integraciones' : 'View integrations',
      action: () => { onNavigate('integraciones'); onClose() },
      icon: ArrowRight,
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative w-full max-w-lg bg-gradient-to-br from-white/10 to-white/[0.02] 
                       backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden
                       shadow-[0_0_100px_rgba(59,130,246,0.2)]"
          >
            {/* Header */}
            <div className="relative p-6 pb-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-4">
                <VAICore onClick={() => {}} state="idle" size="sm" />
                <div>
                  <h3 className="text-lg font-semibold text-white">V Assistant</h3>
                  <p className="text-sm text-white/50">
                    {language === 'es' ? 'Tu copiloto de IA' : 'Your AI copilot'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Quick actions */}
              <div>
                <p className="text-sm text-white/40 mb-3">
                  {language === 'es' ? 'Acciones rápidas' : 'Quick actions'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, i) => (
                    <motion.button
                      key={i}
                      onClick={action.action}
                      className="flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 
                                 border border-white/10 hover:border-white/20 transition-all text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <action.icon className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-white/80">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Chat input */}
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={language === 'es' ? '¿En qué puedo ayudarte?' : 'How can I help you?'}
                  className="w-full px-4 py-3 pr-24 rounded-xl bg-white/5 border border-white/10 
                             text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50
                             focus:ring-2 focus:ring-blue-500/20"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Mic className="w-4 h-4 text-white/40" />
                  </button>
                  <button className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors">
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Powered by */}
              <p className="text-center text-xs text-white/30">
                {language === 'es' ? 'Próximamente: IA conversacional integrada' : 'Coming soon: Integrated conversational AI'}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

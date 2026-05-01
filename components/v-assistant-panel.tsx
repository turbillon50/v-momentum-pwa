'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles, CreditCard, Puzzle, Presentation, MessageCircle } from 'lucide-react'
import { VAILogo } from './v-ai-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface VAssistantPanelProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (section: string) => void
}

const quickActions = [
  { label: 'Quiero mi app', icon: Sparkles, action: 'contacto', primary: true },
  { label: 'Ver precios', icon: CreditCard, action: 'precios' },
  { label: 'Ver integraciones', icon: Puzzle, action: 'integraciones' },
  { label: 'Ver demos', icon: Presentation, action: 'demos' },
  { label: 'Hablar por WhatsApp', icon: MessageCircle, action: 'whatsapp', external: true },
]

export function VAssistantPanel({ isOpen, onClose, onNavigate }: VAssistantPanelProps) {
  const [message, setMessage] = useState('')

  const handleAction = (action: string, external?: boolean) => {
    if (external && action === 'whatsapp') {
      window.open('https://wa.me/521234567890?text=Hola,%20quiero%20información%20sobre%20V%20Momentum', '_blank')
      return
    }
    onNavigate(action)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:rounded-2xl"
          >
            <div className="glass-strong rounded-t-3xl md:rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <VAILogo size={40} />
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">Asistente V</h2>
                    <p className="text-xs text-muted-foreground">¿En qué puedo ayudarte?</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick actions */}
              <div className="p-4 space-y-2">
                <p className="text-xs text-muted-foreground mb-3">Acciones rápidas</p>
                <div className="flex flex-col gap-2">
                  {quickActions.map((action) => {
                    const Icon = action.icon
                    return (
                      <button
                        key={action.action}
                        onClick={() => handleAction(action.action, action.external)}
                        className={`flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all ${
                          action.primary 
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                            : 'bg-muted/50 hover:bg-muted text-foreground'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          action.primary ? 'bg-white/20' : 'bg-background'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">{action.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Chat input (visual only) */}
              <div className="p-4 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe tu pregunta..."
                    className="flex-1 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                  />
                  <Button 
                    size="icon"
                    className="bg-primary hover:bg-primary/90"
                    disabled={!message.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 text-center">
                  Chat con IA próximamente disponible
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

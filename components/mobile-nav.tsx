'use client'

import { Home, Workflow, Puzzle, CreditCard } from 'lucide-react'
import { VAIButton } from './v-ai-button'
import { motion } from 'framer-motion'

interface MobileNavProps {
  activeSection: string
  onNavigate: (section: string) => void
  onVClick: () => void
  aiState?: 'idle' | 'thinking' | 'executing' | 'success'
}

const navItems = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'proceso', label: 'Proceso', icon: Workflow },
  { id: 'v-ai', label: 'V', isCenter: true },
  { id: 'integraciones', label: 'Integraciones', icon: Puzzle },
  { id: 'precios', label: 'Precios', icon: CreditCard },
]

export function MobileNav({ activeSection, onNavigate, onVClick, aiState = 'idle' }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      {/* Blur background */}
      <div className="absolute inset-0 glass-strong" />
      
      {/* Nav content */}
      <div className="relative flex items-end justify-around px-2 pb-6 pt-3 safe-area-inset-bottom">
        {navItems.map((item) => {
          if (item.isCenter) {
            return (
              <div key={item.id} className="relative -mt-6">
                {/* Elevated V AI button */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: -8 }}
                  className="relative"
                >
                  {/* Glow effect behind button */}
                  <div 
                    className="absolute inset-0 rounded-full blur-xl opacity-50"
                    style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)' }}
                  />
                  <VAIButton 
                    size="md" 
                    state={aiState} 
                    onClick={onVClick}
                  />
                </motion.div>
              </div>
            )
          }

          const Icon = item.icon!
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-1 min-w-[56px] py-1"
            >
              <motion.div
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  color: isActive ? 'var(--primary)' : 'var(--muted-foreground)'
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              <span className={`text-[10px] font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary"
                  style={{ boxShadow: '0 0 8px var(--primary)' }}
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

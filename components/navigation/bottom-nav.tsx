'use client'

import { motion } from 'framer-motion'
import { Home, Workflow, Puzzle, CreditCard, MessageCircle } from 'lucide-react'
import { VAICoreFloat } from '@/components/v-ai-core'
import { useLanguage } from '@/lib/i18n'

interface BottomNavProps {
  activeSection: string
  onNavigate: (section: string) => void
  onVClick: () => void
  aiState?: 'idle' | 'thinking' | 'executing' | 'success'
}

export function BottomNav({ activeSection, onNavigate, onVClick, aiState = 'idle' }: BottomNavProps) {
  const { t } = useLanguage()

  const navItems = [
    { id: 'inicio', label: t.nav.home, icon: Home },
    { id: 'proceso', label: t.nav.process, icon: Workflow },
    { id: 'integraciones', label: t.nav.integrations, icon: Puzzle },
    { id: 'precios', label: t.nav.pricing, icon: CreditCard },
  ]

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50 pb-safe"
    >
      {/* Gradient blur background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none" />
      
      <div className="relative max-w-lg mx-auto px-4 pb-2">
        {/* Glass container */}
        <div className="relative bg-white/[0.03] backdrop-blur-2xl rounded-2xl border border-white/[0.08] 
                        shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          
          <div className="flex items-end justify-around px-2 py-1">
            {/* Left nav items */}
            {navItems.slice(0, 2).map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <NavButton
                  key={item.id}
                  icon={Icon}
                  label={item.label}
                  isActive={isActive}
                  onClick={() => onNavigate(item.id)}
                />
              )
            })}

            {/* Center - V AI Core */}
            <div className="relative flex items-center justify-center px-4">
              <VAICoreFloat onClick={onVClick} state={aiState} />
            </div>

            {/* Right nav items */}
            {navItems.slice(2).map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <NavButton
                  key={item.id}
                  icon={Icon}
                  label={item.label}
                  isActive={isActive}
                  onClick={() => onNavigate(item.id)}
                />
              )
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

function NavButton({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick 
}: { 
  icon: typeof Home
  label: string
  isActive: boolean
  onClick: () => void 
}) {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex flex-col items-center justify-center py-3 px-3 min-w-[60px]"
      whileTap={{ scale: 0.9 }}
    >
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-blue-500"
          style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}
        />
      )}
      
      <Icon 
        className={`w-5 h-5 mb-1 transition-colors ${
          isActive ? 'text-blue-400' : 'text-white/40'
        }`}
      />
      <span 
        className={`text-[10px] font-medium transition-colors ${
          isActive ? 'text-blue-400' : 'text-white/40'
        }`}
      >
        {label}
      </span>
    </motion.button>
  )
}

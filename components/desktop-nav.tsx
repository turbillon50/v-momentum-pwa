'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Workflow, 
  Puzzle, 
  CreditCard, 
  Layers, 
  Presentation,
  Database,
  LayoutDashboard,
  Settings,
  MessageSquare,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react'
import { VAIButton } from './v-ai-button'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'

interface DesktopNavProps {
  activeSection: string
  onNavigate: (section: string) => void
  onVClick: () => void
  aiState?: 'idle' | 'thinking' | 'executing' | 'success'
  theme: 'dark' | 'light'
  onThemeToggle: () => void
}

const mainNavItems = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'proceso', label: 'Proceso', icon: Workflow },
  { id: 'integraciones', label: 'Integraciones', icon: Puzzle },
  { id: 'precios', label: 'Precios', icon: CreditCard },
]

const secondaryNavItems = [
  { id: 'demos', label: 'Demos', icon: Presentation },
  { id: 'fuente-verdad', label: 'Fuente de Verdad', icon: Database },
  { id: 'stack', label: 'Stack', icon: Layers },
  { id: 'dashboard-cliente', label: 'Dashboard Cliente', icon: LayoutDashboard },
  { id: 'dashboard-admin', label: 'Admin', icon: Settings },
  { id: 'contacto', label: 'Contacto', icon: MessageSquare },
]

export function DesktopNav({ 
  activeSection, 
  onNavigate, 
  onVClick, 
  aiState = 'idle',
  theme,
  onThemeToggle
}: DesktopNavProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      {/* Top navigation bar */}
      <header className="fixed top-0 left-0 right-0 z-40 hidden md:block">
        <div className="absolute inset-0 glass" />
        <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('inicio')}
            className="flex items-center gap-3 group"
          >
            <img 
              src="/images/v-momentum-logo.jpeg" 
              alt="V Momentum" 
              className="h-10 w-auto object-contain"
            />
          </button>

          {/* Main navigation */}
          <nav className="flex items-center gap-1">
            {mainNavItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="desktopActiveIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-primary"
                      style={{ boxShadow: '0 0 10px var(--primary)' }}
                    />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* V AI Button */}
            <VAIButton size="sm" state={aiState} onClick={onVClick} />

            {/* More menu */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              {isExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Sign In Button - Ready for Clerk integration */}
            <Button 
              variant="ghost"
              onClick={() => {
                // Future Clerk integration
                console.log('[V Momentum] Sign In clicked - Clerk integration pending')
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>

            {/* CTA */}
            <Button 
              onClick={() => onNavigate('contacto')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Quiero mi app
            </Button>
          </div>
        </div>
      </header>

      {/* Expanded menu panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 right-6 z-50 hidden md:block"
          >
            <div className="glass-strong rounded-xl p-4 min-w-[200px]">
              <div className="flex flex-col gap-1">
                {secondaryNavItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id)
                        setIsExpanded(false)
                      }}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

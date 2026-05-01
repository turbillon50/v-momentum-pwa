'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Cloud, Bot, Gauge, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { VAILogo } from '@/components/v-ai-button'

interface HeroSectionProps {
  onNavigate: (section: string) => void
}

const credibilityItems = [
  { icon: Zap, label: 'Apps' },
  { icon: Bot, label: 'Automatización' },
  { icon: Bot, label: 'IA' },
  { icon: Cloud, label: 'Cloud' },
  { icon: Gauge, label: 'Performance' },
]

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 md:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)' }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Brand badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-muted-foreground font-medium">SaaS Technology Apps Design</span>
          </div>
        </motion.div>

        {/* V AI Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <VAILogo size={80} />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance"
        >
          <span className="text-foreground">Tu app. Tu negocio.</span>
          <br />
          <span className="text-primary neon-text">Sin tensiones.</span>
        </motion.h1>

        {/* Supporting headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto text-pretty"
        >
          Diseñamos y desarrollamos apps listas para operar en días.
        </motion.p>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm md:text-base text-muted-foreground/80 mb-10 max-w-xl mx-auto text-pretty"
        >
          Creamos aplicaciones, sistemas y herramientas digitales con integraciones reales para vender, operar y escalar tu negocio.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button 
            size="lg"
            onClick={() => onNavigate('contacto')}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-semibold rounded-xl neon-border"
          >
            Quiero mi app
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={() => onNavigate('proceso')}
            className="w-full sm:w-auto border-border hover:bg-muted px-8 py-6 text-base font-semibold rounded-xl"
          >
            Ver cómo funciona
          </Button>

          <Button 
            size="lg"
            variant="ghost"
            onClick={() => window.open('https://wa.me/521234567890', '_blank')}
            className="w-full sm:w-auto text-muted-foreground hover:text-foreground px-6 py-6 text-base"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </motion.div>

        {/* Credibility row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
        >
          {credibilityItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div 
                key={item.label}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Icon className="w-4 h-4 text-primary/70" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}

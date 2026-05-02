'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'
import { ArrowRight, Zap, Shield, Rocket, Code, Database, CreditCard, Mail, Lock, Cloud, Cpu, Globe, ChevronRight } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: string) => void
}

// Real brand logos via SimpleIcons CDN
const TECH_STACK = [
  { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/white' },
  { name: 'Tailwind', logo: 'https://cdn.simpleicons.org/tailwindcss' },
  { name: 'Supabase', logo: 'https://cdn.simpleicons.org/supabase' },
  { name: 'Clerk', logo: 'https://cdn.simpleicons.org/clerk' },
  { name: 'Stripe', logo: 'https://cdn.simpleicons.org/stripe' },
  { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/white' },
  { name: 'Resend', logo: 'https://cdn.simpleicons.org/resend' },
]

const SERVICES = [
  { icon: Code, title: { es: 'Apps', en: 'Apps' } },
  { icon: Cpu, title: { es: 'Automatización', en: 'Automation' } },
  { icon: Zap, title: { es: 'IA', en: 'AI' } },
  { icon: Cloud, title: { es: 'Cloud', en: 'Cloud' } },
  { icon: Rocket, title: { es: 'Performance', en: 'Performance' } },
]

const CAPABILITIES = [
  { icon: CreditCard, label: { es: 'Pagos', en: 'Payments' }, color: '#635BFF' },
  { icon: Database, label: { es: 'Base de datos', en: 'Database' }, color: '#3ECF8E' },
  { icon: Lock, label: { es: 'Autenticación', en: 'Auth' }, color: '#6C47FF' },
  { icon: Mail, label: { es: 'Emails', en: 'Emails' }, color: '#00D4AA' },
  { icon: Globe, label: { es: 'Deploy', en: 'Deploy' }, color: '#ffffff' },
  { icon: Shield, label: { es: 'Seguridad', en: 'Security' }, color: '#F97316' },
]

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { language } = useLanguage()

  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <section className="relative px-5 pt-6 pb-10">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-500/8 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] font-medium text-blue-400 tracking-widest uppercase">
              SaaS Technology Apps Design
            </span>
          </motion.div>

          {/* Main headline - from your hero image */}
          <h1 className="text-2xl font-semibold text-foreground mb-3 leading-snug">
            {language === 'es' ? (
              <>Escalamos ideas.<br />Construimos productos.<br />Generamos <span className="text-blue-400">momentum</span>.</>
            ) : (
              <>We scale ideas.<br />We build products.<br />We generate <span className="text-blue-400">momentum</span>.</>
            )}
          </h1>

          <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
            {language === 'es' 
              ? 'Apps listas para operar en días con integraciones reales.'
              : 'Apps ready to operate in days with real integrations.'}
          </p>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('contact')}
            className="w-full max-w-xs px-6 py-3.5 rounded-2xl bg-blue-500 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            {language === 'es' ? 'Quiero mi app' : 'I want my app'}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </section>

      {/* Services - Horizontal scroll */}
      <section className="px-5 py-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title.en}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08]"
            >
              <service.icon className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-foreground whitespace-nowrap">{service.title[language]}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="px-5 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-foreground">
            {language === 'es' ? 'Capacidades' : 'Capabilities'}
          </h2>
          <button 
            onClick={() => onNavigate('integrations')}
            className="text-xs text-blue-400 flex items-center gap-1"
          >
            {language === 'es' ? 'Ver todas' : 'See all'}
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {CAPABILITIES.map((cap, i) => (
            <motion.button
              key={cap.label.en}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('integrations')}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] active:bg-white/[0.06]"
            >
              <cap.icon className="w-5 h-5" style={{ color: cap.color }} />
              <span className="text-[11px] text-muted-foreground">{cap.label[language]}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Process Card - Your real process */}
      <section className="px-5 py-6">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('process')}
          className="w-full text-left p-5 rounded-3xl bg-gradient-to-br from-blue-500/8 to-purple-500/8 border border-white/[0.06]"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">
              {language === 'es' ? 'Nuestro proceso' : 'Our process'}
            </h3>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {language === 'es' 
              ? 'Replit crea. GitHub conserva. Vercel publica. Cursor audita. ChatGPT dirige.'
              : 'Replit creates. GitHub preserves. Vercel publishes. Cursor audits. ChatGPT directs.'}
          </p>
          
          {/* Mini process icons */}
          <div className="flex items-center gap-3 mt-4">
            {['replit', 'github', 'vercel', 'cursor', 'openai'].map((brand) => (
              <img 
                key={brand}
                src={`https://cdn.simpleicons.org/${brand}${brand === 'github' || brand === 'vercel' || brand === 'openai' ? '/white' : ''}`}
                alt={brand}
                className="w-4 h-4 opacity-50"
                crossOrigin="anonymous"
              />
            ))}
          </div>
        </motion.button>
      </section>

      {/* Stats */}
      <section className="px-5 py-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-4 rounded-2xl bg-white/[0.02]">
            <p className="text-xl font-semibold text-foreground">7</p>
            <p className="text-[10px] text-muted-foreground mt-1">
              {language === 'es' ? 'días promedio' : 'avg days'}
            </p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-white/[0.02]">
            <p className="text-xl font-semibold text-foreground">28+</p>
            <p className="text-[10px] text-muted-foreground mt-1">
              {language === 'es' ? 'integraciones' : 'integrations'}
            </p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-white/[0.02]">
            <p className="text-xl font-semibold text-foreground">100%</p>
            <p className="text-[10px] text-muted-foreground mt-1">
              full stack
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-5 py-6 pb-32">
        <p className="text-[10px] text-muted-foreground text-center mb-4 uppercase tracking-wider">
          {language === 'es' ? 'Stack tecnológico' : 'Tech stack'}
        </p>
        <div className="flex justify-center items-center gap-5 flex-wrap">
          {TECH_STACK.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="flex flex-col items-center gap-1.5"
            >
              <img 
                src={tech.logo} 
                alt={tech.name} 
                className="w-5 h-5 opacity-50"
                crossOrigin="anonymous"
              />
              <span className="text-[9px] text-muted-foreground">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

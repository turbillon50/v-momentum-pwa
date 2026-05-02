'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass-card'
import { X, ExternalLink, ChevronLeft, ChevronRight, Zap, Database, Bot, Globe, Wallet, Shield, Code, Cloud } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

// Integration data organized by category
const integrationCategories = [
  {
    id: 'payments',
    icon: Wallet,
    color: '#22c55e',
    items: [
      { name: 'Stripe', image: '/images/integrations/stripe.jpeg', description: 'Infraestructura de pagos para internet' },
      { name: 'Mercado Pago', image: '/images/integrations/mercado-pago.jpeg', description: 'Pagos para América Latina' },
    ],
  },
  {
    id: 'database',
    icon: Database,
    color: '#3b82f6',
    items: [
      { name: 'Neon', image: '/images/integrations/neon.jpeg', description: 'PostgreSQL serverless' },
      { name: 'Airtable', image: '/images/integrations/airtable.jpeg', description: 'Bases de datos flexibles' },
    ],
  },
  {
    id: 'ai',
    icon: Bot,
    color: '#8b5cf6',
    items: [
      { name: 'v0 by Vercel', image: '/images/integrations/v0-vercel.jpeg', description: 'IA para generar UI profesional' },
      { name: 'Claude Design', image: '/images/integrations/claude-design.jpeg', description: 'IA de Anthropic para diseño' },
      { name: 'Cursor', image: '/images/integrations/cursor.jpeg', description: 'Editor de código con IA' },
      { name: 'Codex & Claude', image: '/images/integrations/codex-claude.jpeg', description: 'Agentes de código IA' },
    ],
  },
  {
    id: 'deploy',
    icon: Cloud,
    color: '#06b6d4',
    items: [
      { name: 'Vercel', image: '/images/integrations/vercel.jpeg', description: 'Deploy y performance' },
      { name: 'Replit', image: '/images/integrations/replit.jpeg', description: 'IDE en la nube' },
      { name: 'GitHub', image: '/images/integrations/github.jpeg', description: 'Control de versiones' },
      { name: 'Cloudflare', image: '/images/integrations/cloudflare.jpeg', description: 'CDN y seguridad' },
    ],
  },
  {
    id: 'web3',
    icon: Globe,
    color: '#f59e0b',
    items: [
      { name: 'Alchemy', image: '/images/integrations/alchemy.jpeg', description: 'Infraestructura blockchain' },
      { name: 'LI.FI', image: '/images/integrations/lifi.jpeg', description: 'Protocolo cross-chain' },
      { name: 'Safe', image: '/images/integrations/safe-gnosis.jpeg', description: 'Custodia multisig' },
      { name: 'Turnkey', image: '/images/integrations/turnkey.jpeg', description: 'Backend como servicio' },
      { name: 'Onramper', image: '/images/integrations/onramper.jpeg', description: 'Fiat-crypto onramp' },
      { name: 'Bybit', image: '/images/integrations/bybit.jpeg', description: 'Exchange y API' },
    ],
  },
  {
    id: 'communication',
    icon: Zap,
    color: '#ec4899',
    items: [
      { name: 'Twilio', image: '/images/integrations/twilio.jpeg', description: 'SMS, voz y WhatsApp' },
      { name: 'Resend', image: '/images/integrations/resend-full.jpeg', description: 'Emails transaccionales' },
    ],
  },
  {
    id: 'services',
    icon: Code,
    color: '#14b8a6',
    items: [
      { name: 'Duffel', image: '/images/integrations/duffel.jpeg', description: 'API de viajes' },
      { name: 'Reloadly', image: '/images/integrations/reloadly.jpeg', description: 'Recargas globales' },
      { name: 'Ticket Tailor', image: '/images/integrations/ticket-tailor.jpeg', description: 'Ticketing y eventos' },
      { name: 'DocuSign', image: '/images/integrations/docusign.jpeg', description: 'Firma electrónica' },
      { name: 'Jotform', image: '/images/integrations/jotform.jpeg', description: 'Formularios' },
      { name: 'Google Maps', image: '/images/integrations/google-maps.jpeg', description: 'Mapas y ubicación' },
    ],
  },
  {
    id: 'auth',
    icon: Shield,
    color: '#ef4444',
    items: [
      { name: 'Clerk', image: '/images/integrations/clerk.jpeg', description: 'Autenticación completa' },
      { name: 'Sumsub', image: '/images/integrations/sumsub.jpeg', description: 'Verificación KYC/AML' },
    ],
  },
]

export function IntegrationsEcosystem() {
  const { t, language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedIntegration, setSelectedIntegration] = useState<{
    name: string
    image: string
    description: string
  } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  const categoryLabels: Record<string, { es: string; en: string }> = {
    payments: { es: 'Pagos', en: 'Payments' },
    database: { es: 'Bases de Datos', en: 'Databases' },
    ai: { es: 'Inteligencia Artificial', en: 'Artificial Intelligence' },
    deploy: { es: 'Deploy & Infraestructura', en: 'Deploy & Infrastructure' },
    web3: { es: 'Web3 & Blockchain', en: 'Web3 & Blockchain' },
    communication: { es: 'Comunicación', en: 'Communication' },
    services: { es: 'Servicios', en: 'Services' },
    auth: { es: 'Autenticación', en: 'Authentication' },
  }

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-4"
      >
        <motion.span 
          className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4
                     bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/10"
        >
          {t.integrations.badge}
        </motion.span>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="text-white">{language === 'es' ? 'Ecosistema de ' : 'Integration '}</span>
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {language === 'es' ? 'Integraciones' : 'Ecosystem'}
          </span>
        </h2>
        <p className="text-white/50 max-w-xl mx-auto">
          {t.integrations.subtitle}
        </p>
      </motion.div>

      {/* Category selector - horizontal scroll */}
      <div className="mb-12 px-4">
        <motion.div 
          className="flex gap-3 overflow-x-auto pb-4 no-scrollbar max-w-6xl mx-auto justify-start md:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {integrationCategories.map((cat, i) => {
            const Icon = cat.icon
            const isActive = selectedCategory === cat.id
            return (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(isActive ? null : cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm
                           transition-all duration-300 border
                           ${isActive 
                             ? 'bg-white/10 border-white/20 text-white' 
                             : 'bg-white/[0.03] border-white/[0.06] text-white/60 hover:text-white hover:bg-white/[0.06]'
                           }`}
                style={isActive ? { 
                  boxShadow: `0 0 30px ${cat.color}40`,
                  borderColor: `${cat.color}50`,
                } : {}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Icon className="w-4 h-4" style={{ color: cat.color }} />
                {categoryLabels[cat.id][language]}
                <span className="text-xs text-white/40">({cat.items.length})</span>
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      {/* Integration cards - horizontal carousel per category */}
      <div className="space-y-8">
        {integrationCategories
          .filter(cat => !selectedCategory || cat.id === selectedCategory)
          .map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + catIndex * 0.1 }}
              className="relative"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4 px-4 md:px-8 max-w-7xl mx-auto">
                <category.icon className="w-5 h-5" style={{ color: category.color }} />
                <h3 className="text-lg font-semibold text-white">
                  {categoryLabels[category.id][language]}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              {/* Horizontal scroll container */}
              <div className="relative group">
                <div className="flex gap-4 overflow-x-auto pb-4 px-4 md:px-8 no-scrollbar">
                  {category.items.map((item, i) => (
                    <GlassCard
                      key={item.name}
                      onClick={() => setSelectedIntegration(item)}
                      className="flex-shrink-0 w-72 md:w-80 p-1 cursor-pointer"
                      glowColor={
                        category.id === 'payments' ? 'green' :
                        category.id === 'ai' ? 'purple' :
                        category.id === 'web3' ? 'orange' :
                        category.id === 'auth' ? 'purple' : 'blue'
                      }
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.05 }}
                        className="relative overflow-hidden rounded-xl"
                      >
                        {/* Integration image */}
                        <div className="aspect-[16/10] relative overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        </div>

                        {/* Content overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="text-lg font-semibold text-white mb-1">{item.name}</h4>
                          <p className="text-sm text-white/60 line-clamp-1">{item.description}</p>
                        </div>

                        {/* Hover effect - View button */}
                        <motion.div
                          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                        >
                          <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-medium">
                            {language === 'es' ? 'Ver detalle' : 'View details'}
                            <ExternalLink className="w-4 h-4" />
                          </span>
                        </motion.div>
                      </motion.div>
                    </GlassCard>
                  ))}
                </div>

                {/* Scroll gradient hints */}
                <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none opacity-50" />
                <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none opacity-50" />
              </div>
            </motion.div>
          ))}
      </div>

      {/* Integration detail modal */}
      <AnimatePresence>
        {selectedIntegration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedIntegration(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-3xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 backdrop-blur-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedIntegration(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Full image */}
              <div className="relative">
                <img
                  src={selectedIntegration.image}
                  alt={selectedIntegration.name}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

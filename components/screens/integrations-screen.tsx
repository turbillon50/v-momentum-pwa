'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'
import { 
  CreditCard, Database, Bot, Cloud, Wallet, Shield, Code, 
  MessageSquare, X, ExternalLink, ChevronLeft, ChevronRight,
  Zap, Check, ArrowRight
} from 'lucide-react'
import { BrandIcon, BrandIcons, type BrandIconKey } from '@/components/icons/brand-icons'

interface Integration {
  id: BrandIconKey
  category: string
  description: {
    es: string
    en: string
  }
  features: {
    es: string[]
    en: string[]
  }
}

const categories = [
  { id: 'all', icon: Zap, label: { es: 'Todas', en: 'All' } },
  { id: 'payments', icon: CreditCard, label: { es: 'Pagos', en: 'Payments' } },
  { id: 'database', icon: Database, label: { es: 'Base de datos', en: 'Database' } },
  { id: 'ai', icon: Bot, label: { es: 'IA', en: 'AI' } },
  { id: 'deploy', icon: Cloud, label: { es: 'Deploy', en: 'Deploy' } },
  { id: 'auth', icon: Shield, label: { es: 'Auth', en: 'Auth' } },
  { id: 'communication', icon: MessageSquare, label: { es: 'Comunicación', en: 'Communication' } },
  { id: 'dev', icon: Code, label: { es: 'Desarrollo', en: 'Dev Tools' } },
]

const integrations: Integration[] = [
  {
    id: 'stripe',
    category: 'payments',
    description: {
      es: 'Procesamiento de pagos, suscripciones y facturación para tu SaaS.',
      en: 'Payment processing, subscriptions and billing for your SaaS.',
    },
    features: {
      es: ['Pagos únicos', 'Suscripciones', 'Checkout embebido', 'Webhooks'],
      en: ['One-time payments', 'Subscriptions', 'Embedded checkout', 'Webhooks'],
    },
  },
  {
    id: 'mercadopago',
    category: 'payments',
    description: {
      es: 'Pagos para Latinoamérica con múltiples métodos de pago locales.',
      en: 'Payments for Latin America with multiple local payment methods.',
    },
    features: {
      es: ['Tarjetas', 'OXXO/Efectivo', 'Transferencias', 'Cuotas'],
      en: ['Cards', 'Cash payments', 'Bank transfers', 'Installments'],
    },
  },
  {
    id: 'supabase',
    category: 'database',
    description: {
      es: 'Base de datos PostgreSQL con auth, storage y realtime incluidos.',
      en: 'PostgreSQL database with auth, storage and realtime included.',
    },
    features: {
      es: ['PostgreSQL', 'Autenticación', 'Storage', 'Realtime'],
      en: ['PostgreSQL', 'Authentication', 'Storage', 'Realtime'],
    },
  },
  {
    id: 'neon',
    category: 'database',
    description: {
      es: 'PostgreSQL serverless con branching y escalado automático.',
      en: 'Serverless PostgreSQL with branching and auto-scaling.',
    },
    features: {
      es: ['Serverless', 'Branching', 'Escalado', 'Edge compatible'],
      en: ['Serverless', 'Branching', 'Scaling', 'Edge compatible'],
    },
  },
  {
    id: 'airtable',
    category: 'database',
    description: {
      es: 'Base de datos visual tipo spreadsheet para MVPs rápidos.',
      en: 'Visual spreadsheet database for quick MVPs.',
    },
    features: {
      es: ['API REST', 'Vistas', 'Automatizaciones', 'Integraciones'],
      en: ['REST API', 'Views', 'Automations', 'Integrations'],
    },
  },
  {
    id: 'openai',
    category: 'ai',
    description: {
      es: 'GPT-4, embeddings y modelos de IA para tu aplicación.',
      en: 'GPT-4, embeddings and AI models for your application.',
    },
    features: {
      es: ['GPT-4', 'Embeddings', 'Assistants', 'Vision'],
      en: ['GPT-4', 'Embeddings', 'Assistants', 'Vision'],
    },
  },
  {
    id: 'anthropic',
    category: 'ai',
    description: {
      es: 'Claude para análisis de documentos y conversaciones avanzadas.',
      en: 'Claude for document analysis and advanced conversations.',
    },
    features: {
      es: ['Claude 3', 'Documentos', 'Contexto largo', 'Análisis'],
      en: ['Claude 3', 'Documents', 'Long context', 'Analysis'],
    },
  },
  {
    id: 'vercel',
    category: 'deploy',
    description: {
      es: 'Deploy automático con preview URLs y edge functions.',
      en: 'Automatic deploy with preview URLs and edge functions.',
    },
    features: {
      es: ['Deploy automático', 'Preview URLs', 'Edge Functions', 'Analytics'],
      en: ['Auto deploy', 'Preview URLs', 'Edge Functions', 'Analytics'],
    },
  },
  {
    id: 'github',
    category: 'deploy',
    description: {
      es: 'Control de versiones y CI/CD para tu código.',
      en: 'Version control and CI/CD for your code.',
    },
    features: {
      es: ['Repositorios', 'Actions', 'Copilot', 'Code review'],
      en: ['Repositories', 'Actions', 'Copilot', 'Code review'],
    },
  },
  {
    id: 'cloudflare',
    category: 'deploy',
    description: {
      es: 'CDN, DNS y protección DDoS para tu aplicación.',
      en: 'CDN, DNS and DDoS protection for your application.',
    },
    features: {
      es: ['CDN global', 'DNS', 'Workers', 'Seguridad'],
      en: ['Global CDN', 'DNS', 'Workers', 'Security'],
    },
  },
  {
    id: 'clerk',
    category: 'auth',
    description: {
      es: 'Autenticación completa con UI lista para usar.',
      en: 'Complete authentication with ready-to-use UI.',
    },
    features: {
      es: ['Login social', 'MFA', 'Organizaciones', 'Webhooks'],
      en: ['Social login', 'MFA', 'Organizations', 'Webhooks'],
    },
  },
  {
    id: 'twilio',
    category: 'communication',
    description: {
      es: 'SMS, WhatsApp y llamadas para tu aplicación.',
      en: 'SMS, WhatsApp and calls for your application.',
    },
    features: {
      es: ['SMS', 'WhatsApp', 'Llamadas', 'Verificación'],
      en: ['SMS', 'WhatsApp', 'Calls', 'Verification'],
    },
  },
  {
    id: 'resend',
    category: 'communication',
    description: {
      es: 'Emails transaccionales con plantillas React.',
      en: 'Transactional emails with React templates.',
    },
    features: {
      es: ['React Email', 'API simple', 'Analytics', 'Dominios'],
      en: ['React Email', 'Simple API', 'Analytics', 'Domains'],
    },
  },
  {
    id: 'cursor',
    category: 'dev',
    description: {
      es: 'Editor de código con IA para desarrollo acelerado.',
      en: 'AI code editor for accelerated development.',
    },
    features: {
      es: ['Autocompletado IA', 'Chat', 'Refactoring', 'Docs'],
      en: ['AI autocomplete', 'Chat', 'Refactoring', 'Docs'],
    },
  },
  {
    id: 'replit',
    category: 'dev',
    description: {
      es: 'IDE en la nube para prototipos rápidos.',
      en: 'Cloud IDE for quick prototypes.',
    },
    features: {
      es: ['IDE online', 'Deploy', 'Colaboración', 'Ghostwriter'],
      en: ['Online IDE', 'Deploy', 'Collaboration', 'Ghostwriter'],
    },
  },
  {
    id: 'alchemy',
    category: 'web3',
    description: {
      es: 'APIs para blockchain y Web3.',
      en: 'APIs for blockchain and Web3.',
    },
    features: {
      es: ['NFT APIs', 'Webhooks', 'Enhanced APIs', 'Multi-chain'],
      en: ['NFT APIs', 'Webhooks', 'Enhanced APIs', 'Multi-chain'],
    },
  },
]

export function IntegrationsScreen() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  const filteredIntegrations = activeCategory === 'all'
    ? integrations
    : integrations.filter(i => i.category === activeCategory)

  const scrollCategories = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {language === 'es' ? 'Integraciones' : 'Integrations'}
        </h1>
        <p className="text-muted-foreground max-w-xl">
          {language === 'es'
            ? 'Conectamos tu app con las mejores herramientas del mercado. Todo listo para producción.'
            : 'We connect your app with the best tools in the market. All ready for production.'}
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="relative mb-8">
        <button
          onClick={() => scrollCategories('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border md:hidden"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-8 md:px-0 md:flex-wrap"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <cat.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{cat.label[language]}</span>
            </motion.button>
          ))}
        </div>

        <button
          onClick={() => scrollCategories('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border md:hidden"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Integrations Grid - Smartwatch Style */}
      <motion.div
        layout
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredIntegrations.map((integration, i) => (
            <motion.button
              key={integration.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.03, type: 'spring', stiffness: 500, damping: 30 }}
              onClick={() => setSelectedIntegration(integration)}
              className="group aspect-square flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-muted/30 border border-border hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  boxShadow: [
                    `0 0 0px ${BrandIcons[integration.id]?.color}00`,
                    `0 0 20px ${BrandIcons[integration.id]?.color}40`,
                    `0 0 0px ${BrandIcons[integration.id]?.color}00`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                className="rounded-full p-1"
              >
                <BrandIcon name={integration.id} size={32} />
              </motion.div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center">
                {BrandIcons[integration.id]?.name}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Integration Detail Panel */}
      <AnimatePresence>
        {selectedIntegration && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedIntegration(null)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-background border-l border-border overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-xl border-b border-border">
                <div className="flex items-center gap-3">
                  <BrandIcon name={selectedIntegration.id} size={32} />
                  <div>
                    <h2 className="font-semibold text-foreground">
                      {BrandIcons[selectedIntegration.id]?.name}
                    </h2>
                    <p className="text-xs text-muted-foreground capitalize">
                      {categories.find(c => c.id === selectedIntegration.category)?.label[language]}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="p-2 rounded-xl hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {language === 'es' ? 'Descripción' : 'Description'}
                  </h3>
                  <p className="text-foreground">
                    {selectedIntegration.description[language]}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {language === 'es' ? 'Características' : 'Features'}
                  </h3>
                  <div className="space-y-2">
                    {selectedIntegration.features[language].map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/30"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <motion.button
                  className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {language === 'es' ? 'Incluir en mi app' : 'Include in my app'}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

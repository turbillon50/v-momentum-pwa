'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Presentation, 
  CheckCircle, 
  Code, 
  Puzzle, 
  Rocket, 
  HeartHandshake,
  Palette,
  Server,
  Database,
  Lock,
  CreditCard,
  Zap,
  Globe,
  Activity,
  Shield,
  ChevronRight,
  ArrowDown
} from 'lucide-react'

type JourneyLayer = 'client' | 'production' | 'system'

const clientJourney = [
  { 
    id: 'diagnostico', 
    title: 'Diagnóstico', 
    icon: Search,
    description: 'El cliente envía su idea, tipo de negocio, urgencia, presupuesto y funcionalidades deseadas.',
    detail: 'Analizamos tu proyecto para entender exactamente qué necesitas.'
  },
  { 
    id: 'demo', 
    title: 'Demo Inicial', 
    icon: Presentation,
    description: 'Momentum prepara una demo visual o navegable para validar el concepto rápidamente.',
    detail: 'Te mostramos cómo se verá tu app antes de comprometerte.'
  },
  { 
    id: 'aprobacion', 
    title: 'Aprobación', 
    icon: CheckCircle,
    description: 'El cliente revisa alcance, precio, timeline e integraciones.',
    detail: 'Sin sorpresas. Todo claro desde el inicio.'
  },
  { 
    id: 'desarrollo', 
    title: 'Desarrollo', 
    icon: Code,
    description: 'La app se construye usando el stack Momentum.',
    detail: 'Código limpio, moderno y escalable.'
  },
  { 
    id: 'integracion', 
    title: 'Integración', 
    icon: Puzzle,
    description: 'Pagos, formularios, autenticación, base de datos, automatizaciones, APIs y servicios se conectan.',
    detail: 'Todo funcionando como un sistema real.'
  },
  { 
    id: 'entrega', 
    title: 'Entrega', 
    icon: Rocket,
    description: 'El cliente recibe la app funcionando, desplegada y lista para usar.',
    detail: 'Tu app en producción, accesible desde cualquier dispositivo.'
  },
  { 
    id: 'soporte', 
    title: 'Soporte y Evolución', 
    icon: HeartHandshake,
    description: 'Actualizaciones, mejoras, integraciones y funciones de crecimiento continúan en el tiempo.',
    detail: 'Tu app evoluciona con tu negocio.'
  },
]

const productionJourney = [
  { id: 'idea', title: 'Idea / Brief', icon: Search, tools: 'Diagnóstico, Jotform' },
  { id: 'ux', title: 'UX / UI', icon: Palette, tools: 'v0, Claude Design, Figma' },
  { id: 'frontend', title: 'Frontend', icon: Code, tools: 'Next.js, React, Tailwind' },
  { id: 'backend', title: 'Backend / API', icon: Server, tools: 'Node.js, Edge Functions' },
  { id: 'database', title: 'Database', icon: Database, tools: 'Supabase, PostgreSQL, Neon' },
  { id: 'auth', title: 'Authentication', icon: Lock, tools: 'Clerk, Supabase Auth' },
  { id: 'payments', title: 'Payments', icon: CreditCard, tools: 'Stripe, Mercado Pago' },
  { id: 'automations', title: 'Automations', icon: Zap, tools: 'Make, Zapier, Webhooks' },
  { id: 'deploy', title: 'Deploy', icon: Globe, tools: 'Vercel, Cloudflare' },
  { id: 'domain', title: 'Domain', icon: Globe, tools: 'DNS, SSL/HTTPS' },
  { id: 'monitoring', title: 'Monitoring', icon: Activity, tools: 'Analytics, Logs' },
  { id: 'support', title: 'Support', icon: HeartHandshake, tools: 'Soporte continuo' },
]

const systemJourney = [
  { id: 'usuario', title: 'Usuario', description: 'El usuario entra a tu app', icon: Search },
  { id: 'dominio', title: 'Dominio / DNS', description: 'Se resuelve tu dominio personalizado', icon: Globe },
  { id: 'frontend', title: 'Frontend', description: 'El frontend muestra la interfaz', icon: Palette },
  { id: 'api', title: 'API / Backend', description: 'El backend procesa las peticiones', icon: Server },
  { id: 'database', title: 'Base de datos', description: 'La base de datos guarda la información', icon: Database },
  { id: 'servicios', title: 'Servicios externos', description: 'Las integraciones ejecutan acciones', icon: Puzzle },
  { id: 'deploy', title: 'Deploy', description: 'El sistema está en producción', icon: Rocket },
  { id: 'seguridad', title: 'Seguridad', description: 'SSL, Auth, API Keys protegen todo', icon: Shield },
]

export function ProcesoSection() {
  const [activeLayer, setActiveLayer] = useState<JourneyLayer>('client')
  const [expandedStep, setExpandedStep] = useState<string | null>(null)

  const layers = [
    { id: 'client' as JourneyLayer, label: 'Viaje del Cliente', description: 'Tu experiencia paso a paso' },
    { id: 'production' as JourneyLayer, label: 'Producción', description: 'Cómo construimos tu app' },
    { id: 'system' as JourneyLayer, label: 'Arquitectura', description: 'Cómo funciona el sistema' },
  ]

  return (
    <section id="proceso" className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium mb-4 tracking-wider uppercase"
          >
            Proceso Momentum
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4 text-balance"
          >
            El camino de idea a aplicación real
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Entendemos el proceso completo: tu experiencia como cliente, nuestra ejecución técnica, y cómo funciona el sistema final.
          </motion.p>
        </div>

        {/* Layer tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {layers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeLayer === layer.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <span className="block">{layer.label}</span>
              <span className="block text-[10px] opacity-70">{layer.description}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeLayer === 'client' && (
            <motion.div
              key="client"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative"
            >
              {/* Client journey cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {clientJourney.map((step, index) => {
                  const Icon = step.icon
                  const isExpanded = expandedStep === step.id
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`glass rounded-2xl p-6 cursor-pointer transition-all hover:scale-[1.02] ${
                        isExpanded ? 'ring-1 ring-primary' : ''
                      }`}
                      onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-muted-foreground font-mono">{String(index + 1).padStart(2, '0')}</span>
                            <h3 className="font-semibold text-foreground">{step.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{step.description}</p>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-border"
                              >
                                <p className="text-sm text-primary">{step.detail}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {activeLayer === 'production' && (
            <motion.div
              key="production"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Production flow */}
              <div className="relative">
                {/* Vertical line for mobile */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent md:hidden" />
                
                <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0 lg:grid-cols-4">
                  {productionJourney.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="relative pl-12 md:pl-0"
                      >
                        {/* Mobile dot indicator */}
                        <div className="absolute left-4 top-4 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary md:hidden">
                          <div className="absolute inset-1 rounded-full bg-primary" />
                        </div>

                        <div className="glass rounded-xl p-4 hover:bg-muted/30 transition-colors">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <h4 className="font-medium text-sm">{step.title}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">{step.tools}</p>
                        </div>

                        {/* Arrow down for mobile */}
                        {index < productionJourney.length - 1 && (
                          <ArrowDown className="absolute left-5 -bottom-2 w-3 h-3 text-primary/50 md:hidden" />
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {activeLayer === 'system' && (
            <motion.div
              key="system"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* System architecture */}
              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  {/* Connecting line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-primary/20" />

                  <div className="space-y-6">
                    {systemJourney.map((step, index) => {
                      const Icon = step.icon
                      const isEven = index % 2 === 0
                      return (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className={`relative flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}
                        >
                          {/* Dot on timeline */}
                          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10">
                            <div className="absolute inset-1 rounded-full bg-primary animate-pulse" />
                          </div>

                          {/* Card */}
                          <div className={`w-[45%] glass rounded-xl p-4 ${isEven ? 'mr-auto' : 'ml-auto'}`}>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <h4 className="font-semibold">{step.title}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Key concepts */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Auth / Autorización', 'API Keys', 'Webhooks', 'SDKs / APIs', 'Environment Vars', 'Deploy', 'SSL / HTTPS', 'Logs / Monitoring'].map((concept) => (
                    <div key={concept} className="px-3 py-2 rounded-lg bg-muted/30 text-xs text-muted-foreground text-center">
                      {concept}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

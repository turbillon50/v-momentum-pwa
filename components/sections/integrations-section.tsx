'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  Database, 
  Globe, 
  Users, 
  Workflow, 
  CreditCard, 
  Wallet, 
  Plane, 
  Gift, 
  Ticket, 
  FileSignature, 
  Palette,
  ChevronDown,
  Check,
  Sparkles,
  Clock,
  Zap
} from 'lucide-react'

type IntegrationStatus = 'included' | 'optional' | 'advanced' | 'future'

interface Integration {
  name: string
  description: string
  whenUsed: string
  clientBenefit: string
  status: IntegrationStatus
}

interface IntegrationCategory {
  id: string
  title: string
  icon: React.ElementType
  integrations: Integration[]
}

const integrationCategories: IntegrationCategory[] = [
  {
    id: 'core',
    title: 'Core App',
    icon: Shield,
    integrations: [
      { name: 'Clerk', description: 'Autenticación y gestión de usuarios', whenUsed: 'Apps con login', clientBenefit: 'Login seguro con múltiples métodos', status: 'included' },
      { name: 'Supabase', description: 'Base de datos PostgreSQL en la nube', whenUsed: 'Almacenamiento de datos', clientBenefit: 'Datos persistentes y seguros', status: 'included' },
      { name: 'Neon', description: 'PostgreSQL serverless', whenUsed: 'Proyectos escalables', clientBenefit: 'Base de datos que escala automáticamente', status: 'optional' },
      { name: 'Vercel', description: 'Despliegue y hosting', whenUsed: 'Todos los proyectos', clientBenefit: 'Tu app en línea 24/7', status: 'included' },
      { name: 'Cloudflare', description: 'CDN y seguridad', whenUsed: 'Proyectos con alto tráfico', clientBenefit: 'Carga rápida globalmente', status: 'included' },
    ]
  },
  {
    id: 'captacion',
    title: 'Captación y Operación',
    icon: Users,
    integrations: [
      { name: 'Jotform', description: 'Formularios avanzados', whenUsed: 'Captura de leads', clientBenefit: 'Formularios profesionales sin código', status: 'included' },
      { name: 'Airtable', description: 'Base de datos visual', whenUsed: 'Gestión de datos simple', clientBenefit: 'Gestiona info como en Excel pero mejor', status: 'optional' },
      { name: 'Make', description: 'Automatizaciones', whenUsed: 'Flujos automáticos', clientBenefit: 'Tu app trabaja sola', status: 'optional' },
      { name: 'ClickUp', description: 'Gestión de proyectos', whenUsed: 'Coordinación interna', clientBenefit: 'Seguimiento de tareas integrado', status: 'optional' },
      { name: 'Resend', description: 'Envío de emails', whenUsed: 'Notificaciones', clientBenefit: 'Emails automáticos profesionales', status: 'included' },
    ]
  },
  {
    id: 'pagos',
    title: 'Pagos',
    icon: CreditCard,
    integrations: [
      { name: 'Stripe', description: 'Pagos internacionales', whenUsed: 'E-commerce, suscripciones', clientBenefit: 'Acepta pagos de todo el mundo', status: 'included' },
      { name: 'Mercado Pago', description: 'Pagos LATAM', whenUsed: 'Clientes en México/LATAM', clientBenefit: 'Pagos locales con tarjeta y efectivo', status: 'optional' },
    ]
  },
  {
    id: 'web3',
    title: 'Web3 / Fintech',
    icon: Wallet,
    integrations: [
      { name: 'Turnkey', description: 'Wallets custodiados', whenUsed: 'Apps crypto', clientBenefit: 'Wallets seguros para tus usuarios', status: 'advanced' },
      { name: 'Alchemy', description: 'Infraestructura blockchain', whenUsed: 'Smart contracts', clientBenefit: 'Conexión confiable a blockchains', status: 'advanced' },
      { name: 'LI.FI', description: 'Cross-chain swaps', whenUsed: 'Intercambio de tokens', clientBenefit: 'Swap entre diferentes blockchains', status: 'advanced' },
      { name: 'Onramper', description: 'Compra de crypto', whenUsed: 'Onboarding crypto', clientBenefit: 'Tus usuarios compran crypto fácil', status: 'advanced' },
      { name: 'Safe', description: 'Multi-sig wallets', whenUsed: 'Tesorería empresarial', clientBenefit: 'Wallets con múltiples firmas', status: 'advanced' },
      { name: 'Bybit', description: 'Exchange API', whenUsed: 'Trading features', clientBenefit: 'Funciones de trading integradas', status: 'advanced' },
      { name: 'Sumsub', description: 'KYC/AML', whenUsed: 'Verificación de identidad', clientBenefit: 'Cumplimiento regulatorio', status: 'advanced' },
    ]
  },
  {
    id: 'experiencias',
    title: 'Experiencias / Comercio',
    icon: Plane,
    integrations: [
      { name: 'Duffel', description: 'API de vuelos', whenUsed: 'Apps de viajes', clientBenefit: 'Vende vuelos directamente', status: 'advanced' },
      { name: 'Reloadly', description: 'Recargas y gift cards', whenUsed: 'Apps de servicios', clientBenefit: 'Vende recargas y tarjetas de regalo', status: 'advanced' },
      { name: 'Ticket Tailor', description: 'Venta de boletos', whenUsed: 'Apps de eventos', clientBenefit: 'Vende boletos para eventos', status: 'optional' },
    ]
  },
  {
    id: 'legal',
    title: 'Legal',
    icon: FileSignature,
    integrations: [
      { name: 'DocuSign', description: 'Firma electrónica', whenUsed: 'Contratos digitales', clientBenefit: 'Firma documentos legalmente válidos', status: 'optional' },
    ]
  },
  {
    id: 'desarrollo',
    title: 'Diseño / Desarrollo',
    icon: Palette,
    integrations: [
      { name: 'v0', description: 'Generación de UI con IA', whenUsed: 'Diseño rápido', clientBenefit: 'Interfaces premium en menos tiempo', status: 'included' },
      { name: 'Claude Design', description: 'Diseño asistido por IA', whenUsed: 'Iteraciones de diseño', clientBenefit: 'Diseños inteligentes y consistentes', status: 'included' },
      { name: 'Cursor', description: 'IDE con IA', whenUsed: 'Desarrollo', clientBenefit: 'Código de alta calidad', status: 'included' },
      { name: 'GitHub', description: 'Control de versiones', whenUsed: 'Todo proyecto', clientBenefit: 'Tu código siempre respaldado', status: 'included' },
      { name: 'Replit', description: 'Entorno colaborativo', whenUsed: 'Prototipos', clientBenefit: 'Pruebas rápidas', status: 'optional' },
      { name: 'Codex', description: 'Asistente de código IA', whenUsed: 'Desarrollo complejo', clientBenefit: 'Soluciones técnicas avanzadas', status: 'included' },
      { name: 'Claude Code', description: 'Generación de código', whenUsed: 'Lógica de negocio', clientBenefit: 'Funcionalidades complejas rápido', status: 'included' },
    ]
  },
]

const statusConfig = {
  included: { label: 'Incluido', color: 'text-emerald-400', bg: 'bg-emerald-400/10', icon: Check },
  optional: { label: 'Opcional', color: 'text-blue-400', bg: 'bg-blue-400/10', icon: Sparkles },
  advanced: { label: 'Avanzado', color: 'text-purple-400', bg: 'bg-purple-400/10', icon: Zap },
  future: { label: 'Próximamente', color: 'text-muted-foreground', bg: 'bg-muted/50', icon: Clock },
}

export function IntegrationsSection() {
  const [activeCategory, setActiveCategory] = useState('core')
  const [expandedIntegration, setExpandedIntegration] = useState<string | null>(null)

  const currentCategory = integrationCategories.find(c => c.id === activeCategory)

  return (
    <section id="integraciones" className="py-20 md:py-32 px-4 bg-gradient-to-b from-background via-muted/5 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium mb-4 tracking-wider uppercase"
          >
            Ecosistema de Integraciones
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Todo lo que tu app necesita
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Integramos las mejores herramientas del mercado para que tu app funcione como un sistema completo desde el día uno.
          </motion.p>
        </div>

        {/* Category pills - horizontal scroll on mobile */}
        <div className="overflow-x-auto no-scrollbar mb-8">
          <div className="flex gap-2 pb-2 min-w-max justify-start md:justify-center">
            {integrationCategories.map((category) => {
              const Icon = category.icon
              const isActive = activeCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.title}
                </button>
              )
            })}
          </div>
        </div>

        {/* Integrations grid */}
        <AnimatePresence mode="wait">
          {currentCategory && (
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
            >
              {currentCategory.integrations.map((integration, index) => {
                const isExpanded = expandedIntegration === `${currentCategory.id}-${integration.name}`
                const status = statusConfig[integration.status]
                const StatusIcon = status.icon

                return (
                  <motion.div
                    key={integration.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`glass rounded-xl overflow-hidden transition-all cursor-pointer hover:scale-[1.01] ${
                      isExpanded ? 'ring-1 ring-primary' : ''
                    }`}
                    onClick={() => setExpandedIntegration(
                      isExpanded ? null : `${currentCategory.id}-${integration.name}`
                    )}
                  >
                    <div className="p-4">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                            <span className="text-xs font-bold text-foreground">{integration.name.substring(0, 2).toUpperCase()}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{integration.name}</h4>
                            <p className="text-xs text-muted-foreground">{integration.description}</p>
                          </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>

                      {/* Status badge */}
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </div>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-border space-y-3"
                          >
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Cuándo lo usamos</p>
                              <p className="text-sm text-foreground">{integration.whenUsed}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Qué gana tu app</p>
                              <p className="text-sm text-primary">{integration.clientBenefit}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 pt-8 border-t border-border">
          {Object.entries(statusConfig).map(([key, config]) => {
            const Icon = config.icon
            return (
              <div key={key} className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className={`w-5 h-5 rounded-full ${config.bg} flex items-center justify-center`}>
                  <Icon className={`w-3 h-3 ${config.color}`} />
                </div>
                {config.label}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

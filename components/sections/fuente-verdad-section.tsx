'use client'

import { motion } from 'framer-motion'
import { 
  Search, 
  Target, 
  Palette, 
  GitBranch, 
  Rocket, 
  Globe, 
  Puzzle, 
  HeartHandshake,
  CheckCircle,
  Clock,
  FileText,
  Link,
  MessageSquare,
  CreditCard
} from 'lucide-react'

const sourceOfTruthSteps = [
  { id: 'cliente', title: 'Cliente', icon: Search, description: 'Información del cliente' },
  { id: 'diagnostico', title: 'Diagnóstico', icon: Target, description: 'Análisis del proyecto' },
  { id: 'alcance', title: 'Alcance', icon: FileText, description: 'Funcionalidades definidas' },
  { id: 'diseno', title: 'Diseño', icon: Palette, description: 'UI/UX aprobado' },
  { id: 'repositorio', title: 'Repositorio', icon: GitBranch, description: 'Código fuente' },
  { id: 'deploy', title: 'Deploy', icon: Rocket, description: 'Ambiente de producción' },
  { id: 'dominio', title: 'Dominio', icon: Globe, description: 'URL personalizada' },
  { id: 'integraciones', title: 'Integraciones', icon: Puzzle, description: 'Servicios conectados' },
  { id: 'soporte', title: 'Soporte', icon: HeartHandshake, description: 'Mantenimiento activo' },
]

// Mock project data
const mockProjectData = {
  projectName: 'App Restaurante La Casa',
  client: 'Juan Pérez',
  status: 'En desarrollo',
  phase: 'Frontend',
  startDate: '15 Ene 2024',
  estimatedDelivery: '25 Ene 2024',
  plan: 'Tradicional ($12,000)',
  progress: 65,
  integrations: [
    { name: 'Stripe', status: 'configured' },
    { name: 'Supabase', status: 'configured' },
    { name: 'Resend', status: 'pending' },
    { name: 'Vercel', status: 'configured' },
  ],
  deliverables: [
    { name: 'Diseño UI/UX', status: 'completed' },
    { name: 'Landing page', status: 'completed' },
    { name: 'Sistema de pedidos', status: 'in-progress' },
    { name: 'Panel admin', status: 'pending' },
    { name: 'Integración pagos', status: 'pending' },
  ],
  payments: [
    { description: 'Enganche 50%', amount: '$6,000', status: 'paid' },
    { description: 'Cotización 25%', amount: '$3,000', status: 'pending' },
    { description: 'Entrega 25%', amount: '$3,000', status: 'pending' },
  ],
  demoUrl: 'https://demo.vmomentum.app/restaurante',
  productionUrl: 'https://lacasa.mx',
  repoUrl: 'https://github.com/vmomentum/lacasa-app',
}

export function FuenteVerdadSection() {
  return (
    <section id="fuente-verdad" className="py-20 md:py-32 px-4 bg-gradient-to-b from-background via-muted/5 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium mb-4 tracking-wider uppercase"
          >
            Sistema Interno
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Fuente de verdad
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Cada proyecto tiene una fuente de verdad organizada. Así sabes siempre en qué estado está tu app.
          </motion.p>
        </div>

        {/* Structure flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="overflow-x-auto no-scrollbar pb-4">
            <div className="flex items-center gap-2 min-w-max justify-start md:justify-center">
              {sourceOfTruthSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center gap-2 px-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-center whitespace-nowrap">{step.title}</span>
                    </div>
                    {index < sourceOfTruthSteps.length - 1 && (
                      <div className="w-8 h-px bg-border" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Mock project card - operating system feel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">{mockProjectData.projectName}</h3>
                <p className="text-sm text-muted-foreground">Cliente: {mockProjectData.client}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  {mockProjectData.status}
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Progreso</p>
                  <p className="font-bold text-lg">{mockProjectData.progress}%</p>
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${mockProjectData.progress}%` }}
              />
            </div>
          </div>

          {/* Content grid */}
          <div className="p-6 grid md:grid-cols-3 gap-6">
            {/* Project info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Información
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-medium">{mockProjectData.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fase actual</span>
                  <span className="font-medium">{mockProjectData.phase}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Inicio</span>
                  <span className="font-medium">{mockProjectData.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entrega estimada</span>
                  <span className="font-medium">{mockProjectData.estimatedDelivery}</span>
                </div>
              </div>

              {/* Links */}
              <div className="pt-4 space-y-2">
                <a href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Link className="w-4 h-4" />
                  Ver demo
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Link className="w-4 h-4" />
                  Producción
                </a>
              </div>
            </div>

            {/* Deliverables */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-muted-foreground" />
                Entregables
              </h4>
              <div className="space-y-2">
                {mockProjectData.deliverables.map((item) => (
                  <div key={item.name} className="flex items-center gap-3 text-sm">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'completed' ? 'bg-emerald-400' :
                      item.status === 'in-progress' ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`} />
                    <span className={item.status === 'completed' ? 'text-muted-foreground line-through' : ''}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Integrations & Payments */}
            <div className="space-y-6">
              {/* Integrations */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Puzzle className="w-4 h-4 text-muted-foreground" />
                  Integraciones
                </h4>
                <div className="flex flex-wrap gap-2">
                  {mockProjectData.integrations.map((integration) => (
                    <div 
                      key={integration.name}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        integration.status === 'configured' 
                          ? 'bg-emerald-400/10 text-emerald-400' 
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {integration.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Payments */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  Pagos
                </h4>
                <div className="space-y-2">
                  {mockProjectData.payments.map((payment) => (
                    <div key={payment.description} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{payment.description}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{payment.amount}</span>
                        <div className={`w-2 h-2 rounded-full ${
                          payment.status === 'paid' ? 'bg-emerald-400' : 'bg-muted-foreground/30'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquare className="w-4 h-4" />
              <span>3 mensajes sin leer</span>
            </div>
            <span className="text-xs text-muted-foreground">Última actualización: hace 2 horas</span>
          </div>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Este es un ejemplo visual. Cada cliente tiene acceso a su propio dashboard con información real.
        </motion.p>
      </div>
    </section>
  )
}

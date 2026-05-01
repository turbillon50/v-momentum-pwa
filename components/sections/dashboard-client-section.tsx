'use client'

import { motion } from 'framer-motion'
import { 
  LayoutDashboard,
  Rocket,
  Clock,
  CheckCircle,
  AlertCircle,
  Link,
  MessageSquare,
  CreditCard,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// Mock data for client dashboard
const clientData = {
  name: 'Juan Pérez',
  projectName: 'App Restaurante La Casa',
  status: 'En desarrollo',
  currentPhase: 'Integración de pagos',
  plan: 'Tradicional',
  progress: 75,
  demoUrl: 'https://demo.vmomentum.app/lacasa',
  productionUrl: null,
  nextMilestone: 'Entrega de panel admin',
  nextMilestoneDate: '22 Ene 2024',
  pendingItems: [
    'Revisar diseño del menú',
    'Confirmar método de delivery',
    'Aprobar colores finales'
  ],
  messages: [
    { from: 'Equipo V', text: 'El módulo de pedidos ya está listo para revisión', time: 'Hace 2 horas' },
    { from: 'Equipo V', text: '¿Tienes las fotos del menú actualizadas?', time: 'Ayer' },
  ],
  payments: {
    paid: 6000,
    pending: 6000,
    total: 12000,
  },
  integrations: [
    { name: 'Stripe', status: 'ready' },
    { name: 'Supabase', status: 'ready' },
    { name: 'Resend', status: 'configuring' },
    { name: 'Vercel', status: 'ready' },
  ]
}

export function DashboardClientSection() {
  return (
    <section id="dashboard-cliente" className="py-20 md:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium mb-4 tracking-wider uppercase"
          >
            Vista Previa
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Dashboard Cliente
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Así se ve tu panel personal cuando tienes un proyecto activo con nosotros.
          </motion.p>
        </div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl overflow-hidden"
        >
          {/* Dashboard header */}
          <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <LayoutDashboard className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bienvenido, {clientData.name}</p>
                  <h3 className="text-xl font-bold">{clientData.projectName}</h3>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  {clientData.status}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Left column - Status */}
              <div className="md:col-span-2 space-y-6">
                {/* Progress card */}
                <div className="p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Progreso del proyecto</span>
                    <span className="text-2xl font-bold">{clientData.progress}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
                      style={{ width: `${clientData.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                    <span>Fase: {clientData.currentPhase}</span>
                    <span>Plan: {clientData.plan}</span>
                  </div>
                </div>

                {/* Next milestone */}
                <div className="p-4 rounded-xl bg-muted/30 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Próximo hito</p>
                    <p className="font-semibold">{clientData.nextMilestone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Fecha</p>
                    <p className="font-semibold">{clientData.nextMilestoneDate}</p>
                  </div>
                </div>

                {/* Pending items */}
                <div className="p-4 rounded-xl bg-muted/30">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    Pendientes de tu lado
                  </h4>
                  <div className="space-y-2">
                    {clientData.pendingItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-5 h-5 rounded border border-border flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-muted-foreground" />
                        </div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <a href="#" className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Ver demo</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[150px]">{clientData.demoUrl}</p>
                    </div>
                  </a>
                  <div className="p-4 rounded-xl bg-muted/30 flex items-center gap-3 opacity-50">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Link className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Producción</p>
                      <p className="text-xs text-muted-foreground">Pendiente de entrega</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Messages & Payments */}
              <div className="space-y-6">
                {/* Messages */}
                <div className="p-4 rounded-xl bg-muted/30">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Mensajes
                  </h4>
                  <div className="space-y-3">
                    {clientData.messages.map((msg, index) => (
                      <div key={index} className="p-3 rounded-lg bg-background/50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-primary">{msg.from}</span>
                          <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
                    Ver todos los mensajes
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>

                {/* Payments */}
                <div className="p-4 rounded-xl bg-muted/30">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-primary" />
                    Pagos
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pagado</span>
                      <span className="text-emerald-400 font-medium">${clientData.payments.paid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pendiente</span>
                      <span className="font-medium">${clientData.payments.pending.toLocaleString()}</span>
                    </div>
                    <div className="pt-3 border-t border-border flex justify-between text-sm">
                      <span className="font-medium">Total</span>
                      <span className="font-bold">${clientData.payments.total.toLocaleString()} MXN</span>
                    </div>
                  </div>
                </div>

                {/* Integrations status */}
                <div className="p-4 rounded-xl bg-muted/30">
                  <h4 className="font-semibold mb-3">Integraciones</h4>
                  <div className="space-y-2">
                    {clientData.integrations.map((integration) => (
                      <div key={integration.name} className="flex items-center justify-between text-sm">
                        <span>{integration.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          integration.status === 'ready' 
                            ? 'bg-emerald-400/10 text-emerald-400' 
                            : 'bg-amber-400/10 text-amber-400'
                        }`}>
                          {integration.status === 'ready' ? 'Listo' : 'Configurando'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Dashboard ilustrativo. Cada cliente accede con sus credenciales a información real de su proyecto.
        </motion.p>
      </div>
    </section>
  )
}

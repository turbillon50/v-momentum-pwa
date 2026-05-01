'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Utensils, 
  Sparkles, 
  Briefcase, 
  Scale, 
  Building2, 
  Home, 
  Plane, 
  CalendarDays, 
  ShoppingBag, 
  Wallet, 
  GraduationCap, 
  Server,
  ArrowRight,
  Play
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DemosSectionProps {
  onNavigate: (section: string) => void
}

const demoCategories = [
  {
    id: 'restaurantes',
    title: 'Restaurantes',
    icon: Utensils,
    description: 'Sistema de pedidos, reservaciones y delivery',
    appType: 'PWA + Admin',
    integrations: ['Stripe', 'Resend', 'Supabase', 'WhatsApp'],
    gradient: 'from-orange-500/20 to-red-500/20'
  },
  {
    id: 'spas',
    title: 'Spas y Estética',
    icon: Sparkles,
    description: 'Agenda de citas, catálogo de servicios y pagos',
    appType: 'PWA + Booking',
    integrations: ['Stripe', 'Calendar', 'Resend', 'Clerk'],
    gradient: 'from-pink-500/20 to-purple-500/20'
  },
  {
    id: 'profesionistas',
    title: 'Profesionistas',
    icon: Briefcase,
    description: 'Portafolio, agenda y cotizaciones',
    appType: 'Landing + CRM',
    integrations: ['Jotform', 'Airtable', 'Resend'],
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 'legal',
    title: 'Legal / Contable',
    icon: Scale,
    description: 'Portal de clientes, documentos y firmas',
    appType: 'Dashboard + Docs',
    integrations: ['DocuSign', 'Supabase', 'Clerk', 'Resend'],
    gradient: 'from-slate-500/20 to-zinc-500/20'
  },
  {
    id: 'construccion',
    title: 'Construcción',
    icon: Building2,
    description: 'Cotizaciones, avances y gestión de proyectos',
    appType: 'Dashboard + Mobile',
    integrations: ['Airtable', 'Supabase', 'Stripe'],
    gradient: 'from-amber-500/20 to-yellow-500/20'
  },
  {
    id: 'inmobiliaria',
    title: 'Inmobiliaria',
    icon: Home,
    description: 'Listados, tours virtuales y captación de leads',
    appType: 'PWA + Admin',
    integrations: ['Supabase', 'Jotform', 'Resend', 'Maps'],
    gradient: 'from-emerald-500/20 to-green-500/20'
  },
  {
    id: 'turismo',
    title: 'Turismo',
    icon: Plane,
    description: 'Reservaciones, paquetes y experiencias',
    appType: 'Booking Platform',
    integrations: ['Duffel', 'Stripe', 'Supabase', 'Resend'],
    gradient: 'from-sky-500/20 to-blue-500/20'
  },
  {
    id: 'eventos',
    title: 'Eventos',
    icon: CalendarDays,
    description: 'Venta de boletos, check-in y gestión',
    appType: 'Ticketing + App',
    integrations: ['Ticket Tailor', 'Stripe', 'QR', 'Resend'],
    gradient: 'from-violet-500/20 to-purple-500/20'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    icon: ShoppingBag,
    description: 'Tienda online completa con inventario',
    appType: 'Storefront + Admin',
    integrations: ['Stripe', 'Supabase', 'Resend', 'Inventory'],
    gradient: 'from-rose-500/20 to-pink-500/20'
  },
  {
    id: 'fintech',
    title: 'Fintech',
    icon: Wallet,
    description: 'Wallets, pagos y crypto',
    appType: 'Fintech App',
    integrations: ['Turnkey', 'Stripe', 'Sumsub', 'Safe'],
    gradient: 'from-indigo-500/20 to-blue-500/20'
  },
  {
    id: 'academias',
    title: 'Academias',
    icon: GraduationCap,
    description: 'Cursos, alumnos y certificaciones',
    appType: 'LMS + Portal',
    integrations: ['Clerk', 'Supabase', 'Stripe', 'Resend'],
    gradient: 'from-teal-500/20 to-cyan-500/20'
  },
  {
    id: 'apps-internas',
    title: 'Apps Internas',
    icon: Server,
    description: 'Herramientas para tu equipo',
    appType: 'Internal Tool',
    integrations: ['Clerk', 'Supabase', 'Make', 'Airtable'],
    gradient: 'from-gray-500/20 to-slate-500/20'
  },
]

export function DemosSection({ onNavigate }: DemosSectionProps) {
  const [hoveredDemo, setHoveredDemo] = useState<string | null>(null)

  return (
    <section id="demos" className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium mb-4 tracking-wider uppercase"
          >
            Casos de Uso
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Demos por industria
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Explora ejemplos de apps que podemos crear para tu industria. Cada demo es funcional y personalizable.
          </motion.p>
        </div>

        {/* Demo grid - Apple TV style cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {demoCategories.map((demo, index) => {
            const Icon = demo.icon
            const isHovered = hoveredDemo === demo.id

            return (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredDemo(demo.id)}
                onMouseLeave={() => setHoveredDemo(null)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${demo.gradient} transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-50'}`} />
                
                {/* Glass overlay */}
                <div className="relative glass-strong p-6 h-full min-h-[200px] flex flex-col">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{demo.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{demo.description}</p>
                    
                    {/* App type badge */}
                    <div className="inline-flex px-2 py-1 rounded-md bg-background/50 text-xs font-medium mb-3">
                      {demo.appType}
                    </div>

                    {/* Integrations */}
                    <div className="flex flex-wrap gap-1">
                      {demo.integrations.slice(0, 3).map((integration) => (
                        <span key={integration} className="px-2 py-0.5 rounded-full bg-muted/50 text-[10px] text-muted-foreground">
                          {integration}
                        </span>
                      ))}
                      {demo.integrations.length > 3 && (
                        <span className="px-2 py-0.5 rounded-full bg-muted/50 text-[10px] text-muted-foreground">
                          +{demo.integrations.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover actions */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                    className="flex gap-2 mt-4 pt-4 border-t border-border/50"
                  >
                    <Button 
                      size="sm" 
                      variant="secondary"
                      className="flex-1 text-xs"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Ver demo
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => onNavigate('contacto')}
                      className="flex-1 text-xs bg-primary hover:bg-primary/90"
                    >
                      Quiero algo así
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">¿No ves tu industria?</p>
          <Button 
            onClick={() => onNavigate('contacto')}
            variant="outline"
            className="px-6"
          >
            Cuéntanos tu idea
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

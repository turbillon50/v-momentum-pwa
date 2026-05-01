'use client'

import { motion } from 'framer-motion'
import { 
  Settings,
  Users,
  FolderKanban,
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  MoreHorizontal,
  Search,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Mock admin data
const adminStats = [
  { label: 'Proyectos activos', value: '12', icon: FolderKanban, change: '+2 este mes' },
  { label: 'Leads nuevos', value: '28', icon: Users, change: '+8 esta semana' },
  { label: 'Ingresos mes', value: '$156k', icon: DollarSign, change: '+23% vs anterior' },
  { label: 'Entregas pendientes', value: '4', icon: Clock, change: '2 esta semana' },
]

const mockProjects = [
  { 
    id: 1, 
    name: 'App Restaurante La Casa', 
    client: 'Juan Pérez',
    status: 'in-progress',
    phase: 'Integración',
    priority: 'high',
    payment: 'partial',
    dueDate: '25 Ene',
    progress: 75
  },
  { 
    id: 2, 
    name: 'Portal Inmobiliaria MX', 
    client: 'María García',
    status: 'in-progress',
    phase: 'Frontend',
    priority: 'medium',
    payment: 'pending',
    dueDate: '30 Ene',
    progress: 45
  },
  { 
    id: 3, 
    name: 'Dashboard Contable Pro', 
    client: 'Carlos López',
    status: 'review',
    phase: 'Entrega',
    priority: 'high',
    payment: 'complete',
    dueDate: '20 Ene',
    progress: 95
  },
  { 
    id: 4, 
    name: 'E-commerce Moda Bella', 
    client: 'Ana Martínez',
    status: 'pending',
    phase: 'Diagnóstico',
    priority: 'low',
    payment: 'pending',
    dueDate: '15 Feb',
    progress: 10
  },
]

const mockLeads = [
  { name: 'Roberto Sánchez', project: 'App de eventos', date: 'Hoy', status: 'new' },
  { name: 'Laura Jiménez', project: 'Tienda online', date: 'Ayer', status: 'contacted' },
  { name: 'Miguel Torres', project: 'Dashboard interno', date: '2 días', status: 'demo-sent' },
]

const statusColors = {
  'in-progress': 'bg-primary/10 text-primary',
  'review': 'bg-amber-400/10 text-amber-400',
  'pending': 'bg-muted text-muted-foreground',
  'complete': 'bg-emerald-400/10 text-emerald-400'
}

const priorityColors = {
  high: 'text-red-400',
  medium: 'text-amber-400',
  low: 'text-muted-foreground'
}

export function DashboardAdminSection() {
  return (
    <section id="dashboard-admin" className="py-20 md:py-32 px-4 bg-gradient-to-b from-background via-muted/5 to-background">
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
            Panel de Administración
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Así gestionamos internamente todos los proyectos, leads y entregas de V Momentum.
          </motion.p>
        </div>

        {/* Admin dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl overflow-hidden"
        >
          {/* Admin header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">V Momentum Admin</h3>
                <p className="text-xs text-muted-foreground">Panel de control interno</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Buscar..." className="pl-9 w-48 h-9 bg-muted/50 border-0" />
              </div>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stats row */}
          <div className="p-4 border-b border-border grid grid-cols-2 md:grid-cols-4 gap-4">
            {adminStats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    {stat.change}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Main content */}
          <div className="p-4 grid lg:grid-cols-3 gap-4">
            {/* Projects table */}
            <div className="lg:col-span-2 p-4 rounded-xl bg-muted/30">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <FolderKanban className="w-4 h-4 text-primary" />
                  Proyectos
                </h4>
                <Button variant="ghost" size="sm" className="text-xs">
                  Ver todos
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground text-xs">
                      <th className="pb-3 font-medium">Proyecto</th>
                      <th className="pb-3 font-medium hidden sm:table-cell">Estado</th>
                      <th className="pb-3 font-medium hidden md:table-cell">Pago</th>
                      <th className="pb-3 font-medium">Entrega</th>
                      <th className="pb-3 font-medium w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {mockProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-muted/50">
                        <td className="py-3">
                          <div>
                            <p className="font-medium flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${priorityColors[project.priority]} ${project.priority === 'high' ? 'animate-pulse' : ''}`} />
                              <span className="truncate max-w-[120px] sm:max-w-none">{project.name}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">{project.client}</p>
                          </div>
                        </td>
                        <td className="py-3 hidden sm:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                            {project.phase}
                          </span>
                        </td>
                        <td className="py-3 hidden md:table-cell">
                          <span className={`text-xs ${
                            project.payment === 'complete' ? 'text-emerald-400' :
                            project.payment === 'partial' ? 'text-amber-400' : 'text-muted-foreground'
                          }`}>
                            {project.payment === 'complete' ? 'Pagado' : 
                             project.payment === 'partial' ? 'Parcial' : 'Pendiente'}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className="text-xs">{project.dueDate}</span>
                        </td>
                        <td className="py-3">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Leads */}
              <div className="p-4 rounded-xl bg-muted/30">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Leads recientes
                  </h4>
                </div>
                <div className="space-y-3">
                  {mockLeads.map((lead, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{lead.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{lead.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{lead.project}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-muted-foreground">{lead.date}</p>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          lead.status === 'new' ? 'bg-emerald-400/10 text-emerald-400' :
                          lead.status === 'contacted' ? 'bg-blue-400/10 text-blue-400' :
                          'bg-amber-400/10 text-amber-400'
                        }`}>
                          {lead.status === 'new' ? 'Nuevo' : 
                           lead.status === 'contacted' ? 'Contactado' : 'Demo enviada'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts */}
              <div className="p-4 rounded-xl bg-muted/30">
                <h4 className="font-semibold flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Alertas
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-400/5 text-sm">
                    <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="text-amber-400">2 entregas esta semana</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-red-400/5 text-sm">
                    <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className="text-red-400">1 pago vencido</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-400/5 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-emerald-400">3 demos aprobadas</span>
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
          Panel de administración interno. Los clientes no tienen acceso a esta vista.
        </motion.p>
      </div>
    </section>
  )
}

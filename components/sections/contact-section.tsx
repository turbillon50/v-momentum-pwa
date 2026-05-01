'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Send, 
  MessageCircle, 
  Mail, 
  Clock,
  Upload,
  Apple,
  Smartphone,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const projectTypes = [
  'Landing / PWA',
  'E-commerce',
  'Dashboard / Admin',
  'App móvil',
  'Sistema interno',
  'Plataforma SaaS',
  'Fintech / Web3',
  'Otro'
]

const urgencyOptions = [
  'Lo antes posible',
  '1-2 semanas',
  '1 mes',
  'Sin prisa, planeando'
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    company: '',
    projectType: '',
    plan: '',
    storePublish: '',
    urgency: '',
    description: '',
    consent: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Frontend only - would connect to backend later
    console.log('Form submitted:', formData)
    alert('¡Gracias! Te contactaremos pronto.')
  }

  return (
    <section id="contacto" className="py-20 md:py-32 px-4 bg-gradient-to-b from-background via-muted/5 to-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium mb-4 tracking-wider uppercase"
          >
            Empezar Ahora
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Diagnóstico de proyecto
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Cuéntanos sobre tu proyecto y te enviaremos una propuesta personalizada con demo incluida.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-6">
              {/* Personal info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre"
                    className="bg-muted/50 border-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp *</Label>
                  <Input
                    id="whatsapp"
                    required
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+52 123 456 7890"
                    className="bg-muted/50 border-0"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico *</Label>
                  <Input
                    id="email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu@email.com"
                    className="bg-muted/50 border-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa / Marca</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Nombre de tu negocio"
                    className="bg-muted/50 border-0"
                  />
                </div>
              </div>

              {/* Project info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de proyecto *</Label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                  >
                    <SelectTrigger className="bg-muted/50 border-0">
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Plan de interés</Label>
                  <Select
                    value={formData.plan}
                    onValueChange={(value) => setFormData({ ...formData, plan: value })}
                  >
                    <SelectTrigger className="bg-muted/50 border-0">
                      <SelectValue placeholder="Selecciona plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="traditional">Plan Tradicional ($12,000)</SelectItem>
                      <SelectItem value="flexible">Plan Flexible ($3,000 inicio)</SelectItem>
                      <SelectItem value="undecided">Aún no sé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Publicación en tiendas</Label>
                  <Select
                    value={formData.storePublish}
                    onValueChange={(value) => setFormData({ ...formData, storePublish: value })}
                  >
                    <SelectTrigger className="bg-muted/50 border-0">
                      <SelectValue placeholder="Selecciona opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ios">
                        <div className="flex items-center gap-2">
                          <Apple className="w-4 h-4" />
                          Solo iOS (+$5,000)
                        </div>
                      </SelectItem>
                      <SelectItem value="android">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4" />
                          Solo Android (+$3,000)
                        </div>
                      </SelectItem>
                      <SelectItem value="both">Ambas plataformas (+$8,000)</SelectItem>
                      <SelectItem value="pwa">Solo PWA (incluido)</SelectItem>
                      <SelectItem value="undecided">Aún no sé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Urgencia</Label>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                  >
                    <SelectTrigger className="bg-muted/50 border-0">
                      <SelectValue placeholder="¿Cuándo lo necesitas?" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Descripción del proyecto *</Label>
                <textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Cuéntanos sobre tu idea, qué problema resuelve, qué funcionalidades necesitas..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* File upload placeholder */}
              <div className="space-y-2">
                <Label>Adjuntar archivos (opcional)</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Arrastra archivos o haz clic para subir</p>
                  <p className="text-xs text-muted-foreground mt-1">Referencias, mockups, documentos</p>
                </div>
              </div>

              {/* Consent */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                />
                <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  Acepto que V Momentum me contacte por WhatsApp o correo electrónico para dar seguimiento a mi proyecto.
                </Label>
              </div>

              {/* Submit */}
              <Button 
                type="submit"
                size="lg"
                disabled={!formData.consent}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold rounded-xl"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar mi proyecto
              </Button>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Direct contact */}
            <div className="glass rounded-2xl p-6">
              <h4 className="font-semibold mb-4">Contacto directo</h4>
              <div className="space-y-4">
                <a 
                  href="https://wa.me/521234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <div>
                    <p className="font-medium text-sm">WhatsApp</p>
                    <p className="text-xs opacity-80">Respuesta inmediata</p>
                  </div>
                </a>
                <a 
                  href="mailto:hola@vmomentum.app"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 text-foreground hover:bg-muted transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <div>
                    <p className="font-medium text-sm">Email</p>
                    <p className="text-xs text-muted-foreground">hola@vmomentum.app</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Response time */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Tiempo de respuesta</p>
                  <p className="text-sm text-muted-foreground">Menos de 24 horas</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Te enviaremos una propuesta con demo visual de tu proyecto incluida.
              </p>
            </div>

            {/* FAQ teaser */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-accent" />
                </div>
                <p className="font-semibold">¿Tienes dudas?</p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Escríbenos por WhatsApp y te explicamos todo sin compromiso.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://wa.me/521234567890?text=Hola,%20tengo%20dudas%20sobre%20V%20Momentum', '_blank')}
                className="w-full"
              >
                Preguntar ahora
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

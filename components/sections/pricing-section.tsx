'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Check, 
  Sparkles, 
  Clock, 
  Shield, 
  MessageCircle,
  Apple,
  Smartphone
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PricingSectionProps {
  onNavigate: (section: string) => void
}

const includedFeatures = [
  'Landing / PWA funcional',
  'Diseño premium',
  'Autenticación',
  'Base de datos',
  'Formularios',
  'Emails',
  'Pagos',
  'Deploy',
  'Dominio configurado',
  'Integraciones según proyecto',
  'Soporte inicial',
  'Escalabilidad futura',
]

export function PricingSection({ onNavigate }: PricingSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<'traditional' | 'flexible'>('traditional')

  return (
    <section id="precios" className="py-20 md:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium mb-4 tracking-wider uppercase"
          >
            Precios Transparentes
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Elige tu plan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Sin sorpresas. Precios claros desde el inicio. Elige el plan que mejor se adapte a tu flujo de efectivo.
          </motion.p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Traditional Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative glass rounded-2xl p-6 md:p-8 transition-all cursor-pointer ${
              selectedPlan === 'traditional' ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedPlan('traditional')}
          >
            {selectedPlan === 'traditional' && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                Seleccionado
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Plan Tradicional</h3>
                <p className="text-sm text-muted-foreground">Pago único</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-bold">$12,000</span>
                <span className="text-muted-foreground">MXN</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Pago único total</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm">Demo gratis en 24 horas</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">50% enganche al iniciar</span>
                  <span className="font-medium">$6,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">25% a la cotización</span>
                  <span className="font-medium">$3,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">25% contra entrega</span>
                  <span className="font-medium">$3,000</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Shield className="w-4 h-4" />
              <span>Tiempo estimado: 2 a 10 días hábiles</span>
            </div>

            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs text-primary font-medium">PVA: Producto Viable Aplicable</p>
              <p className="text-xs text-muted-foreground">Enfocado en resultados reales</p>
            </div>
          </motion.div>

          {/* Flexible Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`relative glass rounded-2xl p-6 md:p-8 transition-all cursor-pointer ${
              selectedPlan === 'flexible' ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedPlan('flexible')}
          >
            {selectedPlan === 'flexible' && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                Seleccionado
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Plan Flexible</h3>
                <p className="text-sm text-muted-foreground">Pagos mensuales</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-bold">$3,000</span>
                <span className="text-muted-foreground">MXN</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">de arranque</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm">+ 11 mensualidades</span>
                <span className="font-medium">$1,000 MXN c/u</span>
              </div>
              
              <div className="flex justify-between text-sm border-t border-border pt-3">
                <span className="text-muted-foreground">Total del plan</span>
                <span className="font-bold text-lg">$14,000 MXN</span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Pagos mensuales fijos</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Soporte y actualizaciones continuas</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>App siempre al día y sin preocupaciones</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* App Store options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 mb-12"
        >
          <h4 className="font-semibold mb-4 text-center">Publicación en tiendas de aplicaciones</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center">
                  <Apple className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">App Store iOS</p>
                  <p className="text-xs text-muted-foreground">Publicación completa</p>
                </div>
              </div>
              <span className="font-bold">+$5,000 MXN</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Google Play Android</p>
                  <p className="text-xs text-muted-foreground">Publicación completa</p>
                </div>
              </div>
              <span className="font-bold">+$3,000 MXN</span>
            </div>
          </div>
        </motion.div>

        {/* What's included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h4 className="font-semibold mb-6 text-center text-lg">Qué incluye tu app</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {includedFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Algunos servicios de terceros pueden tener costos de uso propios dependiendo del volumen o proveedor.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button 
            size="lg"
            onClick={() => onNavigate('contacto')}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-semibold rounded-xl"
          >
            Elegir plan
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => onNavigate('contacto')}
            className="w-full sm:w-auto px-8 py-6 text-base rounded-xl"
          >
            Solicitar diagnóstico
          </Button>
          <Button 
            size="lg"
            variant="ghost"
            onClick={() => window.open('https://wa.me/521234567890', '_blank')}
            className="w-full sm:w-auto px-6 py-6 text-base text-muted-foreground"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

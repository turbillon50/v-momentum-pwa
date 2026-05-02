'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'
import { Check, Zap, Star, Rocket, ArrowRight } from 'lucide-react'

interface PricingScreenProps {
  onNavigate: (screen: 'home' | 'integrations' | 'process' | 'pricing' | 'contact') => void
}

const plans = [
  {
    id: 'mvp',
    name: 'MVP',
    icon: Zap,
    price: { usd: 2500, mxn: 45000 },
    description: {
      es: 'Perfecto para validar tu idea rápidamente',
      en: 'Perfect to validate your idea quickly',
    },
    features: {
      es: [
        'Hasta 5 pantallas',
        '2 integraciones',
        'Auth básico',
        'Base de datos',
        'Deploy en Vercel',
        'Código fuente',
      ],
      en: [
        'Up to 5 screens',
        '2 integrations',
        'Basic auth',
        'Database',
        'Vercel deploy',
        'Source code',
      ],
    },
    delivery: { es: '10-15 días', en: '10-15 days' },
    popular: false,
  },
  {
    id: 'starter',
    name: 'Starter',
    icon: Star,
    price: { usd: 5000, mxn: 90000 },
    description: {
      es: 'Para startups listas para escalar',
      en: 'For startups ready to scale',
    },
    features: {
      es: [
        'Hasta 10 pantallas',
        '4 integraciones',
        'Auth completo + roles',
        'Pagos con Stripe',
        'Dashboard admin',
        'API documentada',
        'Soporte 30 días',
      ],
      en: [
        'Up to 10 screens',
        '4 integrations',
        'Full auth + roles',
        'Stripe payments',
        'Admin dashboard',
        'Documented API',
        '30-day support',
      ],
    },
    delivery: { es: '15-20 días', en: '15-20 days' },
    popular: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    icon: Rocket,
    price: { usd: 10000, mxn: 180000 },
    description: {
      es: 'Solución empresarial completa',
      en: 'Complete enterprise solution',
    },
    features: {
      es: [
        'Pantallas ilimitadas',
        'Integraciones ilimitadas',
        'Arquitectura avanzada',
        'Multi-tenancy',
        'Analytics integrado',
        'CI/CD configurado',
        'Soporte 90 días',
        'Capacitación incluida',
      ],
      en: [
        'Unlimited screens',
        'Unlimited integrations',
        'Advanced architecture',
        'Multi-tenancy',
        'Integrated analytics',
        'CI/CD configured',
        '90-day support',
        'Training included',
      ],
    },
    delivery: { es: '25-30 días', en: '25-30 days' },
    popular: false,
  },
]

export function PricingScreen({ onNavigate }: PricingScreenProps) {
  const [currency, setCurrency] = useState<'usd' | 'mxn'>('usd')
  const { language } = useLanguage()

  const formatPrice = (price: number) => {
    if (currency === 'usd') {
      return `$${price.toLocaleString('en-US')} USD`
    }
    return `$${price.toLocaleString('es-MX')} MXN`
  }

  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {language === 'es' ? 'Planes y precios' : 'Plans and pricing'}
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {language === 'es'
            ? 'Precios transparentes sin sorpresas. Pago único, sin suscripciones.'
            : 'Transparent pricing with no surprises. One-time payment, no subscriptions.'}
        </p>

        {/* Currency Toggle */}
        <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-muted/50">
          <button
            onClick={() => setCurrency('usd')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currency === 'usd'
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            USD
          </button>
          <button
            onClick={() => setCurrency('mxn')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currency === 'mxn'
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            MXN
          </button>
        </div>
      </motion.div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-3xl p-6 ${
              plan.popular
                ? 'bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 border-primary'
                : 'bg-muted/30 border border-border'
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                {language === 'es' ? 'Más popular' : 'Most popular'}
              </div>
            )}

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                plan.popular ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <plan.icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{plan.name}</h2>
                <p className="text-sm text-muted-foreground">{plan.delivery[language]}</p>
              </div>
            </div>

            {/* Price */}
            <div className="mb-4">
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                {formatPrice(plan.price[currency])}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {plan.description[language]}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {plan.features[language].map((feature, fi) => (
                <div key={fi} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              onClick={() => onNavigate('contact')}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium transition-all ${
                plan.popular
                  ? 'bg-primary text-primary-foreground hover:opacity-90'
                  : 'bg-foreground text-background hover:opacity-90'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {language === 'es' ? 'Empezar ahora' : 'Get started'}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Custom Plan */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center p-8 rounded-3xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border"
      >
        <h3 className="text-xl font-bold text-foreground mb-2">
          {language === 'es' ? '¿Necesitas algo diferente?' : 'Need something different?'}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {language === 'es'
            ? 'Creamos soluciones a medida para proyectos especiales.'
            : 'We create custom solutions for special projects.'}
        </p>
        <motion.button
          onClick={() => onNavigate('contact')}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium"
          whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(59,130,246,0.5)' }}
          whileTap={{ scale: 0.98 }}
        >
          {language === 'es' ? 'Solicitar cotización' : 'Request quote'}
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Guarantee */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-muted-foreground">
          {language === 'es'
            ? '100% satisfacción garantizada. Si no estás feliz, te devolvemos tu dinero.'
            : '100% satisfaction guaranteed. If you are not happy, we refund your money.'}
        </p>
      </motion.div>
    </div>
  )
}

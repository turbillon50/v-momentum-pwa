'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'
import { ArrowRight, Play, Star, Zap, Shield, Rocket, Check } from 'lucide-react'
import { BrandIcon } from '@/components/icons/brand-icons'

interface HomeScreenProps {
  onNavigate: (screen: 'home' | 'integrations' | 'process' | 'pricing' | 'contact') => void
}

const featuredIntegrations = ['stripe', 'vercel', 'supabase', 'openai', 'clerk', 'twilio'] as const

const stats = [
  { value: '50+', label: { es: 'Apps entregadas', en: 'Apps delivered' } },
  { value: '15', label: { es: 'Días promedio', en: 'Days average' } },
  { value: '99%', label: { es: 'Satisfacción', en: 'Satisfaction' } },
]

const benefits = [
  { 
    icon: Zap, 
    title: { es: 'Desarrollo rápido', en: 'Fast development' },
    desc: { es: 'De idea a producción en días', en: 'From idea to production in days' },
  },
  { 
    icon: Shield, 
    title: { es: 'Integraciones reales', en: 'Real integrations' },
    desc: { es: 'Pagos, auth, DB listos', en: 'Payments, auth, DB ready' },
  },
  { 
    icon: Rocket, 
    title: { es: 'Listo para escalar', en: 'Ready to scale' },
    desc: { es: 'Arquitectura profesional', en: 'Professional architecture' },
  },
]

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { language, t } = useLanguage()

  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {language === 'es' ? 'Fábrica de Apps SaaS' : 'SaaS Apps Factory'}
            </span>
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            <span className="block">{language === 'es' ? 'Tu app.' : 'Your app.'}</span>
            <span className="block">{language === 'es' ? 'Tu negocio.' : 'Your business.'}</span>
            <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {language === 'es' ? 'Sin tensiones.' : 'No stress.'}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={() => onNavigate('contact')}
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg"
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(59,130,246,0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              {t.hero.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              onClick={() => onNavigate('process')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-border text-foreground font-medium"
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-5 h-5" />
              {t.hero.secondary}
            </motion.button>
          </div>

          {/* Featured Integrations */}
          <div className="pt-8 space-y-3">
            <p className="text-sm text-muted-foreground">
              {language === 'es' ? 'Integraciones disponibles' : 'Available integrations'}
            </p>
            <div className="flex items-center gap-6">
              {featuredIntegrations.map((icon, i) => (
                <motion.div
                  key={icon}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="cursor-pointer"
                  onClick={() => onNavigate('integrations')}
                >
                  <BrandIcon name={icon} size={28} />
                </motion.div>
              ))}
              <motion.button
                onClick={() => onNavigate('integrations')}
                className="text-sm text-primary hover:underline"
                whileHover={{ x: 5 }}
              >
                +20 {language === 'es' ? 'más' : 'more'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-4 md:gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-muted/30 border border-border"
            >
              <p className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-2">{stat.label[language]}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {language === 'es' ? '¿Por qué V Momentum?' : 'Why V Momentum?'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="p-6 rounded-2xl bg-muted/30 border border-border space-y-4 cursor-pointer"
                onClick={() => onNavigate('process')}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{benefit.title[language]}</h3>
                <p className="text-muted-foreground">{benefit.desc[language]}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl p-8 md:p-12"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 100%)',
          }}
        >
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">
              {language === 'es' ? '¿Listo para empezar?' : 'Ready to start?'}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              {language === 'es' 
                ? 'Agenda una llamada y descubre cómo podemos ayudarte a lanzar tu app.'
                : 'Schedule a call and discover how we can help you launch your app.'}
            </p>
            <motion.button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-foreground text-background font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === 'es' ? 'Agendar llamada' : 'Schedule call'}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
        </motion.div>
      </section>
    </div>
  )
}

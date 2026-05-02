'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'
import { 
  MessageSquare, Lightbulb, Code2, Rocket, 
  ChevronRight, Check, Play, Clock, Users, Zap
} from 'lucide-react'

const steps = [
  {
    id: 1,
    icon: MessageSquare,
    title: { es: 'Consulta inicial', en: 'Initial consultation' },
    duration: { es: '30 min', en: '30 min' },
    description: {
      es: 'Platicamos sobre tu idea, objetivos de negocio y requerimientos técnicos.',
      en: 'We discuss your idea, business goals and technical requirements.',
    },
    details: {
      es: [
        'Entendemos tu modelo de negocio',
        'Identificamos integraciones necesarias',
        'Definimos alcance del MVP',
        'Estimamos tiempos y costos',
      ],
      en: [
        'We understand your business model',
        'We identify necessary integrations',
        'We define MVP scope',
        'We estimate time and costs',
      ],
    },
  },
  {
    id: 2,
    icon: Lightbulb,
    title: { es: 'Diseño y arquitectura', en: 'Design and architecture' },
    duration: { es: '2-3 días', en: '2-3 days' },
    description: {
      es: 'Creamos wireframes, flujos de usuario y definimos la arquitectura técnica.',
      en: 'We create wireframes, user flows and define the technical architecture.',
    },
    details: {
      es: [
        'Wireframes de alta fidelidad',
        'Flujos de usuario optimizados',
        'Arquitectura escalable',
        'Selección de integraciones',
      ],
      en: [
        'High-fidelity wireframes',
        'Optimized user flows',
        'Scalable architecture',
        'Integration selection',
      ],
    },
  },
  {
    id: 3,
    icon: Code2,
    title: { es: 'Desarrollo', en: 'Development' },
    duration: { es: '7-10 días', en: '7-10 days' },
    description: {
      es: 'Construimos tu app con código limpio, integraciones reales y mejores prácticas.',
      en: 'We build your app with clean code, real integrations and best practices.',
    },
    details: {
      es: [
        'Código TypeScript/React',
        'Integraciones configuradas',
        'Base de datos lista',
        'Auth implementado',
      ],
      en: [
        'TypeScript/React code',
        'Configured integrations',
        'Ready database',
        'Implemented auth',
      ],
    },
  },
  {
    id: 4,
    icon: Rocket,
    title: { es: 'Lanzamiento', en: 'Launch' },
    duration: { es: '1-2 días', en: '1-2 days' },
    description: {
      es: 'Deploy a producción, configuración de dominios y entrega de documentación.',
      en: 'Production deploy, domain setup and documentation delivery.',
    },
    details: {
      es: [
        'Deploy en Vercel',
        'Dominio configurado',
        'SSL activo',
        'Documentación completa',
      ],
      en: [
        'Vercel deploy',
        'Domain configured',
        'Active SSL',
        'Complete documentation',
      ],
    },
  },
]

const faqs = [
  {
    q: { es: '¿Qué tecnologías usan?', en: 'What technologies do you use?' },
    a: { 
      es: 'Next.js, React, TypeScript, Tailwind CSS, PostgreSQL/Supabase, y las mejores herramientas del ecosistema moderno.',
      en: 'Next.js, React, TypeScript, Tailwind CSS, PostgreSQL/Supabase, and the best tools from the modern ecosystem.',
    },
  },
  {
    q: { es: '¿Puedo hacer cambios después?', en: 'Can I make changes later?' },
    a: {
      es: 'Sí, el código es 100% tuyo. Puedes modificarlo, escalarlo o contratar a otros desarrolladores.',
      en: 'Yes, the code is 100% yours. You can modify it, scale it or hire other developers.',
    },
  },
  {
    q: { es: '¿Qué pasa si necesito más features?', en: 'What if I need more features?' },
    a: {
      es: 'Podemos agregar features adicionales en sprints posteriores. Cada sprint se cotiza por separado.',
      en: 'We can add additional features in later sprints. Each sprint is quoted separately.',
    },
  },
  {
    q: { es: '¿Incluye hosting?', en: 'Does it include hosting?' },
    a: {
      es: 'El deploy inicial está incluido en Vercel. Los costos de hosting dependen del uso de tu app.',
      en: 'Initial deploy is included on Vercel. Hosting costs depend on your app usage.',
    },
  },
]

export function ProcessScreen() {
  const [activeStep, setActiveStep] = useState(1)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const { language } = useLanguage()

  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {language === 'es' ? 'Nuestro proceso' : 'Our process'}
        </h1>
        <p className="text-muted-foreground max-w-xl">
          {language === 'es'
            ? 'De idea a app funcional en menos de 15 días. Así es como trabajamos.'
            : 'From idea to functional app in less than 15 days. This is how we work.'}
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Steps List */}
        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <motion.button
                onClick={() => setActiveStep(step.id)}
                className={`w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all ${
                  activeStep === step.id
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-muted/30 border-2 border-transparent hover:border-border'
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  activeStep === step.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${
                      activeStep === step.id ? 'text-primary' : 'text-foreground'
                    }`}>
                      {step.title[language]}
                    </h3>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {step.duration[language]}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {step.description[language]}
                  </p>
                </div>
                <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform ${
                  activeStep === step.id ? 'rotate-90 text-primary' : 'text-muted-foreground'
                }`} />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Step Detail */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {steps.map((step) => 
              activeStep === step.id && (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="sticky top-24 p-6 rounded-3xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                      <step.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'es' ? 'Paso' : 'Step'} {step.id}
                      </p>
                      <h2 className="text-xl font-bold text-foreground">
                        {step.title[language]}
                      </h2>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    {step.description[language]}
                  </p>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">
                      {language === 'es' ? 'Incluye:' : 'Includes:'}
                    </p>
                    {step.details[language].map((detail, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-500" />
                        </div>
                        <span className="text-foreground">{detail}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{step.duration[language]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-foreground">{step.id}</span>
                      <span className="text-muted-foreground">/4</span>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-4 mb-16"
      >
        {[
          { icon: Clock, value: '~15', label: { es: 'días promedio', en: 'days average' } },
          { icon: Users, value: '50+', label: { es: 'apps entregadas', en: 'apps delivered' } },
          { icon: Zap, value: '99%', label: { es: 'clientes satisfechos', en: 'satisfied clients' } },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center p-6 rounded-2xl bg-muted/30 border border-border"
          >
            <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label[language]}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-foreground">
          {language === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
        </h2>
        
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-muted/30 border border-border overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-medium text-foreground">{faq.q[language]}</span>
                <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${
                  expandedFaq === i ? 'rotate-90' : ''
                }`} />
              </button>
              <AnimatePresence>
                {expandedFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-muted-foreground">
                      {faq.a[language]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Zap, Database, Globe, CreditCard, Shield, Code, Cloud, MessageSquare } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  icon: React.ElementType
}

const faqData: { es: FAQItem[]; en: FAQItem[] } = {
  es: [
    // Pagos
    {
      id: 'stripe',
      question: '¿Cómo funciona la integración con Stripe?',
      answer: 'Stripe es la infraestructura de pagos más robusta del mercado. Te permite aceptar pagos con tarjeta, OXXO, transferencias, y más. Configuramos checkout, suscripciones, facturación y webhooks para que tu app procese pagos en minutos.',
      category: 'Pagos',
      icon: CreditCard,
    },
    {
      id: 'mercadopago',
      question: '¿Puedo usar Mercado Pago para México y LATAM?',
      answer: 'Sí. Mercado Pago es ideal para América Latina. Soporta tarjetas locales, OXXO, transferencias SPEI, y el ecosistema de Mercado Libre. Integramos pagos únicos, suscripciones y split payments.',
      category: 'Pagos',
      icon: CreditCard,
    },
    // Bases de datos
    {
      id: 'neon',
      question: '¿Qué es Neon y por qué usarlo?',
      answer: 'Neon es PostgreSQL serverless que escala automáticamente. No pagas por servidores inactivos, tiene branching para desarrollo, y es compatible con cualquier ORM. Ideal para apps que necesitan SQL robusto sin ops.',
      category: 'Base de datos',
      icon: Database,
    },
    {
      id: 'supabase',
      question: '¿Supabase reemplaza a Firebase?',
      answer: 'Supabase es una alternativa open-source a Firebase basada en PostgreSQL. Incluye auth, storage, realtime, y edge functions. Es más flexible, sin vendor lock-in, y con mejor pricing para escalar.',
      category: 'Base de datos',
      icon: Database,
    },
    {
      id: 'airtable',
      question: '¿Cuándo usar Airtable vs una base de datos tradicional?',
      answer: 'Airtable es perfecto para MVPs y equipos no técnicos. Es una base de datos visual que tu equipo puede editar. Usamos su API para conectarla a tu app cuando necesitas flexibilidad sin código.',
      category: 'Base de datos',
      icon: Database,
    },
    // Auth
    {
      id: 'clerk',
      question: '¿Qué ventajas tiene Clerk sobre auth propio?',
      answer: 'Clerk maneja login, registro, MFA, OAuth, gestión de usuarios y organizaciones out-of-the-box. Ahorra meses de desarrollo, es seguro por defecto, y tiene componentes UI listos para usar.',
      category: 'Autenticación',
      icon: Shield,
    },
    {
      id: 'sumsub',
      question: '¿Cómo funciona la verificación KYC con Sumsub?',
      answer: 'Sumsub verifica identidades con documentos, selfies, y liveness check. Cumple con regulaciones globales (KYC, AML, GDPR). Ideal para fintechs, crypto, y cualquier app que necesite verificar usuarios.',
      category: 'Autenticación',
      icon: Shield,
    },
    // Deploy
    {
      id: 'vercel',
      question: '¿Por qué desplegamos en Vercel?',
      answer: 'Vercel es la plataforma de Netlify y creadores de Next.js. Deploy automático desde GitHub, edge network global, previews por PR, y analytics incluidos. Tu app está en producción en segundos.',
      category: 'Deploy',
      icon: Cloud,
    },
    {
      id: 'cloudflare',
      question: '¿Qué hace Cloudflare por mi app?',
      answer: 'Cloudflare protege y acelera tu app. CDN global, protección DDoS, SSL automático, y edge computing. Más de 20M de sitios lo usan. Es la capa invisible que hace tu app más rápida y segura.',
      category: 'Deploy',
      icon: Cloud,
    },
    // Web3
    {
      id: 'alchemy',
      question: '¿Necesito Alchemy si mi app usa blockchain?',
      answer: 'Alchemy es la infraestructura blockchain más confiable. APIs para Ethereum, Polygon, Arbitrum y más. Sin correr nodos propios, con datos en tiempo real y herramientas de desarrollo Web3.',
      category: 'Web3',
      icon: Zap,
    },
    {
      id: 'lifi',
      question: '¿Qué es LI.FI y para qué sirve?',
      answer: 'LI.FI es un protocolo de liquidez cross-chain. Permite swaps entre diferentes blockchains encontrando la mejor ruta automáticamente. Ideal para apps DeFi que necesitan interoperabilidad.',
      category: 'Web3',
      icon: Zap,
    },
    {
      id: 'safe',
      question: '¿Cómo funciona Safe (Gnosis Safe)?',
      answer: 'Safe es un smart account multisig. Requiere múltiples firmas para transacciones, ideal para tesorerías, DAOs, y empresas. Más de $50B en activos protegidos con la mejor seguridad Web3.',
      category: 'Web3',
      icon: Shield,
    },
    // Comunicación
    {
      id: 'twilio',
      question: '¿Twilio solo es para SMS?',
      answer: 'No. Twilio es comunicaciones completas: SMS, WhatsApp, voz, video, y verificación. APIs programáticas para enviar mensajes, hacer llamadas, o integrar chat en tu app.',
      category: 'Comunicación',
      icon: MessageSquare,
    },
    {
      id: 'resend',
      question: '¿Por qué usar Resend en lugar de SendGrid?',
      answer: 'Resend es email moderno para developers. APIs simples, React Email para templates, mejor deliverability, y precios transparentes. Creado por ex-Vercel, diseñado para la era moderna.',
      category: 'Comunicación',
      icon: MessageSquare,
    },
    // Desarrollo
    {
      id: 'v0',
      question: '¿Qué es v0 y cómo acelera el desarrollo?',
      answer: 'v0 es IA de Vercel para generar UI. Describes lo que necesitas y genera código React + Tailwind listo para producción. Reduce el tiempo de frontend de días a minutos.',
      category: 'Desarrollo',
      icon: Code,
    },
    {
      id: 'cursor',
      question: '¿Cursor es mejor que VS Code?',
      answer: 'Cursor es VS Code con IA integrada. Autocomplete inteligente, chat con tu código, y edición con lenguaje natural. El editor que usamos para construir más rápido.',
      category: 'Desarrollo',
      icon: Code,
    },
    {
      id: 'replit',
      question: '¿Cuándo usar Replit?',
      answer: 'Replit es un IDE en la nube. Ideal para prototipos rápidos, colaboración en tiempo real, y despliegue instantáneo. Sin configuración local, todo en el navegador.',
      category: 'Desarrollo',
      icon: Code,
    },
    // Servicios
    {
      id: 'duffel',
      question: '¿Duffel sirve solo para aerolíneas?',
      answer: 'Duffel es API de viajes completa: vuelos, hoteles, trenes, autos. Una sola integración para acceder a inventario global en tiempo real. Ideal para OTAs y apps de viaje.',
      category: 'Servicios',
      icon: Globe,
    },
    {
      id: 'docusign',
      question: '¿DocuSign es necesario para contratos?',
      answer: 'DocuSign es firma electrónica legal en 180+ países. Automatiza contratos, reduce tiempo de cierre 80%, y es legalmente vinculante. Indispensable para cualquier negocio serio.',
      category: 'Servicios',
      icon: Globe,
    },
    {
      id: 'googlemaps',
      question: '¿Qué puedo hacer con Google Maps API?',
      answer: 'Mapas, geocodificación, rutas, Places API, Street View. Todo lo de Google Maps en tu app. Ideal para delivery, logística, real estate, o cualquier app basada en ubicación.',
      category: 'Servicios',
      icon: Globe,
    },
  ],
  en: [
    // Same structure but in English
    {
      id: 'stripe',
      question: 'How does Stripe integration work?',
      answer: 'Stripe is the most robust payment infrastructure. Accept cards, bank transfers, and local methods. We configure checkout, subscriptions, billing, and webhooks so your app processes payments in minutes.',
      category: 'Payments',
      icon: CreditCard,
    },
    {
      id: 'neon',
      question: 'What is Neon and why use it?',
      answer: 'Neon is serverless PostgreSQL that scales automatically. No paying for idle servers, has branching for development, and is compatible with any ORM. Ideal for apps needing robust SQL without ops.',
      category: 'Database',
      icon: Database,
    },
    {
      id: 'clerk',
      question: 'What advantages does Clerk have over custom auth?',
      answer: 'Clerk handles login, registration, MFA, OAuth, user and organization management out-of-the-box. Saves months of development, is secure by default, and has ready-to-use UI components.',
      category: 'Authentication',
      icon: Shield,
    },
    {
      id: 'vercel',
      question: 'Why do we deploy on Vercel?',
      answer: 'Vercel is the platform by Next.js creators. Auto-deploy from GitHub, global edge network, PR previews, and included analytics. Your app is in production in seconds.',
      category: 'Deploy',
      icon: Cloud,
    },
    {
      id: 'v0',
      question: 'What is v0 and how does it speed up development?',
      answer: 'v0 is Vercel AI for generating UI. Describe what you need and it generates production-ready React + Tailwind code. Reduces frontend time from days to minutes.',
      category: 'Development',
      icon: Code,
    },
  ],
}

const categories = [
  { id: 'all', label: { es: 'Todas', en: 'All' } },
  { id: 'Pagos', label: { es: 'Pagos', en: 'Payments' } },
  { id: 'Base de datos', label: { es: 'Base de datos', en: 'Database' } },
  { id: 'Autenticación', label: { es: 'Autenticación', en: 'Auth' } },
  { id: 'Deploy', label: { es: 'Deploy', en: 'Deploy' } },
  { id: 'Web3', label: { es: 'Web3', en: 'Web3' } },
  { id: 'Comunicación', label: { es: 'Comunicación', en: 'Communication' } },
  { id: 'Desarrollo', label: { es: 'Desarrollo', en: 'Development' } },
  { id: 'Servicios', label: { es: 'Servicios', en: 'Services' } },
]

export function FAQSection() {
  const { language, t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')
  const [openItems, setOpenItems] = useState<string[]>([])

  const faqs = faqData[language] || faqData.es

  const filteredFAQs = activeCategory === 'all'
    ? faqs
    : faqs.filter((faq) => faq.category === activeCategory)

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {language === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Todo lo que necesitas saber sobre nuestras integraciones y tecnologías'
              : 'Everything you need to know about our integrations and technologies'}
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label[language] || cat.label.es}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredFAQs.map((faq, index) => {
              const Icon = faq.icon
              const isOpen = openItems.includes(faq.id)

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className={`w-full text-left p-4 md:p-5 rounded-xl transition-all ${
                      isOpen
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          isOpen
                            ? 'bg-blue-500/30 text-blue-400'
                            : 'bg-white/10 text-white/40 group-hover:text-white/60'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="text-white font-medium text-left">
                            {faq.question}
                          </h3>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown className="w-5 h-5 text-white/40" />
                          </motion.div>
                        </div>

                        {/* Category badge */}
                        <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-white/10 text-white/50">
                          {faq.category}
                        </span>
                      </div>
                    </div>

                    {/* Answer */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 ml-14 text-white/70 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12 text-white/40">
            {language === 'es'
              ? 'No hay preguntas en esta categoría'
              : 'No questions in this category'}
          </div>
        )}
      </div>
    </section>
  )
}

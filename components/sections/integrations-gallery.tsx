'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, ChevronRight } from 'lucide-react'
import { AppleTVCarousel } from '@/components/ui/apple-tv-carousel'
import { useLanguage } from '@/lib/i18n'

// All integrations organized by category with real images
const integrationCategories = [
  {
    id: 'payments',
    titleEs: 'Pagos y Finanzas',
    titleEn: 'Payments & Finance',
    subtitleEs: 'Procesa pagos de forma segura en todo el mundo',
    subtitleEn: 'Process payments securely worldwide',
    items: [
      { id: 'stripe', image: '/images/integrations/stripe.jpeg', title: 'Stripe', subtitle: 'Infraestructura de pagos para internet' },
      { id: 'mercado-pago', image: '/images/integrations/mercado-pago.jpeg', title: 'Mercado Pago', subtitle: 'Pagos para América Latina' },
      { id: 'bybit', image: '/images/integrations/bybit.jpeg', title: 'Bybit', subtitle: 'Exchange de criptomonedas y API' },
      { id: 'onramper', image: '/images/integrations/onramper.jpeg', title: 'Onramper', subtitle: 'Infraestructura fiat-crypto' },
    ]
  },
  {
    id: 'database',
    titleEs: 'Bases de Datos',
    titleEn: 'Databases',
    subtitleEs: 'Almacenamiento escalable y confiable',
    subtitleEn: 'Scalable and reliable storage',
    items: [
      { id: 'neon', image: '/images/integrations/neon.jpeg', title: 'Neon', subtitle: 'PostgreSQL serverless' },
      { id: 'airtable', image: '/images/integrations/airtable.jpeg', title: 'Airtable', subtitle: 'Bases de datos flexibles' },
      { id: 'turnkey', image: '/images/integrations/turnkey.jpeg', title: 'Turnkey', subtitle: 'Backend como servicio (BaaS)' },
    ]
  },
  {
    id: 'web3',
    titleEs: 'Web3 y Blockchain',
    titleEn: 'Web3 & Blockchain',
    subtitleEs: 'Infraestructura para el futuro descentralizado',
    subtitleEn: 'Infrastructure for the decentralized future',
    items: [
      { id: 'alchemy', image: '/images/integrations/alchemy.jpeg', title: 'Alchemy', subtitle: 'Infraestructura blockchain' },
      { id: 'lifi', image: '/images/integrations/lifi.jpeg', title: 'LI.FI', subtitle: 'Protocolo cross-chain' },
      { id: 'safe', image: '/images/integrations/safe-gnosis.jpeg', title: 'Safe (Gnosis)', subtitle: 'Custodia multisig' },
      { id: 'sumsub', image: '/images/integrations/sumsub.jpeg', title: 'Sumsub', subtitle: 'Verificación KYC/AML' },
    ]
  },
  {
    id: 'development',
    titleEs: 'Desarrollo e IA',
    titleEn: 'Development & AI',
    subtitleEs: 'Herramientas para construir más rápido',
    subtitleEn: 'Tools to build faster',
    items: [
      { id: 'v0', image: '/images/integrations/v0-vercel.jpeg', title: 'v0 by Vercel', subtitle: 'IA para generar UI' },
      { id: 'replit', image: '/images/integrations/replit.jpeg', title: 'Replit', subtitle: 'IDE en la nube' },
      { id: 'cursor', image: '/images/integrations/cursor.jpeg', title: 'Cursor', subtitle: 'Editor con IA integrada' },
      { id: 'claude-design', image: '/images/integrations/claude-design.jpeg', title: 'Claude Design', subtitle: 'IA para diseño de UI' },
      { id: 'codex-claude', image: '/images/integrations/codex-claude.jpeg', title: 'Codex & Claude', subtitle: 'Agentes de código' },
      { id: 'react', image: '/images/integrations/react.jpeg', title: 'React', subtitle: 'Librería para interfaces' },
    ]
  },
  {
    id: 'deploy',
    titleEs: 'Deploy e Infraestructura',
    titleEn: 'Deploy & Infrastructure',
    subtitleEs: 'De código a producción en segundos',
    subtitleEn: 'From code to production in seconds',
    items: [
      { id: 'vercel', image: '/images/integrations/vercel.jpeg', title: 'Vercel', subtitle: 'Deploy y performance' },
      { id: 'github', image: '/images/integrations/github.jpeg', title: 'GitHub', subtitle: 'Control de versiones' },
      { id: 'cloudflare', image: '/images/integrations/cloudflare.jpeg', title: 'Cloudflare', subtitle: 'CDN y seguridad' },
    ]
  },
  {
    id: 'communication',
    titleEs: 'Comunicación',
    titleEn: 'Communication',
    subtitleEs: 'Conecta con tus usuarios en cualquier canal',
    subtitleEn: 'Connect with your users on any channel',
    items: [
      { id: 'twilio', image: '/images/integrations/twilio.jpeg', title: 'Twilio', subtitle: 'SMS, voz y WhatsApp' },
      { id: 'resend', image: '/images/integrations/resend-full.jpeg', title: 'Resend', subtitle: 'Emails transaccionales' },
    ]
  },
  {
    id: 'services',
    titleEs: 'Servicios Especializados',
    titleEn: 'Specialized Services',
    subtitleEs: 'APIs para casos de uso específicos',
    subtitleEn: 'APIs for specific use cases',
    items: [
      { id: 'duffel', image: '/images/integrations/duffel.jpeg', title: 'Duffel', subtitle: 'Reservas de viajes' },
      { id: 'reloadly', image: '/images/integrations/reloadly.jpeg', title: 'Reloadly', subtitle: 'Recargas y pagos' },
      { id: 'ticket-tailor', image: '/images/integrations/ticket-tailor.jpeg', title: 'Ticket Tailor', subtitle: 'Ticketing para eventos' },
      { id: 'docusign', image: '/images/integrations/docusign.jpeg', title: 'DocuSign', subtitle: 'Firma electrónica' },
      { id: 'google-maps', image: '/images/integrations/google-maps.jpeg', title: 'Google Maps', subtitle: 'Mapas y ubicación' },
      { id: 'jotform', image: '/images/integrations/jotform.jpeg', title: 'Jotform', subtitle: 'Formularios' },
    ]
  },
  {
    id: 'auth',
    titleEs: 'Autenticación',
    titleEn: 'Authentication',
    subtitleEs: 'Gestión segura de usuarios',
    subtitleEn: 'Secure user management',
    items: [
      { id: 'clerk', image: '/images/integrations/clerk.jpeg', title: 'Clerk', subtitle: 'Autenticación completa' },
      { id: 'namecom', image: '/images/integrations/namecom.jpeg', title: 'Name.com', subtitle: 'Dominios y DNS' },
    ]
  },
]

interface IntegrationDetailProps {
  integration: {
    id: string
    image: string
    title: string
    subtitle: string
  }
  onClose: () => void
}

function IntegrationDetail({ integration, onClose }: IntegrationDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl overflow-y-auto"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-card border border-border hover:bg-muted transition-colors"
      >
        <X className="w-6 h-6 text-foreground" />
      </button>

      {/* Content */}
      <div className="min-h-screen pt-16 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <span className="text-sm text-primary font-medium uppercase tracking-wider">
              Integración
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4">
              {integration.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {integration.subtitle}
            </p>
          </motion.div>

          {/* Full-width image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-border shadow-2xl"
          >
            <img
              src={integration.image}
              alt={integration.title}
              className="w-full h-auto"
            />
          </motion.div>

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border hover:bg-muted transition-colors text-foreground"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Volver a integraciones
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export function IntegrationsGallery() {
  const { language } = useLanguage()
  const [selectedIntegration, setSelectedIntegration] = useState<{
    id: string
    image: string
    title: string
    subtitle: string
  } | null>(null)

  const handleItemClick = (item: { id: string; image: string; title: string; subtitle?: string }) => {
    setSelectedIntegration({
      id: item.id,
      image: item.image,
      title: item.title,
      subtitle: item.subtitle || ''
    })
  }

  return (
    <section className="py-16 md:py-24">
      {/* Section Header */}
      <div className="px-6 md:px-12 lg:px-20 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <span className="text-sm text-primary font-medium uppercase tracking-wider">
            {language === 'es' ? 'Ecosistema' : 'Ecosystem'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            {language === 'es' ? 'Integraciones Premium' : 'Premium Integrations'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {language === 'es' 
              ? 'Más de 30 integraciones listas para potenciar tu aplicación. Explora cada una para ver todos los detalles.'
              : 'Over 30 integrations ready to power your application. Explore each one to see all the details.'}
          </p>
        </motion.div>
      </div>

      {/* Category Carousels */}
      {integrationCategories.map((category) => (
        <AppleTVCarousel
          key={category.id}
          title={language === 'es' ? category.titleEs : category.titleEn}
          subtitle={language === 'es' ? category.subtitleEs : category.subtitleEn}
          items={category.items.map(item => ({
            ...item,
            category: language === 'es' ? category.titleEs : category.titleEn
          }))}
          onItemClick={handleItemClick}
        />
      ))}

      {/* Integration Detail Modal */}
      <AnimatePresence>
        {selectedIntegration && (
          <IntegrationDetail
            integration={selectedIntegration}
            onClose={() => setSelectedIntegration(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

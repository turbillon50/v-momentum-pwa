'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useLanguage } from '@/lib/i18n'
import { 
  CreditCard, Database, Bot, Cloud, Wallet, Shield, Code, Globe,
  Mail, Map, FileText, Ticket, Plane, Phone, Layers, Zap,
  X, ChevronLeft, ChevronRight, ArrowUpRight
} from 'lucide-react'

// Integration apps with icons and images
const integrationApps = [
  // Payments
  { id: 'stripe', name: 'Stripe', icon: CreditCard, color: '#635BFF', category: 'payments', image: '/images/integrations/stripe.jpeg' },
  { id: 'mercadopago', name: 'Mercado Pago', icon: CreditCard, color: '#009EE3', category: 'payments', image: '/images/integrations/mercado-pago.jpeg' },
  
  // Database
  { id: 'neon', name: 'Neon', icon: Database, color: '#00E599', category: 'database', image: '/images/integrations/neon.jpeg' },
  { id: 'airtable', name: 'Airtable', icon: Layers, color: '#18BFFF', category: 'database', image: '/images/integrations/airtable.jpeg' },
  
  // AI
  { id: 'v0', name: 'v0', icon: Bot, color: '#000000', category: 'ai', image: '/images/integrations/v0-vercel.jpeg' },
  { id: 'claude', name: 'Claude', icon: Bot, color: '#CC785C', category: 'ai', image: '/images/integrations/claude-design.jpeg' },
  { id: 'codex', name: 'Codex', icon: Code, color: '#10A37F', category: 'ai', image: '/images/integrations/codex-claude.jpeg' },
  
  // Deploy & Infra
  { id: 'vercel', name: 'Vercel', icon: Cloud, color: '#000000', category: 'deploy', image: '/images/integrations/vercel.jpeg' },
  { id: 'cloudflare', name: 'Cloudflare', icon: Shield, color: '#F38020', category: 'deploy', image: '/images/integrations/cloudflare.jpeg' },
  { id: 'replit', name: 'Replit', icon: Code, color: '#F26207', category: 'deploy', image: '/images/integrations/replit.jpeg' },
  { id: 'github', name: 'GitHub', icon: Code, color: '#181717', category: 'deploy', image: '/images/integrations/github.jpeg' },
  { id: 'cursor', name: 'Cursor', icon: Code, color: '#000000', category: 'deploy', image: '/images/integrations/cursor.jpeg' },
  
  // Web3
  { id: 'alchemy', name: 'Alchemy', icon: Wallet, color: '#0C0C0E', category: 'web3', image: '/images/integrations/alchemy.jpeg' },
  { id: 'lifi', name: 'LI.FI', icon: Wallet, color: '#BF5AF2', category: 'web3', image: '/images/integrations/lifi.jpeg' },
  { id: 'safe', name: 'Safe', icon: Shield, color: '#12FF80', category: 'web3', image: '/images/integrations/safe-gnosis.jpeg' },
  { id: 'bybit', name: 'Bybit', icon: Wallet, color: '#F7A600', category: 'web3', image: '/images/integrations/bybit.jpeg' },
  { id: 'onramper', name: 'Onramper', icon: Wallet, color: '#00D395', category: 'web3', image: '/images/integrations/onramper.jpeg' },
  { id: 'sumsub', name: 'Sumsub', icon: Shield, color: '#00E5A0', category: 'web3', image: '/images/integrations/sumsub.jpeg' },
  { id: 'turnkey', name: 'Turnkey', icon: Shield, color: '#6366F1', category: 'web3', image: '/images/integrations/turnkey.jpeg' },
  
  // Communication
  { id: 'twilio', name: 'Twilio', icon: Phone, color: '#F22F46', category: 'communication', image: '/images/integrations/twilio.jpeg' },
  { id: 'resend', name: 'Resend', icon: Mail, color: '#000000', category: 'communication', image: '/images/integrations/resend-full.jpeg' },
  
  // Services
  { id: 'googlemaps', name: 'Google Maps', icon: Map, color: '#4285F4', category: 'services', image: '/images/integrations/google-maps.jpeg' },
  { id: 'docusign', name: 'DocuSign', icon: FileText, color: '#FFCC22', category: 'services', image: '/images/integrations/docusign.jpeg' },
  { id: 'tickettailor', name: 'Ticket Tailor', icon: Ticket, color: '#FF2D55', category: 'services', image: '/images/integrations/ticket-tailor.jpeg' },
  { id: 'duffel', name: 'Duffel', icon: Plane, color: '#7C3AED', category: 'services', image: '/images/integrations/duffel.jpeg' },
  { id: 'reloadly', name: 'Reloadly', icon: Zap, color: '#00D4AA', category: 'services', image: '/images/integrations/reloadly.jpeg' },
  { id: 'jotform', name: 'Jotform', icon: FileText, color: '#FF6100', category: 'services', image: '/images/integrations/jotform.jpeg' },
  
  // Auth
  { id: 'clerk', name: 'Clerk', icon: Shield, color: '#6C47FF', category: 'auth', image: '/images/integrations/clerk.jpeg' },
]

const categories = [
  { id: 'all', label: { es: 'Todas', en: 'All' } },
  { id: 'payments', label: { es: 'Pagos', en: 'Payments' } },
  { id: 'database', label: { es: 'Datos', en: 'Data' } },
  { id: 'ai', label: { es: 'IA', en: 'AI' } },
  { id: 'deploy', label: { es: 'Deploy', en: 'Deploy' } },
  { id: 'web3', label: { es: 'Web3', en: 'Web3' } },
  { id: 'communication', label: { es: 'Comunicación', en: 'Communication' } },
  { id: 'services', label: { es: 'Servicios', en: 'Services' } },
  { id: 'auth', label: { es: 'Auth', en: 'Auth' } },
]

// App Icon Component - Premium design
function AppIcon({ 
  app, 
  index, 
  onClick,
  isLight
}: { 
  app: typeof integrationApps[0]
  index: number
  onClick: () => void
  isLight: boolean
}) {
  const Icon = app.icon
  
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.03,
        type: 'spring',
        stiffness: 300,
        damping: 25
      }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-2 group"
    >
      {/* Icon container with gradient background */}
      <div 
        className="relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, ${app.color}20, ${app.color}40)`,
          boxShadow: `0 4px 20px ${app.color}30, inset 0 1px 0 rgba(255,255,255,0.1)`,
          border: `1px solid ${app.color}30`,
        }}
      >
        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${app.color}50, transparent 70%)`,
          }}
        />
        
        {/* Icon */}
        <Icon 
          className="w-7 h-7 sm:w-8 sm:h-8 relative z-10 transition-transform duration-300 group-hover:scale-110" 
          style={{ color: app.color }}
        />
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
      </div>
      
      {/* App name */}
      <span className={`text-[10px] sm:text-xs font-medium truncate max-w-[70px] text-center transition-colors ${
        isLight ? 'text-gray-700 group-hover:text-gray-900' : 'text-white/70 group-hover:text-white'
      }`}>
        {app.name}
      </span>
    </motion.button>
  )
}

// Detail Panel - Slides in from right
function DetailPanel({
  app,
  isOpen,
  onClose,
  isLight,
  language
}: {
  app: typeof integrationApps[0] | null
  isOpen: boolean
  onClose: () => void
  isLight: boolean
  language: 'es' | 'en'
}) {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  return (
    <AnimatePresence>
      {isOpen && app && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-50 ${isLight ? 'bg-black/20' : 'bg-black/60'} backdrop-blur-sm`}
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed right-0 top-0 bottom-0 w-full sm:w-[480px] md:w-[560px] z-50 overflow-hidden ${
              isLight 
                ? 'bg-white/95 border-l border-gray-200' 
                : 'bg-gray-900/95 border-l border-white/10'
            } backdrop-blur-xl`}
          >
            {/* Header */}
            <div className={`sticky top-0 z-10 flex items-center justify-between p-4 border-b ${
              isLight ? 'border-gray-200 bg-white/80' : 'border-white/10 bg-gray-900/80'
            } backdrop-blur-xl`}>
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${app.color}30, ${app.color}50)`,
                    border: `1px solid ${app.color}40`
                  }}
                >
                  <app.icon className="w-5 h-5" style={{ color: app.color }} />
                </div>
                <div>
                  <h3 className={`font-semibold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {app.name}
                  </h3>
                  <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-white/50'}`}>
                    {categories.find(c => c.id === app.category)?.label[language]}
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${
                  isLight 
                    ? 'hover:bg-gray-100 text-gray-500' 
                    : 'hover:bg-white/10 text-white/60'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content - Scrollable image */}
            <div className="h-full overflow-y-auto pb-20">
              {/* Loading skeleton */}
              {!imageLoaded && (
                <div className={`w-full aspect-[3/4] ${isLight ? 'bg-gray-100' : 'bg-white/5'} animate-pulse`} />
              )}
              
              {/* Full resolution image */}
              <motion.img
                src={app.image}
                alt={app.name}
                className={`w-full h-auto ${imageLoaded ? 'block' : 'hidden'}`}
                onLoad={() => setImageLoaded(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: imageLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function AppGridSection() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const isLight = theme === 'light'
  
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedApp, setSelectedApp] = useState<typeof integrationApps[0] | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  
  const filteredApps = selectedCategory === 'all' 
    ? integrationApps 
    : integrationApps.filter(app => app.category === selectedCategory)
  
  const openAppDetail = (app: typeof integrationApps[0]) => {
    setSelectedApp(app)
    setIsPanelOpen(true)
  }
  
  const closePanel = () => {
    setIsPanelOpen(false)
    setTimeout(() => setSelectedApp(null), 300)
  }

  return (
    <section className={`py-20 px-4 transition-colors duration-500 ${
      isLight ? 'bg-gray-50' : 'bg-black'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
            isLight ? 'text-gray-900' : 'text-white'
          }`}>
            {language === 'es' ? 'Ecosistema de Integraciones' : 'Integration Ecosystem'}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isLight ? 'text-gray-600' : 'text-white/60'
          }`}>
            {language === 'es' 
              ? 'Más de 25 integraciones premium listas para tu aplicación'
              : 'Over 25 premium integrations ready for your application'
            }
          </p>
        </motion.div>
        
        {/* Category filters - Horizontal scrollable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 overflow-x-auto no-scrollbar"
        >
          <div className="flex gap-2 justify-start md:justify-center min-w-max px-4 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? isLight
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-white text-black shadow-lg shadow-white/20'
                    : isLight
                      ? 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.label[language]}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* App Grid - Smartwatch style */}
        <motion.div 
          layout
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4 md:gap-6 justify-items-center"
        >
          <AnimatePresence mode="popLayout">
            {filteredApps.map((app, index) => (
              <AppIcon
                key={app.id}
                app={app}
                index={index}
                onClick={() => openAppDetail(app)}
                isLight={isLight}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty state */}
        {filteredApps.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-20 ${isLight ? 'text-gray-400' : 'text-white/30'}`}
          >
            <Globe className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>{language === 'es' ? 'No hay integraciones en esta categoría' : 'No integrations in this category'}</p>
          </motion.div>
        )}
      </div>
      
      {/* Detail Panel */}
      <DetailPanel
        app={selectedApp}
        isOpen={isPanelOpen}
        onClose={closePanel}
        isLight={isLight}
        language={language}
      />
    </section>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'
import { Check, ChevronRight, ArrowRight } from 'lucide-react'

interface ProcessScreenProps {
  onNavigate?: (screen: string) => void
}

// Real workflow from V Momentum diagram
const mainPipeline = [
  {
    id: 'replit',
    name: 'Replit',
    logo: 'https://cdn.simpleicons.org/replit',
    role: { es: 'CREA', en: 'CREATES' },
    description: { 
      es: 'Prototipo • Pruebas • Bóveda DEV • Desarrollo Rápido', 
      en: 'Prototype • Testing • DEV Vault • Fast Development' 
    },
    features: {
      es: ['Prototipado rápido', 'Secrets de desarrollo (DEV)', 'Integración de APIs', 'Pruebas de funcionalidades', 'Despliegues temporales'],
      en: ['Fast prototyping', 'Development secrets (DEV)', 'API integration', 'Feature testing', 'Temporary deployments']
    },
    color: '#F26207'
  },
  {
    id: 'github',
    name: 'GitHub',
    logo: 'https://cdn.simpleicons.org/github/white',
    role: { es: 'CONSERVA', en: 'PRESERVES' },
    description: { 
      es: 'Repositorio Oficial • Control de Versiones • Historial Seguro', 
      en: 'Official Repository • Version Control • Secure History' 
    },
    features: {
      es: ['Código fuente centralizado', 'Historial de cambios', 'Colaboración en equipo', 'Pull Requests', 'Seguridad y control'],
      en: ['Centralized source code', 'Change history', 'Team collaboration', 'Pull Requests', 'Security and control']
    },
    color: '#181717'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    logo: 'https://cdn.simpleicons.org/vercel/white',
    role: { es: 'PUBLICA', en: 'PUBLISHES' },
    description: { 
      es: 'Producción • Deploy • Dominios • Hosting • Secrets PROD', 
      en: 'Production • Deploy • Domains • Hosting • PROD Secrets' 
    },
    features: {
      es: ['Deploy automático', 'Dominios y SSL', 'Edge Functions', 'Environment Variables (PROD)', 'Analytics y Logs'],
      en: ['Automatic deploy', 'Domains and SSL', 'Edge Functions', 'Environment Variables (PROD)', 'Analytics and Logs']
    },
    color: '#000000'
  },
]

// AI Creation satellites
const satellites = [
  { name: 'AntiGravity', desc: { es: 'Agente Autónomo', en: 'Autonomous Agent' }, logo: 'https://cdn.simpleicons.org/openai/white' },
  { name: 'v0', desc: { es: 'UI con IA', en: 'AI UI' }, logo: 'https://cdn.simpleicons.org/vercel/white' },
  { name: 'Figma', desc: { es: 'Diseño', en: 'Design' }, logo: 'https://cdn.simpleicons.org/figma' },
  { name: 'Lovable', desc: { es: 'Fullstack IA', en: 'AI Fullstack' }, logo: 'https://cdn.simpleicons.org/heart/FF6B6B' },
  { name: 'Bolt.new', desc: { es: 'Dev Rápido', en: 'Fast Dev' }, logo: 'https://cdn.simpleicons.org/lightning/FFD700' },
]

// FAQ based on real content
const faqs = [
  {
    q: { es: '¿Qué es DNS y para qué sirve?', en: 'What is DNS and what is it for?' },
    a: { 
      es: 'El DNS traduce tu dominio (tudominio.com) a la dirección del servidor donde está tu aplicación. Registros importantes: A/AAAA (IP), CNAME (Alias), MX (Email), TXT (Verificación).',
      en: 'DNS translates your domain (yourdomain.com) to the server address where your application lives. Important records: A/AAAA (IP), CNAME (Alias), MX (Email), TXT (Verification).',
    },
  },
  {
    q: { es: '¿Qué es el Frontend vs Backend?', en: 'What is Frontend vs Backend?' },
    a: {
      es: 'Frontend es lo que el usuario ve (React, Next.js). Backend es la lógica del negocio y APIs que procesan datos. Pueden estar en Vercel, Netlify u otros.',
      en: 'Frontend is what the user sees (React, Next.js). Backend is the business logic and APIs that process data. They can be on Vercel, Netlify or others.',
    },
  },
  {
    q: { es: '¿Qué son los API Keys y Webhooks?', en: 'What are API Keys and Webhooks?' },
    a: {
      es: 'API Keys son claves que permiten a tu app acceder de forma segura a servicios externos (ej: Stripe Key). Webhooks son notificaciones automáticas entre servicios cuando ocurre un evento.',
      en: 'API Keys are keys that allow your app to securely access external services (e.g., Stripe Key). Webhooks are automatic notifications between services when an event occurs.',
    },
  },
  {
    q: { es: '¿Cómo manejan los secretos?', en: 'How do you handle secrets?' },
    a: {
      es: 'Replit guarda Secrets de Desarrollo (DEV). Vercel guarda Secrets de Producción (PROD). Backup en Vault externo cifrado para respaldo seguro.',
      en: 'Replit stores Development Secrets (DEV). Vercel stores Production Secrets (PROD). Backup in encrypted external Vault for secure backup.',
    },
  },
]

export function ProcessScreen({ onNavigate }: ProcessScreenProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [selectedPipeline, setSelectedPipeline] = useState<string | null>(null)
  const { language } = useLanguage()

  return (
    <div className="min-h-full px-4 py-6 pb-24 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {language === 'es' ? 'Nuestro Proceso' : 'Our Process'}
        </h1>
        <p className="text-muted-foreground text-sm">
          {language === 'es' 
            ? 'Así es como construimos apps de clase mundial'
            : 'This is how we build world-class apps'}
        </p>
      </motion.div>

      {/* Orchestrator - ChatGPT/EON */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20"
      >
        <div className="flex items-center gap-3 mb-2">
          <img src="https://cdn.simpleicons.org/openai/white" alt="ChatGPT" className="w-7 h-7" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">ChatGPT / EON</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500 text-white">
                {language === 'es' ? 'DIRIGE' : 'DIRECTS'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'es' ? 'Arquitectura • Dirección • Estrategia • Prompts' : 'Architecture • Direction • Strategy • Prompts'}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {(language === 'es' ? ['Visión General', 'Arquitectura', 'Toma de Decisiones'] : ['General Vision', 'Architecture', 'Decision Making']).map((cap, i) => (
            <span key={i} className="px-2 py-1 text-[10px] rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {cap}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Satellites */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-6"
      >
        <p className="text-[10px] font-medium text-muted-foreground tracking-wider uppercase mb-2">
          {language === 'es' ? 'Satélites de Creación' : 'Creation Satellites'}
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {satellites.map((sat, i) => (
            <motion.div
              key={sat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.03 }}
              className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10"
            >
              <img src={sat.logo} alt={sat.name} className="w-4 h-4" />
              <div>
                <p className="text-xs font-medium text-foreground">{sat.name}</p>
                <p className="text-[9px] text-muted-foreground">{sat.desc[language]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <p className="text-[10px] font-medium text-muted-foreground tracking-wider uppercase mb-3">
          {language === 'es' ? 'Pipeline Principal' : 'Main Pipeline'}
        </p>
        
        <div className="space-y-3">
          {mainPipeline.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              <button
                onClick={() => setSelectedPipeline(selectedPipeline === step.id ? null : step.id)}
                className={`w-full p-4 rounded-2xl text-left transition-all ${
                  selectedPipeline === step.id 
                    ? 'bg-blue-500/10 border-2 border-blue-500/40' 
                    : 'bg-white/5 border border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: step.color + '30' }}
                  >
                    <img src={step.logo} alt={step.name} className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{step.name}</h3>
                      <span 
                        className="px-1.5 py-0.5 text-[9px] font-bold rounded"
                        style={{ backgroundColor: step.color, color: 'white' }}
                      >
                        {step.role[language]}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{step.description[language]}</p>
                  </div>
                  
                  <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${
                    selectedPipeline === step.id ? 'rotate-90' : ''
                  }`} />
                </div>
                
                <AnimatePresence>
                  {selectedPipeline === step.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 mt-3 border-t border-white/10 grid grid-cols-1 gap-1.5">
                        {step.features[language].map((feature, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Check className="w-3 h-3 text-blue-400 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              
              {/* Arrow connector */}
              {i < mainPipeline.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="w-0.5 h-3 bg-gradient-to-b from-blue-500/50 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Auditor - Cursor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-purple-500/5 border border-purple-500/20"
      >
        <div className="flex items-center gap-3">
          <img src="https://cdn.simpleicons.org/cursor/white" alt="Cursor" className="w-7 h-7" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">Cursor</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-purple-500 text-white">
                {language === 'es' ? 'AUDITA' : 'AUDITS'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'es' ? 'Auditoría • Revisión • Limpieza • Refactor • Calidad de Código' : 'Audit • Review • Cleanup • Refactor • Code Quality'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mb-8 p-3 rounded-xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 border border-white/10"
      >
        <p className="text-center text-xs font-medium">
          <span className="text-orange-400">Replit CREA</span>
          <span className="text-white/30 mx-1.5">•</span>
          <span className="text-white">GitHub CONSERVA</span>
          <span className="text-white/30 mx-1.5">•</span>
          <span className="text-blue-400">Vercel PUBLICA</span>
          <span className="text-white/30 mx-1.5">•</span>
          <span className="text-purple-400">Cursor AUDITA</span>
          <span className="text-white/30 mx-1.5">•</span>
          <span className="text-emerald-400">ChatGPT DIRIGE</span>
        </p>
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">
          {language === 'es' ? 'Fuentes de Conocimiento' : 'Knowledge Sources'}
        </h2>
        
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl bg-white/5 border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-3 text-left"
              >
                <span className="text-sm font-medium text-foreground pr-4">{faq.q[language]}</span>
                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${
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
                    <p className="px-3 pb-3 text-xs text-muted-foreground">
                      {faq.a[language]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="text-center"
      >
        <button
          onClick={() => onNavigate?.('contact')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium text-sm transition-colors"
        >
          {language === 'es' ? 'Comenzar mi proyecto' : 'Start my project'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  )
}

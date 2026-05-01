'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type Language = 'es' | 'en'

interface Translations {
  // Navigation
  nav: {
    home: string
    process: string
    integrations: string
    pricing: string
    demos: string
    contact: string
    signIn: string
  }
  // Hero
  hero: {
    badge: string
    title: string
    subtitle: string
    cta: string
    secondary: string
    ctaSecondary: string
  }
  // Process
  process: {
    title: string
    subtitle: string
    client: string
    production: string
    system: string
  }
  // Integrations
  integrations: {
    title: string
    subtitle: string
    included: string
    optional: string
    advanced: string
    coming: string
  }
  // Pricing
  pricing: {
    title: string
    subtitle: string
    traditional: string
    flexible: string
    monthly: string
    includes: string
  }
  // Contact
  contact: {
    title: string
    subtitle: string
    send: string
    name: string
    email: string
    phone: string
    company: string
    message: string
  }
  // Footer
  footer: {
    rights: string
    tagline: string
  }
  // Common
  common: {
    learnMore: string
    getStarted: string
    viewDemo: string
  }
}

const translations: Record<Language, Translations> = {
  es: {
    nav: {
      home: 'Inicio',
      process: 'Proceso',
      integrations: 'Integraciones',
      pricing: 'Precios',
      demos: 'Demos',
      contact: 'Contacto',
      signIn: 'Iniciar Sesión',
    },
    hero: {
      badge: 'SaaS Technology Apps Design',
      title: 'Tu app. Tu negocio. Sin tensiones.',
      subtitle: 'Diseñamos y desarrollamos apps listas para operar en días. Con integraciones reales para vender, operar y escalar.',
      cta: 'Quiero mi app',
      secondary: 'Ver proceso',
      ctaSecondary: 'Ver demos',
    },
    process: {
      title: 'Proceso Momentum',
      subtitle: 'De la idea a la app en producción',
      client: 'Cliente',
      production: 'Producción',
      system: 'Sistema',
    },
    integrations: {
      title: 'Todo lo que tu app necesita',
      subtitle: 'Integramos las mejores herramientas del mercado para que tu app funcione como un sistema completo desde el día uno.',
      included: 'Incluido',
      optional: 'Opcional',
      advanced: 'Avanzado',
      coming: 'Próximamente',
    },
    pricing: {
      title: 'Planes claros, sin sorpresas',
      subtitle: 'Elige el modelo que mejor se adapte a ti',
      traditional: 'Plan Tradicional',
      flexible: 'Plan Flexible',
      monthly: '/mes',
      includes: 'Incluye:',
    },
    contact: {
      title: 'Cuéntanos tu proyecto',
      subtitle: 'Completa el diagnóstico y te contactamos en menos de 24 horas',
      send: 'Enviar diagnóstico',
      name: 'Nombre completo',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      company: 'Empresa',
      message: 'Describe tu proyecto',
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      tagline: '"Esto no es una landing page. Esto es la fábrica de apps."',
    },
    common: {
      learnMore: 'Saber más',
      getStarted: 'Comenzar',
      viewDemo: 'Ver demo',
    },
  },
  en: {
    nav: {
      home: 'Home',
      process: 'Process',
      integrations: 'Integrations',
      pricing: 'Pricing',
      demos: 'Demos',
      contact: 'Contact',
      signIn: 'Sign In',
    },
    hero: {
      badge: 'SaaS Technology Apps Design',
      title: 'Your app. Your business. No stress.',
      subtitle: 'We design and develop apps ready to operate in days. With real integrations to sell, operate and scale.',
      cta: 'I want my app',
      secondary: 'See process',
      ctaSecondary: 'View demos',
    },
    process: {
      title: 'Momentum Process',
      subtitle: 'From idea to production app',
      client: 'Client',
      production: 'Production',
      system: 'System',
    },
    integrations: {
      title: 'Everything your app needs',
      subtitle: 'We integrate the best tools on the market so your app works as a complete system from day one.',
      included: 'Included',
      optional: 'Optional',
      advanced: 'Advanced',
      coming: 'Coming Soon',
    },
    pricing: {
      title: 'Clear plans, no surprises',
      subtitle: 'Choose the model that best suits you',
      traditional: 'Traditional Plan',
      flexible: 'Flexible Plan',
      monthly: '/month',
      includes: 'Includes:',
    },
    contact: {
      title: 'Tell us about your project',
      subtitle: 'Complete the diagnosis and we will contact you in less than 24 hours',
      send: 'Send diagnosis',
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      company: 'Company',
      message: 'Describe your project',
    },
    footer: {
      rights: 'All rights reserved.',
      tagline: '"This is not a landing page. This is the app factory."',
    },
    common: {
      learnMore: 'Learn more',
      getStarted: 'Get started',
      viewDemo: 'View demo',
    },
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es')

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    document.documentElement.lang = lang
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

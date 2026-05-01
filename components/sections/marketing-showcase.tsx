'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

// All marketing materials organized
const marketingMaterials = [
  {
    id: 'landing-full',
    image: '/images/gallery/landing-full.jpeg',
    titleEs: 'Landing Page Completa',
    titleEn: 'Complete Landing Page',
    category: 'Marketing',
  },
  {
    id: 'marketing-collage',
    image: '/images/gallery/marketing-collage.jpeg',
    titleEs: 'Collage de Marketing',
    titleEn: 'Marketing Collage',
    category: 'Marketing',
  },
  {
    id: 'pricing-full',
    image: '/images/gallery/pricing-full.jpeg',
    titleEs: 'Planes y Precios',
    titleEn: 'Plans & Pricing',
    category: 'Pricing',
  },
  {
    id: 'hero-cinematic',
    image: '/images/gallery/hero-cinematic.jpeg',
    titleEs: 'Hero Cinematográfico',
    titleEn: 'Cinematic Hero',
    category: 'Design',
  },
  {
    id: 'architecture-flow',
    image: '/images/gallery/architecture-flow.jpeg',
    titleEs: 'Flujo de Arquitectura',
    titleEn: 'Architecture Flow',
    category: 'Technical',
  },
  {
    id: 'architecture-branded',
    image: '/images/gallery/architecture-branded.jpeg',
    titleEs: 'Arquitectura V Momentum',
    titleEn: 'V Momentum Architecture',
    category: 'Technical',
  },
  {
    id: 'architecture-agents',
    image: '/images/gallery/architecture-agents.jpeg',
    titleEs: 'Agentes de Código',
    titleEn: 'Code Agents',
    category: 'Technical',
  },
  {
    id: 'knowledge-sources',
    image: '/images/gallery/knowledge-sources.jpeg',
    titleEs: 'Fuentes de Conocimiento',
    titleEn: 'Knowledge Sources',
    category: 'Education',
  },
]

const categories = ['all', 'Marketing', 'Pricing', 'Design', 'Technical', 'Education']

export function MarketingShowcase() {
  const { language } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<typeof marketingMaterials[0] | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredMaterials = activeCategory === 'all' 
    ? marketingMaterials 
    : marketingMaterials.filter(m => m.category === activeCategory)

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mb-12"
      >
        <span className="text-sm text-primary font-medium uppercase tracking-wider">
          {language === 'es' ? 'Portafolio' : 'Portfolio'}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4">
          {language === 'es' ? 'Materiales de Marketing' : 'Marketing Materials'}
        </h2>
        <p className="text-muted-foreground text-lg">
          {language === 'es' 
            ? 'Explora todos nuestros materiales de marketing, arquitectura técnica y recursos educativos.'
            : 'Explore all our marketing materials, technical architecture, and educational resources.'}
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
            }`}
          >
            {category === 'all' 
              ? (language === 'es' ? 'Todos' : 'All')
              : category}
          </button>
        ))}
      </div>

      {/* Grid Gallery */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredMaterials.map((material, index) => (
            <motion.div
              key={material.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedImage(material)}
              className="group relative aspect-[16/10] rounded-xl overflow-hidden bg-card border border-border cursor-pointer hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10"
            >
              <img
                src={material.image}
                alt={language === 'es' ? material.titleEs : material.titleEn}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-xs text-primary font-medium uppercase tracking-wider">
                  {material.category}
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {language === 'es' ? material.titleEs : material.titleEn}
                </h3>
              </div>

              {/* Zoom icon */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-foreground" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-3 rounded-full bg-card border border-border hover:bg-muted transition-colors"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl w-full"
            >
              <div className="rounded-2xl overflow-hidden border border-border shadow-2xl">
                <img
                  src={selectedImage.image}
                  alt={language === 'es' ? selectedImage.titleEs : selectedImage.titleEn}
                  className="w-full h-auto"
                />
              </div>
              <div className="text-center mt-4">
                <span className="text-sm text-primary font-medium uppercase tracking-wider">
                  {selectedImage.category}
                </span>
                <h3 className="text-xl font-semibold text-foreground mt-1">
                  {language === 'es' ? selectedImage.titleEs : selectedImage.titleEn}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass-card'
import { ZoomableLightbox } from '@/components/ui/zoomable-lightbox'
import { Maximize2, ZoomIn } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

const galleryItems = [
  {
    id: 'hero-cinematic',
    image: '/images/gallery/hero-cinematic.jpeg',
    title: { es: 'Hero Cinematográfico', en: 'Cinematic Hero' },
    category: 'marketing',
  },
  {
    id: 'landing-full',
    image: '/images/gallery/landing-full.jpeg',
    title: { es: 'Landing Completa', en: 'Full Landing' },
    category: 'marketing',
  },
  {
    id: 'marketing-collage',
    image: '/images/gallery/marketing-collage.jpeg',
    title: { es: 'Collage Marketing', en: 'Marketing Collage' },
    category: 'marketing',
  },
  {
    id: 'pricing-full',
    image: '/images/gallery/pricing-full.jpeg',
    title: { es: 'Planes y Precios', en: 'Plans & Pricing' },
    category: 'marketing',
  },
  {
    id: 'architecture-flow',
    image: '/images/gallery/architecture-flow.jpeg',
    title: { es: 'Flujo de Arquitectura', en: 'Architecture Flow' },
    category: 'architecture',
  },
  {
    id: 'architecture-branded',
    image: '/images/gallery/architecture-branded.jpeg',
    title: { es: 'Arquitectura V Momentum', en: 'V Momentum Architecture' },
    category: 'architecture',
  },
  {
    id: 'architecture-agents',
    image: '/images/gallery/architecture-agents.jpeg',
    title: { es: 'Agentes de Código', en: 'Code Agents' },
    category: 'architecture',
  },
  {
    id: 'knowledge-sources',
    image: '/images/gallery/knowledge-sources.jpeg',
    title: { es: 'Fuentes de Conocimiento', en: 'Knowledge Sources' },
    category: 'architecture',
  },
]

export function MarketingGallery() {
  const { language } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null)
  const [activeCategory, setActiveCategory] = useState<'all' | 'marketing' | 'architecture'>('all')
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory)

  const categories = [
    { id: 'all', label: { es: 'Todo', en: 'All' } },
    { id: 'marketing', label: { es: 'Marketing', en: 'Marketing' } },
    { id: 'architecture', label: { es: 'Arquitectura', en: 'Architecture' } },
  ]

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id)
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredItems.length
      : (currentIndex - 1 + filteredItems.length) % filteredItems.length
    setSelectedImage(filteredItems[newIndex])
  }

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-12 px-4"
      >
        <motion.span 
          className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4
                     bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-white/10"
        >
          {language === 'es' ? 'Materiales' : 'Materials'}
        </motion.span>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="text-white">{language === 'es' ? 'Galería de ' : ''}</span>
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {language === 'es' ? 'Marketing' : 'Marketing Gallery'}
          </span>
        </h2>
      </motion.div>

      {/* Category filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-2 mb-8 px-4"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {cat.label[language]}
          </button>
        ))}
      </motion.div>

      {/* Gallery grid */}
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard
                  onClick={() => setSelectedImage(item)}
                  className="group overflow-hidden"
                  glowColor="cyan"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title[language]}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-medium text-white">{item.title[language]}</p>
                    </div>

                    {/* Zoom icon */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 rounded-lg bg-black/50 backdrop-blur-sm flex items-center gap-1.5">
                        <ZoomIn className="w-4 h-4 text-white" />
                        <span className="text-xs text-white/70">Zoom</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Zoomable Lightbox */}
      <ZoomableLightbox
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        images={filteredItems.map(item => ({
          src: item.image,
          title: item.title[language],
          category: item.category,
        }))}
        currentIndex={selectedImage ? filteredItems.findIndex(item => item.id === selectedImage.id) : 0}
        onNavigate={(index) => setSelectedImage(filteredItems[index])}
      />
    </section>
  )
}

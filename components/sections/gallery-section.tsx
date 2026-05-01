'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

interface GalleryImage {
  id: string
  src: string
  title: string
  description: string
  category: 'marketing' | 'integration' | 'architecture'
}

const galleryImages: GalleryImage[] = [
  // Marketing / Hero
  { id: 'hero-cinematic', src: '/images/gallery/hero-cinematic.jpeg', title: 'V Momentum Hero', description: 'Apps, Automation, IA, Cloud, Performance', category: 'marketing' },
  { id: 'marketing-collage', src: '/images/gallery/marketing-collage.jpeg', title: 'Servicios V Momentum', description: 'Todo lo que hacemos por tu negocio', category: 'marketing' },
  { id: 'landing-full', src: '/images/gallery/landing-full.jpeg', title: 'Landing Completa', description: 'Vista completa de nuestro producto', category: 'marketing' },
  { id: 'pricing-full', src: '/images/gallery/pricing-full.jpeg', title: 'Planes y Precios', description: 'Opciones claras para tu proyecto', category: 'marketing' },
  
  // Architecture
  { id: 'architecture-flow', src: '/images/gallery/architecture-flow.jpeg', title: 'Arquitectura del Sistema', description: 'Flujo de datos y servicios', category: 'architecture' },
  { id: 'architecture-branded', src: '/images/gallery/architecture-branded.jpeg', title: 'Stack Tecnológico', description: 'Las herramientas que usamos', category: 'architecture' },
  { id: 'architecture-agents', src: '/images/gallery/architecture-agents.jpeg', title: 'Agentes de Código', description: 'IA que construye tu app', category: 'architecture' },
  { id: 'knowledge-sources', src: '/images/gallery/knowledge-sources.jpeg', title: 'Fuentes de Conocimiento', description: 'Cómo funciona todo junto', category: 'architecture' },
  
  // Integrations
  { id: 'stripe', src: '/images/integrations/stripe.jpeg', title: 'Stripe', description: 'Infraestructura de pagos', category: 'integration' },
  { id: 'clerk', src: '/images/integrations/clerk.jpeg', title: 'Clerk', description: 'Autenticación segura', category: 'integration' },
  { id: 'vercel', src: '/images/integrations/vercel.jpeg', title: 'Vercel', description: 'Deploy y hosting', category: 'integration' },
  { id: 'neon', src: '/images/integrations/neon.jpeg', title: 'Neon', description: 'PostgreSQL serverless', category: 'integration' },
  { id: 'twilio', src: '/images/integrations/twilio.jpeg', title: 'Twilio', description: 'Comunicaciones', category: 'integration' },
  { id: 'resend', src: '/images/integrations/resend-full.jpeg', title: 'Resend', description: 'Emails transaccionales', category: 'integration' },
  { id: 'cloudflare', src: '/images/integrations/cloudflare.jpeg', title: 'Cloudflare', description: 'CDN y seguridad', category: 'integration' },
  { id: 'mercado-pago', src: '/images/integrations/mercado-pago.jpeg', title: 'Mercado Pago', description: 'Pagos LATAM', category: 'integration' },
  { id: 'turnkey', src: '/images/integrations/turnkey.jpeg', title: 'Turnkey', description: 'Backend como servicio', category: 'integration' },
  { id: 'alchemy', src: '/images/integrations/alchemy.jpeg', title: 'Alchemy', description: 'Infraestructura blockchain', category: 'integration' },
  { id: 'safe', src: '/images/integrations/safe-gnosis.jpeg', title: 'Safe', description: 'Multi-sig wallets', category: 'integration' },
  { id: 'docusign', src: '/images/integrations/docusign.jpeg', title: 'DocuSign', description: 'Firma electrónica', category: 'integration' },
  { id: 'duffel', src: '/images/integrations/duffel.jpeg', title: 'Duffel', description: 'API de viajes', category: 'integration' },
  { id: 'v0', src: '/images/integrations/v0-vercel.jpeg', title: 'v0 by Vercel', description: 'IA para generar UI', category: 'integration' },
  { id: 'replit', src: '/images/integrations/replit.jpeg', title: 'Replit', description: 'IDE en la nube', category: 'integration' },
  { id: 'cursor', src: '/images/integrations/cursor.jpeg', title: 'Cursor', description: 'Editor con IA', category: 'integration' },
]

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'architecture', label: 'Arquitectura' },
  { id: 'integration', label: 'Integraciones' },
]

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return
      
      if (e.key === 'Escape') {
        setSelectedImage(null)
      } else if (e.key === 'ArrowRight') {
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
        if (currentIndex < filteredImages.length - 1) {
          setSelectedImage(filteredImages[currentIndex + 1])
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
        if (currentIndex > 0) {
          setSelectedImage(filteredImages[currentIndex - 1])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, filteredImages])

  return (
    <section id="galeria" className="py-20 md:py-32 px-4 bg-gradient-to-b from-muted/5 via-background to-muted/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium mb-4 tracking-wider uppercase"
          >
            Galería V Momentum
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4 text-balance"
          >
            Explora nuestro ecosistema
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Descubre las integraciones, arquitectura y materiales de V Momentum
          </motion.p>
        </div>

        {/* Category filters */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery carousel */}
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors hidden md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors hidden md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable gallery */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-4 md:px-12 snap-x snap-mandatory"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex-shrink-0 w-72 md:w-96 snap-center"
                >
                  <div
                    onClick={() => setSelectedImage(image)}
                    className="group relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted cursor-pointer"
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h4 className="text-white font-semibold text-lg">{image.title}</h4>
                      <p className="text-white/80 text-sm">{image.description}</p>
                      <div className="absolute top-4 right-4">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Lightbox modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
                  if (currentIndex > 0) setSelectedImage(filteredImages[currentIndex - 1])
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
                  if (currentIndex < filteredImages.length - 1) setSelectedImage(filteredImages[currentIndex + 1])
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="max-w-5xl max-h-[80vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain rounded-lg"
                />
                <div className="text-center mt-4">
                  <h3 className="text-white text-xl font-semibold">{selectedImage.title}</h3>
                  <p className="text-white/70">{selectedImage.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

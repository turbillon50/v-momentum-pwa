'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'

// Hero slides with real marketing images
const heroSlides = [
  {
    id: 1,
    image: '/images/gallery/hero-cinematic.jpeg',
    titleEs: 'Tu app. Tu negocio. Sin tensiones.',
    titleEn: 'Your app. Your business. No stress.',
    subtitleEs: 'APPS • AUTOMATION • IA • CLOUD • PERFORMANCE',
    subtitleEn: 'APPS • AUTOMATION • AI • CLOUD • PERFORMANCE',
    ctaEs: 'Quiero mi app',
    ctaEn: 'I want my app',
  },
  {
    id: 2,
    image: '/images/gallery/marketing-collage.jpeg',
    titleEs: 'Diseño. Desarrollo. Despliegue.',
    titleEn: 'Design. Develop. Deploy.',
    subtitleEs: 'Todo el proceso en un solo lugar',
    subtitleEn: 'The entire process in one place',
    ctaEs: 'Ver proceso',
    ctaEn: 'See process',
  },
  {
    id: 3,
    image: '/images/gallery/architecture-agents.jpeg',
    titleEs: 'Arquitectura de clase mundial',
    titleEn: 'World-class architecture',
    subtitleEs: 'ChatGPT • Replit • GitHub • Vercel',
    subtitleEn: 'ChatGPT • Replit • GitHub • Vercel',
    ctaEs: 'Explorar stack',
    ctaEn: 'Explore stack',
  },
  {
    id: 4,
    image: '/images/gallery/knowledge-sources.jpeg',
    titleEs: 'De una idea a producción',
    titleEn: 'From idea to production',
    subtitleEs: 'Usuario → DNS → Frontend → Backend → Base de datos',
    subtitleEn: 'User → DNS → Frontend → Backend → Database',
    ctaEs: 'Aprender más',
    ctaEn: 'Learn more',
  },
]

interface HeroCinematicProps {
  onNavigate: (section: string) => void
}

export function HeroCinematic({ onNavigate }: HeroCinematicProps) {
  const { language, t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-advance slides
  useEffect(() => {
    if (isPlaying && !isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      }, 6000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying, isHovered])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const slide = heroSlides[currentSlide]

  return (
    <section 
      className="relative w-full h-[100svh] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Images with Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-32 md:pb-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          {/* Brand Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <img 
              src="/images/v-momentum-logo.jpeg" 
              alt="V Momentum" 
              className="h-12 md:h-16 lg:h-20 w-auto object-contain"
              style={{ filter: 'drop-shadow(0 0 30px rgba(59,130,246,0.4))' }}
            />
          </motion.div>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentSlide}-${language}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl lg:text-7xl font-bold text-foreground mb-4 leading-tight text-balance"
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
            >
              {language === 'es' ? slide.titleEs : slide.titleEn}
            </motion.h1>
          </AnimatePresence>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`subtitle-${currentSlide}-${language}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm md:text-lg lg:text-xl text-primary font-medium tracking-[0.2em] mb-8"
            >
              {language === 'es' ? slide.subtitleEs : slide.subtitleEn}
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              onClick={() => onNavigate('contacto')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-base md:text-lg px-8 py-6 rounded-xl"
            >
              {language === 'es' ? slide.ctaEs : slide.ctaEn}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('proceso')}
              className="border-foreground/30 text-foreground hover:bg-foreground/10 text-base md:text-lg px-8 py-6 rounded-xl"
            >
              {t.hero.secondary}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        {/* Slide indicators */}
        <div className="flex items-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-primary' 
                  : 'w-1.5 bg-foreground/30 hover:bg-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-foreground" />
          ) : (
            <Play className="w-4 h-4 text-foreground" />
          )}
        </button>
      </div>

      {/* Arrow Navigation (visible on hover) */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

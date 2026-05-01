'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring, PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'

interface CarouselItem {
  id: string
  image: string
  title: string
  subtitle?: string
  category?: string
}

interface AppleTVCarouselProps {
  items: CarouselItem[]
  title: string
  subtitle?: string
  onItemClick?: (item: CarouselItem) => void
}

export function AppleTVCarousel({ items, title, subtitle, onItemClick }: AppleTVCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [expandedItem, setExpandedItem] = useState<CarouselItem | null>(null)

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleItemClick = (item: CarouselItem) => {
    if (onItemClick) {
      onItemClick(item)
    } else {
      setExpandedItem(item)
    }
  }

  return (
    <div className="relative py-8">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 mb-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-sm md:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={containerRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto no-scrollbar px-6 md:px-12 lg:px-20 pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {items.map((item, index) => (
            <CarouselCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </div>
      </div>

      {/* Expanded View Modal */}
      {expandedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setExpandedItem(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpandedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
            <img
              src={expandedItem.image}
              alt={expandedItem.title}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {expandedItem.title}
              </h3>
              {expandedItem.subtitle && (
                <p className="text-muted-foreground">{expandedItem.subtitle}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

interface CarouselCardProps {
  item: CarouselItem
  index: number
  onClick: () => void
}

function CarouselCard({ item, index, onClick }: CarouselCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const springConfig = { stiffness: 300, damping: 30 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: 'preserve-3d',
        scrollSnapAlign: 'start',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[400px] cursor-pointer group"
    >
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-card border border-border shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {item.category && (
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              {item.category}
            </span>
          )}
          <h3 className="text-lg font-semibold text-foreground line-clamp-2">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
              {item.subtitle}
            </p>
          )}
        </div>

        {/* Expand icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm"
        >
          <Expand className="w-4 h-4 text-foreground" />
        </motion.div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, transparent 50%)',
            transform: 'translateX(-100%)',
          }}
          animate={isHovered ? { transform: 'translateX(100%)' } : {}}
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
  )
}

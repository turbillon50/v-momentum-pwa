'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Move } from 'lucide-react'

interface ZoomableLightboxProps {
  isOpen: boolean
  onClose: () => void
  images: { src: string; title: string; category?: string }[]
  currentIndex: number
  onNavigate: (index: number) => void
}

export function ZoomableLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: ZoomableLightboxProps) {
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const currentImage = images[currentIndex]
  const minZoom = 1
  const maxZoom = 4

  // Reset zoom when image changes
  useEffect(() => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }, [currentIndex])

  // Handle zoom
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, maxZoom))
  }

  const handleZoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.5, minZoom)
      if (newZoom === 1) setPosition({ x: 0, y: 0 })
      return newZoom
    })
  }

  const handleReset = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.25 : 0.25
    setZoom((prev) => {
      const newZoom = Math.max(minZoom, Math.min(maxZoom, prev + delta))
      if (newZoom === 1) setPosition({ x: 0, y: 0 })
      return newZoom
    })
  }

  // Handle drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom > 1 && e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && zoom > 1 && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      })
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Double tap to zoom
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (zoom === 1) {
      setZoom(2.5)
      // Center zoom on click position
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const x = (rect.width / 2 - e.clientX + rect.left) * 1.5
        const y = (rect.height / 2 - e.clientY + rect.top) * 1.5
        setPosition({ x, y })
      }
    } else {
      handleReset()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          if (currentIndex > 0) onNavigate(currentIndex - 1)
          break
        case 'ArrowRight':
          if (currentIndex < images.length - 1) onNavigate(currentIndex + 1)
          break
        case '+':
        case '=':
          handleZoomIn()
          break
        case '-':
          handleZoomOut()
          break
        case '0':
          handleReset()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, images.length, onClose, onNavigate])

  if (!currentImage) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-4">
              <h3 className="text-white font-medium truncate max-w-[200px] md:max-w-none">
                {currentImage.title}
              </h3>
              {currentImage.category && (
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                  {currentImage.category}
                </span>
              )}
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Zoom indicator */}
              <span className="text-white/50 text-sm mr-2">
                {Math.round(zoom * 100)}%
              </span>
              
              <button
                onClick={handleZoomOut}
                disabled={zoom <= minZoom}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ZoomOut className="w-5 h-5 text-white" />
              </button>
              
              <button
                onClick={handleZoomIn}
                disabled={zoom >= maxZoom}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ZoomIn className="w-5 h-5 text-white" />
              </button>
              
              <button
                onClick={handleReset}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <RotateCcw className="w-5 h-5 text-white" />
              </button>
              
              <div className="w-px h-6 bg-white/20 mx-2" />
              
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/10 hover:bg-red-500/50 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Image container */}
          <div
            ref={containerRef}
            className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={handleDoubleClick}
          >
            {/* Navigation arrows */}
            {currentIndex > 0 && (
              <button
                onClick={() => onNavigate(currentIndex - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}
            
            {currentIndex < images.length - 1 && (
              <button
                onClick={() => onNavigate(currentIndex + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}

            {/* Image */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-8"
              animate={{
                scale: zoom,
                x: position.x,
                y: position.y,
              }}
              transition={{
                type: zoom === 1 ? 'spring' : 'tween',
                stiffness: 300,
                damping: 30,
                duration: 0.1,
              }}
            >
              <img
                src={currentImage.src}
                alt={currentImage.title}
                className="max-w-full max-h-full object-contain select-none"
                draggable={false}
              />
            </motion.div>

            {/* Zoom hint */}
            {zoom === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/70 text-sm"
              >
                <Move className="w-4 h-4" />
                <span>Doble click o scroll para zoom</span>
              </motion.div>
            )}
          </div>

          {/* Footer with pagination */}
          <div className="p-4 border-t border-white/10 flex items-center justify-center gap-2">
            <span className="text-white/50 text-sm">
              {currentIndex + 1} / {images.length}
            </span>
            
            {/* Thumbnail strip */}
            <div className="flex items-center gap-2 ml-4 overflow-x-auto max-w-[300px] md:max-w-[500px] no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate(idx)}
                  className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentIndex
                      ? 'border-blue-500 scale-110'
                      : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

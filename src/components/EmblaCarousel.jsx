import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import './EmblaCarousel.css'

const CarouselContext = createContext(null)

function useCarousel() {
  const ctx = useContext(CarouselContext)
  if (!ctx) throw new Error('useCarousel must be used within <Carousel />')
  return ctx
}

export function Carousel({ orientation = 'horizontal', opts, plugins, className = '', children, ...props }) {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === 'horizontal' ? 'x' : 'y' },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback((api) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = useCallback(() => api?.scrollNext(), [api])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollPrev() }
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollNext() }
  }, [scrollPrev, scrollNext])

  useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on('reInit', onSelect)
    api.on('select', onSelect)
    return () => api?.off('select', onSelect)
  }, [api, onSelect])

  return (
    <CarouselContext.Provider value={{ carouselRef, api, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}>
      <div
        onKeyDownCapture={handleKeyDown}
        className={`embla ${className}`}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

export function CarouselContent({ className = '', ...props }) {
  const { carouselRef, orientation } = useCarousel()
  return (
    <div ref={carouselRef} className="embla__viewport">
      <div
        className={`embla__container ${orientation === 'vertical' ? 'embla__container--vertical' : ''} ${className}`}
        {...props}
      />
    </div>
  )
}

export function CarouselItem({ className = '', ...props }) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={`embla__slide ${className}`}
      {...props}
    />
  )
}

export function CarouselPrevious({ className = '', ...props }) {
  const { scrollPrev, canScrollPrev } = useCarousel()
  return (
    <button
      className={`embla__btn embla__btn--prev ${className}`}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Previous slide"
      {...props}
    >
      <ArrowLeft size={16} />
    </button>
  )
}

export function CarouselNext({ className = '', ...props }) {
  const { scrollNext, canScrollNext } = useCarousel()
  return (
    <button
      className={`embla__btn embla__btn--next ${className}`}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Next slide"
      {...props}
    >
      <ArrowRight size={16} />
    </button>
  )
}

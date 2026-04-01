import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useLanguage } from '../context/LangContext'
import './TestimonialsSection.css'

const avatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
]

function getVisibleCount(width) {
  if (width >= 1280) return 3
  if (width >= 768) return 2
  return 1
}

// Round button with radial white glow on hover
function GlowNavButton({ onClick, disabled, children, ariaLabel }) {
  const btnRef = useRef(null)
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.button
      ref={btnRef}
      className={`tsl-nav-btn ${disabled ? 'tsl-nav-btn--disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={disabled ? {} : { scale: 1.08 }}
      whileTap={disabled ? {} : { scale: 0.94 }}
    >
      {/* Radial glow */}
      <span
        className="tsl-nav-btn__glow"
        style={{
          left: glowPos.x,
          top: glowPos.y,
          opacity: hovered && !disabled ? 1 : 0,
        }}
      />
      <span className="tsl-nav-btn__icon">{children}</span>
    </motion.button>
  )
}

export default function TestimonialsSection() {
  const { t } = useLanguage()
  const testimonials = t.testimonials.items.map((item, i) => ({ ...item, id: i + 1, avatar: avatars[i] }))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(1)
  const autoPlayRef = useRef(null)
  const sectionRef = useRef(null)

  // Resize
  useEffect(() => {
    const onResize = () => {
      const newWidth = window.innerWidth
      setWindowWidth(newWidth)
      const maxIdx = testimonials.length - getVisibleCount(newWidth)
      setCurrentIndex((prev) => Math.min(prev, Math.max(0, maxIdx)))
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const visibleCount = getVisibleCount(windowWidth)
  const maxIndex = testimonials.length - visibleCount
  const canGoNext = currentIndex < maxIndex
  const canGoPrev = currentIndex > 0

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }, [])

  const goNext = useCallback(() => {
    if (!canGoNext) return
    setDirection(1)
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
    pauseAutoPlay()
  }, [canGoNext, maxIndex, pauseAutoPlay])

  const goPrev = useCallback(() => {
    if (!canGoPrev) return
    setDirection(-1)
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
    pauseAutoPlay()
  }, [canGoPrev, pauseAutoPlay])

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          setDirection(-1)
          return Math.max(prev - 1, 0)
        } else if (prev <= 0) {
          setDirection(1)
          return Math.min(prev + 1, maxIndex)
        }
        return prev + direction
      })
    }, 4000)
    return () => clearInterval(autoPlayRef.current)
  }, [isAutoPlaying, maxIndex, direction])

  // Drag end
  const handleDragEnd = (_, info) => {
    if (info.offset.x < -30 && canGoNext) goNext()
    else if (info.offset.x > 30 && canGoPrev) goPrev()
  }

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="tsl section-pad" id="testimonials" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="tsl__header reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="tsl__label">{t.testimonials.label}</span>
          <h2 className="tsl__heading display-heading">
            {t.testimonials.heading1}<br />{t.testimonials.heading2}
          </h2>
        </motion.div>

        {/* Slider */}
        <div className="tsl__slider reveal reveal-delay-1">
          {/* Nav buttons */}
          <div className="tsl__nav">
            <GlowNavButton onClick={goPrev} disabled={!canGoPrev} ariaLabel="Previous testimonial">
              <ChevronLeft size={20} />
            </GlowNavButton>
            <GlowNavButton onClick={goNext} disabled={!canGoNext} ariaLabel="Next testimonial">
              <ChevronRight size={20} />
            </GlowNavButton>
          </div>

          {/* Track */}
          <div className="tsl__track-outer">
            <motion.div
              className="tsl__track"
              animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
              transition={{ type: 'spring', stiffness: 70, damping: 20 }}
            >
              {testimonials.map((item) => (
                <motion.div
                  key={item.id}
                  className="tsl__slide"
                  style={{ width: `${100 / visibleCount}%` }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="tsl__card">
                    {/* Quote icon */}
                    <div className="tsl__card-quote-icon" aria-hidden="true">
                      <Quote size={windowWidth < 640 ? 36 : 52} />
                    </div>

                    <div className="tsl__card-body">
                      <p className="tsl__card-text">"{item.quote}"</p>

                      <div className="tsl__card-footer">
                        <div className="tsl__card-avatar-wrap">
                          <img
                            src={item.avatar}
                            alt={item.name}
                            className="tsl__card-avatar"
                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                          />
                          <motion.div
                            className="tsl__card-avatar-ring"
                            animate={{ scale: [1, 1.25, 1], opacity: [0, 0.25, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                          />
                        </div>
                        <div>
                          <p className="tsl__card-name">{item.name}</p>
                          <p className="tsl__card-username">{item.username}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dot indicators */}
          <div className="tsl__dots">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <motion.button
                key={i}
                className={`tsl__dot ${i === currentIndex ? 'tsl__dot--active' : ''}`}
                onClick={() => { setCurrentIndex(i); pauseAutoPlay() }}
                aria-label={`Go to slide ${i + 1}`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.85 }}
              >
                {i === currentIndex && (
                  <motion.span
                    className="tsl__dot-ring"
                    animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

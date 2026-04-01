import { useEffect, useRef } from 'react'
import { StarButton } from './StarButton'
import './HeroSection.css'

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const openCalendar = () => {
  window.open('https://cal.com/gabriel-syndra-gp6orz/15min', '_blank')
}

export default function HeroSection() {
  const headlineRef = useRef(null)

  useEffect(() => {
    const el = headlineRef.current
    if (!el) return
    requestAnimationFrame(() => el.classList.add('hero__headline--visible'))
  }, [])

  return (
    <section className="hero">
      <div className="hero__inner container">
        {/* Floating logo card */}
        <div className="hero__logo-card">
          <span className="hero__logo-card-text">LEADFORGE</span>
        </div>

        {/* Main headline */}
        <div className="hero__headline display-heading" ref={headlineRef}>
          <span className="hero__headline-line">QUALIFIED LEADS.</span>
          <span className="hero__headline-line">ON AUTOPILOT.</span>
        </div>

        {/* Bottom row */}
        <div className="hero__bottom">
          <div className="hero__trust">
            <div className="hero__stars">
              <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
            </div>
            <span className="hero__trust-text">Trusted by 500+ B2B teams</span>
          </div>

          <div className="hero__cta-area">
            <p className="hero__desc">
              LeadForge finds your ideal prospects, writes hyper-personalized cold emails
              with AI, and fills your calendar with qualified meetings —
              while you focus on closing.
            </p>
            <StarButton onClick={openCalendar}>
              Book a Call
            </StarButton>
          </div>
        </div>
      </div>
    </section>
  )
}

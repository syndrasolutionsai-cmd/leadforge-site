import { useEffect, useRef } from 'react'
import { StarButton } from './StarButton'
import { useLanguage } from '../context/LangContext'
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
  const { t } = useLanguage()

  useEffect(() => {
    const el = headlineRef.current
    if (!el) return
    requestAnimationFrame(() => el.classList.add('hero__headline--visible'))
  }, [])

  return (
    <section className="hero">
      <div className="hero__inner container">
        <div className="hero__logo-card">
          <span className="hero__logo-card-text">LEADFORGE</span>
        </div>

        <div className="hero__headline display-heading" ref={headlineRef}>
          <span className="hero__headline-line">{t.hero.line1}</span>
          <span className="hero__headline-line">{t.hero.line2}</span>
        </div>

        <div className="hero__bottom">
          <div className="hero__trust">
            <div className="hero__stars">
              <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
            </div>
            <span className="hero__trust-text">{t.hero.trust}</span>
          </div>

          <div className="hero__cta-area">
            <p className="hero__desc">{t.hero.desc}</p>
            <StarButton onClick={openCalendar}>
              {t.hero.cta}
            </StarButton>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import { GlowCard } from './SpotlightCard'
import { StarButton } from './StarButton'
import { useLanguage } from '../context/LangContext'
import './PortfolioSection.css'

const openCalendar = () => {
  window.open('https://cal.com/gabriel-syndra-gp6orz/15min', '_blank')
}

export default function PortfolioSection() {
  const sectionRef = useRef(null)
  const { t } = useLanguage()
  const steps = t.portfolio.steps

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const glowColors = ['blue', 'purple', 'blue']

  return (
    <section className="portfolio section-pad" id="how-it-works" ref={sectionRef}>
      <div className="container">
        <div className="portfolio__header reveal">
          <div className="portfolio__header-text">
            <p className="portfolio__tagline display-heading">{t.portfolio.tagline1}</p>
            <p className="portfolio__tagline portfolio__tagline--faded display-heading">{t.portfolio.tagline2}</p>
          </div>
          <div className="btn-group">
            <StarButton onClick={openCalendar}>{t.portfolio.cta}</StarButton>
          </div>
        </div>

        <div className="portfolio__pride display-heading reveal reveal-delay-1">
          <span>{t.portfolio.pipeline1}&nbsp;</span>
          <span className="portfolio__pride-box">
            <span className="portfolio__pride-box-inner">LEADFORGE</span>
          </span>
          <span>&nbsp;{t.portfolio.pipeline2}</span>
        </div>

        <div className="portfolio__grid">
          {steps.map((s, i) => (
            <div key={s.phase} className={`portfolio__card-wrapper reveal reveal-delay-${i + 1}`}>
              <GlowCard
                glowColor={glowColors[i]}
                style={{ width: '100%', height: '100%' }}
                className="portfolio__glow-card"
              >
                <div className="portfolio__card-visual">
                  <span className="portfolio__card-phase">{s.phase}</span>
                  <ul className="portfolio__card-steps">
                    {s.items.map((item, j) => (
                      <li key={j} className="portfolio__card-step">
                        <span className="portfolio__card-step-dot" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="portfolio__card-info">
                  <span className="portfolio__card-cat">Phase {s.phase}</span>
                  <h3 className="portfolio__card-title">{s.title}</h3>
                </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

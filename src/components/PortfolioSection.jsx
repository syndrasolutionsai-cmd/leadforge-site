import { useEffect, useRef } from 'react'
import { GlowCard } from './SpotlightCard'
import { StarButton } from './StarButton'
import './PortfolioSection.css'

const scrollToCalendar = () => {
  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
}

const steps = [
  {
    id: 1,
    phase: '01',
    title: 'Prospect Discovery',
    items: ['Define your ICP', 'Find verified prospects', 'Verify every email', 'Score leads by fit'],
    glowColor: 'blue',
  },
  {
    id: 2,
    phase: '02',
    title: 'AI Personalization',
    items: ['Detect outreach signal', 'Match your value prop', 'Write personalized email', 'Audit & quality score'],
    glowColor: 'purple',
  },
  {
    id: 3,
    phase: '03',
    title: 'Send & Convert',
    items: ['A/B test subject lines', 'Send at scale', 'AI classifies replies', 'Book meetings automatically'],
    glowColor: 'blue',
  },
]

export default function PortfolioSection() {
  const sectionRef = useRef(null)

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

  return (
    <section className="portfolio section-pad" id="how-it-works" ref={sectionRef}>
      <div className="container">
        <div className="portfolio__header reveal">
          <div className="portfolio__header-text">
            <p className="portfolio__tagline display-heading">From zero to booked meeting</p>
            <p className="portfolio__tagline portfolio__tagline--faded display-heading">in under 8 minutes.</p>
          </div>
          <div className="btn-group">
            <StarButton onClick={scrollToCalendar}>See It In Action</StarButton>
          </div>
        </div>

        <div className="portfolio__pride display-heading reveal reveal-delay-1">
          <span>YOUR PIPELINE&nbsp;</span>
          <span className="portfolio__pride-box">
            <span className="portfolio__pride-box-inner">LEADFORGE</span>
          </span>
          <span>&nbsp;FULL</span>
        </div>

        <div className="portfolio__grid">
          {steps.map((s, i) => (
            <div key={s.id} className={`portfolio__card-wrapper reveal reveal-delay-${i + 1}`}>
              <GlowCard
                glowColor={s.glowColor}
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

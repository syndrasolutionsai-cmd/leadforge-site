import { useEffect, useRef } from 'react'
import { FlowButton } from './ui/FlowButton'
import Features from './blocks/Features'
import './PortfolioSection.css'

const scrollToCalendar = () => {
  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
}

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
            <FlowButton onClick={scrollToCalendar} text="See It In Action" />
          </div>
        </div>

        <div className="portfolio__pride display-heading reveal reveal-delay-1">
          <span>YOUR PIPELINE&nbsp;</span>
          <span className="portfolio__pride-box">
            <span className="portfolio__pride-box-inner">LEADFORGE</span>
          </span>
          <span>&nbsp;FULL</span>
        </div>

        <Features />
      </div>
    </section>
  )
}

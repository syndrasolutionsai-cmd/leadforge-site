import { useEffect, useRef } from 'react'
import { FlowButton } from './ui/FlowButton'
import './AISection.css'

const scrollToCalendar = () => {
  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
}

const integrations = [
  'Multi-source prospecting.',
  'Email verification at scale.',
  'AI writing + automated sending.',
]

export default function AISection() {
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
    <section className="ai-section" id="integrations" ref={sectionRef}>
      <div className="container">
        <div className="ai-section__content reveal">
          <div className="ai-section__tools-block">
            <h3 className="ai-section__tools-label">Built on:</h3>
            <ul className="ai-section__tools-list">
              {integrations.map((tool, i) => (
                <li key={i} className="ai-section__tool-item" style={{ opacity: 1 - i * 0.28 }}>
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <div className="ai-section__more-block">
            <h2 className="ai-section__more-heading display-heading">
              One system.<br />Zero duct tape.
            </h2>
            <div className="btn-group ai-section__cta">
              <FlowButton onClick={scrollToCalendar} text="Book a Call" />
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

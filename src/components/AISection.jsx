import { useEffect, useRef } from 'react'
import { StarButton } from './StarButton'
import { useLanguage } from '../context/LangContext'
import './AISection.css'

const openCalendar = () => {
  window.open('https://cal.com/gabriel-syndra-gp6orz/15min', '_blank')
}

export default function AISection() {
  const sectionRef = useRef(null)
  const { t } = useLanguage()

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
    <section className="ai-section" id="integrations" ref={sectionRef}>
      <div className="container">
        <div className="ai-section__content reveal">
          <div className="ai-section__tools-block">
            <h3 className="ai-section__tools-label">{t.ai.builtOn}</h3>
            <ul className="ai-section__tools-list">
              {t.ai.integrations.map((item, i) => (
                <li key={i} className="ai-section__tool-item" style={{ opacity: 1 - i * 0.28 }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="ai-section__more-block">
            <h2 className="ai-section__more-heading display-heading">
              {t.ai.heading1}<br />{t.ai.heading2}
            </h2>
            <div className="btn-group ai-section__cta">
              <StarButton onClick={openCalendar}>
                {t.ai.cta}
              </StarButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

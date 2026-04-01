import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LangContext'
import './ServicesSection.css'

const ArrowDiag = ({ expanded }) => (
  <svg
    className={`service__arrow-icon ${expanded ? 'service__arrow-icon--down' : ''}`}
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
)

const ProgressTicks = () => (
  <div className="service__ticks" aria-hidden="true">
    {Array.from({ length: 10 }).map((_, i) => (
      <span key={i} className="service__tick" style={{ height: i % 3 === 0 ? '1.5em' : '0.75em' }} />
    ))}
  </div>
)

export default function ServicesSection() {
  const [openIds, setOpenIds] = useState(new Set([3]))
  const sectionRef = useRef(null)
  const { t } = useLanguage()

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="services section-pad" id="features" ref={sectionRef}>
      <div className="container">
        <h2 className="services__heading display-heading reveal">{t.services.heading}</h2>
        <div className="services__list">
          {t.services.items.map((f, i) => {
            const id = i + 1
            const isOpen = openIds.has(id)
            return (
              <div key={id} className={`service ${isOpen ? 'service--open' : ''}`}>
                <button className="service__row" onClick={() => toggle(id)} aria-expanded={isOpen}>
                  <ArrowDiag expanded={isOpen} />
                  <span className="service__name">{f.name}</span>
                  <span className="service__meta">
                    <span className="service__num">{f.num}</span>
                    <ProgressTicks />
                  </span>
                </button>
                <div className="service__body">
                  <p className="service__desc">{f.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

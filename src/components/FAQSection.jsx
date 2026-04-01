import { useState, useEffect, useRef } from 'react'
import { StarButton } from './StarButton'
import { useLanguage } from '../context/LangContext'
import './FAQSection.css'

const ArrowDiag = ({ open }) => (
  <svg
    className={`faq__icon ${open ? 'faq__icon--open' : ''}`}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
)

export default function FAQSection() {
  const [openIds, setOpenIds] = useState(new Set())
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
    <section className="faq section-pad" id="faq" ref={sectionRef}>
      <div className="container">
        <div className="faq__inner">
          <div className="faq__contact-card reveal" id="contact">
            <p className="faq__card-title">{t.faq.cardTitle}</p>
            <p className="faq__card-sub">{t.faq.cardSub}</p>
            <StarButton as="a" href="https://cal.com/gabriel-syndra-gp6orz/15min" target="_blank" rel="noopener noreferrer" className="faq__card-btn">
              {t.faq.cta}
            </StarButton>
          </div>

          <div className="faq__accordion-area">
            <h2 className="faq__heading display-heading reveal">
              {t.faq.heading1}<br />{t.faq.heading2}
            </h2>

            <div className="faq__list">
              {t.faq.items.map((item, i) => {
                const id = i + 1
                const isOpen = openIds.has(id)
                return (
                  <div key={id} className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}>
                    <button className="faq__question" onClick={() => toggle(id)} aria-expanded={isOpen}>
                      <span>{item.q}</span>
                      <ArrowDiag open={isOpen} />
                    </button>
                    <div className="faq__answer-wrap">
                      <p className="faq__answer">{item.a}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

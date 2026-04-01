import { useState, useEffect, useRef } from 'react'
import { StarButton } from './StarButton'
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

const faqs = [
  {
    id: 1,
    q: 'How long does it take to get my first leads?',
    a: 'Most users have their first campaign live within 8 minutes of setup. Your first verified, scored leads are typically ready within 24 hours of defining your ideal customer profile.',
  },
  {
    id: 2,
    q: 'Do I need any existing tools or accounts to get started?',
    a: 'LeadForge handles the full stack — lead finding, email writing, sending, and meeting booking. We\'ll walk you through connecting your sending domain and booking calendar during onboarding.',
  },
  {
    id: 3,
    q: 'How is this different from doing outreach manually?',
    a: 'Manual outreach caps at ~20–30 personalized emails a day. LeadForge runs the full pipeline — finding leads, personalizing emails, sending, following up, and classifying replies — at a scale no SDR team can match, without sacrificing personalization quality.',
  },
  {
    id: 4,
    q: 'Can I review emails before they\'re sent?',
    a: 'Always. You set the quality score threshold. Emails above it auto-queue. Below it, they land in your review inbox where you can approve, edit, or reject each one before it goes out.',
  },
  {
    id: 5,
    q: 'What types of businesses does LeadForge work best for?',
    a: 'Any B2B business that sells to identifiable companies — SaaS, agencies, professional services, consulting, staffing, and more. If you can describe who your ideal client is, LeadForge can find and reach them.',
  },
  {
    id: 6,
    q: 'Is there a free trial?',
    a: 'We offer a 14-day pilot with a real campaign — you\'ll see actual results with your own ICP before committing. Book a call and we\'ll set up your pilot environment within 24 hours.',
  },
]

export default function FAQSection() {
  // Set — each item toggles independently, multiple can be open
  const [openIds, setOpenIds] = useState(new Set())
  const sectionRef = useRef(null)

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
          }
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
          {/* Left: contact card */}
          <div className="faq__contact-card reveal" id="contact">
            <p className="faq__card-title">Ready to fill your pipeline?</p>
            <p className="faq__card-sub">Book a 30-min call and we'll set up your first campaign live.</p>
            <StarButton as="a" href="https://cal.com" target="_blank" rel="noopener noreferrer" className="faq__card-btn">
              Book a Call
            </StarButton>
          </div>

          {/* Right: FAQ accordion */}
          <div className="faq__accordion-area">
            <h2 className="faq__heading display-heading reveal">
              Frequently Asked<br />Questions
            </h2>

            <div className="faq__list">
              {faqs.map((item, i) => {
                const isOpen = openIds.has(item.id)
                return (
                  <div
                    key={item.id}
                    className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}
                  >
                    <button
                      className="faq__question"
                      onClick={() => toggle(item.id)}
                      aria-expanded={isOpen}
                    >
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

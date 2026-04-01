import { useState, useEffect, useRef } from 'react'
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

const features = [
  {
    id: 1, num: '01', name: 'Lead Discovery & Scoring',
    desc: 'Define your ICP once. LeadForge finds and aggregates leads from multiple sources, removes duplicates, verifies every email, and scores each lead against your ideal customer profile — so you only work with prospects worth reaching.',
  },
  {
    id: 2, num: '02', name: 'AI Email Personalization',
    desc: 'A 5-stage AI pipeline detects the strongest outreach signal for each lead — funding, hiring, product launch, recent activity — translates your value proposition into their niche vocabulary, and writes a fully personalized email. Every one.',
  },
  {
    id: 3, num: '03', name: 'Review Queue',
    desc: 'Set your quality score threshold. Emails above it go straight to the send queue automatically. Below it, they land in your review inbox where you can approve, reject, or edit each one manually. You stay in full control.',
  },
  {
    id: 4, num: '04', name: 'Sending & Follow-ups',
    desc: 'Approved emails are sent with 3 A/B subject line variants distributed across leads. Follow-up sequences (step 2 at +4 days, step 3 at +10 days) are auto-generated and pushed automatically — no manual setup needed.',
  },
  {
    id: 5, num: '05', name: 'Smart Reply Inbox',
    desc: 'Every incoming reply is automatically classified by AI as Interested, Not Now, Referral, Out of Office, or Unsubscribe. Your inbox shows you exactly who to call next without reading through every thread yourself.',
  },
  {
    id: 6, num: '06', name: 'Meeting Attribution',
    desc: 'Your booking link is embedded in every CTA. When a meeting is booked, it\'s automatically tracked back to the campaign, email variant, and specific lead that generated it — full attribution from first email to closed deal.',
  },
  {
    id: 7, num: '07', name: 'Campaign Analytics',
    desc: 'Live sending stats, A/B subject variant performance, AI pipeline metrics, a 7-day performance chart, usage dashboard with estimated AI cost per campaign, and domain health scores — all in one place.',
  },
]

export default function ServicesSection() {
  // Set — each item toggles independently, clicking open item keeps it open
  const [openIds, setOpenIds] = useState(new Set([3]))
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
    <section className="services section-pad" id="features" ref={sectionRef}>
      <div className="container">
        <h2 className="services__heading display-heading reveal">Features</h2>
        <div className="services__list">
          {features.map((f, i) => {
            const isOpen = openIds.has(f.id)
            return (
              <div key={f.id} className={`service ${isOpen ? 'service--open' : ''}`}>
                <button className="service__row" onClick={() => toggle(f.id)} aria-expanded={isOpen}>
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

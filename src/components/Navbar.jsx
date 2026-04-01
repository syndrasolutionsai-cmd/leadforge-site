import { useState, useEffect } from 'react'
import { StarButton } from './StarButton'
import './Navbar.css'

const openCalendar = () => {
  window.open('https://cal.com/gabriel-syndra-gp6orz/15min', '_blank')
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        {/* Logo — no bolt, all white */}
        <a href="/" className="navbar__logo">
          <span className="navbar__logo-text">LEADFORGE</span>
        </a>

        {/* Nav links */}
        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          <a href="#how-it-works" className="navbar__link">How It Works</a>
          <a href="#features" className="navbar__link">Features</a>
          <a href="#integrations" className="navbar__link">Integrations</a>
          <a href="#faq" className="navbar__link">FAQ</a>
<a href="#contact" className="navbar__link">Contact</a>
        </nav>

        {/* CTA */}
        <div className="navbar__cta">
          <StarButton onClick={openCalendar} className="navbar__cta-btn">
            Book a Call
          </StarButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

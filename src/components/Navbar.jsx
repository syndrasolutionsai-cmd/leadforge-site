import { useState, useEffect } from 'react'
import { StarButton } from './StarButton'
import { useLanguage } from '../context/LangContext'
import './Navbar.css'

const openCalendar = () => {
  window.open('https://cal.com/gabriel-syndra-gp6orz/15min', '_blank')
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="/" className="navbar__logo">
          <span className="navbar__logo-text">LEADFORGE</span>
        </a>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          <a href="#how-it-works" className="navbar__link">{t.nav.howItWorks}</a>
          <a href="#features"     className="navbar__link">{t.nav.features}</a>
          <a href="#integrations" className="navbar__link">{t.nav.integrations}</a>
          <a href="#faq"          className="navbar__link">{t.nav.faq}</a>
          <a href="#contact"      className="navbar__link">{t.nav.contact}</a>
          <button
            className="lang-toggle"
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            aria-label="Toggle language"
          >
            <span className={lang === 'en' ? 'lang-toggle__opt lang-toggle__opt--active' : 'lang-toggle__opt'}>EN</span>
            <span className="lang-toggle__divider">/</span>
            <span className={lang === 'es' ? 'lang-toggle__opt lang-toggle__opt--active' : 'lang-toggle__opt'}>ES</span>
          </button>
        </nav>

        <div className="navbar__cta">
          <StarButton onClick={openCalendar} className="navbar__cta-btn">
            {t.nav.bookCall}
          </StarButton>
        </div>

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}

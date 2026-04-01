import { Globe, Share2, MessageCircle, Link2, Send, Rss } from 'lucide-react'
import { useLanguage } from '../context/LangContext'
import './Footer.css'

const socialLinks = [
  { icon: Share2,        label: 'LinkedIn',  href: '#' },
  { icon: MessageCircle, label: 'Twitter/X', href: '#' },
  { icon: Link2,         label: 'Community', href: '#' },
  { icon: Globe,         label: 'Website',   href: '#' },
  { icon: Send,          label: 'Email',     href: 'mailto:hello@leadforge.io' },
  { icon: Rss,           label: 'Blog RSS',  href: '#' },
]

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="footer">
      <div className="footer__inner">
        <a href="/" className="footer__logo" aria-label="LeadForge home">
          LEADFORGE
        </a>

        <nav className="footer__nav" aria-label="Footer navigation">
          {t.footer.links.map((link) => (
            <a key={link.title} href={link.href} className="footer__nav-link">
              {link.title}
            </a>
          ))}
        </nav>

        <div className="footer__social">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="footer__social-link"
            >
              <Icon size={20} strokeWidth={1.5} />
            </a>
          ))}
        </div>

        <p className="footer__copy">
          © {new Date().getFullYear()} LeadForge. {t.footer.copy}
        </p>
      </div>
    </footer>
  )
}

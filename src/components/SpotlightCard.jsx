import { useEffect, useRef } from 'react'

/**
 * GlowCard — spotlight / glow-border card.
 * Adapted from the shadcn/Tailwind/TS original to plain React + CSS.
 * The [data-glow] pseudo-element styles live in index.css.
 */

const glowColorMap = {
  blue:   { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green:  { base: 120, spread: 200 },
  red:    { base: 0,   spread: 200 },
  orange: { base: 30,  spread: 200 },
}

export function GlowCard({
  children,
  glowColor = 'orange',
  style = {},
  className = '',
  ...props
}) {
  const cardRef = useRef(null)

  useEffect(() => {
    const syncPointer = ({ clientX: x, clientY: y }) => {
      const el = cardRef.current
      if (!el) return
      el.style.setProperty('--x',  x.toFixed(2))
      el.style.setProperty('--xp', (x / window.innerWidth).toFixed(2))
      el.style.setProperty('--y',  y.toFixed(2))
      el.style.setProperty('--yp', (y / window.innerHeight).toFixed(2))
    }
    document.addEventListener('pointermove', syncPointer)
    return () => document.removeEventListener('pointermove', syncPointer)
  }, [])

  const { base, spread } = glowColorMap[glowColor]

  const cardStyle = {
    // CSS custom properties read by [data-glow] pseudo-elements in index.css
    '--base':    base,
    '--spread':  spread,
    '--radius':  '14',
    '--border':  '2',
    '--backdrop': 'hsl(0 0% 8% / 0.55)',
    '--backup-border': 'rgba(255,255,255,0.08)',
    '--size':    '220',
    '--outer':   '1',
    '--border-size':    'calc(var(--border, 2) * 1px)',
    '--spotlight-size': 'calc(var(--size, 150) * 1px)',
    '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',

    // Background spotlight
    backgroundImage: [
      'radial-gradient(',
      '  var(--spotlight-size) var(--spotlight-size) at',
      '  calc(var(--x, 0) * 1px)',
      '  calc(var(--y, 0) * 1px),',
      '  hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / 0.07),',
      '  transparent',
      ')',
    ].join(''),
    backgroundColor: 'var(--backdrop)',
    backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
    backgroundPosition: '50% 50%',
    backgroundAttachment: 'fixed',
    border: 'var(--border-size) solid var(--backup-border)',

    // Layout
    position: 'relative',
    touchAction: 'none',
    borderRadius: 'calc(var(--radius) * 1px)',
    boxShadow: '0 1rem 2rem -1rem rgba(0,0,0,0.8)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',

    ...style,
  }

  return (
    <div
      ref={cardRef}
      data-glow
      style={cardStyle}
      className={className}
      {...props}
    >
      {/* Inner glow bloom — required by the [data-glow] > [data-glow] CSS rule */}
      <div data-glow style={{ pointerEvents: 'none' }} />
      {children}
    </div>
  )
}

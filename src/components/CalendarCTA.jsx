import { useMemo } from 'react'
import { useLanguage } from '../context/LangContext'
import './CalendarCTA.css'

const AVAILABLE_SLOTS = new Set([3, 7, 10, 14, 17, 21, 24, 28])

function CalendarDay({ day, isHeader, available, isToday }) {
  if (isHeader) {
    return (
      <div className="cal-day cal-day--header">
        <span>{day}</span>
      </div>
    )
  }
  return (
    <div className={['cal-day', available ? 'cal-day--available' : '', isToday ? 'cal-day--today' : ''].join(' ')}>
      <span>{day}</span>
    </div>
  )
}

export function CalendarCTA({ bookingLink = 'https://cal.com/gabriel-syndra-gp6orz/15min' }) {
  const { t, lang } = useLanguage()
  const { monthLabel, year, firstDayOfWeek, daysInMonth, todayDate } = useMemo(() => {
    const d = new Date()
    const locale = lang === 'es' ? 'es-ES' : 'en-US'
    return {
      monthLabel:     d.toLocaleString(locale, { month: 'long' }),
      year:           d.getFullYear(),
      firstDayOfWeek: new Date(d.getFullYear(), d.getMonth(), 1).getDay(),
      daysInMonth:    new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(),
      todayDate:      d.getDate(),
    }
  }, [lang])

  const dayNames = t.calendarCta.dayNames

  return (
    <div className="cal-cta">
      <div className="cal-cta__copy">
        <h2 className="cal-cta__heading">{t.calendarCta.heading}</h2>
        <p className="cal-cta__sub">{t.calendarCta.sub}</p>
        <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill--white cal-cta__btn">
          {t.calendarCta.cta}
        </a>
      </div>

      <div className="cal-cta__widget">
        <div className="cal-cta__widget-inner">
          <div className="cal-cta__month-row">
            <span className="cal-cta__month-label" style={{ textTransform: 'capitalize' }}>
              {monthLabel}, {year}
            </span>
            <span className="cal-cta__duration">{t.calendarCta.duration}</span>
          </div>

          <div className="cal-cta__grid">
            {dayNames.map((d) => (
              <CalendarDay key={`h-${d}`} day={d} isHeader />
            ))}
            {Array(firstDayOfWeek).fill(null).map((_, i) => (
              <div key={`e-${i}`} className="cal-day cal-day--empty" />
            ))}
            {Array(daysInMonth).fill(null).map((_, i) => {
              const dayNum = i + 1
              return (
                <CalendarDay
                  key={`d-${dayNum}`}
                  day={dayNum}
                  available={AVAILABLE_SLOTS.has(dayNum)}
                  isToday={dayNum === todayDate}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

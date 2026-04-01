import { useMemo } from 'react'
import './CalendarCTA.css'

const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

// Stable "available slots" — seeded by day number, never random on render
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
    <div
      className={[
        'cal-day',
        available ? 'cal-day--available' : '',
        isToday    ? 'cal-day--today'     : '',
      ].join(' ')}
    >
      <span>{day}</span>
    </div>
  )
}

export function CalendarCTA({ bookingLink = 'https://cal.com' }) {
  const { monthLabel, year, firstDayOfWeek, daysInMonth, todayDate } = useMemo(() => {
    const d = new Date()
    return {
      monthLabel:    d.toLocaleString('default', { month: 'long' }),
      year:          d.getFullYear(),
      firstDayOfWeek: new Date(d.getFullYear(), d.getMonth(), 1).getDay(),
      daysInMonth:   new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(),
      todayDate:     d.getDate(),
    }
  }, [])

  return (
    <div className="cal-cta">
      {/* Top: copy + CTA */}
      <div className="cal-cta__copy">
        <h2 className="cal-cta__heading">Ready to fill your pipeline?</h2>
        <p className="cal-cta__sub">
          Book a 30-min call and we'll set up your first campaign live.
        </p>
        <a
          href={bookingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill btn-pill--white cal-cta__btn"
        >
          Book Now
        </a>
      </div>

      {/* Bottom: calendar widget */}
      <div className="cal-cta__widget">
        <div className="cal-cta__widget-inner">
          {/* Month header */}
          <div className="cal-cta__month-row">
            <span className="cal-cta__month-label">
              {monthLabel}, {year}
            </span>
            <span className="cal-cta__duration">30 min</span>
          </div>

          {/* Day grid */}
          <div className="cal-cta__grid">
            {/* Column headers */}
            {DAY_NAMES.map((d) => (
              <CalendarDay key={`h-${d}`} day={d} isHeader />
            ))}

            {/* Leading empty cells */}
            {Array(firstDayOfWeek)
              .fill(null)
              .map((_, i) => (
                <div key={`e-${i}`} className="cal-day cal-day--empty" />
              ))}

            {/* Date cells */}
            {Array(daysInMonth)
              .fill(null)
              .map((_, i) => {
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

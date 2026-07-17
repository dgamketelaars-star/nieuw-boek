import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { getAllPages } from '../services/storage'
import { formatDateLabel } from '../utils/dateUtils'

export function PageHistory() {
  const pages = useMemo(() => {
    const store = getAllPages()
    return Object.values(store).sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [])

  if (pages.length === 0) {
    return (
      <div className="page-history">
        <h1>Bladzijden</h1>
        <p className="empty-state">Nog geen eerdere bladzijden.</p>
      </div>
    )
  }

  return (
    <div className="page-history">
      <h1>Bladzijden</h1>
      <ul className="history-list">
        {pages.map((page) => {
          const firstLine = page.blankPage.trim().split('\n')[0] || 'Nog leeg'
          const denkbochtCount = Object.values(page.denkbochtAnswers).filter(
            (v) => v && v.trim().length > 0,
          ).length

          return (
            <li key={page.date} className="history-item">
              <Link to={`/dag/${page.date}`} className="history-link">
                <span className="history-date">{formatDateLabel(page.date)}</span>
                <span className="history-preview">{firstLine}</span>
                <span className="history-icons">
                  {page.gratitude.trim() && <span title="Dankbaarheid">❤️</span>}
                  {page.balcony.trim() && <span title="Balkon">🚮</span>}
                  {denkbochtCount > 0 && <span title="Denkbocht beantwoord">🌀</span>}
                  {page.selectedCards.stuurkaart && <span title="Stuurkaart">🎲</span>}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

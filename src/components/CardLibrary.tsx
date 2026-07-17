import { useState } from 'react'
import { denkbochten } from '../data/denkbochten'
import { gekkeOpdrachten } from '../data/gekkeOpdrachten'
import { stuurkaarten } from '../data/stuurkaarten'

type Category = 'denkbochten' | 'gekkeOpdrachten' | 'stuurkaarten'

const categories: { id: Category; label: string; icon: string }[] = [
  { id: 'denkbochten', label: 'Denkbochten', icon: '🌀' },
  { id: 'gekkeOpdrachten', label: 'Gekke opdrachten', icon: '🎈' },
  { id: 'stuurkaarten', label: 'Stuurkaarten', icon: '🎲' },
]

export function CardLibrary() {
  const [active, setActive] = useState<Category>('denkbochten')

  return (
    <div className="card-library">
      <h1>Kaartendoos</h1>
      <div className="category-tabs">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`category-tab ${active === c.id ? 'active' : ''}`}
            onClick={() => setActive(c.id)}
          >
            <span aria-hidden="true">{c.icon}</span> {c.label}
          </button>
        ))}
      </div>

      {active === 'denkbochten' && (
        <ul className="library-list">
          {denkbochten.map((d) => (
            <li key={d.id} className="library-item">
              {d.question}
            </li>
          ))}
        </ul>
      )}

      {active === 'gekkeOpdrachten' && (
        <ul className="library-list">
          {gekkeOpdrachten.map((o) => (
            <li key={o.id} className="library-item">
              {o.text}
            </li>
          ))}
        </ul>
      )}

      {active === 'stuurkaarten' && (
        <ul className="library-list">
          {stuurkaarten.map((s) => (
            <li key={s.id} className="library-item library-item-multiline">
              {s.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

import { gekkeOpdrachten } from '../data/gekkeOpdrachten'

interface Props {
  gekkeOpdrachtId: string | undefined
  onSwap: () => void
}

export function SillyAssignmentCard({ gekkeOpdrachtId, onSwap }: Props) {
  const opdracht = gekkeOpdrachten.find((o) => o.id === gekkeOpdrachtId)
  if (!opdracht) return null

  return (
    <section className="card">
      <div className="card-header-row">
        <p className="card-question">
          <span className="card-icon" aria-hidden="true">
            🎈
          </span>
          {opdracht.text}
        </p>
        <button type="button" className="swap-button" onClick={onSwap}>
          Andere kaart
        </button>
      </div>
    </section>
  )
}

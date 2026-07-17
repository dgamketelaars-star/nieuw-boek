import { DAANS } from '../types'
import type { SteerableDaanName } from '../types'
import { Timer } from './Timer'

interface Props {
  daan: SteerableDaanName
  durationMinutes: number
  onSwap: () => void
}

export function SteeringCard({ daan, durationMinutes, onSwap }: Props) {
  const label = DAANS.find((d) => d.id === daan)?.label ?? daan

  return (
    <section className="card">
      <div className="card-header-row">
        <p className="card-question">
          <span className="card-icon" aria-hidden="true">
            🎲
          </span>
          Vandaag krijgt {label} tien minuten volledig het stuur.
          <br />
          Tijd begint nu.
        </p>
        <button type="button" className="swap-button" onClick={onSwap}>
          Andere kaart
        </button>
      </div>
      <Timer durationMinutes={durationMinutes} />
    </section>
  )
}

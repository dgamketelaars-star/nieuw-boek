import { denkbochten } from '../data/denkbochten'
import { DAANS, type DaanName } from '../types'
import { DaanAnswerField } from './DaanAnswerField'

interface Props {
  denkbochtId: string | undefined
  answers: Partial<Record<DaanName, string>>
  onAnswerChange: (daan: DaanName, value: string) => void
  onSwap: () => void
}

export function DenkbochtCard({ denkbochtId, answers, onAnswerChange, onSwap }: Props) {
  const denkbocht = denkbochten.find((d) => d.id === denkbochtId)
  if (!denkbocht) return null

  return (
    <section className="card">
      <div className="card-header-row">
        <p className="card-question">
          <span className="card-icon" aria-hidden="true">
            🌀
          </span>
          {denkbocht.question}
        </p>
        <button type="button" className="swap-button" onClick={onSwap}>
          Andere kaart
        </button>
      </div>
      <div className="daan-fields">
        {DAANS.map((daan) => (
          <DaanAnswerField
            key={daan.id}
            label={daan.label}
            value={answers[daan.id] ?? ''}
            onChange={(value) => onAnswerChange(daan.id, value)}
          />
        ))}
      </div>
    </section>
  )
}

import { SavedIndicator } from './SavedIndicator'

interface Props {
  icon: string
  question: string
  value: string
  saved: boolean
  onChange: (value: string) => void
}

export function FixedPromptCard({ icon, question, value, saved, onChange }: Props) {
  return (
    <section className="card">
      <p className="card-question">
        <span className="card-icon" aria-hidden="true">
          {icon}
        </span>
        {question}
      </p>
      <textarea
        className="card-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder="Schrijf hier..."
      />
      <SavedIndicator saved={saved} />
    </section>
  )
}

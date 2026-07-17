import { useState } from 'react'

interface Props {
  label: string
  value: string
  onChange: (value: string) => void
}

export function DaanAnswerField({ label, value, onChange }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="daan-field">
      <button
        type="button"
        className="daan-field-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{label}</span>
        <span className="daan-field-caret">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <textarea
          className="card-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder="Schrijf hier..."
        />
      )}
    </div>
  )
}

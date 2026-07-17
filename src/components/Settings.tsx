import { useRef, useState } from 'react'
import { clearAllData, exportData, importData } from '../services/storage'
import { useTheme, type ThemePreference } from '../hooks/useTheme'

const themeOptions: { id: ThemePreference; label: string }[] = [
  { id: 'system', label: 'Systeem' },
  { id: 'light', label: 'Licht' },
  { id: 'dark', label: 'Donker' },
]

export function Settings() {
  const { theme, setTheme } = useTheme()
  const [message, setMessage] = useState<string | null>(null)
  const [confirmingClear, setConfirmingClear] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `nieuw-boek-export-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
    setMessage('Export gedownload.')
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        const result = importData(parsed)
        setMessage(result.message)
      } catch {
        setMessage('Dit bestand kon niet worden gelezen als geldige JSON.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleClear = () => {
    if (!confirmingClear) {
      setConfirmingClear(true)
      return
    }
    clearAllData()
    setConfirmingClear(false)
    setMessage('Alle lokale data is verwijderd.')
  }

  return (
    <div className="settings">
      <h1>Instellingen</h1>

      <section className="settings-section">
        <h2>Thema</h2>
        <div className="theme-options">
          {themeOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`theme-option ${theme === option.id ? 'active' : ''}`}
              onClick={() => setTheme(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section className="settings-section">
        <h2>Data</h2>
        <div className="settings-actions">
          <button type="button" onClick={handleExport}>
            Exporteren als JSON
          </button>
          <button type="button" onClick={handleImportClick}>
            Importeren uit JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden-file-input"
            onChange={handleFileSelected}
          />
          <button type="button" className="danger-button" onClick={handleClear}>
            {confirmingClear ? 'Zeker weten? Klik nogmaals' : 'Alle lokale data verwijderen'}
          </button>
        </div>
      </section>

      {message && <p className="settings-message">{message}</p>}
    </div>
  )
}

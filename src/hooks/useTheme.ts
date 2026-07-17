import { useEffect, useState } from 'react'

export type ThemePreference = 'light' | 'dark' | 'system'

const THEME_KEY = 'nieuw-boek:theme'

function readStoredTheme(): ThemePreference {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemePreference>(readStoredTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', theme)
    }
  }, [theme])

  const setTheme = (next: ThemePreference) => {
    localStorage.setItem(THEME_KEY, next)
    setThemeState(next)
  }

  return { theme, setTheme }
}

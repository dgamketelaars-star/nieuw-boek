import type { DailyPage, DailyPagesStore, ExportedData } from '../types'

const STORAGE_KEY = 'nieuw-boek:pages'

function readStore(): DailyPagesStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return {}
    return parsed as DailyPagesStore
  } catch {
    return {}
  }
}

function writeStore(store: DailyPagesStore): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function getAllPages(): DailyPagesStore {
  return readStore()
}

export function getPage(dateKey: string): DailyPage | undefined {
  return readStore()[dateKey]
}

export function savePage(page: DailyPage): void {
  const store = readStore()
  store[page.date] = { ...page, updatedAt: new Date().toISOString() }
  writeStore(store)
}

export function createEmptyPage(dateKey: string): DailyPage {
  const now = new Date().toISOString()
  return {
    date: dateKey,
    blankPage: '',
    gratitude: '',
    balcony: '',
    selectedCards: {},
    denkbochtAnswers: {},
    createdAt: now,
    updatedAt: now,
  }
}

export function exportData(): ExportedData {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    pages: readStore(),
  }
}

export interface ImportResult {
  success: boolean
  message: string
  importedCount?: number
}

// Voegt geïmporteerde dagen toe zonder bestaande dagen stil te overschrijven.
// Bij een datum die al bestaat, wint de nieuwste (op basis van updatedAt).
export function importData(raw: unknown): ImportResult {
  if (typeof raw !== 'object' || raw === null) {
    return { success: false, message: 'Het bestand bevat geen geldige gegevens.' }
  }

  const data = raw as Partial<ExportedData>

  if (data.version !== 1 || typeof data.pages !== 'object' || data.pages === null) {
    return {
      success: false,
      message: 'Dit bestand heeft niet het verwachte formaat van een Nieuw Boek-export.',
    }
  }

  const incoming = data.pages as DailyPagesStore
  const current = readStore()
  let importedCount = 0

  for (const [dateKey, incomingPage] of Object.entries(incoming)) {
    if (
      !incomingPage ||
      typeof incomingPage.date !== 'string' ||
      typeof incomingPage.updatedAt !== 'string'
    ) {
      continue
    }

    const existing = current[dateKey]
    if (!existing || new Date(incomingPage.updatedAt) > new Date(existing.updatedAt)) {
      current[dateKey] = incomingPage
      importedCount += 1
    }
  }

  writeStore(current)
  return {
    success: true,
    message: `${importedCount} dag(en) geïmporteerd.`,
    importedCount,
  }
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY)
}

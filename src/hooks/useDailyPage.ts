import { useEffect, useRef, useState } from 'react'
import type { DaanName, DailyPage } from '../types'
import { createEmptyPage, getPage, savePage } from '../services/storage'
import { selectDailyCards, replaceCard, replaceStuurkaart } from '../utils/dailyCardSelection'

const AUTOSAVE_DELAY_MS = 500

function loadOrBuildPage(dateKey: string): DailyPage {
  const existing = getPage(dateKey)
  if (existing) return existing

  // Kaartselectie is deterministisch op basis van de datum, dus een
  // ongewijzigde dag hoeft pas opgeslagen te worden zodra de gebruiker
  // echt iets invult. Zo blijft een dag die alleen bekeken is niet in de
  // weg staan bij een latere import van diezelfde datum.
  const fresh = createEmptyPage(dateKey)
  fresh.selectedCards = selectDailyCards(dateKey)
  return fresh
}

export function useDailyPage(dateKey: string) {
  const [page, setPage] = useState<DailyPage>(() => loadOrBuildPage(dateKey))
  const [saved, setSaved] = useState(true)
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setPage(loadOrBuildPage(dateKey))
    setSaved(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateKey])

  const persist = (next: DailyPage) => {
    setPage(next)
    setSaved(false)
    if (saveTimeout.current) clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(() => {
      savePage(next)
      setSaved(true)
    }, AUTOSAVE_DELAY_MS)
  }

  const updateField = (field: 'blankPage' | 'gratitude' | 'balcony', value: string) => {
    persist({ ...page, [field]: value })
  }

  const updateDenkbochtAnswer = (daan: DaanName, value: string) => {
    persist({
      ...page,
      denkbochtAnswers: { ...page.denkbochtAnswers, [daan]: value },
    })
  }

  const swapDenkbocht = () => {
    const nextId = replaceCard('denkbocht', page.selectedCards.denkbochtId)
    persist({
      ...page,
      selectedCards: { ...page.selectedCards, denkbochtId: nextId },
      denkbochtAnswers: {},
    })
  }

  const swapGekkeOpdracht = () => {
    const nextId = replaceCard('gekkeOpdracht', page.selectedCards.gekkeOpdrachtId)
    persist({
      ...page,
      selectedCards: { ...page.selectedCards, gekkeOpdrachtId: nextId },
    })
  }

  const swapStuurkaart = () => {
    const nextStuurkaart = replaceStuurkaart(page.selectedCards.stuurkaart?.daan)
    persist({
      ...page,
      selectedCards: { ...page.selectedCards, stuurkaart: nextStuurkaart },
    })
  }

  return {
    page,
    saved,
    updateField,
    updateDenkbochtAnswer,
    swapDenkbocht,
    swapGekkeOpdracht,
    swapStuurkaart,
  }
}

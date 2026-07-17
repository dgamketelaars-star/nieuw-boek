import { denkbochten } from '../data/denkbochten'
import { gekkeOpdrachten } from '../data/gekkeOpdrachten'
import { STUURKAART_DURATION_MINUTES } from '../data/stuurkaarten'
import { STEERABLE_DAANS } from '../types'
import type { SelectedCards } from '../types'
import { createSeededRandom, pickRandom } from './seededRandom'

const STUURKAART_CHANCE = 0.5

// Kiest de kaarten voor een dag op basis van de datum, zodat de selectie
// stabiel blijft bij herladen. Wordt alleen aangeroepen als er nog geen
// selectie voor deze datum is opgeslagen.
export function selectDailyCards(dateKey: string): SelectedCards {
  const random = createSeededRandom(dateKey)

  const denkbocht = pickRandom(denkbochten, random)
  const gekkeOpdracht = pickRandom(gekkeOpdrachten, random)
  const includeStuurkaart = random() < STUURKAART_CHANCE

  const selection: SelectedCards = {
    denkbochtId: denkbocht.id,
    gekkeOpdrachtId: gekkeOpdracht.id,
  }

  if (includeStuurkaart) {
    const daan = pickRandom(STEERABLE_DAANS, random)
    selection.stuurkaart = {
      daan: daan.id,
      durationMinutes: STUURKAART_DURATION_MINUTES,
    }
  }

  return selection
}

// Vervangt één kaart bewust met een nieuwe, willekeurige andere kaart
// (nooit dezelfde als de huidige), zonder de rest van de selectie te raken.
export function replaceCard(
  kind: 'denkbocht' | 'gekkeOpdracht',
  currentId: string | undefined,
): string {
  const pool = kind === 'denkbocht' ? denkbochten : gekkeOpdrachten
  const others = pool.filter((item) => item.id !== currentId)
  const source = others.length > 0 ? others : pool
  const random = createSeededRandom(`${Date.now()}-${Math.random()}`)
  return pickRandom(source, random).id
}

export function replaceStuurkaart(
  currentDaan: string | undefined,
): SelectedCards['stuurkaart'] {
  const others = STEERABLE_DAANS.filter((d) => d.id !== currentDaan)
  const source = others.length > 0 ? others : STEERABLE_DAANS
  const random = createSeededRandom(`${Date.now()}-${Math.random()}`)
  const daan = pickRandom(source, random)
  return { daan: daan.id, durationMinutes: STUURKAART_DURATION_MINUTES }
}

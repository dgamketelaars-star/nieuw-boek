import { STEERABLE_DAANS } from '../types'

export const STUURKAART_DURATION_MINUTES = 10

export function stuurkaartText(label: string): string {
  return `Vandaag krijgt ${label} tien minuten volledig het stuur.\nTijd begint nu.`
}

// Voor de Kaartendoos: één voorbeeldkaart per Daan die gekozen kan worden.
export const stuurkaarten = STEERABLE_DAANS.map((daan) => ({
  id: `sk-${daan.id}`,
  daan: daan.id,
  label: daan.label,
  text: stuurkaartText(daan.label),
}))

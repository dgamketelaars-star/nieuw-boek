export type DaanName =
  | 'danielle'
  | 'business'
  | 'party'
  | 'zen'
  | 'warrior'
  | 'mama'
  | 'zeik'
  | 'elleke'

export type SteerableDaanName = Exclude<DaanName, 'danielle'>

export interface DaanInfo<T extends DaanName = DaanName> {
  id: T
  label: string
}

export const DAANS: DaanInfo[] = [
  { id: 'danielle', label: 'Danielle' },
  { id: 'business', label: 'Business Daan' },
  { id: 'party', label: 'Party Daan' },
  { id: 'zen', label: 'Zen Daan' },
  { id: 'warrior', label: 'Warrior Daan' },
  { id: 'mama', label: 'Mama Daan' },
  { id: 'zeik', label: 'Zeik Daan' },
  { id: 'elleke', label: 'Elleke' },
]

export const STEERABLE_DAANS: DaanInfo<SteerableDaanName>[] = DAANS.filter(
  (d): d is DaanInfo<SteerableDaanName> => d.id !== 'danielle',
)

export interface Denkbocht {
  id: string
  question: string
}

export interface GekkeOpdracht {
  id: string
  text: string
}

export interface SelectedCards {
  denkbochtId?: string
  gekkeOpdrachtId?: string
  stuurkaart?: {
    daan: SteerableDaanName
    durationMinutes: number
  }
}

export interface DailyPage {
  date: string // YYYY-MM-DD
  blankPage: string
  gratitude: string
  balcony: string
  selectedCards: SelectedCards
  denkbochtAnswers: Partial<Record<DaanName, string>>
  createdAt: string
  updatedAt: string
}

export type DailyPagesStore = Record<string, DailyPage>

export interface ExportedData {
  version: 1
  exportedAt: string
  pages: DailyPagesStore
}

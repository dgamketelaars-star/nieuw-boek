interface Props {
  saved: boolean
}

export function SavedIndicator({ saved }: Props) {
  return <span className="saved-indicator">{saved ? 'Opgeslagen' : ' '}</span>
}

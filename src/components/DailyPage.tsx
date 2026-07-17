import { useDailyPage } from '../hooks/useDailyPage'
import { formatDateLabel } from '../utils/dateUtils'
import { FixedPromptCard } from './FixedPromptCard'
import { DenkbochtCard } from './DenkbochtCard'
import { SillyAssignmentCard } from './SillyAssignmentCard'
import { SteeringCard } from './SteeringCard'

interface Props {
  dateKey: string
}

export function DailyPage({ dateKey }: Props) {
  const {
    page,
    saved,
    updateField,
    updateDenkbochtAnswer,
    swapDenkbocht,
    swapGekkeOpdracht,
    swapStuurkaart,
  } = useDailyPage(dateKey)

  return (
    <div className="daily-page">
      <h1 className="page-date">{formatDateLabel(dateKey)}</h1>

      <FixedPromptCard
        icon="🌱"
        question="Als het vorige boek vandaag irrelevant was, wat zou ik nu willen doen?"
        value={page.blankPage}
        saved={saved}
        onChange={(value) => updateField('blankPage', value)}
      />

      <FixedPromptCard
        icon="❤️"
        question="Waar ben ik vandaag dankbaar voor?"
        value={page.gratitude}
        saved={saved}
        onChange={(value) => updateField('gratitude', value)}
      />

      <FixedPromptCard
        icon="🚮"
        question="Welke oude regel heb ik vandaag over het balkon gegooid?"
        value={page.balcony}
        saved={saved}
        onChange={(value) => updateField('balcony', value)}
      />

      <DenkbochtCard
        denkbochtId={page.selectedCards.denkbochtId}
        answers={page.denkbochtAnswers}
        onAnswerChange={updateDenkbochtAnswer}
        onSwap={swapDenkbocht}
      />

      <SillyAssignmentCard
        gekkeOpdrachtId={page.selectedCards.gekkeOpdrachtId}
        onSwap={swapGekkeOpdracht}
      />

      {page.selectedCards.stuurkaart && (
        <SteeringCard
          daan={page.selectedCards.stuurkaart.daan}
          durationMinutes={page.selectedCards.stuurkaart.durationMinutes}
          onSwap={swapStuurkaart}
        />
      )}
    </div>
  )
}

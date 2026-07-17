import { HashRouter, Routes, Route, useParams } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { DailyPage } from './components/DailyPage'
import { PageHistory } from './components/PageHistory'
import { CardLibrary } from './components/CardLibrary'
import { Settings } from './components/Settings'
import { todayKey } from './utils/dateUtils'

function TodayRoute() {
  return <DailyPage dateKey={todayKey()} />
}

function DayRoute() {
  const { date } = useParams<{ date: string }>()
  return <DailyPage dateKey={date ?? todayKey()} />
}

function App() {
  return (
    <HashRouter>
      <div className="app-shell">
        <header className="app-header">
          <span className="app-title">Nieuw Boek</span>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<TodayRoute />} />
            <Route path="/dag/:date" element={<DayRoute />} />
            <Route path="/bladzijden" element={<PageHistory />} />
            <Route path="/kaartendoos" element={<CardLibrary />} />
            <Route path="/instellingen" element={<Settings />} />
          </Routes>
        </main>
        <NavBar />
      </div>
    </HashRouter>
  )
}

export default App

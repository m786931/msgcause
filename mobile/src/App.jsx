import { useState } from 'react'
import VisitorPage from './pages/VisitorPage.jsx'
import GiftPage from './pages/GiftPage.jsx'
import './App.css'

const AppView = {
  VISITOR:      'VISITOR',
  GIFT: 'GIFT',
  VISITOR_STEP3: 'VISITOR_STEP3',
  VISITOR_STEP4: 'VISITOR_STEP4',
}

function App() {
  const [view, setView] = useState(AppView.VISITOR)

  const renderView = () => {
    switch (view) {
      case AppView.VISITOR:
        return <VisitorPage onNavigate={setView} />
      case AppView.GIFT:
        return <GiftPage onNavigate={setView} />
      default:
        return <VisitorPage onNavigate={setView} />
    }
  }

  return (
    <div className="mobile-shell">
      <main className="mobile-main">
        {renderView()}
      </main>
    </div>
  )
}

export default App
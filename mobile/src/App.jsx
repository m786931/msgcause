import { Routes, Route, Navigate } from 'react-router-dom'
import VisitorPage from './pages/VisitorPage.jsx'
import DigitalConnectPage from './pages/DigitalConnect.jsx'
import AddressConnectPage from './pages/AddressConnect.jsx'
import ThankYouPage from './pages/ThankYouPage.jsx'
import MemberPage from './pages/MemberPage.jsx'
import './App.css'

function App() {
  return (
    <div className="mobile-shell">
      <main className="mobile-main">
        <Routes>
          <Route path="/connect/:guid" element={<VisitorPage />} />
          <Route path="/digital-connect" element={<DigitalConnectPage />} />
          <Route path="/member" element={<MemberPage />} />
          <Route path="/address-connect" element={<AddressConnectPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/" element={<Navigate to="/digital-connect" replace />} />
          <Route path="*" element={<Navigate to="/digital-connect" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
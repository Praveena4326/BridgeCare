import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/Layout"
import { LandingPage } from "./pages/LandingPage"
import { ElderDashboard } from "./pages/ElderDashboard"
import { FamilyDashboard } from "./pages/FamilyDashboard"
// import { MemoryUpload } from "./pages/MemoryUpload" // Replaced by MemoryManager
import { AboutPage } from "./pages/AboutPage"
import VoiceChat from "./components/VoiceChat"
import { MemoryManager } from "./pages/family/MemoryManager"
import { CareTeam } from "./pages/family/CareTeam"
import { Settings } from "./pages/family/Settings"
import { ElderView } from "./pages/family/ElderView"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/elder" element={<ElderDashboard />} />
          <Route path="/family" element={<FamilyDashboard />} />
          <Route path="/family/elder" element={<ElderView />} /> {/* New route for sidebar link */}
          <Route path="/family/team" element={<CareTeam />} />
          <Route path="/family/settings" element={<Settings />} />
          <Route path="/memory" element={<MemoryManager />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/voicechat" element={<VoiceChat />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/Layout"
import { LandingPage } from "./pages/LandingPage"
import { ElderDashboard } from "./pages/ElderDashboard"
import { FamilyDashboard } from "./pages/FamilyDashboard"
import { MemoryUpload } from "./pages/MemoryUpload"
import { AboutPage } from "./pages/AboutPage"
import VoiceChat from "./components/VoiceChat"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/elder" element={<ElderDashboard />} />
          <Route path="/family" element={<FamilyDashboard />} />
          <Route path="/memory" element={<MemoryUpload />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/voicechat" element={<VoiceChat />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/home/home-page"
import LoginPage from "./pages/auth/login/login-page"
import RegisterPage from "./pages/auth/register/register-page"
import PrivacyPolicyPage from "./pages/legal/privacy-policy-page"
import TermsOfServicePage from "./pages/legal/terms-of-service-page"
import CookiePolicyPage from "./pages/legal/cookie-policy-page"
import AboutUsPage from "./pages/about-us/about-us-page"
import ServersPage from "./pages/server/servers-page"
import ServerDetailPage from "./pages/server/server-detail-page"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/cookies" element={<CookiePolicyPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/servers" element={<ServersPage />} />
        <Route path="/servers/:id" element={<ServerDetailPage />} />
      </Routes>
    </Router>
  )
}

export default App

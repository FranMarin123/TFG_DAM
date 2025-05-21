import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/home/home-page"
import LoginPage from "./pages/auth/login/login-page"
import RegisterPage from "./pages/auth/register/register-page"
import PrivacyPolicyPage from "./pages/legal/privacy-policy"
import TermsOfServicePage from "./pages/legal/terms-of-service"
import CookiePolicyPage from "./pages/legal/cookie-policy"
import AboutUsPage from "./pages/about-us/about-us"

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
      </Routes>
    </Router>
  )
}

export default App

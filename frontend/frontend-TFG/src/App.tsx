import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/home/home-page"
import LoginPage from "./pages/auth/login/login-page"
import RegisterPage from "./pages/auth/register/register-page"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  )
}

export default App

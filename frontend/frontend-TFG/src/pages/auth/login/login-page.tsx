import { LoginForm } from "../../../components/auth/login-form"
import { Link } from "react-router-dom"
import { Header } from "../../../components/layout/header"
import { Footer } from "../../../components/layout/footer"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-sky-100 to-white p-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-sky-600">Bienvenido</h2>
            <p className="mt-2 text-sm text-gray-500">Inicia sesión en tu cuenta</p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="font-medium text-sky-600 hover:text-sky-500">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

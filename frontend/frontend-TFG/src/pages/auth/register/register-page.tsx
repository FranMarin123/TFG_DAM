import { RegisterForm } from "../../../components/auth/register-form"
import { Link } from "react-router-dom"
import { Header } from "../../../components/layout/header"
import { Footer } from "../../../components/layout/footer"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-sky-100 to-white p-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-sky-600">Crea tu cuenta</h2>
            <p className="mt-2 text-sm text-gray-500">Únete a Servly y comienza a gestionar tus servidores</p>
          </div>

          <RegisterForm />

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="font-medium text-sky-600 hover:text-sky-500">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

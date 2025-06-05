import type React from "react"

import { useState } from "react"
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import { authService, type RegisterRequest } from "../../services/auth.service"

interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }

    if (apiError) {
      setApiError(null)
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsLoading(true)
    setApiError(null)

    try {
      const registerData: RegisterRequest = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }

      console.log("Attempting registration with:", registerData)
      const response = await authService.register(registerData)
      console.log("Registration successful:", response)

      navigate("/")
    } catch (error) {
      console.error("Registration failed:", error)

      let errorMessage = "Error al crear la cuenta. Inténtalo de nuevo."

      if (error instanceof Error) {
        if (error.message.includes("409") || error.message.includes("conflict")) {
          errorMessage = "Este email ya está registrado. Intenta con otro email."
        } else if (error.message.includes("400")) {
          errorMessage = "Datos inválidos. Verifica la información ingresada."
        } else if (error.message.includes("404")) {
          errorMessage = "Servicio no disponible. Inténtalo más tarde."
        } else if (error.message.includes("Failed to fetch")) {
          errorMessage = "No se puede conectar al servidor. Verifica tu conexión."
        } else {
          errorMessage = error.message
        }
      }

      setApiError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {apiError && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{apiError}</div>
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre completo
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiUser className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            className={`appearance-none relative block w-full px-3 py-3 pl-10 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
            placeholder="Nombre completo"
          />
        </div>
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className={`appearance-none relative block w-full px-3 py-3 pl-10 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
            placeholder="Correo electrónico"
          />
        </div>
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            className={`appearance-none relative block w-full px-3 py-3 pl-10 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
            placeholder="Contraseña"
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FiEyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <FiEye className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        <p className="mt-1 text-xs text-gray-500">La contraseña debe tener al menos 8 caracteres</p>
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirmar contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            className={`appearance-none relative block w-full px-3 py-3 pl-10 border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
            placeholder="Confirmar contraseña"
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <FiEyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <FiEye className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleChange}
            disabled={isLoading}
            className={`h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded disabled:cursor-not-allowed ${
              errors.acceptTerms ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="acceptTerms" className="font-medium text-gray-700">
            Acepto los{" "}
            <Link to="/terms" className="text-sky-600 hover:text-sky-500">
              términos y condiciones
            </Link>{" "}
            y la{" "}
            <Link to="/privacy" className="text-sky-600 hover:text-sky-500">
              política de privacidad
            </Link>
          </label>
          {errors.acceptTerms && <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Creando cuenta...
          </div>
        ) : (
          "Crear cuenta"
        )}
      </button>
    </form>
  )
}

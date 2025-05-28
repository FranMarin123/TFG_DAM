import { useState, useEffect } from "react"
import { authService } from "../services/auth.service"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated()
      setIsAuthenticated(authenticated)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      await authService.login({ email, password })
      setIsAuthenticated(true)
      return true
    } catch (error) {
      setIsAuthenticated(false)
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      await authService.register({ name, email, password })
      setIsAuthenticated(true)
      return true
    } catch (error) {
      setIsAuthenticated(false)
      throw error
    }
  }

  const logout = () => {
    authService.logout()
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  }
}
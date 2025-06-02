import { apiClient } from "../config/api"

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user?: {
    id: string
    name: string
    email: string
  }
}

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.login(credentials)
    if (response.token) {
      this.setToken(response.token)
    }
    return response
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.register(userData)
    if (response.token) {
      this.setToken(response.token)
    }
    return response
  }

  setToken(token: string): void {
    const cleanToken = token.replace(/^["']|["']$/g, "")
    localStorage.setItem("auth_token", cleanToken)
  }

  getToken(): string | null {
    return localStorage.getItem("auth_token")
  }

  removeToken(): void {
    localStorage.removeItem("auth_token")
  }

  isAuthenticated(): boolean {
    const token = this.getToken()
    if (!token) return false

    try {
      const parts = token.split(".")
      if (parts.length !== 3) return false

      const payload = JSON.parse(atob(parts[1]))
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        this.removeToken()
        return false
      }
      return true
    } catch {
      this.removeToken()
      return false
    }
  }

  logout(): void {
    this.removeToken()
    window.location.href = "/login"
  }
}

export const authService = new AuthService()

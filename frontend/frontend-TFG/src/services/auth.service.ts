import { API_CONFIG } from "../config/api"

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
  private getAuthHeaders() {
    return {
      "Content-Type": "application/json",
    }
  }

  private async handleAuthResponse(response: Response): Promise<AuthResponse> {
    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`

      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } catch {
      }

      throw new Error(errorMessage)
    }

    const responseText = await response.text()

    try {
      const jsonData = JSON.parse(responseText)

      if (jsonData.token) {
        return jsonData
      }

      return { token: jsonData }
    } catch {
      return { token: responseText }
    }
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(credentials),
      })

      const authResponse = await this.handleAuthResponse(response)

      if (authResponse.token) {
        this.setToken(authResponse.token)
      }

      return authResponse
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(userData),
      })

      const authResponse = await this.handleAuthResponse(response)

      if (authResponse.token) {
        this.setToken(authResponse.token)
      }

      return authResponse
    } catch (error) {
      console.error("Register error:", error)
      throw error
    }
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

  getUserFromToken(): any {
    const token = this.getToken()
    if (!token) return null

    try {
      const parts = token.split(".")
      if (parts.length !== 3) return null

      const payload = JSON.parse(atob(parts[1]))
      return payload
    } catch {
      return null
    }
  }
}

export const authService = new AuthService()

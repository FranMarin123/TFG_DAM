import { apiClient } from "../config/api"
import { authService } from "./auth.service"

export interface Server {
  id: string
  name: string
  status: "online" | "offline" | "maintenance" | "warning" | "restarting"
  ip: string
  location: string
  type: string
  os: string
  cpu: number
  memory: number
  disk: number
  description?: string
  created?: string
}

export interface CreateServerRequest {
  name: string
  address: string
  type: string
}

export interface CreateServerResponse {
  id?: string
  message?: string
}

class ServerService {
  async getServers(): Promise<Server[]> {
    try {
      const token = authService.getToken()
      if (!token) {
        throw new Error("No authentication token found")
      }

      console.log("Fetching servers for token:", token)
      const data = await apiClient.getServers(token)
      console.log("Servers response:", data)

      let servers: any[] = []
      if (Array.isArray(data)) {
        servers = data
      } else if (data.servers && Array.isArray(data.servers)) {
        servers = data.servers
      } else if (data.data && Array.isArray(data.data)) {
        servers = data.data
      } else {
        console.warn("Unexpected response format:", data)
        return []
      }

      return servers.map((server: any) => ({
        id: server.id || server._id || Math.random().toString(),
        name: server.name || "Servidor sin nombre",
        status: this.mapServerStatus(server.status),
        ip: server.address || server.ip || "0.0.0.0",
        location: server.location || "Ubicación desconocida",
        type: server.type || "unknown",
        os: server.os || "linux",
        cpu: server.cpu || 0,
        memory: server.memory || 0,
        disk: server.disk || 0,
        description: server.description || "",
        created: server.created || server.createdAt || new Date().toISOString(),
      }))
    } catch (error) {
      console.error("Error fetching servers:", error)

      if (error instanceof Error && (error.message.includes("401") || error.message.includes("Unauthorized"))) {
        authService.logout()
        throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.")
      }

      throw error
    }
  }

  async createServer(serverData: CreateServerRequest): Promise<CreateServerResponse> {
    try {
      const token = authService.getToken()
      if (!token) {
        throw new Error("No authentication token found")
      }

      const requestData = {
        ...serverData,
        token: token,
      }

      console.log("Creating server with data:", requestData)
      const response = await apiClient.createServer(requestData)
      console.log("Server created successfully:", response)

      return response
    } catch (error) {
      console.error("Error creating server:", error)

      if (error instanceof Error && (error.message.includes("401") || error.message.includes("Unauthorized"))) {
        authService.logout()
        throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.")
      }

      throw error
    }
  }

  async updateServer(id: string, serverData: Partial<Server>): Promise<Server> {
    try {
      const token = authService.getToken()
      if (!token) {
        throw new Error("No authentication token found")
      }

      console.log("Updating server:", id, serverData)
      const response = await apiClient.updateServer(id, serverData, token)
      console.log("Server updated successfully:", response)

      return response
    } catch (error) {
      console.error("Error updating server:", error)

      if (error instanceof Error && (error.message.includes("401") || error.message.includes("Unauthorized"))) {
        authService.logout()
        throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.")
      }

      throw error
    }
  }

  async deleteServer(id: string): Promise<void> {
    try {
      const token = authService.getToken()
      if (!token) {
        throw new Error("No authentication token found")
      }

      console.log("Deleting server:", id)
      await apiClient.deleteServer(id, token)
      console.log("Server deleted successfully")
    } catch (error) {
      console.error("Error deleting server:", error)

      if (error instanceof Error && (error.message.includes("401") || error.message.includes("Unauthorized"))) {
        authService.logout()
        throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.")
      }

      throw error
    }
  }

  async restartServer(id: string): Promise<void> {
    try {
      const token = authService.getToken()
      if (!token) {
        throw new Error("No authentication token found")
      }

      console.log("Restarting server:", id)
      await apiClient.restartServer(id, token)
      console.log("Server restart initiated successfully")
    } catch (error) {
      console.error("Error restarting server:", error)

      if (error instanceof Error && (error.message.includes("401") || error.message.includes("Unauthorized"))) {
        authService.logout()
        throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.")
      }

      throw error
    }
  }

  private mapServerStatus(apiStatus: string): "online" | "offline" | "maintenance" | "warning" | "restarting" {
    if (!apiStatus) return "offline"

    const status = apiStatus.toLowerCase()
    switch (status) {
      case "online":
      case "active":
      case "running":
        return "online"
      case "offline":
      case "inactive":
      case "stopped":
        return "offline"
      case "maintenance":
      case "maintaining":
        return "maintenance"
      case "warning":
      case "error":
      case "alert":
        return "warning"
      case "restarting":
      case "rebooting":
        return "restarting"
      default:
        return "offline"
    }
  }
}

export const serverService = new ServerService()

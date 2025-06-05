import { apiClient } from "../hooks/api"
import { authService } from "./auth.service"
import { serverConnectionService } from "./server-connection.service"

export interface Server {
  id: string
  name: string
  ip: string
  type: string
}

export interface ServerMetrics {
  cpu: number
  memory: number
  disk: number
  net: number
}

class ServerService {
  async getServers(): Promise<Server[]> {
    const token = authService.getToken()
    if (!token) {
      throw new Error("No authentication token found")
    }

    try {
      const data = await apiClient.getServers(token)

      let servers: any[] = []
      if (Array.isArray(data)) {
        servers = data
      } else if (data.servers && Array.isArray(data.servers)) {
        servers = data.servers
      } else {
        return []
      }

      return servers.map((server: any) => ({
        id: server.id || server._id,
        name: server.name,
        ip: server.address || server.ip,
        type: server.type,
      }))
    } catch (error) {
      if (error instanceof Error && error.message.includes("401")) {
        authService.logout()
        throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.")
      }
      throw error
    }
  }

  async getServerById(serverId: string): Promise<Server | null> {
    try {
      const servers = await this.getServers()
      const server = servers.find((s) => s.id === serverId || s.id.toString() === serverId)

      if (!server) {
        console.error(`No se encontró el servidor con ID: ${serverId}`)
        console.log("Servidores disponibles:", servers)
        return null
      }

      return server
    } catch (error) {
      console.error(`Error al buscar el servidor con ID ${serverId}:`, error)
      throw error
    }
  }

  async createServer(serverData: { name: string; address: string; type: string }) {
    const token = authService.getToken()
    if (!token) {
      throw new Error("No authentication token found")
    }

    try {
      return await apiClient.createServer({ ...serverData, token })
    } catch (error) {
      if (error instanceof Error && error.message.includes("401")) {
        authService.logout()
        throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.")
      }
      throw error
    }
  }

  async connectToServer(serverId: string, serverIP: string, username: string, password: string): Promise<boolean> {
    console.log(`[ServerService] Delegando conexión al singleton para servidor "${serverId}"`)
    return await serverConnectionService.connectToServer(serverId, serverIP, username, password)
  }

  async getServerMetrics(serverId: string): Promise<ServerMetrics> {
    const credentials = serverConnectionService.getCredentials(serverId)
    if (!credentials) {
      throw new Error("No hay credenciales almacenadas para este servidor. Conéctate primero.")
    }
    
    const result = await apiClient.getServerMetrics(credentials)

    const metrics: ServerMetrics = result
      const fallbackMetrics = {
        cpu: metrics.cpu,
        memory: metrics.memory,
        disk: metrics.disk,
        net: metrics.net,
      }

      return fallbackMetrics
  }

  async rebootServer(serverId: string): Promise<void> {
    const credentials = serverConnectionService.getCredentials(serverId)
    if (!credentials) {
      throw new Error("No hay credenciales almacenadas para este servidor. Conéctate primero.")
    }
    await apiClient.rebootServer(credentials)
  }

  async shutdownServer(serverId: string): Promise<void> {
    const credentials = serverConnectionService.getCredentials(serverId)
    if (!credentials) {
      throw new Error("No hay credenciales almacenadas para este servidor. Conéctate primero.")
    }
    await apiClient.shutdownServer(credentials)
  }

  async executeCommand(serverId: string, command: string): Promise<string> {
    console.log(`[ServerService] executeCommand para servidor "${serverId}"`)
    const credentials = serverConnectionService.getCredentials(serverId)
    if (!credentials) {
      console.error(`[ServerService] No hay credenciales para executeCommand en servidor "${serverId}"`)
      serverConnectionService.debugConnections()
      throw new Error("No hay credenciales almacenadas para este servidor. Conéctate primero.")
    }

    const result = await apiClient.executeCommand(credentials, command)
    return typeof result === "string" ? result : JSON.stringify(result)
  }

  async executeScript(serverId: string, command: string): Promise<string> {
    const credentials = serverConnectionService.getCredentials(serverId)
    if (!credentials) {
      throw new Error("No hay credenciales almacenadas para este servidor. Conéctate primero.")
    }

    const result = await apiClient.executeScript(credentials, command)
    return typeof result === "string" ? result : JSON.stringify(result)
  }

  hasCredentials(serverId: string): boolean {
    console.log(`[ServerService] hasCredentials para servidor "${serverId}"`)
    const isConnected = serverConnectionService.isConnected(serverId)
    console.log(`[ServerService] hasCredentials("${serverId}"): ${isConnected}`)
    return isConnected
  }

  disconnectFromServer(serverId: string): void {
    console.log(`[ServerService] Desconectando servidor "${serverId}"`)
    serverConnectionService.disconnectServer(serverId)
  }

  clearAllCredentials(): void {
    console.log(`[ServerService] Limpiando todas las credenciales`)
    serverConnectionService.disconnectAll()
  }

  debugCredentials(): void {
    serverConnectionService.debugConnections()
  }

  getActiveConnections() {
    return serverConnectionService.getActiveConnections()
  }

  getConnectionCount(): number {
    return serverConnectionService.getConnectionCount()
  }

  async renewConnection(serverId: string): Promise<boolean> {
    return await serverConnectionService.renewConnection(serverId)
  }
}

export const serverService = new ServerService()

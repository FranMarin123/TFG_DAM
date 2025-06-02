import { apiClient, type ServerCredentials } from "../config/api"

export interface ServerConnection {
  serverId: string
  serverIP: string
  username: string
  password: string
  connectedAt: Date
  isActive: boolean
}

class ServerConnectionService {
  private static instance: ServerConnectionService
  private connections: Map<string, ServerConnection> = new Map()

  private constructor() {
    console.log("[ServerConnectionService] Singleton inicializado")
  }

  public static getInstance(): ServerConnectionService {
    if (!ServerConnectionService.instance) {
      ServerConnectionService.instance = new ServerConnectionService()
    }
    return ServerConnectionService.instance
  }

  async connectToServer(serverId: string, serverIP: string, username: string, password: string): Promise<boolean> {
    console.log(`[ServerConnectionService] Conectando al servidor "${serverId}" (${serverIP})`)
    console.log(`[ServerConnectionService] Usuario: ${username}`)

    const credentials: ServerCredentials = {
      serverIP,
      username,
      password,
    }

    try {
      // Verificar conexión con la API
      console.log(`[ServerConnectionService] Verificando conexión con API...`)
      const isConnected = await apiClient.checkConnection(credentials)

      if (isConnected) {
        console.log(`[ServerConnectionService] ✅ Conexión exitosa`)

        // Almacenar la conexión
        const connection: ServerConnection = {
          serverId,
          serverIP,
          username,
          password,
          connectedAt: new Date(),
          isActive: true,
        }

        this.connections.set(serverId, connection)
        console.log(`[ServerConnectionService] Conexión almacenada para servidor "${serverId}"`)
        console.log(`[ServerConnectionService] Total conexiones activas: ${this.connections.size}`)

        this.debugConnections()
        return true
      } else {
        console.log(`[ServerConnectionService] ❌ Falló la verificación de conexión`)
        return false
      }
    } catch (error) {
      console.error(`[ServerConnectionService] Error en connectToServer:`, error)
      throw error
    }
  }

  getConnection(serverId: string): ServerConnection | null {
    console.log(`[ServerConnectionService] Buscando conexión para servidor "${serverId}"`)
    console.log(`[ServerConnectionService] Conexiones disponibles:`, Array.from(this.connections.keys()))

    const connection = this.connections.get(serverId)

    if (connection) {
      console.log(`[ServerConnectionService] Conexión encontrada para "${serverId}"`)
      console.log(`[ServerConnectionService] IP: ${connection.serverIP}, Usuario: ${connection.username}`)
      console.log(`[ServerConnectionService] Conectado desde: ${connection.connectedAt}`)
      console.log(`[ServerConnectionService] Estado activo: ${connection.isActive}`)
    } else {
      console.log(`[ServerConnectionService] No se encontró conexión para "${serverId}"`)
      this.debugConnections()
    }

    return connection || null
  }

  getCredentials(serverId: string): ServerCredentials | null {
    const connection = this.getConnection(serverId)
    if (!connection || !connection.isActive) {
      return null
    }

    return {
      serverIP: connection.serverIP,
      username: connection.username,
      password: connection.password,
    }
  }

  isConnected(serverId: string): boolean {
    const connection = this.connections.get(serverId)
    const isConnected = connection ? connection.isActive : false
    console.log(`[ServerConnectionService] isConnected("${serverId}"): ${isConnected}`)
    return isConnected
  }

  disconnectServer(serverId: string): void {
    console.log(`[ServerConnectionService] Desconectando servidor "${serverId}"`)

    const connection = this.connections.get(serverId)
    if (connection) {
      connection.isActive = false
      console.log(`[ServerConnectionService] Servidor "${serverId}" marcado como inactivo`)
    }

    this.connections.delete(serverId)
    console.log(`[ServerConnectionService] Conexión eliminada para servidor "${serverId}"`)
    console.log(`[ServerConnectionService] Conexiones restantes: ${this.connections.size}`)
  }

  disconnectAll(): void {
    console.log(`[ServerConnectionService] Desconectando todos los servidores (${this.connections.size})`)
    this.connections.clear()
    console.log(`[ServerConnectionService] Todas las conexiones eliminadas`)
  }

  getActiveConnections(): ServerConnection[] {
    return Array.from(this.connections.values()).filter((conn) => conn.isActive)
  }

  getConnectionCount(): number {
    return this.connections.size
  }

  debugConnections(): void {
    console.log(`[ServerConnectionService] === DEBUG CONEXIONES ===`)
    console.log(`[ServerConnectionService] Total conexiones: ${this.connections.size}`)

    if (this.connections.size === 0) {
      console.log(`[ServerConnectionService] No hay conexiones almacenadas`)
    } else {
      console.log(`[ServerConnectionService] Conexiones detalladas:`)
      for (const [serverId, connection] of this.connections.entries()) {
        console.log(`  - Servidor: "${serverId}"`)
        console.log(`    IP: ${connection.serverIP}`)
        console.log(`    Usuario: ${connection.username}`)
        console.log(`    Activo: ${connection.isActive}`)
        console.log(`    Conectado: ${connection.connectedAt.toISOString()}`)
        console.log(`    ---`)
      }
    }
    console.log(`[ServerConnectionService] === FIN DEBUG ===`)
  }

  cleanupInactiveConnections(): void {
    console.log(`[ServerConnectionService] Limpiando conexiones inactivas...`)

    const before = this.connections.size
    for (const [serverId, connection] of this.connections.entries()) {
      if (!connection.isActive) {
        this.connections.delete(serverId)
        console.log(`[ServerConnectionService] Eliminada conexión inactiva: "${serverId}"`)
      }
    }

    const after = this.connections.size
    console.log(`[ServerConnectionService] Limpieza completada: ${before} -> ${after} conexiones`)
  }

  async renewConnection(serverId: string): Promise<boolean> {
    const connection = this.getConnection(serverId)
    if (!connection) {
      console.log(`[ServerConnectionService] No se puede renovar: conexión no encontrada para "${serverId}"`)
      return false
    }

    console.log(`[ServerConnectionService] Renovando conexión para servidor "${serverId}"`)

    try {
      const credentials: ServerCredentials = {
        serverIP: connection.serverIP,
        username: connection.username,
        password: connection.password,
      }

      const isConnected = await apiClient.checkConnection(credentials)

      if (isConnected) {
        connection.connectedAt = new Date()
        connection.isActive = true
        console.log(`[ServerConnectionService] ✅ Conexión renovada exitosamente para "${serverId}"`)
        return true
      } else {
        connection.isActive = false
        console.log(`[ServerConnectionService] ❌ Falló la renovación de conexión para "${serverId}"`)
        return false
      }
    } catch (error) {
      console.error(`[ServerConnectionService] Error renovando conexión para "${serverId}":`, error)
      connection.isActive = false
      return false
    }
  }
}

export const serverConnectionService = ServerConnectionService.getInstance()

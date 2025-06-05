export const API_CONFIG = {
  BASE_URL: "http://localhost:8080",
  ENDPOINTS: {
    LOGIN: "/api/users/LoginProve",
    REGISTER: "/api/users/Register",
    GET_SERVERS: "/api/users/{token}/servers",
    GET_SERVER_BY_ID: "/api/servers/{id}",
    CREATE_SERVER: "/api/servers",
    CHECK_CONNECTION: "/api/servers/checkConnection",
    GET_METRICS: "/api/servers/metrics",
    REBOOT_SERVER: "/api/servers/reboot",
    SHUTDOWN_SERVER: "/api/servers/shutdown",
    EXECUTE_COMMAND: "/api/servers/command",
    EXECUTE_SCRIPT: "/api/servers/script",
  },
}

const getGenericErrorMessage = (status: number): string => {
  switch (status) {
    case 400:
      return "Los datos enviados no son válidos. Por favor, verifica la información."
    case 401:
      return "Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
    case 403:
      return "No tienes permisos para realizar esta acción."
    case 404:
      return "El recurso solicitado no se encuentra disponible."
    case 409:
      return "Ya existe un recurso con esa información."
    case 500:
      return "Ocurrió un error interno del servidor. Inténtalo más tarde."
    case 502:
    case 503:
    case 504:
      return "El servicio no está disponible temporalmente. Inténtalo más tarde."
    default:
      return "Ocurrió un error inesperado. Por favor, inténtalo de nuevo."
  }
}

const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const errorMessage = getGenericErrorMessage(response.status)
    const error = new Error(errorMessage)
    ;(error as any).status = response.status
    throw error
  }

  const responseText = await response.text()
  try {
    return JSON.parse(responseText)
  } catch {
    return responseText
  }
}

export interface ServerCredentials {
  serverIP: string
  username: string
  password: string
}

export const apiClient = {
  async login(credentials: { email: string; password: string }) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })

      const data = await handleApiResponse(response)
      return typeof data === "string" ? { token: data } : data
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        throw new Error("No se puede conectar al servidor. Verifica tu conexión a internet.")
      }
      throw error
    }
  },

  async register(userData: { name: string; email: string; password: string }) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      const data = await handleApiResponse(response)
      return typeof data === "string" ? { token: data } : data
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        throw new Error("No se puede conectar al servidor. Verifica tu conexión a internet.")
      }
      throw error
    }
  },

  async getServers(token: string) {
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_SERVERS.replace("{token}", token)}`
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      return await handleApiResponse(response)
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        throw new Error("No se puede conectar al servidor. Verifica tu conexión a internet.")
      }
      throw error
    }
  },

  async getServerById(serverId: string, token: string) {
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_SERVER_BY_ID.replace("{id}", serverId)}`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      return await handleApiResponse(response)
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        throw new Error("No se puede conectar al servidor. Verifica tu conexión a internet.")
      }
      throw error
    }
  },

  async createServer(serverData: { name: string; address: string; type: string; token: string }) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CREATE_SERVER}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serverData),
      })
      return await handleApiResponse(response)
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        throw new Error("No se puede conectar al servidor. Verifica tu conexión a internet.")
      }
      throw error
    }
  },

  async checkConnection(credentials: ServerCredentials): Promise<boolean> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHECK_CONNECTION}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })
      const result = await handleApiResponse(response)
      return result === true || result === "true"
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        throw new Error("No se puede conectar al servidor. Verifica tu conexión a internet.")
      }
      throw error
    }
  },

  async getServerMetrics(metricsParams: { serverIP: string; username: string; password: string }) {
    try {
      console.log("Solicitando métricas con parámetros:", metricsParams)
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_METRICS}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metricsParams),
      })

      console.log("Respuesta de métricas - Status:", response.status)

      if (!response.ok) {
        console.error("Error en respuesta de métricas:", response.status, response.statusText)
        throw new Error(`Error ${response.status}: ${getGenericErrorMessage(response.status)}`)
      }

      const result = await handleApiResponse(response)
      console.log("Respuesta de métricas:", result)
      return result
    } catch (error) {
      console.error("Error al obtener métricas:", error)
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        throw new Error("No se puede conectar al servidor. Verifica tu conexión a internet.")
      }
      throw error
    }
  },

  async rebootServer(credentials: ServerCredentials) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REBOOT_SERVER}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })
      return await handleApiResponse(response)
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        throw new Error("No se puede conectar al servidor. Verifica tu conexión a internet.")
      }
      throw error
    }
  },

  async shutdownServer(credentials: ServerCredentials) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SHUTDOWN_SERVER}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })
      return await handleApiResponse(response)
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        throw new Error("No se puede conectar al servidor. Verifica tu conexión a internet.")
      }
      throw error
    }
  },

  async executeCommand(credentials: ServerCredentials, command: string) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EXECUTE_COMMAND}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...credentials, command }),
      })
      return await handleApiResponse(response)
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        throw new Error("No se puede conectar al servidor. Verifica tu conexión a internet.")
      }
      throw error
    }
  },

  async executeScript(credentials: ServerCredentials, command: string) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EXECUTE_COMMAND}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...credentials, command }),
      })
      return await handleApiResponse(response)
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        throw new Error("No se puede conectar al servidor. Verifica tu conexión a internet.")
      }
      throw error
    }
  },
}

export const API_CONFIG = {
  BASE_URL: "http://localhost:8080",
  ENDPOINTS: {
    LOGIN: "/api/users/LoginProve",
    REGISTER: "/api/users/Register",
    GET_SERVERS: "/api/users/{token}/servers",
    CREATE_SERVER: "/api/servers",
  },
}

const getAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

const handleApiResponse = async (response: Response) => {
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
    return JSON.parse(responseText)
  } catch {
    return responseText
  }
}

export const apiClient = {
  async login(credentials: { email: string; password: string }) {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(credentials),
    })

    const data = await handleApiResponse(response)

    if (typeof data === "string") {
      return { token: data }
    } else if (data.token) {
      return data
    } else {
      return { token: data }
    }
  },

  async register(userData: { name: string; email: string; password: string }) {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    })

    const data = await handleApiResponse(response)

    if (typeof data === "string") {
      return { token: data }
    } else if (data.token) {
      return data
    } else {
      return { token: data }
    }
  },

  async getServers(token: string) {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_SERVERS.replace("{token}", token)}`

    const response = await fetch(url, {
      method: "GET",
      headers: getAuthHeaders(token),
    })

    return await handleApiResponse(response)
  },

  async createServer(serverData: { name: string; address: string; type: string; token: string }) {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CREATE_SERVER}`, {
      method: "POST",
      headers: getAuthHeaders(serverData.token),
      body: JSON.stringify(serverData),
    })

    return await handleApiResponse(response)
  },

  async updateServer(id: string, serverData: any, token: string) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/servers/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ ...serverData, token }),
    })

    return await handleApiResponse(response)
  },

  async deleteServer(id: string, token: string) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/servers/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ token }),
    })

    return await handleApiResponse(response)
  },

  async restartServer(id: string, token: string) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/servers/${id}/restart`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ token }),
    })

    return await handleApiResponse(response)
  },
}

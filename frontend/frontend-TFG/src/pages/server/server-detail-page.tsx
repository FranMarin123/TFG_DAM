import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FiArrowLeft, FiSettings, FiTerminal, FiCode, FiPower, FiRefreshCw } from "react-icons/fi"
import { Header } from "../../components/layout/header"
import { Footer } from "../../components/layout/footer"
import { Terminal } from "../../components/servers/details/terminal"
import { ScriptEditor } from "../../components/servers/details/script-editor"
import { Button } from "../../components/ui/button"
import { ConfirmationDialog } from "../../components/ui/confirmation-dialog"
import { serverService, type Server, type ServerMetrics as ServerMetricsType } from "../../services/server.service"
import { authService } from "../../services/auth.service"
import { ServerMetrics } from "../../components/servers/server-metrics"
import { ServerConnectionModal } from "../../components/servers/server-connection-modal"
import { ErrorModal } from "../../components/ui/error-modal"

export default function ServerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [server, setServer] = useState<Server | null>(null)
  const [metrics, setMetrics] = useState<ServerMetricsType | null>(null)
  const [activeTab, setActiveTab] = useState<"overview" | "terminal" | "scripts">("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isShutdownDialogOpen, setIsShutdownDialogOpen] = useState(false)
  const [isRebootDialogOpen, setIsRebootDialogOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/login")
      return
    }
    if (id) {
      console.log("Cargando detalles del servidor con ID:", id)
      loadServerDetails()
    }
  }, [id, navigate])

  const showError = (message: string) => {
    setError(message)
    setIsErrorModalOpen(true)
  }

  const loadServerDetails = async () => {
    if (!id) return

    try {
      setIsLoading(true)
      setError(null)

      const foundServer = await serverService.getServerById(id)

      if (!foundServer) {
        showError("No se pudo encontrar el servidor solicitado")
        return
      }

      setServer(foundServer)

      const hasCredentials = serverService.hasCredentials(id)
      console.log(`Servidor ${foundServer.name} tiene credenciales: ${hasCredentials}`)
      setIsConnected(hasCredentials)

      if (hasCredentials) {
        console.log(`Cargando métricas para servidor ${foundServer.name}`)
        loadMetrics()
      } else {
        console.log(`No hay credenciales para servidor ${foundServer.name}, se requiere conexión`)
      }
    } catch (error) {
      console.error("Failed to load server details:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al cargar los detalles del servidor"

      if (errorMessage.includes("Tu sesión ha expirado")) {
        navigate("/login")
        return
      }

      showError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const loadMetrics = async () => {
    if (!id || !isConnected) return

    try {
      setIsLoadingMetrics(true)
      const metricsData = await serverService.getServerMetrics(id)
      setMetrics(metricsData)
    } catch (error) {
      console.error("Failed to load metrics:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al cargar las métricas del servidor"
      showError(errorMessage)
    } finally {
      setIsLoadingMetrics(false)
    }
  }

  const handleConnect = async (username: string, password: string): Promise<boolean> => {
    if (!server) return false

    try {
      setIsConnecting(true)
      console.log(`Conectando al servidor ${server.name} (${server.ip}) con usuario ${username}`)

      const success = await serverService.connectToServer(server.id, server.ip, username, password)

      if (success) {
        console.log(`[ServerDetailPage] Conexión exitosa al servidor ${server.name}`)

        serverService.debugCredentials()

        setIsConnected(true)
        setIsConnectionModalOpen(false)

        const hasCredentials = serverService.hasCredentials(server.id)
        console.log(`[ServerDetailPage] Credenciales verificadas después de conectar: ${hasCredentials}`)

        await loadMetrics()
        return true
      } else {
        console.log(`[ServerDetailPage] Falló la conexión al servidor ${server.name}`)
        return false
      }
    } catch (error) {
      console.error("Connection failed:", error)
      throw error
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    if (!server) return

    serverService.disconnectFromServer(server.id)
    setIsConnected(false)
    setMetrics(null)
  }

  const handleReboot = async () => {
    if (!server) return

    try {
      await serverService.rebootServer(server.id)
      setIsRebootDialogOpen(false)
    } catch (error) {
      console.error("Failed to reboot server:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al reiniciar el servidor"
      showError(errorMessage)
    }
  }

  const handleShutdown = async () => {
    if (!server) return

    try {
      await serverService.shutdownServer(server.id)
      setIsShutdownDialogOpen(false)
    } catch (error) {
      console.error("Failed to shutdown server:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al apagar el servidor"
      showError(errorMessage)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando detalles del servidor...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!server) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Servidor no encontrado</h2>
              <p className="text-gray-600 mb-6">El servidor solicitado no se encuentra disponible</p>
              <Button onClick={() => navigate("/servers")}>
                <FiArrowLeft className="mr-2 h-4 w-4" />
                Volver a Servidores
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={() => navigate("/servers")}>
                  <FiArrowLeft className="mr-2 h-4 w-4" />
                  Volver
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{server.name}</h1>
                  <p className="text-gray-600">{server.ip}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {isConnected ? (
                  <>
                    <Button variant="outline" onClick={loadMetrics} disabled={isLoadingMetrics}>
                      <FiRefreshCw className={`mr-2 h-4 w-4 ${isLoadingMetrics ? "animate-spin" : ""}`} />
                      Actualizar
                    </Button>
                    <Button variant="outline" onClick={() => setIsRebootDialogOpen(true)}>
                      <FiRefreshCw className="mr-2 h-4 w-4" />
                      Reiniciar
                    </Button>
                    <Button variant="outline" onClick={() => setIsShutdownDialogOpen(true)}>
                      <FiPower className="mr-2 h-4 w-4" />
                      Apagar
                    </Button>
                    <Button variant="outline" onClick={handleDisconnect}>
                      Desconectar
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsConnectionModalOpen(true)}>Conectar al Servidor</Button>
                )}
              </div>
            </div>
          </div>

          {!isConnected && (
            <div className="mb-6 rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Servidor no conectado</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Necesitas conectarte al servidor para ver métricas y usar el terminal.</p>
                  </div>
                  <div className="mt-4">
                    <Button size="sm" onClick={() => setIsConnectionModalOpen(true)}>
                      Conectar ahora
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "overview"
                      ? "border-sky-500 text-sky-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <FiSettings className="inline mr-2 h-4 w-4" />
                  Información General
                </button>
                <button
                  onClick={() => setActiveTab("terminal")}
                  disabled={!isConnected}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "terminal" && isConnected
                      ? "border-sky-500 text-sky-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                  }`}
                >
                  <FiTerminal className="inline mr-2 h-4 w-4" />
                  Terminal
                </button>
                <button
                  onClick={() => setActiveTab("scripts")}
                  disabled={!isConnected}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "scripts" && isConnected
                      ? "border-sky-500 text-sky-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                  }`}
                >
                  <FiCode className="inline mr-2 h-4 w-4" />
                  Scripts
                </button>
              </nav>
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Servidor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Nombre</dt>
                    <dd className="mt-1 text-sm text-gray-900">{server.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Dirección IP</dt>
                    <dd className="mt-1 text-sm text-gray-900">{server.ip}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Tipo</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {server.type.charAt(0).toUpperCase() + server.type.slice(1)}
                    </dd>
                  </div>
                </div>
              </div>

              {isConnected && <ServerMetrics metrics={metrics} isLoading={isLoadingMetrics} onRefresh={loadMetrics} />}
            </div>
          )}

          {activeTab === "terminal" && isConnected && <Terminal serverId={server.id} serverName={server.name} />}

          {activeTab === "scripts" && isConnected && <ScriptEditor serverId={server.id} serverName={server.name} />}
        </div>
      </main>

      <Footer />

      <ErrorModal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)} message={error || ""} />

      <ServerConnectionModal
        isOpen={isConnectionModalOpen}
        onClose={() => setIsConnectionModalOpen(false)}
        onConnect={handleConnect}
        serverName={server.name}
        serverIP={server.ip}
        isConnecting={isConnecting}
      />

      <ConfirmationDialog
        isOpen={isRebootDialogOpen}
        onClose={() => setIsRebootDialogOpen(false)}
        onConfirm={handleReboot}
        title="Reiniciar Servidor"
        message={`¿Estás seguro de que deseas reiniciar el servidor "${server.name}"?`}
        confirmText="Reiniciar"
        cancelText="Cancelar"
        type="warning"
      />

      <ConfirmationDialog
        isOpen={isShutdownDialogOpen}
        onClose={() => setIsShutdownDialogOpen(false)}
        onConfirm={handleShutdown}
        title="Apagar Servidor"
        message={`¿Estás seguro de que deseas apagar el servidor "${server.name}"?`}
        confirmText="Apagar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  )
}

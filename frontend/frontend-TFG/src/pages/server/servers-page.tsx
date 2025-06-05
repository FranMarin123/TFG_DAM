import { useState, useEffect } from "react"
import { FiPlus, FiRefreshCw } from "react-icons/fi"
import { Header } from "../../components/layout/header"
import { Footer } from "../../components/layout/footer"
import { Button } from "../../components/ui/button"
import { ServerGrid } from "../../components/servers/server-grid"
import { ServerForm } from "../../components/servers/server-form"
import { Modals } from "../../components/ui/modals"
import { ConfirmationDialog } from "../../components/ui/confirmation-dialog"
import { serverService, type Server } from "../../services/server.service"
import { authService } from "../../services/auth.service"
import { useNavigate } from "react-router-dom"
import { ErrorModal } from "../../components/ui/error-modal"

export default function ServersPage() {
  const [servers, setServers] = useState<Server[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isRestartDialogOpen, setIsRestartDialogOpen] = useState(false)
  const [currentServer, setCurrentServer] = useState<Server | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/login")
      return
    }
    loadServers()
  }, [navigate])

  const showError = (message: string) => {
    setError(message)
    setIsErrorModalOpen(true)
  }

  const loadServers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const serversData = await serverService.getServers()
      setServers(serversData)
    } catch (error) {
      console.error("Failed to load servers:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al cargar los servidores"

      if (errorMessage.includes("Tu sesión ha expirado")) {
        navigate("/login")
        return
      }

      showError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true)
      await loadServers()
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleAddServer = async (serverData: { name: string; address: string; type: string }) => {
    try {
      await serverService.createServer(serverData)
      await loadServers()
      setIsAddModalOpen(false)
    } catch (error) {
      console.error("Failed to add server:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al añadir el servidor"
      showError(errorMessage)
    }
  }

  const handleRestartServer = async () => {
    if (!currentServer) return

    try {
      if (!serverService.hasCredentials(currentServer.id)) {
        showError("Necesitas conectarte al servidor primero para poder reiniciarlo")
        return
      }

      await serverService.rebootServer(currentServer.id)
      setCurrentServer(null)
      setIsRestartDialogOpen(false)
    } catch (error) {
      console.error("Failed to restart server:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al reiniciar el servidor"
      showError(errorMessage)
      setIsRestartDialogOpen(false)
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
                <p className="text-gray-600">Cargando servidores...</p>
              </div>
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
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Servidores</h1>
            <div className="mt-4 flex space-x-3 sm:mt-0">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50"
              >
                <FiRefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Actualizar
              </button>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <FiPlus className="mr-2 h-4 w-4" />
                Añadir Servidor
              </Button>
            </div>
          </div>

          {servers.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay servidores</h3>
              <p className="mt-1 text-sm text-gray-500">Comienza añadiendo tu primer servidor al sistema.</p>
              <div className="mt-6">
                <Button onClick={() => setIsAddModalOpen(true)}>
                  <FiPlus className="mr-2 h-4 w-4" />
                  Añadir primer servidor
                </Button>
              </div>
            </div>
          )}

          {servers.length > 0 && (
            <div className="mt-6">
              <ServerGrid
                servers={servers}
                onRestart={(server) => {
                  setCurrentServer(server)
                  setIsRestartDialogOpen(true)
                }}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />

      <Modals isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Añadir Servidor">
        <ServerForm onSubmit={handleAddServer} onCancel={() => setIsAddModalOpen(false)} />
      </Modals>

      <ErrorModal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)} message={error || ""} />

      <ConfirmationDialog
        isOpen={isRestartDialogOpen}
        onClose={() => setIsRestartDialogOpen(false)}
        onConfirm={handleRestartServer}
        title="Reiniciar Servidor"
        message={`¿Estás seguro de que deseas reiniciar el servidor "${currentServer?.name}"?`}
        confirmText="Reiniciar"
        cancelText="Cancelar"
        type="warning"
      />
    </div>
  )
}
import { useState, useEffect } from "react"
import { FiPlus, FiGrid, FiList, FiRefreshCw } from "react-icons/fi"
import { Header } from "../../components/layout/header"
import { Footer } from "../../components/layout/footer"
import { Button } from "../../components/ui/button"
import { ServerTable } from "../../components/servers/server-table"
import { ServerGrid } from "../../components/servers/server-grid"
import { ServerForm } from "../../components/servers/server-form"
import { Modals } from "../../components/ui/modals"
import { ConfirmationDialog } from "../../components/ui/confirmation-dialog"
import { serverService, type Server } from "../../services/server.service"
import { authService } from "../../services/auth.service"
import { useNavigate } from "react-router-dom"

export default function ServersPage() {
  const [servers, setServers] = useState<Server[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isRestartDialogOpen, setIsRestartDialogOpen] = useState(false)
  const [currentServer, setCurrentServer] = useState<Server | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/login")
      return
    }
    loadServers()
  }, [navigate])

  const loadServers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      console.log("Loading servers...")
      const serversData = await serverService.getServers()
      console.log("Loaded servers:", serversData)
      setServers(serversData)
    } catch (error) {
      console.error("Failed to load servers:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al cargar los servidores"
      setError(errorMessage)

      if (errorMessage.includes("Sesión expirada") || errorMessage.includes("401")) {
        navigate("/login")
      }
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

  const handleAddServer = async (serverData: Omit<Server, "id">) => {
    try {
      console.log("Adding server:", serverData)

      const apiData = {
        name: serverData.name,
        address: serverData.ip,
        type: serverData.type,
      }

      const response = await serverService.createServer(apiData)
      console.log("Server created:", response)

      await loadServers()
      setIsAddModalOpen(false)

      alert("Servidor añadido exitosamente")
    } catch (error) {
      console.error("Failed to add server:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al añadir el servidor"
      alert(errorMessage)
    }
  }

  const handleEditServer = async (serverData: Server) => {
    try {
      console.log("Editing server:", serverData)

      await serverService.updateServer(serverData.id, serverData)

      setServers((prev) => prev.map((server) => (server.id === serverData.id ? serverData : server)))
      setIsEditModalOpen(false)
      setCurrentServer(null)

      alert("Servidor actualizado exitosamente")
    } catch (error) {
      console.error("Failed to edit server:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al actualizar el servidor"

      if (errorMessage.includes("not implemented")) {
        setServers((prev) => prev.map((server) => (server.id === serverData.id ? serverData : server)))
        setIsEditModalOpen(false)
        setCurrentServer(null)
        alert(
          "Servidor actualizado localmente. Funcionalidad de edición en el servidor será implementada próximamente.",
        )
      } else {
        alert(errorMessage)
      }
    }
  }

  const handleDeleteServer = async () => {
    if (!currentServer) return

    try {
      console.log("Deleting server:", currentServer.id)

      await serverService.deleteServer(currentServer.id)

      setServers((prev) => prev.filter((server) => server.id !== currentServer.id))
      setCurrentServer(null)
      setIsDeleteDialogOpen(false)

      alert("Servidor eliminado exitosamente")
    } catch (error) {
      console.error("Failed to delete server:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al eliminar el servidor"

      if (errorMessage.includes("not implemented")) {
        setServers((prev) => prev.filter((server) => server.id !== currentServer.id))
        setCurrentServer(null)
        setIsDeleteDialogOpen(false)
        alert(
          "Servidor eliminado localmente. Funcionalidad de eliminación en el servidor será implementada próximamente.",
        )
      } else {
        alert(errorMessage)
        setIsDeleteDialogOpen(false)
      }
    }
  }

  const handleRestartServer = async () => {
    if (!currentServer) return

    try {
      console.log("Restarting server:", currentServer.id)

      await serverService.restartServer(currentServer.id)

      setServers((prev) =>
        prev.map((server) =>
          server.id === currentServer.id
            ? {
                ...server,
                status: server.status === "offline" ? "online" : "restarting",
              }
            : server,
        ),
      )

      if (currentServer.status !== "offline") {
        setTimeout(() => {
          setServers((prev) =>
            prev.map((server) =>
              server.id === currentServer.id
                ? {
                    ...server,
                    status: "online",
                  }
                : server,
            ),
          )
        }, 3000)
      }

      setCurrentServer(null)
      setIsRestartDialogOpen(false)

      alert("Reinicio de servidor iniciado exitosamente")
    } catch (error) {
      console.error("Failed to restart server:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al reiniciar el servidor"

      if (errorMessage.includes("not implemented")) {
        setServers((prev) =>
          prev.map((server) =>
            server.id === currentServer.id
              ? {
                  ...server,
                  status: server.status === "offline" ? "online" : "restarting",
                }
              : server,
          ),
        )

        if (currentServer.status !== "offline") {
          setTimeout(() => {
            setServers((prev) =>
              prev.map((server) =>
                server.id === currentServer.id
                  ? {
                      ...server,
                      status: "online",
                    }
                  : server,
              ),
            )
          }, 3000)
        }

        setCurrentServer(null)
        setIsRestartDialogOpen(false)
        alert(
          "Estado del servidor actualizado localmente. Funcionalidad de reinicio en el servidor será implementada próximamente.",
        )
      } else {
        alert(errorMessage)
        setIsRestartDialogOpen(false)
      }
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
              <div className="flex rounded-md shadow-sm">
                <button
                  type="button"
                  className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium ${
                    viewMode === "grid"
                      ? "bg-sky-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  } border border-gray-300 focus:z-10 focus:outline-none`}
                  onClick={() => setViewMode("grid")}
                >
                  <FiGrid className="mr-2 h-4 w-4" />
                  Cuadrícula
                </button>
                <button
                  type="button"
                  className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ${
                    viewMode === "table"
                      ? "bg-sky-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  } border border-gray-300 focus:z-10 focus:outline-none`}
                  onClick={() => setViewMode("table")}
                >
                  <FiList className="mr-2 h-4 w-4" />
                  Tabla
                </button>
              </div>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <FiPlus className="mr-2 h-4 w-4" />
                Añadir Servidor
              </Button>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error al cargar servidores</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                  <div className="mt-4">
                    <div className="-mx-2 -my-1.5 flex">
                      <button
                        type="button"
                        onClick={handleRefresh}
                        className="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                      >
                        Reintentar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            {viewMode === "grid" ? (
              <ServerGrid
                servers={servers}
                onEdit={(server) => {
                  setCurrentServer(server)
                  setIsEditModalOpen(true)
                }}
                onDelete={(server) => {
                  setCurrentServer(server)
                  setIsDeleteDialogOpen(true)
                }}
                onRestart={(server) => {
                  setCurrentServer(server)
                  setIsRestartDialogOpen(true)
                }}
              />
            ) : (
              <ServerTable
                servers={servers}
                onEdit={(server) => {
                  setCurrentServer(server)
                  setIsEditModalOpen(true)
                }}
                onDelete={(server) => {
                  setCurrentServer(server)
                  setIsDeleteDialogOpen(true)
                }}
                onRestart={(server) => {
                  setCurrentServer(server)
                  setIsRestartDialogOpen(true)
                }}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />

      <Modals isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Añadir Servidor">
        <ServerForm onSubmit={handleAddServer} onCancel={() => setIsAddModalOpen(false)} />
      </Modals>

      <Modals isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Editar Servidor">
        {currentServer && (
          <ServerForm server={currentServer} onSubmit={handleEditServer} onCancel={() => setIsEditModalOpen(false)} />
        )}
      </Modals>

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteServer}
        title="Eliminar Servidor"
        message={`¿Estás seguro de que deseas eliminar el servidor "${currentServer?.name}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />

      <ConfirmationDialog
        isOpen={isRestartDialogOpen}
        onClose={() => setIsRestartDialogOpen(false)}
        onConfirm={handleRestartServer}
        title={currentServer?.status === "offline" ? "Iniciar Servidor" : "Reiniciar Servidor"}
        message={
          currentServer?.status === "offline"
            ? `¿Estás seguro de que deseas iniciar el servidor "${currentServer?.name}"?`
            : `¿Estás seguro de que deseas reiniciar el servidor "${currentServer?.name}"?`
        }
        confirmText={currentServer?.status === "offline" ? "Iniciar" : "Reiniciar"}
        cancelText="Cancelar"
        type="warning"
      />
    </div>
  )
}

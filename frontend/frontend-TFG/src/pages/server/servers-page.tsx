import { useState, useEffect } from "react"
import { FiPlus, FiGrid, FiList } from "react-icons/fi"
import { Header } from "../../components/layout/header"
import { Footer } from "../../components/layout/footer"
import { Button } from "../../components/ui/button"
import { ServerTable } from "../../components/servers/server-table"
import { ServerGrid } from "../../components/servers/server-grid"
import { ServerForm } from "../../components/servers/server-form"
import { Modals } from "../../components/ui/modals"
import { ConfirmationDialog } from "../../components/ui/confirmation-dialog"

const mockServers = [
  {
    id: "1",
    name: "Web Server",
    status: "online" as const,
    ip: "192.168.1.10",
    location: "Madrid, España",
    type: "virtual",
    os: "linux",
    cpu: 4,
    memory: 8,
    disk: 100,
  },
  {
    id: "2",
    name: "Database Server",
    status: "online" as const,
    ip: "192.168.1.11",
    location: "Barcelona, España",
    type: "physical",
    os: "linux",
    cpu: 8,
    memory: 16,
    disk: 500,
  },
  {
    id: "3",
    name: "Backup Server",
    status: "maintenance" as const,
    ip: "192.168.1.12",
    location: "Valencia, España",
    type: "cloud",
    os: "windows",
    cpu: 2,
    memory: 4,
    disk: 200,
  },
  {
    id: "4",
    name: "Development Server",
    status: "offline" as const,
    ip: "192.168.1.13",
    location: "Sevilla, España",
    type: "virtual",
    os: "linux",
    cpu: 2,
    memory: 4,
    disk: 50,
  },
  {
    id: "5",
    name: "Testing Server",
    status: "warning" as const,
    ip: "192.168.1.14",
    location: "Bilbao, España",
    type: "virtual",
    os: "windows",
    cpu: 2,
    memory: 4,
    disk: 50,
  },
]

interface Server {
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
}

export default function ServersPage() {
  const [servers, setServers] = useState<Server[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isRestartDialogOpen, setIsRestartDialogOpen] = useState(false)
  const [currentServer, setCurrentServer] = useState<Server | null>(null)

  useEffect(() => {
    // Traer servidores de la API
    setServers(mockServers)
  }, [])

  const handleAddServer = (serverData: Omit<Server, "id">) => {
    const newServer = {
      ...serverData,
      id: Date.now().toString(), // Sacamos el id de la API
    }
    setServers((prev) => [...prev, newServer])
    setIsAddModalOpen(false)
  }

  const handleEditServer = (serverData: Server) => {
    setServers((prev) => prev.map((server) => (server.id === serverData.id ? serverData : server)))
    setIsEditModalOpen(false)
    setCurrentServer(null)
  }

  const handleDeleteServer = () => {
    if (currentServer) {
      setServers((prev) => prev.filter((server) => server.id !== currentServer.id))
      setCurrentServer(null)
    }
    setIsDeleteDialogOpen(false)
  }

  const handleRestartServer = () => {
    if (currentServer) {
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

      // Logica para reiniciar, esto es simulado
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
    }
    setIsRestartDialogOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Servidores</h1>
            <div className="mt-4 flex space-x-3 sm:mt-0">
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

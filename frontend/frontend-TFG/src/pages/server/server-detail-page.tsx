import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  FiServer,
  FiCpu,
  FiHardDrive,
  FiWifi,
  FiGlobe,
  FiCalendar,
  FiTerminal,
  FiCode,
  FiFileText,
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi"
import { Header } from "../../components/layout/header"
import { Footer } from "../../components/layout/footer"
import { ServerStatusBadge } from "../../components/servers/server-status-badge"
import { Terminal } from "../../components/servers/details/terminal"
import { ScriptEditor } from "../../components/servers/details/script-editor"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { ConfirmationDialog } from "../../components/ui/confirmation-dialog"

// Mock data for servers (same as in servers-page.tsx)
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
    description:
      "Servidor web principal que aloja la aplicación de producción. Ejecuta Nginx como servidor web y Node.js para la aplicación backend.",
    created: "2023-01-15T10:30:00Z",
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
    description:
      "Servidor de base de datos principal. Ejecuta PostgreSQL para la base de datos principal y Redis para caché.",
    created: "2023-01-15T11:45:00Z",
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
    description: "Servidor de respaldo que almacena copias de seguridad diarias de todos los servidores.",
    created: "2023-02-20T09:15:00Z",
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
    description:
      "Servidor de desarrollo para pruebas internas. Contiene versiones de prueba de todas las aplicaciones.",
    created: "2023-03-10T14:20:00Z",
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
    description: "Servidor de pruebas para QA. Se utiliza para pruebas automatizadas y manuales antes de producción.",
    created: "2023-04-05T16:40:00Z",
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
  description: string
  created: string
}

export default function ServerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [server, setServer] = useState<Server | null>(null)
  const [activeTab, setActiveTab] = useState("details")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch server details from an API
    const foundServer = mockServers.find((s) => s.id === id)
    if (foundServer) {
      setServer(foundServer)
    } else {
      // If server not found, redirect to servers page
      navigate("/servers")
    }
  }, [id, navigate])

  const handleDeleteServer = () => {
    // In a real app, you would call an API to delete the server
    alert("Servidor eliminado correctamente")
    navigate("/servers")
  }

  if (!server) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p>Cargando...</p>
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
          {/* Back button and actions */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/servers")}
                className="mr-4 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <FiArrowLeft className="mr-1 h-5 w-5" />
                Volver a servidores
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{server.name}</h1>
              <div className="ml-3">
                <ServerStatusBadge status={server.status} />
              </div>
            </div>
            <div className="mt-4 flex space-x-3 sm:mt-0">
              <Button variant="outline" onClick={() => navigate(`/servers/${id}/edit`)}>
                <FiEdit2 className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button variant="danger" onClick={() => setIsDeleteDialogOpen(true)}>
                <FiTrash2 className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`border-b-2 py-4 px-1 text-sm font-medium ${
                  activeTab === "details"
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("details")}
              >
                <FiServer className="mr-2 -mt-0.5 inline-block h-5 w-5" />
                Detalles
              </button>
              <button
                className={`border-b-2 py-4 px-1 text-sm font-medium ${
                  activeTab === "terminal"
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("terminal")}
              >
                <FiTerminal className="mr-2 -mt-0.5 inline-block h-5 w-5" />
                Terminal
              </button>
              <button
                className={`border-b-2 py-4 px-1 text-sm font-medium ${
                  activeTab === "scripts"
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("scripts")}
              >
                <FiCode className="mr-2 -mt-0.5 inline-block h-5 w-5" />
                Scripts
              </button>
              <button
                className={`border-b-2 py-4 px-1 text-sm font-medium ${
                  activeTab === "reports"
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("reports")}
              >
                <FiFileText className="mr-2 -mt-0.5 inline-block h-5 w-5" />
                Informes
              </button>
            </nav>
          </div>

          {/* Tab content */}
          <div className="mt-6">
            {activeTab === "details" && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Server Info */}
                <Card className="lg:col-span-2">
                  <CardContent className="p-6">
                    <h2 className="mb-4 text-lg font-medium text-gray-900">Información del servidor</h2>
                    <div className="prose max-w-none">
                      <p>{server.description}</p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <h3 className="mb-3 text-sm font-medium text-gray-500">Detalles básicos</h3>
                        <dl className="space-y-3">
                          <div className="flex items-center">
                            <dt className="flex w-32 items-center text-sm font-medium text-gray-500">
                              <FiServer className="mr-2 h-5 w-5 text-gray-400" />
                              Nombre:
                            </dt>
                            <dd className="text-sm text-gray-900">{server.name}</dd>
                          </div>
                          <div className="flex items-center">
                            <dt className="flex w-32 items-center text-sm font-medium text-gray-500">
                              <FiWifi className="mr-2 h-5 w-5 text-gray-400" />
                              IP:
                            </dt>
                            <dd className="text-sm text-gray-900">{server.ip}</dd>
                          </div>
                          <div className="flex items-center">
                            <dt className="flex w-32 items-center text-sm font-medium text-gray-500">
                              <FiGlobe className="mr-2 h-5 w-5 text-gray-400" />
                              Ubicación:
                            </dt>
                            <dd className="text-sm text-gray-900">{server.location}</dd>
                          </div>
                          <div className="flex items-center">
                            <dt className="flex w-32 items-center text-sm font-medium text-gray-500">
                              <FiCalendar className="mr-2 h-5 w-5 text-gray-400" />
                              Creado:
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {new Date(server.created).toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div>
                        <h3 className="mb-3 text-sm font-medium text-gray-500">Especificaciones</h3>
                        <dl className="space-y-3">
                          <div className="flex items-center">
                            <dt className="flex w-32 items-center text-sm font-medium text-gray-500">
                              <FiServer className="mr-2 h-5 w-5 text-gray-400" />
                              Tipo:
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {server.type.charAt(0).toUpperCase() + server.type.slice(1)}
                            </dd>
                          </div>
                          <div className="flex items-center">
                            <dt className="flex w-32 items-center text-sm font-medium text-gray-500">
                              <FiServer className="mr-2 h-5 w-5 text-gray-400" />
                              Sistema:
                            </dt>
                            <dd className="text-sm text-gray-900">{server.os.toUpperCase()}</dd>
                          </div>
                          <div className="flex items-center">
                            <dt className="flex w-32 items-center text-sm font-medium text-gray-500">
                              <FiCpu className="mr-2 h-5 w-5 text-gray-400" />
                              CPU:
                            </dt>
                            <dd className="text-sm text-gray-900">{server.cpu} cores</dd>
                          </div>
                          <div className="flex items-center">
                            <dt className="flex w-32 items-center text-sm font-medium text-gray-500">
                              <FiHardDrive className="mr-2 h-5 w-5 text-gray-400" />
                              Memoria:
                            </dt>
                            <dd className="text-sm text-gray-900">{server.memory} GB</dd>
                          </div>
                          <div className="flex items-center">
                            <dt className="flex w-32 items-center text-sm font-medium text-gray-500">
                              <FiHardDrive className="mr-2 h-5 w-5 text-gray-400" />
                              Disco:
                            </dt>
                            <dd className="text-sm text-gray-900">{server.disk} GB</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Server Status */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="mb-4 text-lg font-medium text-gray-900">Estado actual</h2>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">CPU</span>
                          <span className="text-sm font-medium text-gray-900">45%</span>
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 rounded-full bg-green-500" style={{ width: "45%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">Memoria</span>
                          <span className="text-sm font-medium text-gray-900">60%</span>
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 rounded-full bg-yellow-500" style={{ width: "60%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">Disco</span>
                          <span className="text-sm font-medium text-gray-900">25%</span>
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 rounded-full bg-green-500" style={{ width: "25%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">Red</span>
                          <span className="text-sm font-medium text-gray-900">15 MB/s</span>
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 rounded-full bg-green-500" style={{ width: "30%" }}></div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="mb-3 text-sm font-medium text-gray-500">Tiempo de actividad</h3>
                        <p className="text-2xl font-semibold text-gray-900">23 días, 5 horas</p>
                        <p className="text-sm text-gray-500">Desde: 28 de abril, 2023</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "terminal" && <Terminal serverName={server.name} />}

            {activeTab === "scripts" && <ScriptEditor serverName={server.name} />}

            {activeTab === "reports" && (
              <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
                <div>
                  <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No hay informes disponibles</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Los informes estarán disponibles en futuras actualizaciones.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteServer}
        title="Eliminar Servidor"
        message={`¿Estás seguro de que deseas eliminar el servidor "${server.name}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  )
}

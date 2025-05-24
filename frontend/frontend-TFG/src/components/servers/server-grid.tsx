"use client"

import { FiEdit2, FiTrash2, FiCpu, FiHardDrive, FiWifi } from "react-icons/fi"
import { ServerStatusBadge } from "./server-status-badge"
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"

// First, import useNavigate from react-router-dom
import { useNavigate } from "react-router-dom"

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

interface ServerGridProps {
  servers: Server[]
  onEdit: (server: Server) => void
  onDelete: (server: Server) => void
  onRestart: (server: Server) => void
}

export function ServerGrid({ servers, onEdit, onDelete, onRestart }: ServerGridProps) {
  // Inside the ServerGrid function, add the navigate hook
  const navigate = useNavigate()

  // Add a handleCardClick function
  const handleCardClick = (serverId: string) => {
    navigate(`/servers/${serverId}`)
  }

  if (servers.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
        <div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay servidores</h3>
          <p className="mt-1 text-sm text-gray-500">Comienza añadiendo un nuevo servidor.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {servers.map((server) => (
        <Card
          key={server.id}
          className="h-full cursor-pointer transition-shadow hover:shadow-md"
          onClick={() => handleCardClick(server.id)}
        >
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium">{server.name}</h3>
              <ServerStatusBadge status={server.status} />
            </div>
            <div className="flex space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(server)
                }}
                className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-sky-600"
                title="Editar"
              >
                <FiEdit2 className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(server)
                }}
                className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                title="Eliminar"
              >
                <FiTrash2 className="h-4 w-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center text-sm text-gray-500">
                <FiWifi className="mr-2" />
                <span>{server.ip}</span>
              </div>
              <div className="text-sm text-gray-500">{server.location}</div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div>
                  <span className="font-medium">Tipo:</span>{" "}
                  {server.type.charAt(0).toUpperCase() + server.type.slice(1)}
                </div>
                <div>
                  <span className="font-medium">OS:</span> {server.os.toUpperCase()}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <FiCpu className="mr-2" />
                    <span>CPU</span>
                  </div>
                  <div className="font-medium">{server.cpu} cores</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <FiHardDrive className="mr-2" />
                    <span>Memoria</span>
                  </div>
                  <div className="font-medium">{server.memory} GB</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <FiHardDrive className="mr-2" />
                    <span>Disco</span>
                  </div>
                  <div className="font-medium">{server.disk} GB</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              variant={server.status === "offline" ? "primary" : "secondary"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onRestart(server)
              }}
              disabled={server.status === "restarting"}
            >
              {server.status === "offline"
                ? "Iniciar"
                : server.status === "restarting"
                  ? "Reiniciando..."
                  : "Reiniciar"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

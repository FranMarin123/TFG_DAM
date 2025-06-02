import { FiWifi } from "react-icons/fi"
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"

import { useNavigate } from "react-router-dom"

interface Server {
  id: string
  name: string
  ip: string
  type: string
}

interface ServerGridProps {
  servers: Server[]
  onRestart: (server: Server) => void
}

export function ServerGrid({ servers, onRestart }: ServerGridProps) {
  const navigate = useNavigate()

  const handleCardClick = (e: React.MouseEvent, serverId: string) => {
    // Evitar navegación si se hace clic en un botón
    if ((e.target as HTMLElement).closest("button")) {
      return
    }

    console.log("Navegando al servidor con ID:", serverId)
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
          onClick={(e) => handleCardClick(e, server.id)}
        >
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">{server.name}</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <FiWifi className="mr-2 h-4 w-4" />
                <span>{server.ip}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Tipo:</span> {server.type.charAt(0).toUpperCase() + server.type.slice(1)}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onRestart(server)
              }}
            >
              Reiniciar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
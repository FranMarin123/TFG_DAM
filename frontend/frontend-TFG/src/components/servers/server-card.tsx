"use client"

import { FiCpu, FiHardDrive, FiWifi, FiMoreVertical } from "react-icons/fi"
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card"
import { ServerStatusBadge } from "./server-status-badge"
import { Button } from "../ui/button"

interface ServerCardProps {
  server: {
    id: string
    name: string
    status: "online" | "offline" | "maintenance" | "warning" | "restarting"
    ip: string
    location: string
    cpu: number
    memory: number
    disk: number
  }
  onViewDetails: (id: string) => void
  onRestart: (id: string) => void
}

export function ServerCard({ server, onViewDetails, onRestart }: ServerCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium">{server.name}</h3>
          <ServerStatusBadge status={server.status} />
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <FiMoreVertical />
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center text-sm text-gray-500">
            <FiWifi className="mr-2" />
            <span>{server.ip}</span>
          </div>
          <div className="text-sm text-gray-500">{server.location}</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <FiCpu className="mr-2" />
                <span>CPU</span>
              </div>
              <div className="font-medium">{server.cpu}%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  server.cpu > 80 ? "bg-red-500" : server.cpu > 50 ? "bg-yellow-500" : "bg-green-500"
                }`}
                style={{ width: `${server.cpu}%` }}
              ></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <FiHardDrive className="mr-2" />
                <span>Memoria</span>
              </div>
              <div className="font-medium">{server.memory}%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  server.memory > 80 ? "bg-red-500" : server.memory > 50 ? "bg-yellow-500" : "bg-green-500"
                }`}
                style={{ width: `${server.memory}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => onViewDetails(server.id)}>
          Ver detalles
        </Button>
        <Button
          variant={server.status === "offline" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onRestart(server.id)}
          disabled={server.status === "restarting"}
        >
          {server.status === "offline" ? "Iniciar" : server.status === "restarting" ? "Reiniciando..." : "Reiniciar"}
        </Button>
      </CardFooter>
    </Card>
  )
}

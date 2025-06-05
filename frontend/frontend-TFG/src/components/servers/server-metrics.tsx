import { Card, CardContent, CardHeader } from "../ui/card"
import { Button } from "../ui/button"
import { FiCpu, FiHardDrive, FiWifi, FiRefreshCw } from "react-icons/fi"
import type { ServerMetrics } from "../../services/server.service"

interface ServerMetricsProps {
  metrics: ServerMetrics | null
  isLoading: boolean
  onRefresh: () => void
}

export function ServerMetrics({ metrics, isLoading, onRefresh }: ServerMetricsProps) {
  if (!metrics) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-medium">Métricas del Servidor</h3>
          <Button variant="outline" size="sm" onClick={onRefresh} disabled={isLoading}>
            <FiRefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No hay métricas disponibles. Conéctate al servidor para ver las métricas.</p>
        </CardContent>
      </Card>
    )
  }

  const getProgressColor = (value: number) => {
    if (isNaN(value)) return "bg-gray-300" 
    if (value > 80) return "bg-red-500"
    if (value > 60) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-medium">Métricas del Servidor</h3>
        <Button variant="outline" size="sm" onClick={onRefresh} disabled={isLoading}>
          <FiRefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Actualizar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiCpu className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-sm font-medium">CPU</span>
              </div>
              <span className="text-sm font-bold">{isNaN(metrics.cpu) ? "N/A" : `${metrics.cpu.toFixed(1)}%`}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getProgressColor(metrics.cpu)}`}
                style={{ width: `${isNaN(metrics.cpu) ? 0 : Math.min(metrics.cpu, 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiHardDrive className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm font-medium">Memoria</span>
              </div>
              <span className="text-sm font-bold">
                {isNaN(metrics.memory) ? "N/A" : `${metrics.memory.toFixed(1)}%`}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getProgressColor(metrics.memory)}`}
                style={{ width: `${isNaN(metrics.memory) ? 0 : Math.min(metrics.memory, 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiHardDrive className="h-4 w-4 mr-2 text-purple-500" />
                <span className="text-sm font-medium">Disco</span>
              </div>
              <span className="text-sm font-bold">{isNaN(metrics.disk) ? "N/A" : `${metrics.disk.toFixed(1)}%`}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getProgressColor(metrics.disk)}`}
                style={{ width: `${isNaN(metrics.disk) ? 0 : Math.min(metrics.disk, 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiWifi className="h-4 w-4 mr-2 text-orange-500" />
                <span className="text-sm font-medium">Red</span>
              </div>
              <span className="text-sm font-bold">{isNaN(metrics.net) ? "N/A" : `${metrics.net.toFixed(1)} MB/s`}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-orange-500"
                style={{ width: `${isNaN(metrics.net) ? 0 : Math.min((metrics.net / 100) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
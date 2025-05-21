import type React from "react"
import { Card, CardContent } from "../ui/card"
import { FiCpu, FiHardDrive, FiDownload } from "react-icons/fi"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

function MetricCard({ title, value, icon, trend, className = "" }: MetricCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {trend && (
              <p className={`text-xs mt-1 flex items-center ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </p>
            )}
          </div>
          <div className="h-12 w-12 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

interface ServerMetricsProps {
  metrics: {
    cpu: number
    memory: number
    disk: number
    network: {
      download: number
      upload: number
    }
  }
}

export function ServerMetrics({ metrics }: ServerMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="CPU"
        value={`${metrics.cpu}%`}
        icon={<FiCpu className="h-6 w-6" />}
        trend={{ value: 2.5, isPositive: false }}
      />
      <MetricCard
        title="Memoria"
        value={`${metrics.memory}%`}
        icon={<FiHardDrive className="h-6 w-6" />}
        trend={{ value: 1.2, isPositive: true }}
      />
      <MetricCard
        title="Disco"
        value={`${metrics.disk}%`}
        icon={<FiHardDrive className="h-6 w-6" />}
        trend={{ value: 0.8, isPositive: false }}
      />
      <MetricCard
        title="Red"
        value={`${metrics.network.download} MB/s`}
        icon={<FiDownload className="h-6 w-6" />}
        trend={{ value: 3.4, isPositive: true }}
      />
    </div>
  )
}

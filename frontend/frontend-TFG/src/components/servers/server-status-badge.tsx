import { Badge } from "../ui/badge"

type ServerStatus = "online" | "offline" | "maintenance" | "warning" | "restarting"

interface ServerStatusBadgeProps {
  status: ServerStatus
  className?: string
}

export function ServerStatusBadge({ status, className = "" }: ServerStatusBadgeProps) {
  const statusMap: Record<
    ServerStatus,
    { variant: "success" | "warning" | "error" | "info" | "default"; label: string }
  > = {
    online: { variant: "success", label: "En línea" },
    offline: { variant: "error", label: "Desconectado" },
    maintenance: { variant: "info", label: "Mantenimiento" },
    warning: { variant: "warning", label: "Advertencia" },
    restarting: { variant: "warning", label: "Reiniciando" },
  }

  const { variant, label } = statusMap[status]

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  )
}

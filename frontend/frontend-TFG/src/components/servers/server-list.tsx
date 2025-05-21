import { ServerCard } from "./server-card"

interface ServerListProps {
  servers: Array<{
    id: string
    name: string
    status: "online" | "offline" | "maintenance" | "warning" | "restarting"
    ip: string
    location: string
    cpu: number
    memory: number
    disk: number
  }>
  onViewDetails: (id: string) => void
  onRestart: (id: string) => void
}

export function ServerList({ servers, onViewDetails, onRestart }: ServerListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {servers.map((server) => (
        <ServerCard key={server.id} server={server} onViewDetails={onViewDetails} onRestart={onRestart} />
      ))}
    </div>
  )
}

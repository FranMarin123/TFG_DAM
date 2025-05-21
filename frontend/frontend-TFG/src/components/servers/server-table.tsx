import { useState } from "react"
import { FiEdit2, FiTrash2, FiSearch, FiRefreshCw } from "react-icons/fi"
import { ServerStatusBadge } from "./server-status-badge"

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

interface ServerTableProps {
  servers: Server[]
  onEdit: (server: Server) => void
  onDelete: (server: Server) => void
  onRestart: (server: Server) => void
}

export function ServerTable({ servers, onEdit, onDelete, onRestart }: ServerTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof Server>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: keyof Server) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredServers = servers.filter(
    (server) =>
      server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedServers = [...filteredServers].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortDirection === "asc" ? -1 : 1
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === "asc" ? 1 : -1
    }
    return 0
  })

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 p-4">
        <div className="flex flex-col items-start justify-between space-y-3 sm:flex-row sm:items-center sm:space-y-0">
          <h2 className="text-lg font-medium text-gray-900">Servidores</h2>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar servidores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center cursor-pointer">
                  Nombre
                  {sortField === "name" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center cursor-pointer">
                  Estado
                  {sortField === "status" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                onClick={() => handleSort("ip")}
              >
                <div className="flex items-center cursor-pointer">
                  IP
                  {sortField === "ip" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                onClick={() => handleSort("location")}
              >
                <div className="flex items-center cursor-pointer">
                  Ubicación
                  {sortField === "location" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                onClick={() => handleSort("type")}
              >
                <div className="flex items-center cursor-pointer">
                  Tipo
                  {sortField === "type" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {sortedServers.length > 0 ? (
              sortedServers.map((server) => (
                <tr key={server.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{server.name}</div>
                    <div className="text-sm text-gray-500">{server.os}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <ServerStatusBadge status={server.status} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{server.ip}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{server.location}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {server.type.charAt(0).toUpperCase() + server.type.slice(1)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onRestart(server)}
                        className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-sky-600"
                        title="Reiniciar"
                      >
                        <FiRefreshCw className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onEdit(server)}
                        className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-sky-600"
                        title="Editar"
                      >
                        <FiEdit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onDelete(server)}
                        className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                        title="Eliminar"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No se encontraron servidores
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import type React from "react"

import { useState } from "react"
import { FiUser, FiLock, FiEye, FiEyeOff, FiServer } from "react-icons/fi"
import { Button } from "../ui/button"
import { Modals } from "../ui/modals"

interface ServerConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  serverName: string
  serverIP: string
  onConnect: (username: string, password: string) => Promise<boolean>
  isConnecting: boolean
}

export function ServerConnectionModal({
  isOpen,
  onClose,
  serverName,
  serverIP,
  onConnect,
  isConnecting,
}: ServerConnectionModalProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim() || !password.trim()) {
      setError("Usuario y contraseña del servidor son requeridos")
      return
    }

    setError(null)

    try {
      const success = await onConnect(username, password)
      if (success) {
        setUsername("")
        setPassword("")
        onClose()
      } else {
        setError("No se pudo conectar al servidor. Verifica las credenciales SSH/RDP.")
      }
    } catch (error) {
      console.error("Connection error:", error)
      setError(error instanceof Error ? error.message : "Error al conectar con el servidor")
    }
  }

  const handleClose = () => {
    setUsername("")
    setPassword("")
    setError(null)
    onClose()
  }

  return (
    <Modals isOpen={isOpen} onClose={handleClose} title="Conectar al Servidor">
      <div className="p-6">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
            <FiServer className="h-6 w-6 text-sky-600" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Conectar al Servidor</h3>
          <p className="mt-1 text-sm text-gray-500">
            <strong>{serverName}</strong> ({serverIP})
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Usuario SSH/RDP
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isConnecting}
                className="block w-full rounded-md border border-gray-300 pl-10 py-2 focus:border-sky-500 focus:ring-sky-500 sm:text-sm disabled:bg-gray-100"
                placeholder="root, administrator, ubuntu..."
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña SSH/RDP
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isConnecting}
                className="block w-full rounded-md border border-gray-300 pl-10 pr-10 py-2 focus:border-sky-500 focus:ring-sky-500 sm:text-sm disabled:bg-gray-100"
                placeholder="Contraseña del servidor"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <FiEye className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isConnecting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isConnecting || !username.trim() || !password.trim()}>
              {isConnecting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Conectando...
                </div>
              ) : (
                "Conectar"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modals>
  )
}
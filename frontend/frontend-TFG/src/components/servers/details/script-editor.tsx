import { useState } from "react"
import { Button } from "../../ui/button"
import { serverService } from "../../../services/server.service"

interface ScriptEditorProps {
  serverId: string
  serverName: string
  className?: string
}

export function ScriptEditor({ serverId, serverName, className }: ScriptEditorProps) {
  const [script, setScript] = useState("")
  const [output, setOutput] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)

  const executeScript = async () => {
    if (!script.trim()) {
      setOutput("Error: El script está vacío")
      return
    }

    setIsExecuting(true)
    setOutput("Ejecutando script...")

    try {
      const result = await serverService.executeScript(serverId, script)
      setOutput(result)
    } catch (error) {
      console.error("Script execution error:", error)
      const errorMessage = error instanceof Error ? error.message : "Error ejecutando script"
      setOutput(`Error: ${errorMessage}`)
    } finally {
      setIsExecuting(false)
    }
  }

  const loadTemplate = () => {
    setScript(`#!/bin/bash

# Script de ejemplo para Linux/Unix
echo "Iniciando script..."

# Obtener información del sistema
echo "Sistema operativo: $(uname -s)"
echo "Nombre del host: $(hostname)"
echo "Usuario actual: $(whoami)"
echo "Directorio actual: $(pwd)"

# Listar archivos
echo "Archivos en el directorio actual:"
ls -la

echo "Script completado."
`)
  }

  return (
    <div className={`bg-white rounded-lg border ${className || ""}`}>
      <div className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Editor de Scripts - {serverName}</h3>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" onClick={loadTemplate}>
              Plantilla
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Script (Bash)</label>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Escribe tu script bash aquí..."
              className="w-full h-64 p-3 border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isExecuting}
            />
          </div>

          <div className="flex space-x-2">
            <Button onClick={executeScript} disabled={isExecuting || !script.trim()}>
              {isExecuting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Ejecutando...
                </>
              ) : (
                "Ejecutar Script"
              )}
            </Button>
            <Button variant="outline" onClick={() => setScript("")} disabled={isExecuting}>
              Limpiar
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resultado</label>
            <div className="w-full h-64 p-3 bg-gray-900 text-gray-300 rounded-md font-mono text-sm overflow-y-auto whitespace-pre-wrap">
              {output || "El resultado del script aparecerá aquí..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

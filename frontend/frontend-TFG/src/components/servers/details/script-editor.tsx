"use client"

import { useState } from "react"
import { Button } from "../../ui/button"
import { serverService } from "../../../services/server.service"

interface ScriptEditorProps {
  serverId: string
  serverName: string
  className?: string
}

interface SavedScript {
  id: string
  name: string
  content: string
  type: "bash" | "batch"
  created: Date
}

export function ScriptEditor({ serverId, serverName, className }: ScriptEditorProps) {
  const [script, setScript] = useState("")
  const [scriptType, setScriptType] = useState<"bash" | "batch">("bash")
  const [output, setOutput] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [savedScripts, setSavedScripts] = useState<SavedScript[]>([])
  const [scriptName, setScriptName] = useState("")
  const [showSaveDialog, setShowSaveDialog] = useState(false)

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

  const saveScript = () => {
    if (!scriptName.trim() || !script.trim()) {
      alert("Por favor, proporciona un nombre y contenido para el script")
      return
    }

    const newScript: SavedScript = {
      id: Date.now().toString(),
      name: scriptName,
      content: script,
      type: scriptType,
      created: new Date(),
    }

    setSavedScripts((prev) => [...prev, newScript])
    setScriptName("")
    setShowSaveDialog(false)
    alert("Script guardado exitosamente")
  }

  const loadScript = (savedScript: SavedScript) => {
    setScript(savedScript.content)
    setScriptType(savedScript.type)
  }

  const deleteScript = (scriptId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este script?")) {
      setSavedScripts((prev) => prev.filter((s) => s.id !== scriptId))
    }
  }

  const getScriptTemplate = (type: "bash" | "batch") => {
    switch (type) {
      case "bash":
        return `#!/bin/bash

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
`
      case "batch":
        return `@echo off
REM Script de ejemplo para Windows

echo Iniciando script...

REM Obtener información del sistema
echo Sistema operativo: %OS%
echo Nombre del equipo: %COMPUTERNAME%
echo Usuario actual: %USERNAME%
echo Directorio actual: %CD%

REM Listar archivos
echo Archivos en el directorio actual:
dir

echo Script completado.
`
    }
  }

  const loadTemplate = () => {
    setScript(getScriptTemplate(scriptType))
  }

  return (
    <div className={`bg-white rounded-lg border ${className || ""}`}>
      {/* Header */}
      <div className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Editor de Scripts - {serverName}</h3>
          <div className="flex items-center space-x-2">
            <select
              value={scriptType}
              onChange={(e) => setScriptType(e.target.value as "bash" | "batch")}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="bash">Bash (Linux/Unix)</option>
              <option value="batch">Batch (Windows)</option>
            </select>
            <Button size="sm" variant="outline" onClick={loadTemplate}>
              Plantilla
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowSaveDialog(true)}>
              Guardar
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {/* Script Editor */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Script ({scriptType === "bash" ? "Bash" : "Batch"})
            </label>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder={`Escribe tu script ${scriptType} aquí...`}
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

        {/* Output Panel */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resultado</label>
            <div className="w-full h-64 p-3 bg-gray-900 text-gray-300 rounded-md font-mono text-sm overflow-y-auto whitespace-pre-wrap">
              {output || "El resultado del script aparecerá aquí..."}
            </div>
          </div>

          {savedScripts.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scripts Guardados</label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {savedScripts.map((savedScript) => (
                  <div key={savedScript.id} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{savedScript.name}</div>
                      <div className="text-xs text-gray-500">
                        {savedScript.type} - {savedScript.created.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" onClick={() => loadScript(savedScript)}>
                        Cargar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteScript(savedScript.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-medium mb-4">Guardar Script</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del script</label>
                <input
                  type="text"
                  value={scriptName}
                  onChange={(e) => setScriptName(e.target.value)}
                  placeholder="Ej: backup-database"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={saveScript}>Guardar</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
"use client"

import { useState } from "react"
import { FiCode, FiSave, FiPlay } from "react-icons/fi"

interface ScriptEditorProps {
  serverName: string
}

export function ScriptEditor({ serverName }: ScriptEditorProps) {
  const [scriptType, setScriptType] = useState<"linux" | "windows">("linux")
  const [script, setScript] = useState(
    scriptType === "linux"
      ? `#!/bin/bash
# Script de ejemplo para Linux
echo "Iniciando script en ${serverName}..."
# Listar directorios
ls -la
# Verificar espacio en disco
df -h
echo "Script completado."`
      : `@echo off
REM Script de ejemplo para Windows
echo Iniciando script en ${serverName}...
REM Listar directorios
dir
REM Verificar espacio en disco
wmic logicaldisk get deviceid, size, freespace
echo Script completado.`,
  )

  const handleScriptTypeChange = (type: "linux" | "windows") => {
    setScriptType(type)
    // Update script template when changing type
    if (type === "linux") {
      setScript(`#!/bin/bash
# Script de ejemplo para Linux
echo "Iniciando script en ${serverName}..."
# Listar directorios
ls -la
# Verificar espacio en disco
df -h
echo "Script completado."`)
    } else {
      setScript(`@echo off
REM Script de ejemplo para Windows
echo Iniciando script en ${serverName}...
REM Listar directorios
dir
REM Verificar espacio en disco
wmic logicaldisk get deviceid, size, freespace
echo Script completado.`)
    }
  }

  const handleSave = () => {
    // Mock save functionality
    alert("Script guardado correctamente.")
  }

  const handleRun = () => {
    // Mock run functionality
    alert("Ejecutando script... (Funcionalidad no implementada)")
  }

  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
        <div className="flex items-center">
          <FiCode className="mr-2 h-5 w-5 text-gray-500" />
          <span className="font-medium">Editor de Scripts - {serverName}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-600">Tipo:</span>
            <div className="relative inline-block w-32">
              <select
                value={scriptType}
                onChange={(e) => handleScriptTypeChange(e.target.value as "linux" | "windows")}
                className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-10 text-sm leading-6 text-gray-900 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
              >
                <option value="linux">Linux (Bash)</option>
                <option value="windows">Windows (Batch)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            <FiSave className="mr-1.5 h-4 w-4" />
            Guardar
          </button>
          <button
            onClick={handleRun}
            className="inline-flex items-center rounded-md border border-transparent bg-sky-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            <FiPlay className="mr-1.5 h-4 w-4" />
            Ejecutar
          </button>
        </div>
      </div>
      <div className="flex-grow p-0">
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          className="h-full w-full resize-none border-0 bg-gray-50 font-mono text-sm focus:outline-none focus:ring-0"
          style={{
            minHeight: "calc(100vh - 300px)",
            padding: "1rem",
            lineHeight: "1.5",
            tabSize: 2,
          }}
          spellCheck={false}
        />
      </div>
    </div>
  )
}

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { serverService } from "../../../services/server.service"

interface TerminalProps {
  serverId: string
  serverName: string
  className?: string
}

interface TerminalLine {
  id: string
  type: "command" | "output" | "error"
  content: string
  timestamp: Date
}

export function Terminal({ serverId, serverName, className }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "welcome",
      type: "output",
      content: `Conectado a ${serverName}. Escribe 'help' para ver comandos disponibles.`,
      timestamp: new Date(),
    },
  ])
  const [currentCommand, setCurrentCommand] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const addLine = (type: "command" | "output" | "error", content: string) => {
    const newLine: TerminalLine = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    }
    setLines((prev) => [...prev, newLine])
  }

  const executeCommand = async (command: string) => {
    if (!command.trim()) return

    setCommandHistory((prev) => [...prev, command])
    setHistoryIndex(-1)

    addLine("command", `$ ${command}`)

    if (command.toLowerCase() === "help") {
      addLine("output", "Comandos disponibles:")
      addLine("output", "  help - Muestra esta ayuda")
      addLine("output", "  clear - Limpia la terminal")
      addLine("output", "  ls - Lista archivos y directorios")
      addLine("output", "  pwd - Muestra el directorio actual")
      addLine("output", "  whoami - Muestra el usuario actual")
      addLine("output", "  date - Muestra la fecha y hora")
      addLine("output", "  uname -a - Información del sistema")
      addLine("output", "")
      return
    }

    if (command.toLowerCase() === "clear") {
      setLines([
        {
          id: "welcome",
          type: "output",
          content: `Conectado a ${serverName}. Escribe 'help' para ver comandos disponibles.`,
          timestamp: new Date(),
        },
      ])
      return
    }

    setIsExecuting(true)
    try {
      const result = await serverService.executeCommand(serverId, command)
      addLine("output", result)
    } catch (error) {
      console.error("Command execution error:", error)
      const errorMessage = error instanceof Error ? error.message : "Error ejecutando comando"
      addLine("error", `Error: ${errorMessage}`)
    } finally {
      setIsExecuting(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentCommand.trim() && !isExecuting) {
      executeCommand(currentCommand.trim())
      setCurrentCommand("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentCommand("")
        } else {
          setHistoryIndex(newIndex)
          setCurrentCommand(commandHistory[newIndex])
        }
      }
    }
  }

  const getLineClassName = (type: "command" | "output" | "error") => {
    switch (type) {
      case "command":
        return "text-blue-400 font-medium"
      case "error":
        return "text-red-400"
      case "output":
      default:
        return "text-gray-300"
    }
  }

  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden ${className || ""}`}>
      <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-gray-300 text-sm ml-4">Terminal - {serverName}</span>
      </div>

      <div
        ref={terminalRef}
        className="p-4 h-96 overflow-y-auto font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line) => (
          <div key={line.id} className={`mb-1 ${getLineClassName(line.type)}`}>
            {line.content}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isExecuting}
            className="flex-1 bg-transparent text-gray-300 outline-none"
            placeholder={isExecuting ? "Ejecutando..." : "Escribe un comando..."}
            autoComplete="off"
          />
          {isExecuting && (
            <div className="ml-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { FiTerminal } from "react-icons/fi"

interface TerminalProps {
  serverName: string
}

export function Terminal({ serverName }: TerminalProps) {
  const [history, setHistory] = useState<Array<{ type: "command" | "output"; content: string }>>([
    {
      type: "output",
      content: `Conectado a ${serverName}\nÚltimo inicio de sesión: ${new Date().toLocaleString()}\nEscriba 'help' para ver los comandos disponibles.`,
    },
  ])
  const [command, setCommand] = useState("")
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!command.trim()) return

    // Add command to history
    setHistory((prev) => [...prev, { type: "command", content: command }])

    // Process command (mock responses)
    let output = ""
    const cmd = command.trim().toLowerCase()

    if (cmd === "help") {
      output = `Comandos disponibles:
- help: Muestra esta ayuda
- ls: Lista archivos
- ps: Muestra procesos
- uptime: Muestra tiempo de actividad
- clear: Limpia la terminal
- exit: Cierra la sesión`
    } else if (cmd === "ls") {
      output = `drwxr-xr-x  2 root root  4096 May 15 10:30 etc
drwxr-xr-x  3 root root  4096 May 15 10:30 var
drwxr-xr-x  4 root root  4096 May 15 10:30 usr
-rw-r--r--  1 root root 12345 May 15 10:30 server.log
-rw-r--r--  1 root root  5678 May 15 10:30 config.json`
    } else if (cmd === "ps") {
      output = `  PID TTY          TIME CMD
 1234 pts/0    00:00:01 nginx
 1235 pts/0    00:00:02 node
 1236 pts/0    00:00:00 mongod
 1237 pts/0    00:00:01 redis-server`
    } else if (cmd === "uptime") {
      output = ` 14:30:15 up 23 days, 5:14, 2 users, load average: 0.15, 0.10, 0.09`
    } else if (cmd === "clear") {
      setHistory([])
      setCommand("")
      return
    } else if (cmd === "exit") {
      output = "Sesión cerrada."
    } else {
      output = `bash: ${command}: comando no encontrado`
    }

    // Add output to history
    setHistory((prev) => [...prev, { type: "output", content: output }])
    setCommand("")
  }

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Focus input when terminal is clicked
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div
      className="flex h-full flex-col rounded-lg border border-gray-200 bg-black text-white shadow-sm"
      onClick={focusInput}
    >
      <div className="flex items-center border-b border-gray-700 bg-gray-900 px-4 py-2">
        <FiTerminal className="mr-2 h-5 w-5" />
        <span className="font-medium">Terminal - {serverName}</span>
      </div>
      <div
        ref={terminalRef}
        className="flex-grow overflow-auto p-4 font-mono text-sm"
        style={{ maxHeight: "calc(100vh - 300px)" }}
      >
        {history.map((item, index) => (
          <div key={index} className="mb-1">
            {item.type === "command" ? (
              <div>
                <span className="text-green-400">usuario@{serverName.toLowerCase()}:~$</span>{" "}
                <span className="text-white">{item.content}</span>
              </div>
            ) : (
              <div className="whitespace-pre-wrap text-gray-300">{item.content}</div>
            )}
          </div>
        ))}
        <form onSubmit={handleCommand} className="mt-2 flex">
          <span className="text-green-400">usuario@{serverName.toLowerCase()}:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="ml-2 flex-grow bg-transparent text-white focus:outline-none"
            autoFocus
          />
        </form>
      </div>
    </div>
  )
}

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FiServer, FiGlobe, FiCpu, FiHardDrive } from "react-icons/fi"
import { Button } from "../ui/button"

interface ServerFormData {
  id?: string
  name: string
  ip: string
  location: string
  type: string
  os: string
  cpu: number
  memory: number
  disk: number
  status: "online" | "offline" | "maintenance" | "warning" | "restarting"
}

interface ServerFormProps {
  server?: ServerFormData
  onSubmit: (data: ServerFormData) => void
  onCancel: () => void
}

export function ServerForm({ server, onSubmit, onCancel }: ServerFormProps) {
  const [formData, setFormData] = useState<ServerFormData>({
    name: "",
    ip: "",
    location: "",
    type: "virtual",
    os: "linux",
    cpu: 1,
    memory: 1,
    disk: 10,
    status: "offline",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ServerFormData, string>>>({})

  useEffect(() => {
    if (server) {
      setFormData(server)
    }
  }, [server])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) : value,
    }))

    if (errors[name as keyof ServerFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ServerFormData, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.ip.trim()) {
      newErrors.ip = "La dirección IP es requerida"
    } else if (!/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(formData.ip)) {
      newErrors.ip = "Formato de IP inválido"
    }

    if (!formData.location.trim()) {
      newErrors.location = "La ubicación es requerida"
    }

    if (formData.cpu <= 0) {
      newErrors.cpu = "El CPU debe ser mayor que 0"
    }

    if (formData.memory <= 0) {
      newErrors.memory = "La memoria debe ser mayor que 0"
    }

    if (formData.disk <= 0) {
      newErrors.disk = "El disco debe ser mayor que 0"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validate()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre del servidor
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiServer className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } pl-10 py-2 focus:border-sky-500 focus:ring-sky-500 sm:text-sm`}
            placeholder="Servidor Web Principal"
          />
        </div>
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="ip" className="block text-sm font-medium text-gray-700">
          Dirección IP
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiGlobe className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="ip"
            name="ip"
            value={formData.ip}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              errors.ip ? "border-red-500" : "border-gray-300"
            } pl-10 py-2 focus:border-sky-500 focus:ring-sky-500 sm:text-sm`}
            placeholder="192.168.1.1"
          />
        </div>
        {errors.ip && <p className="mt-1 text-sm text-red-600">{errors.ip}</p>}
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Ubicación
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.location ? "border-red-500" : "border-gray-300"
          } py-2 px-3 focus:border-sky-500 focus:ring-sky-500 sm:text-sm`}
          placeholder="Madrid, España"
        />
        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Tipo
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
          >
            <option value="virtual">Virtual</option>
            <option value="physical">Físico</option>
            <option value="cloud">Cloud</option>
          </select>
        </div>

        <div>
          <label htmlFor="os" className="block text-sm font-medium text-gray-700">
            Sistema Operativo
          </label>
          <select
            id="os"
            name="os"
            value={formData.os}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
          >
            <option value="linux">Linux</option>
            <option value="windows">Windows</option>
            <option value="macos">macOS</option>
            <option value="other">Otro</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="cpu" className="block text-sm font-medium text-gray-700">
            CPU (cores)
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiCpu className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="cpu"
              name="cpu"
              min="1"
              value={formData.cpu}
              onChange={handleChange}
              className={`block w-full rounded-md border ${
                errors.cpu ? "border-red-500" : "border-gray-300"
              } pl-10 py-2 focus:border-sky-500 focus:ring-sky-500 sm:text-sm`}
            />
          </div>
          {errors.cpu && <p className="mt-1 text-sm text-red-600">{errors.cpu}</p>}
        </div>

        <div>
          <label htmlFor="memory" className="block text-sm font-medium text-gray-700">
            Memoria (GB)
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiHardDrive className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="memory"
              name="memory"
              min="1"
              value={formData.memory}
              onChange={handleChange}
              className={`block w-full rounded-md border ${
                errors.memory ? "border-red-500" : "border-gray-300"
              } pl-10 py-2 focus:border-sky-500 focus:ring-sky-500 sm:text-sm`}
            />
          </div>
          {errors.memory && <p className="mt-1 text-sm text-red-600">{errors.memory}</p>}
        </div>

        <div>
          <label htmlFor="disk" className="block text-sm font-medium text-gray-700">
            Disco (GB)
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiHardDrive className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="disk"
              name="disk"
              min="1"
              value={formData.disk}
              onChange={handleChange}
              className={`block w-full rounded-md border ${
                errors.disk ? "border-red-500" : "border-gray-300"
              } pl-10 py-2 focus:border-sky-500 focus:ring-sky-500 sm:text-sm`}
            />
          </div>
          {errors.disk && <p className="mt-1 text-sm text-red-600">{errors.disk}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Estado
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
        >
          <option value="online">En línea</option>
          <option value="offline">Desconectado</option>
          <option value="maintenance">Mantenimiento</option>
          <option value="warning">Advertencia</option>
          <option value="restarting">Reiniciando</option>
        </select>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{server ? "Actualizar" : "Añadir"} Servidor</Button>
      </div>
    </form>
  )
}

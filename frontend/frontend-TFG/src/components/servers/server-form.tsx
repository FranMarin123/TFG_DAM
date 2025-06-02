import type React from "react"
import { useState } from "react"
import { FiServer, FiGlobe } from "react-icons/fi"
import { Button } from "../ui/button"

interface ServerFormData {
  name: string
  address: string
  type: string
}

interface ServerFormProps {
  onSubmit: (data: ServerFormData) => void
  onCancel: () => void
}

export function ServerForm({ onSubmit, onCancel }: ServerFormProps) {
  const [formData, setFormData] = useState<ServerFormData>({
    name: "",
    address: "",
    type: "virtual",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ServerFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

    if (!formData.address.trim()) {
      newErrors.address = "La dirección IP es requerida"
    } else if (!/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(formData.address)) {
      newErrors.address = "Formato de IP inválido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre del servidor *
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
            disabled={isSubmitting}
            className={`block w-full rounded-md border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } pl-10 py-2 focus:border-sky-500 focus:ring-sky-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
            placeholder="Servidor Web Principal"
          />
        </div>
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Dirección IP *
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiGlobe className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`block w-full rounded-md border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } pl-10 py-2 focus:border-sky-500 focus:ring-sky-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
            placeholder="192.168.1.1"
          />
        </div>
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Tipo de servidor *
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          disabled={isSubmitting}
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-sky-500 focus:ring-sky-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="virtual">Virtual</option>
          <option value="physical">Físico</option>
          <option value="cloud">Cloud</option>
          <option value="web">Web Server</option>
          <option value="database">Database Server</option>
          <option value="application">Application Server</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Añadiendo...
            </div>
          ) : (
            "Añadir Servidor"
          )}
        </Button>
      </div>
    </form>
  )
}
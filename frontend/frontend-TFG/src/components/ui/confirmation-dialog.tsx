import { FiAlertTriangle } from "react-icons/fi"
import { Button } from "./button"

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: "danger" | "warning" | "info"
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "danger",
}: ConfirmationDialogProps) {
  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const typeStyles = {
    danger: "text-red-600",
    warning: "text-yellow-600",
    info: "text-sky-600",
  }

  const iconColor = typeStyles[type]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center">
            <div
              className={`mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-${type}-100`}
            >
              <FiAlertTriangle className={`h-6 w-6 ${iconColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-500">{message}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              {cancelText}
            </Button>
            <Button variant={type === "danger" ? "danger" : "primary"} onClick={handleConfirm}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

import type React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  label?: string
  error?: string
}

export function Input({ icon, rightIcon, label, error, className = "", id, ...props }: InputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
        <input
          id={id}
          className={`appearance-none relative block w-full px-3 py-3 ${icon ? "pl-10" : ""} ${
            rightIcon ? "pr-10" : ""
          } border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm ${
            error ? "border-red-500" : ""
          } ${className}`}
          {...props}
        />
        {rightIcon && <div className="absolute inset-y-0 right-0 pr-3 flex items-center">{rightIcon}</div>}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

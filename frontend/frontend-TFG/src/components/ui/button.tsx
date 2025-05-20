import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  children: React.ReactNode
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center"

  const variantStyles = {
    primary: "text-white bg-sky-600 hover:bg-sky-700 focus:ring-sky-500 border border-transparent",
    secondary: "text-sky-700 bg-sky-100 hover:bg-sky-200 focus:ring-sky-500 border border-transparent",
    outline: "text-sky-600 bg-transparent hover:bg-sky-50 focus:ring-sky-500 border border-sky-300",
    danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 border border-transparent",
  }

  const sizeStyles = {
    sm: "py-1.5 px-3 text-xs",
    md: "py-2 px-4 text-sm",
    lg: "py-3 px-5 text-base",
  }

  const widthStyles = fullWidth ? "w-full" : ""

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  )
}

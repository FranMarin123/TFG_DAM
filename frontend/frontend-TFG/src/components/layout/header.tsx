"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FiMenu, FiX, FiServer, FiShield, FiActivity, FiSettings } from "react-icons/fi"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-sky-600 rounded-md flex items-center justify-center text-white">
                <FiServer className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
                Servly
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/servers" className="text-gray-700 hover:text-sky-600 font-medium flex items-center">
              <FiServer className="mr-2" /> Servidores
            </Link>
            <Link to="/monitoring" className="text-gray-700 hover:text-sky-600 font-medium flex items-center">
              <FiActivity className="mr-2" /> Monitoreo
            </Link>
            <Link to="/security" className="text-gray-700 hover:text-sky-600 font-medium flex items-center">
              <FiShield className="mr-2" /> Seguridad
            </Link>
            <Link to="/settings" className="text-gray-700 hover:text-sky-600 font-medium flex items-center">
              <FiSettings className="mr-2" /> Configuración
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <button className="px-4 py-2 text-sky-600 border border-sky-600 rounded-lg hover:bg-sky-50 transition-colors duration-200">
                Iniciar sesión
              </button>
            </Link>
            <Link to="/register">
              <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors duration-200">
                Registrarse
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-sky-600 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1 py-3">
            <Link
              to="/servers"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-50 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiServer className="mr-2" /> Servidores
            </Link>
            <Link
              to="/monitoring"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-50 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiActivity className="mr-2" /> Monitoreo
            </Link>
            <Link
              to="/security"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-50 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiShield className="mr-2" /> Seguridad
            </Link>
            <Link
              to="/settings"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-50 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiSettings className="mr-2" /> Configuración
            </Link>
            <div className="pt-4 pb-2 border-t border-gray-200">
              <div className="flex items-center space-x-3 px-3">
                <Link
                  to="/login"
                  className="w-full block px-3 py-2 rounded-md text-base font-medium text-center text-sky-600 border border-sky-600 hover:bg-sky-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="w-full block px-3 py-2 rounded-md text-base font-medium text-center text-white bg-sky-600 hover:bg-sky-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

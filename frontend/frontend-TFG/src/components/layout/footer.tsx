import { Link } from "react-router-dom"
import { FiServer } from "react-icons/fi"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 bg-sky-600 rounded-md flex items-center justify-center text-white">
                <FiServer className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
                Servly
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Plataforma integral para la gestión, monitoreo y optimización de servidores.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-sky-600">
                  Sobre nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/servers" className="text-gray-600 hover:text-sky-600">
                  Monitoreo de servidores
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2025 Servly. Todos los derechos reservados.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-sky-600">
                Política de privacidad
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-sky-600">
                Términos de servicio
              </Link>
              <Link to="/cookies" className="text-sm text-gray-500 hover:text-sky-600">
                Política de cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

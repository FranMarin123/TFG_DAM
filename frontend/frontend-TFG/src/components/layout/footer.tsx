import { Link } from "react-router-dom"
import { FiTwitter, FiGithub, FiLinkedin, FiMail, FiServer } from "react-icons/fi"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Description */}
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
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-sky-600 transition-colors duration-200"
                aria-label="Twitter"
              >
                <FiTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-sky-600 transition-colors duration-200"
                aria-label="GitHub"
              >
                <FiGithub className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-sky-600 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-sky-600">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-sky-600">
                  Carreras
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-sky-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-sky-600">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/monitoring" className="text-gray-600 hover:text-sky-600">
                  Monitoreo de servidores
                </Link>
              </li>
              <li>
                <Link to="/services/deployment" className="text-gray-600 hover:text-sky-600">
                  Despliegue automatizado
                </Link>
              </li>
              <li>
                <Link to="/services/security" className="text-gray-600 hover:text-sky-600">
                  Seguridad y backups
                </Link>
              </li>
              <li>
                <Link to="/services/scaling" className="text-gray-600 hover:text-sky-600">
                  Escalado automático
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Suscríbete</h3>
            <p className="text-gray-600 mb-4">Recibe las últimas noticias y actualizaciones.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow">
                <label htmlFor="email-address" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Tu correo electrónico"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700"
              >
                <FiMail className="mr-2 -ml-1 h-5 w-5" />
                <span>Suscribir</span>
              </button>
            </form>
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

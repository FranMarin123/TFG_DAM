"use client"

import { useState } from "react"
import { Header } from "../../components/layout/header"
import { Footer } from "../../components/layout/footer"
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"
import { FiServer, FiShield, FiActivity, FiCheckCircle } from "react-icons/fi"
import ImagesCollection from "../../components/images-collection/images-collection"
        

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-sky-100 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
                  <span className="block text-sky-600">Gestión de servidores</span>
                  <span className="block">simplificada</span>
                </h1>
                <p className="text-xl text-gray-500 mb-8">
                  Servly te permite monitorear, gestionar y optimizar tus servidores desde una única plataforma
                  intuitiva. Mantén el control total de tu infraestructura.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button size="lg">Comenzar ahora</Button>
                  </Link>
                  <Link to="/demo">
                    <Button variant="outline" size="lg">
                      Solicitar demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2">
                <ImagesCollection />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Gestiona tus servidores</span>
                <span className="block text-sky-600">con total control</span>
              </h2>
              <p className="mt-4 text-xl text-gray-500">
                Descubre cómo Servly puede transformar la gestión de tu infraestructura.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-sky-50 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sky-600 text-white mb-4">
                  <FiActivity className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Monitoreo en tiempo real</h3>
                <p className="text-gray-600">
                  Supervisa el rendimiento de tus servidores en tiempo real. Recibe alertas instantáneas ante cualquier
                  anomalía.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-sky-50 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sky-600 text-white mb-4">
                  <FiShield className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Seguridad avanzada</h3>
                <p className="text-gray-600">
                  Protege tus servidores con nuestras herramientas de seguridad avanzada. Detecta y previene amenazas
                  antes de que ocurran.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-sky-50 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sky-600 text-white mb-4">
                  <FiServer className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Gestión centralizada</h3>
                <p className="text-gray-600">
                  Administra todos tus servidores desde un único panel. Simplifica la gestión de tu infraestructura.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-16 bg-sky-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">Panel de control intuitivo</h2>
              <p className="text-xl text-gray-500 max-w-3xl mx-auto">
                Visualiza y gestiona todos los aspectos de tus servidores con nuestro panel de control fácil de usar.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  {["overview", "performance", "security", "logs"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-6 text-sm font-medium border-b-2 ${
                        activeTab === tab
                          ? "border-sky-600 text-sky-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="p-6">
                <img
                  src="/placeholder.svg?height=400&width=800"
                  alt="Dashboard Preview"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Lo que dicen nuestros clientes</h2>
              <p className="mt-4 text-xl text-gray-500">
                Empresas de todos los tamaños confían en Servly para gestionar su infraestructura.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-sky-50 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <span className="text-gray-600 font-bold">JD</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Juan Díaz</h4>
                    <p className="text-gray-600">CTO, TechSolutions</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Desde que implementamos Servly, hemos reducido nuestros tiempos de inactividad en un 85%. La
                  capacidad de monitorear todos nuestros servidores en tiempo real ha sido un cambio radical."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-sky-50 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <span className="text-gray-600 font-bold">MR</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">María Rodríguez</h4>
                    <p className="text-gray-600">DevOps Lead, DataCorp</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "La interfaz intuitiva y las alertas personalizables nos han permitido responder a problemas antes de
                  que afecten a nuestros usuarios. Servly es ahora una parte esencial de nuestra infraestructura."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-sky-50 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <span className="text-gray-600 font-bold">PG</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Pablo García</h4>
                    <p className="text-gray-600">IT Manager, CloudNet</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "La capacidad de gestionar todos nuestros servidores desde un único panel ha simplificado enormemente
                  nuestras operaciones. El soporte técnico de Servly también ha sido excepcional."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-sky-600 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    <span className="block">¿Listo para optimizar tu infraestructura?</span>
                    <span className="block text-sky-200">Comienza hoy con Servly.</span>
                  </h2>
                  <p className="mt-4 text-lg text-sky-100">
                    Regístrate ahora y disfruta de 14 días de prueba gratuita. Sin compromisos.
                  </p>
                  <ul className="mt-6 space-y-2">
                    <li className="flex items-center text-sky-100">
                      <FiCheckCircle className="h-5 w-5 mr-2" />
                      <span>Sin tarjeta de crédito</span>
                    </li>
                    <li className="flex items-center text-sky-100">
                      <FiCheckCircle className="h-5 w-5 mr-2" />
                      <span>Configuración en minutos</span>
                    </li>
                    <li className="flex items-center text-sky-100">
                      <FiCheckCircle className="h-5 w-5 mr-2" />
                      <span>Soporte personalizado</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 lg:mt-0 lg:ml-8">
                  <div className="sm:flex">
                    <Link to="/register">
                      <Button size="lg" className="w-full sm:w-auto bg-white text-sky-600 hover:bg-sky-50 border-white">
                        Registrarse gratis
                      </Button>
                    </Link>
                    <Link to="/contact" className="mt-3 sm:mt-0 sm:ml-3">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto border-white text-white hover:bg-sky-700"
                      >
                        Contactar con ventas
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

import { Header } from "../../components/layout/header"
import { Footer } from "../../components/layout/footer"
import { FiServer, FiUsers, FiGlobe, FiAward } from "react-icons/fi"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-br from-sky-100 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Sobre <span className="text-sky-600">Nosotros</span>
              </h1>
              <p className="max-w-3xl mt-5 mx-auto text-xl text-gray-500">
                Simplificando la gestión de servidores para empresas de todos los tamaños desde 2025.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Nuestra Historia</h2>
                <p className="mt-3 max-w-3xl text-lg text-gray-500">
                  Servly nació en 2025 cuando un alumno del ciclo de DAM se enfrentó a los desafíos de gestionar
                  una infraestructura de servidores cada vez más compleja. Frustrado por las herramientas existentes
                  que eran demasiado complicadas o demasiado básicas, decidió crear una solución que fuera potente
                  pero intuitiva.
                </p>
                <p className="mt-3 max-w-3xl text-lg text-gray-500">
                  Lo que comenzó como un proyecto interno rápidamente se convirtió en una plataforma completa que atrajo
                  la atención de otras empresas que enfrentaban desafíos similares. Hoy, Servly es utilizado por miles
                  de empresas en todo el mundo, desde startups hasta grandes corporaciones.
                </p>
              </div>
              <div className="mt-10 lg:mt-0" >
                <img
                  className="ml-auto rounded-xl shadow-xl"
                  src="/LogoServly.jpeg"
                  alt="Equipo de Servly"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-sky-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Nuestra Misión y Valores</h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
                Nos guiamos por principios claros que definen cómo trabajamos y cómo construimos nuestros productos.
              </p>
            </div>

            <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
                <p className="text-gray-500">
                  Nuestra misión es simplificar la gestión de infraestructuras tecnológicas para que las empresas puedan
                  centrarse en lo que realmente importa: crear valor para sus clientes. Creemos que la tecnología debe
                  ser un facilitador, no un obstáculo.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Nuestros Valores</h3>
                <ul className="space-y-3 text-gray-500">
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2">•</span>
                    <span>
                      <strong>Simplicidad:</strong> Creemos en soluciones elegantes y fáciles de usar.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2">•</span>
                    <span>
                      <strong>Transparencia:</strong> Somos honestos con nuestros clientes, socios y entre nosotros.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2">•</span>
                    <span>
                      <strong>Innovación:</strong> Constantemente buscamos mejores formas de resolver problemas.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2">•</span>
                    <span>
                      <strong>Empatía:</strong> Entendemos los desafíos de nuestros clientes y construimos soluciones
                      pensando en ellos.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-sky-50 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sky-600 text-white mx-auto mb-4">
                  <FiServer className="h-6 w-6" />
                </div>
                <p className="text-4xl font-extrabold text-gray-900">+500K</p>
                <p className="mt-2 text-lg font-medium text-gray-500">Servidores gestionados</p>
              </div>

              <div className="bg-sky-50 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sky-600 text-white mx-auto mb-4">
                  <FiUsers className="h-6 w-6" />
                </div>
                <p className="text-4xl font-extrabold text-gray-900">+5,000</p>
                <p className="mt-2 text-lg font-medium text-gray-500">Clientes satisfechos</p>
              </div>

              <div className="bg-sky-50 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sky-600 text-white mx-auto mb-4">
                  <FiGlobe className="h-6 w-6" />
                </div>
                <p className="text-4xl font-extrabold text-gray-900">+30</p>
                <p className="mt-2 text-lg font-medium text-gray-500">Países</p>
              </div>

              <div className="bg-sky-50 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sky-600 text-white mx-auto mb-4">
                  <FiAward className="h-6 w-6" />
                </div>
                <p className="text-4xl font-extrabold text-gray-900">99.9%</p>
                <p className="mt-2 text-lg font-medium text-gray-500">Tiempo de actividad</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-sky-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Nuestro Equipo</h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
                Un grupo de apasionados por la tecnología dedicados a simplificar la gestión de servidores.
              </p>
            </div>

            <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  className="w-full h-64 object-cover"
                  src="/placeholder.svg?height=300&width=300"
                  alt="Francisco Marín"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">Francisco Marín</h3>
                  <p className="text-sky-600">CEO, Fundador y Developer</p>
                  <p className="mt-3 text-gray-500">
                    Francisco lidera la visión estratégica de Servly.
                  </p>
                </div>
              </div>            
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Contáctanos</h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
                ¿Tienes preguntas o comentarios? Estamos aquí para ayudarte.
              </p>
            </div>

            <div className="mt-12 bg-sky-50 rounded-lg shadow-sm p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Información de contacto</h3>
                  <div className="space-y-4">
                    <p className="flex items-start">
                      <span className="text-sky-600 mr-2">•</span>
                      <span>
                        <strong>Email:</strong> info@servly.com
                      </span>
                    </p>
                    <p className="flex items-start">
                      <span className="text-sky-600 mr-2">•</span>
                      <span>
                        <strong>Teléfono:</strong> 
                      </span>
                    </p>
                    <p className="flex items-start">
                      <span className="text-sky-600 mr-2">•</span>
                      <span>
                        <strong>Dirección:</strong> Av. Juan Carlos I, s/n, 14520 Fernán Núñez, Córdoba
                      </span>
                    </p>
                    <p className="flex items-start">
                      <span className="text-sky-600 mr-2">•</span>
                      <span>
                        <strong>Horario:</strong> Lunes a Viernes, 9:00 - 18:00
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Envíanos un mensaje</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                      Enviar mensaje
                    </button>
                  </form>
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

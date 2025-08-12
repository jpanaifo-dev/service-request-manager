import { Building, Clock, Mail, MapPin, Phone, Shield } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">ServiciosGov</span>
            </div>
            <p className="text-slate-400 mb-4">
              Portal oficial del gobierno para la gestión integral de servicios
              ciudadanos.
            </p>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Shield className="w-4 h-4" />
              <span>Certificado Gov.co</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link
                  href="/portal"
                  className="hover:text-white transition-colors"
                >
                  Portal Ciudadano
                </Link>
              </li>
              <li>
                <Link
                  href="/consulta"
                  className="hover:text-white transition-colors"
                >
                  Consultar Estado
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-white transition-colors"
                >
                  Panel Administrativo
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Certificaciones
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Tutoriales
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto Oficial</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>01-8000-123-456</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>soporte@serviciosgov.co</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Bogotá, Colombia</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Lun-Vie 8:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 mb-4 md:mb-0">
              &copy; 2024 ServiciosGov - Gobierno de Colombia. Todos los
              derechos reservados.
            </p>
            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                Política de Privacidad
              </a>
              <span>•</span>
              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                Transparencia
              </a>
              <span>•</span>
              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                Accesibilidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

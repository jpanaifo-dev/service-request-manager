import { APP_URL } from '@/data/constants'
import { Facebook, Linkedin, Mail, Phone, Pin, Clock, X } from 'lucide-react'
import Link from 'next/link'
import { LogoRender } from './logo-render'

export const Footer = () => {
  return (
    <footer className="bg-red-800 text-white py-4 sm:pt-20  px-6 border-t border-gray-800">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8 py-6">
        {/* Sección de la institución */}
        <div>
          <LogoRender href={APP_URL.HOME.BASE} />
          <p className="text-sm mt-2">
            Formación académica de excelencia para el desarrollo profesional y
            la investigación.
          </p>
          <div className="flex items-center space-x-2 text-xs mt-4">
            <div>
              <Pin size={16} />
            </div>
            <span>Calle Ricardo Palma # 724. Calle Bolognesi # 680.</span>
          </div>
          <div className="flex items-center space-x-2 text-xs mt-4">
            <div>
              <Clock size={16} />
            </div>
            <p>
              Lunes a Viernes: 8:00 AM - 1:00 PM
              <br />
            </p>
          </div>
        </div>

        {/* Sección de enlaces principales */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Enlaces Principales</h4>
          <ul className="text-sm space-y-2">
            <li>
              <Link
                href={APP_URL.PORTAL.START_PROCEDURE}
                className="hover:text-gray-300"
              >
                Iniciar Trámite
              </Link>
            </li>
          </ul>
        </div>

        {/* Sección de contacto */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Contacto</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-center space-x-2">
              <Phone size={16} />
              <span>+51 65507534</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail size={16} />
              <span>contacto.microsystems@gmail.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <Link href="https://www.facebook.com/postgradounap/">
                <Facebook
                  size={16}
                  className="hover:text-gray-300"
                />
              </Link>
              <Link href="https://www.linkedin.com/company/posgradounap">
                <Linkedin
                  size={16}
                  className="hover:text-gray-300"
                />
              </Link>
              <Link href="https://twitter.com/postgradounap">
                <X
                  size={16}
                  className="hover:text-gray-300"
                />
              </Link>
            </li>
          </ul>
        </div>

        {/* Sección de certificación */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Ubicación</h4>
          <div className="rounded overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.123456789!2d-73.2456789!3d-3.7432101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ea1a123456789%3A0xabcdef123456789!2sCalle%20Ricardo%20Palma%20724%2C%20Iquitos%2C%20Peru!5e0!3m2!1ses!2spe!4v1710000000000!5m2!1ses!2spe"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Instituto"
            />
          </div>
          <p className="text-xs mt-2 text-gray-200">
            Visítanos en nuestra sede principal.
          </p>
        </div>
      </div>
      {/* Términos y condiciones */}
      <div className="border-t border-gray-200 mt-6 pt-4 text-center text-sm text-gray-300">
        <p>
          &copy; {new Date().getFullYear()} INSTITUTO MYCROSYSTEM. Todos los
          derechos reservados. - IMS
        </p>
        <Link
          // href={ADMISSION_URLS_APP.HOME.TERMS_AND_CONDITIONS}
          href={'#'}
          className="hover:text-gray-100"
        >
          Términos y Condiciones
        </Link>
      </div>
    </footer>
  )
}

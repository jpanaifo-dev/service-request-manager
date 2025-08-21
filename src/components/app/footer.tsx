import { APP_URL } from '@/data/constants'
import { Facebook, Linkedin, Mail, Phone, Pin, Clock, X } from 'lucide-react'
import Image from 'next/image'
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
          <Image
            src="/brands/isologo_ims_white.png"
            alt="SUNEDU"
            width={200}
            height={200}
          />
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

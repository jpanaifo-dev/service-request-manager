import { Button } from '@/components/ui/button'
import { APP_URL } from '@/data/constants'
import { FileText, Search } from 'lucide-react'
import Link from 'next/link'

export function HeroBanner() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://www.microsystems-iquitos.com/images/pictures/team39.png')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-800/85 to-gray-900/90" />

      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Comienza Tu Trámite Ahora
        </h2>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Únete a miles de ciudadanos que ya confían en nuestra plataforma
          oficial para sus trámites gubernamentales
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-4 bg-white text-gray-900 hover:bg-gray-100"
          >
            <Link href={APP_URL.PORTAL.START_PROCEDURE}>
              <FileText className="w-5 h-5 mr-2" />
              Acceder al Portal Oficial
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-lg px-8 py-4 text-white border-white/40 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
          >
            <Link href={APP_URL.PORTAL.CONSULTAR}>
              <Search className="w-5 h-5 mr-2" />
              Consultar Mis Solicitudes
            </Link>
          </Button>
        </div>
        <p className="text-sm text-gray-300">
          ✓ Plataforma oficial del gobierno • ✓ Datos 100% seguros • ✓ Soporte
          24/7
        </p>
      </div>
    </section>
  )
}

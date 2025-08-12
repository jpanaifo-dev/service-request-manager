import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
// import { StatsWidget } from '@/components/stats-widget'
// import { NotificationSystem } from '@/components/notification-system'
import {
  FileText,
  Search,
  Clock,
  Shield,
  Users,
  CheckCircle,
  Award,
  Lock,
  Globe,
  Phone,
  Mail,
  MapPin,
  Star,
  TrendingUp,
  Building,
} from 'lucide-react'

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - More Institutional */}
      <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  Gobierno Digital Certificado
                </Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Portal Oficial de
                <span className="text-blue-300 block">
                  Servicios Ciudadanos
                </span>
              </h1>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
                Plataforma gubernamental oficial para la gestión integral de
                trámites y servicios públicos. Segura, confiable y disponible
                24/7 para todos los ciudadanos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
                >
                  <Link href="/portal">
                    <FileText className="w-5 h-5 mr-2" />
                    Iniciar Trámite
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white hover:text-slate-900"
                >
                  <Link href="/consulta">
                    <Search className="w-5 h-5 mr-2" />
                    Consultar Estado
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-blue-200">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>SSL Certificado</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Datos Protegidos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>ISO 27001</span>
                </div>
              </div>
            </div>

            <div className="lg:text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Estadísticas en Tiempo Real
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-300 mb-2">
                      15,847
                    </div>
                    <div className="text-sm text-blue-100">
                      Solicitudes Procesadas
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-300 mb-2">
                      98.5%
                    </div>
                    <div className="text-sm text-blue-100">
                      Satisfacción Ciudadana
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300 mb-2">
                      2.3 días
                    </div>
                    <div className="text-sm text-blue-100">Tiempo Promedio</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-300 mb-2">
                      24/7
                    </div>
                    <div className="text-sm text-blue-100">Disponibilidad</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-lg font-semibold text-slate-600 mb-2">
              Certificado y Respaldado Por
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-slate-500" />
              <span className="font-semibold text-slate-700">MinTIC</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-6 h-6 text-slate-500" />
              <span className="font-semibold text-slate-700">ISO 27001</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-6 h-6 text-slate-500" />
              <span className="font-semibold text-slate-700">Gov.co</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-6 h-6 text-slate-500" />
              <span className="font-semibold text-slate-700">HTTPS Seguro</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      {/* <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Transparencia y Resultados
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Datos actualizados en tiempo real sobre el desempeño de nuestros
              servicios
            </p>
          </div>
          <StatsWidget />
        </div>
      </section> */}

      {/* Process Section - More Professional */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Proceso Simplificado y Seguro
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Metodología certificada para garantizar la eficiencia y seguridad
              en cada trámite
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-2 hover:border-blue-300 transition-all hover:shadow-lg bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Identificación Segura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Verificación de identidad con los más altos estándares de
                  seguridad digital
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-green-300 transition-all hover:shadow-lg bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Solicitud Digital
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Formularios inteligentes que se adaptan a tu tipo de trámite
                  específico
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-yellow-300 transition-all hover:shadow-lg bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-yellow-600 font-bold">3</span>
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Verificación Múltiple
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Sistema de autenticación de dos factores para máxima seguridad
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-purple-300 transition-all hover:shadow-lg bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">4</span>
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Seguimiento Inteligente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Notificaciones automáticas y seguimiento en tiempo real del
                  progreso
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Servicios Gubernamentales Disponibles
            </h2>
            <p className="text-lg text-slate-600">
              Catálogo completo de trámites y certificaciones oficiales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Certificados de Residencia',
                time: '2-3 días',
                icon: '🏠',
              },
              {
                name: 'Certificados de Ingresos',
                time: '1-2 días',
                icon: '💰',
              },
              {
                name: 'Permisos de Construcción',
                time: '5-7 días',
                icon: '🏗️',
              },
              { name: 'Licencias Comerciales', time: '3-5 días', icon: '🏪' },
              {
                name: 'Certificados de Paz y Salvo',
                time: '1-2 días',
                icon: '✅',
              },
              { name: 'Permisos de Eventos', time: '2-4 días', icon: '🎉' },
            ].map((servicio, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all border-l-4 border-l-blue-600 bg-white"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{servicio.icon}</span>
                      <div>
                        <CardTitle className="text-base text-slate-900">
                          {servicio.name}
                        </CardTitle>
                        <Badge
                          variant="secondary"
                          className="mt-1 text-xs"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {servicio.time}
                        </Badge>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">
                    Tramita tu {servicio.name.toLowerCase()} de forma
                    completamente digital y segura
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Confianza Ciudadana
            </h2>
            <p className="text-lg text-slate-600">
              Lo que dicen los ciudadanos sobre nuestros servicios
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'María González',
                role: 'Empresaria',
                comment:
                  'El proceso fue increíblemente rápido y seguro. Obtuve mi certificado en menos de 2 días.',
                rating: 5,
              },
              {
                name: 'Carlos Rodríguez',
                role: 'Arquitecto',
                comment:
                  'La plataforma es muy intuitiva. Pude hacer todo el trámite desde mi oficina sin complicaciones.',
                rating: 5,
              },
              {
                name: 'Ana Martínez',
                role: 'Comerciante',
                comment:
                  'Excelente servicio al cliente y seguimiento en tiempo real. Muy recomendado.',
                rating: 5,
              },
            ].map((testimonio, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-md"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonio.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4 italic">
                    {`"${testimonio.comment}"`}
                  </p>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {testimonio.name}
                    </div>
                    <div className="text-sm text-slate-500">
                      {testimonio.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Comienza Tu Trámite Ahora
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de ciudadanos que ya confían en nuestra plataforma
            oficial para sus trámites gubernamentales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-blue-50"
            >
              <Link href="/portal">
                <FileText className="w-5 h-5 mr-2" />
                Acceder al Portal Oficial
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 text-white border-white/30 hover:bg-white hover:text-blue-600 bg-white/10"
            >
              <Link href="/consulta">
                <Search className="w-5 h-5 mr-2" />
                Consultar Mis Solicitudes
              </Link>
            </Button>
          </div>
          <p className="text-sm text-blue-200">
            ✓ Plataforma oficial del gobierno • ✓ Datos 100% seguros • ✓ Soporte
            24/7
          </p>
        </div>
      </section>

      {/* Enhanced Footer */}
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
                Portal oficial del gobierno para la gestión integral de
                servicios ciudadanos.
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
    </div>
  )
}
